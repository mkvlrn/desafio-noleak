"use server";

import { kv } from "@vercel/kv";

export async function listImages() {
  const keys = await kv.keys("*");

  return keys;
}
