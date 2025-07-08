import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  href?: string;
};

export function StatCard({ title, value, icon: Icon, change, href }: StatCardProps) {
  const cardElement = (
    <Card className={cn(
      "transition-colors",
      href && "hover:bg-secondary hover:shadow-lg cursor-pointer"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href}>
        {cardElement}
      </Link>
    );
  }

  return cardElement;
}
