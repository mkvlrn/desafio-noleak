"use server";

import { createHash } from "node:crypto";
import {
  Canvas,
  CanvasRenderingContext2D,
  createCanvas,
  Image,
  loadImage,
} from "canvas";
import colormap from "colormap";
import { revalidatePath } from "next/cache";
import { redis } from "~/redis";

export interface CreateHeatmapFormState {
  errors: {
    json?: string[];
    img?: string[];
    searchTerm?: string[];
    _form?: string[];
  };
  success?: boolean;
  hash?: string;
}

interface HeatmapData {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
}

function getColorMap() {
  const colorMap = colormap({
    colormap: "jet",
    nshades: 256,
    format: "rgba",
    alpha: 1,
  });
  return colorMap;
}

async function getCanvas(file: File) {
  const buffer = await file.arrayBuffer();
  const image = await loadImage(Buffer.from(buffer));
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);

  return { canvas, context, image };
}

async function parseHeatData(file: File, searchTerm: string): Promise<HeatmapData[]> {
  const contents = await file.text();
  const json = JSON.parse(contents);
  const hits: { fields: { "deepstream-msg": string[] } }[] = json.hits.hits;
  const messages = hits
    .flatMap((hit) => hit.fields["deepstream-msg"])
    .map((message) => {
      const parts = message.split("|");
      return {
        xMin: Number.parseFloat(parts[1]),
        yMin: Number.parseFloat(parts[2]),
        xMax: Number.parseFloat(parts[3]),
        yMax: Number.parseFloat(parts[4]),
        object: parts[5],
      };
    });

  return messages.filter((message) => message.object === searchTerm);
}

function generateHeatPaint(image: Image, data: HeatmapData[]) {
  // initialize a 2D array to accumulate heatmap intensities
  const heatPaint = Array.from({ length: image.width }, () =>
    Array.from({ length: image.height }, () => 0),
  );

  // populate the heatPaint array with intensity values
  for (const entry of data) {
    const cX = Math.floor((entry.xMin + entry.xMax) / 2);
    const cY = Math.floor((entry.yMin + entry.yMax) / 2);

    heatPaint[cY][cX]++;
  }
  const termFound = heatPaint.some((row) => row.some((value) => value > 0));
  if (!termFound) {
    throw new Error("Nenhuma ocorrência encontrada", { cause: "term" });
  }

  // find the maximum intensity value to normalize the heatmap
  let max = 0;
  for (const row of heatPaint) {
    for (const value of row) {
      if (value > max) {
        max = value;
      }
    }
  }
  // normalize intensity values to a range of 0 to 255
  const scaleFactor = 255 / max;

  return { heatPaint, scaleFactor };
}

function plotData(
  colorMap: [number, number, number, number][],
  image: Image,
  heatPaint: number[][],
  scaleFactor: number,
  canvas: Canvas,
  context: CanvasRenderingContext2D,
) {
  const pixelIntensities = [];
  for (let x = 0; x < image.width; x++) {
    for (let y = 0; y < image.height; y++) {
      pixelIntensities.push({ x, y, intensity: heatPaint[x][y] * scaleFactor });
    }
  }

  // sort pixels by intensity to ensure hotter colors are drawn last
  pixelIntensities.sort((a, b) => a.intensity - b.intensity);

  for (const { x, y, intensity } of pixelIntensities) {
    const color = intensity === 0 ? [0, 0, 0, 0] : colorMap[Math.floor(intensity)];
    const gradient = context.createRadialGradient(x, y, 0, x, y, 45);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const rgba = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
    gradient.addColorStop(0, rgba);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    context.beginPath();
    context.arc(x, y, 30, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.fill();
  }

  return canvas.toBuffer("image/png");
}

async function generateUniqueHash(jsonFile: File, imgFile: File, searchTerm: string) {
  const jsonBuffer = Buffer.from(await jsonFile.arrayBuffer());
  const imgBuffer = Buffer.from(await imgFile.arrayBuffer());

  const combinedBuffer = Buffer.concat([
    jsonBuffer,
    imgBuffer,
    Buffer.from(searchTerm),
  ]);

  return createHash("sha256").update(combinedBuffer).digest("hex");
}

async function uploadHeatmap(buffer: Buffer) {
  const { FREEIMAGEHOST_API_KEY } = process.env;
  const source = buffer.toString("base64");

  if (!FREEIMAGEHOST_API_KEY) {
    throw new Error("variável de ambiente FREEIMAGEHOST_API_KEY não encontrada");
  }

  interface FreeImageHostUploadResponse {
    status_code: number;
    image: {
      url: string;
    };
  }

  const formData = new FormData();
  formData.append("key", FREEIMAGEHOST_API_KEY);
  formData.append("source", source);

  const response = await fetch(`https://freeimage.host/api/1/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar imagem");
  }

  const json = (await response.json()) as FreeImageHostUploadResponse;

  return json.image.url;
}

export async function createHeatmap(
  state: CreateHeatmapFormState,
  data: FormData,
): Promise<CreateHeatmapFormState> {
  try {
    const jsonData = data.get("json-data") as File;
    const imgData = data.get("img-data") as File;
    const searchTerm = data.get("search-term") as string;

    const uniqueHash = await generateUniqueHash(jsonData, imgData, searchTerm);
    const hashExists = await redis.exists(uniqueHash);

    if (hashExists) {
      return {
        errors: {
          _form: [
            "Combinação de imagem, json e termo já existe - redirecionando em 5 segundos",
          ],
        },
        hash: uniqueHash,
      };
    }

    const colorMap = getColorMap();
    const { canvas, context, image } = await getCanvas(imgData);
    const heatData = await parseHeatData(jsonData, searchTerm);
    const { heatPaint, scaleFactor } = generateHeatPaint(image, heatData);
    const plot = plotData(colorMap, image, heatPaint, scaleFactor, canvas, context);
    const imageUrl = await uploadHeatmap(plot);

    await redis.set(
      uniqueHash,
      JSON.stringify({ url: imageUrl, timestamp: Date.now(), searchTerm }),
    );
    revalidatePath("/heatmaps");

    return { errors: {}, success: true, hash: uniqueHash };
  } catch (error) {
    const { cause } = error as Error;
    if (cause === "term") {
      return { errors: { searchTerm: ["Nenhuma ocorrência encontrada"] } };
    }

    return { errors: { _form: ["Erro ao gerar heatmap"] } };
  }
}
