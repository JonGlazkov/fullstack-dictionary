'use client'
import {
  DashboardSidebarContainer,
  DashboardSidebarFooter,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavHeader,
  DashboardSidebarNavHeaderTitle,
  DashboardSidebarNavLink,
  DashboardSidebarNavMain,
} from '@/components/dashboard/sidebar'
import { Logo } from '@/components/logo'
import { BookMarked, BookOpen, HistoryIcon } from 'lucide-react'
import { Session } from 'next-auth'
import { usePathname } from 'next/navigation'
import { UserDropdown } from './user-dropdown'

type MainSidebarProps = {
  user: Session['user']
}

export function MainSidebar({ user }: MainSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <DashboardSidebarContainer>
      <DashboardSidebarHeader>
        <Logo />
      </DashboardSidebarHeader>
      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/app" active={isActive('/app')}>
              <BookOpen className="w-4 h-4 mr-4" />
              Palavras
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app/favorites"
              active={isActive('/app/favorites')}
            >
              <BookMarked className="w-4 h-4 mr-4" />
              Favoritadas
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app/history"
              active={isActive('/app/history')}
            >
              <HistoryIcon className="w-4 h-4 mr-4" />
              Histórico
            </DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>

        <DashboardSidebarNav className="mt-auto">
          <DashboardSidebarNavHeader>
            <DashboardSidebarNavHeaderTitle>
              Links extras
            </DashboardSidebarNavHeaderTitle>
          </DashboardSidebarNavHeader>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/">
              Precisa de ajuda?
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/">Site</DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>

      <DashboardSidebarFooter>
        <UserDropdown user={user} />
      </DashboardSidebarFooter>
    </DashboardSidebarContainer>
  )
}