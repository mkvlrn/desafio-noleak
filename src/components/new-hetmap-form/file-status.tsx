import { ActionIcon, Badge, Center, Group } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface NewHeatmapFormFileStatusProperties {
  type: "json" | "img";
  fileName?: string;
  setFile: (fileName?: string) => void;
}

export function NewHeatmapFormFileStatus({
  fileName,
  setFile,
}: NewHeatmapFormFileStatusProperties) {
  return (
    <>
      {fileName && (
        <Center>
          <Group mt="sm">
            <Badge leftSection={<IconCheck size={16} />} color="green" size="sm">
              {fileName}
            </Badge>
            <ActionIcon
              variant="filled"
              color="red"
              onClick={() => {
                setFile(undefined);
              }}
              size="xs"
            >
              <IconX size={16} />
            </ActionIcon>
          </Group>
        </Center>
      )}
    </>
  );
}
