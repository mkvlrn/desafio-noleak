import { Redis } from "ioredis";

const { REDIS_URL } = process.env;

if (!REDIS_URL) {
  throw new Error("variável de ambiente REDIS_URL não encontrada");
}

export const redis = new Redis(REDIS_URL);

export interface HeatmapEntry {
  hash: string;
  data: {
    url: string;
    timestamp: number;
    searchTerm: string;
  };
}
