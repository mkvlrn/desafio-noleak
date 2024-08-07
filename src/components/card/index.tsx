import { Card, Flex, Image, Text } from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";
import { type HeatmapEntry } from "~/types";

export function MapCard({ hash, data }: HeatmapEntry) {
  const { url, timestamp, searchTerm } = data;

  return (
    <Card withBorder radius="md" shadow="sm" padding="md">
      <Flex gap="md" align="center" justify="space-between">
        <div>
          <Text>
            Busca:{" "}
            <Text span fw="bold" fs="italic" c="cyan">
              {searchTerm}
            </Text>
          </Text>
          <Text>
            Data:{" "}
            <Text span fw="bold" fs="italic" c="cyan">
              {new Date(timestamp).toLocaleDateString("pt-BR")}
            </Text>
          </Text>
          <Text>
            Hora:{" "}
            <Text span fw="bold" fs="italic" c="cyan">
              {new Date(timestamp).toLocaleTimeString("pt-BR")}
            </Text>
          </Text>
        </div>
        <Link href={`/heatmaps/${hash}`} passHref>
          <Image src={url} width={80} height={80} alt="heatmap" component={NextImage} />
        </Link>
      </Flex>
    </Card>
  );
}
