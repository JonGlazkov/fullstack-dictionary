import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export default async function Page() {
  // const todos = await getUserTodos()

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Palavras</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
            <Button variant="outline" size="sm">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add todo
            </Button>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <h1>Palavras</h1>
        {/* <TodoDataTable data={todos} /> */}
      </DashboardPageMain>
    </DashboardPage>
  )
}