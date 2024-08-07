"use server";

import { redis } from "~/tools";

export async function listImages() {
  const keys = await redis.keys("*");

  return keys;
}
