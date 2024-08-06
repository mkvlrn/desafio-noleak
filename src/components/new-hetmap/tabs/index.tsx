"use client";

import { Container, Tabs } from "@mantine/core";
import { IconLink, IconUpload } from "@tabler/icons-react";

export function NewHetmapTabs() {
  return (
    <Container size="xs">
      <Tabs defaultValue="upload" variant="outline" radius="md">
        <Tabs.List>
          <Tabs.Tab value="upload" leftSection={<IconUpload />}>
            upload de arquivos
          </Tabs.Tab>
          <Tabs.Tab value="links" leftSection={<IconLink />}>
            links para arquivos online
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="upload">Upload</Tabs.Panel>
        <Tabs.Panel value="links">Links</Tabs.Panel>
      </Tabs>
    </Container>
  );
}
