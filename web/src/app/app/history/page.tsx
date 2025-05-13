import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import HistoryTable from "./_components/history-page";

export default function History() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Histórico</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <HistoryTable />
      </DashboardPageMain>
    </DashboardPage>
  );
}
