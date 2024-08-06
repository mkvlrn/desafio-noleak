import { Button, Center, Group } from "@mantine/core";

interface NewHeatmapFormButtonsProperties {
  jsonFile?: string;
  imgFile?: string;
  searchTerm?: string;
  setJsonFile: (fileName?: string) => void;
  setImgFile: (fileName?: string) => void;
  setSearchTerm: (searchTerm?: string) => void;
}

export function NewHeatmapFormButtons({
  jsonFile,
  imgFile,
  searchTerm,
  setJsonFile,
  setImgFile,
  setSearchTerm,
}: NewHeatmapFormButtonsProperties) {
  const readyToSubmit = jsonFile && imgFile && searchTerm;

  return (
    <Center>
      <Group mt="xl">
        <Button type="submit" variant="filled" color="green" disabled={!readyToSubmit}>
          Criar mapa
        </Button>
        <Button
          type="reset"
          variant="outline"
          color="orange"
          onClick={() => {
            setJsonFile(undefined);
            setImgFile(undefined);
            setSearchTerm(undefined);
          }}
        >
          Limpar
        </Button>
      </Group>
    </Center>
  );
}
