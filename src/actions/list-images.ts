"use server";

import { redis } from "~/redis";

export async function listImages() {
  const keys = await redis.keys("*");
  console.log(keys);
  return keys;
}
