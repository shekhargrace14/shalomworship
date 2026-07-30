'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { bottomNavItems } from './nav-items';
import { cn } from '@/lib/utils';

export default function NavBottom() {
  const pathname = usePathname();

  return (
    <nav
      className="
    fixed 
    inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/70 
    md:hidden
    "
    >
      {/* <nav className="flex"> */}
      <div
        className="grid h-16 "
        style={{
          gridTemplateColumns: `repeat(${bottomNavItems.length}, minmax(0,1fr))`,
        }}
      >
        {bottomNavItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} className={cn('flex flex-col items-center justify-center gap-1 text-xs transition-colors', active ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}>
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
