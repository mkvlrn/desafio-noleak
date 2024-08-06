import { NewHetmapForm } from "~/components/new-hetmap-form";
import { PageTitle } from "~/components/page-title";

export default function Home() {
  return (
    <>
      <PageTitle title="Novo Hetmap" />
      <NewHetmapForm />
    </>
  );
}
