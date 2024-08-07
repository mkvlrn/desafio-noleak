import { Button, Center, Group, Image } from "@mantine/core";
import { IconDownload, IconX } from "@tabler/icons-react";
import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";
import { PageTitle } from "~/components/page-title";
import { type HeatmapEntry } from "~/types";

interface HeatmapProperties {
  params: {
    hash: string;
  };
}

export default async function Heatmap({ params }: HeatmapProperties) {
  const heatMap = await kv.get<HeatmapEntry["data"]>(params.hash);
  if (!heatMap) {
    return notFound();
  }

  return (
    <>
      <PageTitle title={`Heatmap - ${heatMap.searchTerm}`} />
      <Group justify="center" mb="md">
        <Button
          rightSection={<IconDownload size={16} />}
          component="a"
          href={heatMap.downloadUrl}
        >
          Download
        </Button>
        <Button rightSection={<IconX size={16} />} color="red">
          Apagar
        </Button>
      </Group>
      <Center>
        <Image
          src={heatMap.url}
          w={heatMap.width}
          h={heatMap.height}
          width={heatMap.width}
          height={heatMap.height}
          alt="heatmap"
        />
      </Center>
    </>
  );
}

export async function generateStaticParams() {
  const keys = await kv.keys("*");

  return keys.map((key) => ({ hash: key }));
}
