import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, FileText, LifeBuoy, MessageSquareWarning, Receipt, Shield, ShieldQuestion } from 'lucide-react';

const settingsItems = [
  { icon: FileText, label: 'Game Rules', href: '/settings/game-rules' },
  { icon: ShieldQuestion, label: 'Terms & Conditions', href: '/settings/terms' },
  { icon: Shield, label: 'Privacy Policy', href: '/settings/privacy' },
  { icon: Receipt, label: 'Payment Policy', href: '/settings/refund' },
  { icon: LifeBuoy, label: 'Contact Support', href: '/settings/support' },
  { icon: MessageSquareWarning, label: 'Report a Bug', href: '/settings/report-bug' },
];

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
       <Link href="/home" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft className="h-4 w-4" />
          Back to home
        </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Settings & Help</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {settingsItems.map(item => (
              <Link href={item.href} key={item.label}>
                <div className="flex items-center justify-between rounded-md p-3 transition-colors hover:bg-secondary">
                  <div className="flex items-center gap-4">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>App Version: 1.0.0</p>
            <p>Knock © 2024</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
