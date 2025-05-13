import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'

export default async function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Dicionário</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <h1>Dicionário</h1>
      </DashboardPageMain>
    </DashboardPage>
  )
}