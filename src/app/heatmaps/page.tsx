import { PageTitle } from "~/components/page-title";
import { redis } from "~/redis";

export default async function Heatmaps() {
  const keys = await redis.keys("*");
  const values = await redis.mget(keys);
  const data = values.map((url, index) => ({
    hash: keys[index],
    url,
  }));

  return <PageTitle title={`Banco de Heatmaps - ${data.length.toString()} imagens`} />;
}
