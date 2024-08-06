"use client";

import { Center, Container, Paper, Text, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconRocket } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { createHeatmap } from "~/actions";
import { CreateHeatmapFormState } from "~/actions/create-heatmap";
import { NewHeatmapFormButtons } from "~/components/new-hetmap-form/buttons";
import { NewHeatmapFormDrag } from "~/components/new-hetmap-form/file-drag";
import { NewHeatmapFormFileStatus } from "~/components/new-hetmap-form/file-status";

export function NewHetmapForm() {
  const [jsonFile, setJsonFile] = useState<string | undefined>();
  const [imgFile, setImgFile] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [state, createHeatmapAction] = useFormState(createHeatmap, { errors: {} });

  useEffect(() => {
    console.log(state);
    if (Object.keys(state.errors).length === 0) {
      if (state.success) {
        notifications.show({
          title: "Sucesso",
          message: "Heatmap gerado com sucesso",
          color: "green",
          icon: <IconRocket size={16} />,
        });
      }

      setJsonFile(undefined);
      setImgFile(undefined);
      setSearchTerm("");

      return;
    }

    for (const key in state.errors) {
      const typedKey = key as keyof CreateHeatmapFormState["errors"];

      for (const error of state.errors[typedKey] ?? []) {
        notifications.show({
          title: "Erro",
          message: error,
          color: "red",
          icon: <IconAlertCircle size={16} />,
        });
      }
    }
  }, [state]);

  return (
    <Container size="sm" my={30}>
      <form action={createHeatmapAction}>
        <input
          name="json-data"
          type="file"
          accept=".json"
          style={{ display: "none" }}
        />
        <input
          name="img-data"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />

        <Paper withBorder shadow="md" p={10} radius="md" mt="xl">
          <NewHeatmapFormDrag type="json" setFile={setJsonFile} />
          <NewHeatmapFormFileStatus
            type="json"
            fileName={jsonFile}
            setFile={setJsonFile}
          />
        </Paper>

        <Paper withBorder shadow="md" p={10} radius="md" mt="xl">
          <NewHeatmapFormDrag type="img" setFile={setImgFile} />
          <NewHeatmapFormFileStatus
            type="img"
            fileName={imgFile}
            setFile={setImgFile}
          />
        </Paper>

        <Paper withBorder shadow="md" p={10} radius="md" mt="xl">
          <Center mb="sm">
            <Text size="xl" inline>
              Termo de pesquisa
            </Text>
          </Center>
          <TextInput
            name="search-term"
            placeholder="person"
            defaultValue={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </Paper>

        <NewHeatmapFormButtons
          jsonFile={jsonFile}
          imgFile={imgFile}
          searchTerm={searchTerm}
          setJsonFile={setJsonFile}
          setImgFile={setImgFile}
          setSearchTerm={setSearchTerm}
        />
      </form>
    </Container>
  );
}
