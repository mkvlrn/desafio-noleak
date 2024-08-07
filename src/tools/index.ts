import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Redis } from "ioredis";

const {
  REDIS_URL,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET_NAME,
  S3_ENDPOINT,
} = process.env;

if (
  !REDIS_URL ||
  !ACCESS_KEY_ID ||
  !SECRET_ACCESS_KEY ||
  !AWS_REGION ||
  !AWS_BUCKET_NAME ||
  !S3_ENDPOINT
) {
  throw new Error("TODAS as variáveis de ambiente precisam ser definidas");
}

export const redis = new Redis(REDIS_URL);

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  endpoint: S3_ENDPOINT,
});

export async function s3save(key: string, buffer: Buffer, mimeType: string) {
  const fileName = `${key}.${mimeType.split("/")[1]}`;
  const uploadCommand = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
    ContentType: mimeType,
    Body: buffer,
  });
  await s3.send(uploadCommand);

  const downloadCommand = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
    ResponseContentDisposition: `attachment; filename=${fileName}`,
  });

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const url = `${S3_ENDPOINT}/${AWS_BUCKET_NAME}/${fileName}`;

  const downloadUrl = await getSignedUrl(s3, downloadCommand, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  return { url, downloadUrl };
}
