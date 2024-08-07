import { SimpleGrid } from "@mantine/core";
import { kv } from "@vercel/kv";
import { MapCard } from "~/components/card";
import { PageTitle } from "~/components/page-title";
import { type HeatmapEntry } from "~/types";

export default async function Heatmaps() {
  const keys = await kv.keys("*");
  const values = keys.length > 0 ? await kv.mget<HeatmapEntry["data"][]>(keys) : [];
  console.log(values);
  const data = values.map((data, index) => ({
    hash: keys[index],
    data,
  }));

  return (
    <>
      <PageTitle title={`Banco de Heatmaps - ${data.length.toString()} imagens`} />
      <SimpleGrid cols={{ xl: 4, lg: 3, md: 2, sm: 1 }}>
        {data.map(({ hash, data }) => (
          <MapCard key={hash} hash={hash} data={data} />
        ))}
      </SimpleGrid>
    </>
  );
}
