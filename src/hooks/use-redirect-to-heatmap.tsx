import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UseRedirectToHeatmapProperties {
  state: {
    success?: boolean;
    hash?: string;
  };
}

export function useRedirectToHeatmap({ state }: UseRedirectToHeatmapProperties) {
  const router = useRouter();

  useEffect(() => {
    if (state.hash) {
      async function redirectToHeatmap() {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        router.push(`/heatmaps/${state.hash}`);
      }

      void redirectToHeatmap();
    }
  }, [state]);
}
