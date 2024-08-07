"use client";

import { Box, Center, Container, Paper, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { useFormState } from "react-dom";
import { createHeatmap } from "~/actions";
import { NewHeatmapFormButtons } from "~/components/new-hetmap-form/buttons";
import { NewHeatmapFormDrag } from "~/components/new-hetmap-form/file-drag";
import { NewHeatmapFormFileStatus } from "~/components/new-hetmap-form/file-status";
import { LoadingOverlay } from "~/components/new-hetmap-form/loading-overlay";
import { useHeatmapNotifications } from "~/hooks/use-heatmap-notifications";

export function NewHetmapForm() {
  const [jsonFile, setJsonFile] = useState<string | undefined>();
  const [imgFile, setImgFile] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [state, createHeatmapAction] = useFormState(createHeatmap, { errors: {} });

  useHeatmapNotifications({
    state,
    setJsonFile,
    setImgFile,
    setSearchTerm,
  });

  return (
    <form action={createHeatmapAction}>
      <Box pos="relative">
        <LoadingOverlay />
        <Container size="sm" my={30}>
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
              value={searchTerm}
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
        </Container>
      </Box>
    </form>
  );
}
