'use client'

import Link from 'next/link';
import { PlusCircle, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/context/UserContext';
import { getInitials } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export function AppHeader() {
  const { user, loading } = useUser();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:relative md:h-auto md:border-none md:bg-transparent md:px-0 md:pt-4">
      <div className="flex items-center gap-2 md:hidden">
        {/* Mobile Title or Logo if needed */}
      </div>
      <div className="flex w-full items-center justify-end gap-4">
        {loading ? (
          <Skeleton className="h-12 w-40 rounded-full" />
        ) : user ? (
          <div className="flex items-center gap-3 rounded-full border bg-card p-1 pr-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold tracking-tighter">
              ₹{user.walletBalance.toFixed(2)}
            </span>
            <Link href="/wallet">
              <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full text-primary hover:bg-primary/10 hover:text-primary">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        ) : (
           <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
        )}

        {loading ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : user ? (
          <Link href="/profile">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src={user.avatar || undefined} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </Link>
        ) : null}
      </div>
    </header>
  );
}
