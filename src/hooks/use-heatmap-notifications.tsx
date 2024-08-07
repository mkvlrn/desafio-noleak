import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconRocket } from "@tabler/icons-react";
import { useEffect } from "react";
import { CreateHeatmapFormState } from "~/actions/create-heatmap";

interface UseHeatmapNotificationsProperties {
  state: {
    errors: CreateHeatmapFormState["errors"];
    success?: boolean;
  };
  setJsonFile: (file: string | undefined) => void;
  setImgFile: (file: string | undefined) => void;
  setSearchTerm: (term: string) => void;
}

export function useHeatmapNotifications({
  state,
  setJsonFile,
  setImgFile,
  setSearchTerm,
}: UseHeatmapNotificationsProperties) {
  useEffect(() => {
    if (Object.keys(state.errors).length === 0) {
      if (state.success) {
        notifications.show({
          title: "Sucesso",
          message: "Heatmap gerado com sucesso - redirecionando em 5 segundos",
          color: "green",
          icon: <IconRocket size={16} />,
          autoClose: 5000,
        });

        setJsonFile(undefined);
        setImgFile(undefined);
        setSearchTerm("");
      }

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
          autoClose: 5000,
        });
      }
    }
  }, [state, setJsonFile, setImgFile, setSearchTerm]);
}
