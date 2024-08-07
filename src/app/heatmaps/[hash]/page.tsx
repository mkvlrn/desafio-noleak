import { Button, Flex, Image } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { PageTitle } from "~/components/page-title";
import { redis } from "~/tools";
import { HeatmapEntry } from "~/types";

interface HeatmapProperties {
  params: {
    hash: string;
  };
}

export default async function Heatmap({ params }: HeatmapProperties) {
  const heatMapString = await redis.get(params.hash);
  if (!heatMapString) {
    return notFound();
  }

  const heatMap = JSON.parse(heatMapString) as HeatmapEntry["data"];

  return (
    <>
      <PageTitle title={`Heatmap - ${heatMap.searchTerm}`} />
      <Flex direction="column" justify="center" align="center" rowGap={10}>
        <Button
          rightSection={<IconDownload size={16} />}
          component="a"
          href={heatMap.downloadUrl}
        >
          Download
        </Button>
        <Image
          src={heatMap.url}
          w={heatMap.width}
          h={heatMap.height}
          width={heatMap.width}
          height={heatMap.height}
          alt="heatmap"
          component={NextImage}
        />
      </Flex>
    </>
  );
}

export async function generateStaticParams() {
  const keys = await redis.keys("*");

  return keys.map((key) => ({ hash: key }));
}
