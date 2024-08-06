"use client";

import { Center, Container, Paper, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { NewHeatmapFormButtons } from "~/components/new-hetmap-form/buttons";
import { NewHeatmapFormDrag } from "~/components/new-hetmap-form/file-drag";
import { NewHeatmapFormFileStatus } from "~/components/new-hetmap-form/file-status";

export function NewHetmapForm() {
  const [jsonFile, setJsonFile] = useState<string | undefined>();
  const [imgFile, setImgFile] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  return (
    <Container size="sm" my={30}>
      <form>
        <input
          name="json-data"
          type="file"
          accept=".json"
          style={{ display: "none" }}
          onChange={(event) => {
            setJsonFile(event.target.files?.[0]?.name);
          }}
        />
        <input
          name="img-data"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(event) => {
            setImgFile(event.target.files?.[0]?.name);
          }}
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
