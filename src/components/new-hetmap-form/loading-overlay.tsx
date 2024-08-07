import { LoadingOverlay as Overlay } from "@mantine/core";
import { useFormStatus } from "react-dom";

export function LoadingOverlay() {
  const { pending } = useFormStatus();

  return (
    <Overlay visible={pending} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
  );
}
