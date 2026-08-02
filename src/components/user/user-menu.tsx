'use client';

import Link from 'next/link';
import { User, LogOut, LogIn, UserPlus, ListMusic, Settings, ChevronDown, TvMinimal } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logout } from '@/lib/auth/logout';
import { AuthDailog } from '../auth/auth-dailog';
import { ModeToggle } from '../ModeToggle';

type UserMenuProps = {
  user?: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  } | null;
};

export default function UserMenu({ user }: UserMenuProps) {
  const isLoggedIn = !!user;
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.refresh;
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'GU';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full  transition hover:bg-accent cursor-pointer">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.image ?? ''} />
            <AvatarFallback className="bg-primary text-black">{initials}</AvatarFallback>
          </Avatar>

          {/* <ChevronDown className="h-4 w-4 text-muted-foreground" /> */}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-semibold">{user?.name}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/user/profile">
                  <User className="mr-2 h-4 w-4 text-primary" />
                  My Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/user/setlist">
                  <ListMusic className="mr-2 h-4 w-4 text-primary" />
                  My Setlists
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/user/channel">
                  <TvMinimal className="mr-2 h-4 w-4 text-primary" />
                  My Channels
                </Link>
              </DropdownMenuItem>

              {/* <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <Settings className="mr-2 h-4 w-4 text-primary" />
                  Dashboard
                </Link>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <ModeToggle />
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 text-primary" />
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>Welcome 👋</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/auth/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
              {/* <AuthDailog/> */}
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/auth/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Create Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuGroup>
              <ModeToggle />
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
