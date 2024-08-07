import { SimpleGrid } from "@mantine/core";
import { MapCard } from "~/components/card";
import { PageTitle } from "~/components/page-title";
import { redis } from "~/tools";
import { HeatmapEntry } from "~/types";

export default async function Heatmaps() {
  const keys = await redis.keys("*");
  const values = keys.length > 0 ? await redis.mget(keys) : [];
  const data = values.map((data, index) => ({
    hash: keys[index],
    data: JSON.parse(data ?? "") as HeatmapEntry["data"],
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
