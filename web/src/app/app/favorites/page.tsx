import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import FavoritesTable from "./_components/favorites-page";

export default function Favorites() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Favoritas</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <FavoritesTable />
      </DashboardPageMain>
    </DashboardPage>
  );
}
