import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import WordsTable from "./_components/words-page";

export default async function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Palavras</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <WordsTable />
      </DashboardPageMain>
    </DashboardPage>
  );
}
