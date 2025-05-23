import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, RocketIcon, TableConfigIcon } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
type UserDropdownProps = {
  user: Session["user"];
};

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  if (!user) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="relative h-8 flex max-w-full w-full space-x-3 !px-0"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
            <AvatarFallback>
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 space-y-1 text-left">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {user.name && (
              <p className="text-sm font-medium leading-none">{user.name}</p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/app/settings")}>
            <TableConfigIcon className="w-4 h-4 mr-3" />
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RocketIcon className="w-4 h-4 mr-3" />
            Upgrade
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon className="w-4 h-4 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
