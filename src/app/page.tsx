import { NewHetmapTabs } from "~/components/new-hetmap/tabs";
import { PageTitle } from "~/components/page-title";

export default function Home() {
  return (
    <>
      <PageTitle title="Novo Hetmap" />
      <NewHetmapTabs />
    </>
  );
}
