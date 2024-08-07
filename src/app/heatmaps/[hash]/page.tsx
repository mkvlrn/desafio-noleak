import { notFound } from "next/navigation";
import { redis } from "~/redis";

interface HeatmapProperties {
  params: {
    hash: string;
  };
}

export default async function Heatmap({ params }: HeatmapProperties) {
  const heatmap = await redis.get(params.hash);
  if (!heatmap) {
    return notFound();
  }

  console.log(heatmap);

  return <div>Heatmap</div>;
}

export async function generateStaticParams() {
  const keys = await redis.keys("*");

  return keys.map((key) => ({ hash: key }));
}
