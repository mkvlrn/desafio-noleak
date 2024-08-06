import { Text } from "@mantine/core";

interface NewHeatmapFormFileInstructionsProperties {
  type: "json" | "img";
}

const instructions: Record<"json" | "img", string[]> = {
  json: [
    "Arquivo JSON contendo dados de mapeamento",
    "Arraste ou clique para carregar o arquivo",
    "Somente arquivos .json são aceitos",
  ],
  img: [
    "Imagem a ser mapeada",
    "Arraste ou clique para carregar o arquivo",
    "Somente imagens são aceitas",
  ],
};

export function NewHeatmapFormFileInstructions({
  type,
}: NewHeatmapFormFileInstructionsProperties) {
  return (
    <div>
      <Text size="xl" inline>
        {instructions[type][0]}
      </Text>
      <Text size="sm" c="dimmed" inline mt={7}>
        {instructions[type][1]}
      </Text>
      <Text size="sm" c="dimmed">
        {instructions[type][2]}
      </Text>
    </div>
  );
}
