import { Group, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconImageInPicture, IconJson, IconUpload, IconX } from "@tabler/icons-react";
import { NewHeatmapFormFileInstructions } from "~/components/new-hetmap-form/file-instructions";

interface NewHeatmapFormDragJsonProperties {
  type: "json" | "img";
  setFile: (file: string) => void;
}

const fileTypes = {
  json: {
    accept: { "application/json": [".json"] },
    icon: (
      <IconJson
        style={{ width: rem(52), height: rem(52), color: "grey" }}
        stroke={1.5}
      />
    ),
  },
  img: {
    accept: IMAGE_MIME_TYPE,
    icon: (
      <IconImageInPicture
        style={{ width: rem(52), height: rem(52), color: "grey" }}
        stroke={1.5}
      />
    ),
  },
};

export function NewHeatmapFormDrag({
  type,
  setFile: setJsonData,
}: NewHeatmapFormDragJsonProperties) {
  function attachFile(files: File[]) {
    if (files.length > 0) {
      setJsonData(files[0].name);
    }
  }

  return (
    <Dropzone
      onDrop={attachFile}
      accept={fileTypes[type].accept}
      style={{ cursor: "pointer" }}
    >
      <Group justify="center" gap="xl" style={{ pointerEvents: "none" }}>
        <Dropzone.Idle>{fileTypes[type].icon}</Dropzone.Idle>

        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: "green" }}
            stroke={1.5}
          />
        </Dropzone.Accept>

        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: "red" }}
            stroke={1.5}
          />
        </Dropzone.Reject>

        <NewHeatmapFormFileInstructions type={type} />
      </Group>
    </Dropzone>
  );
}
