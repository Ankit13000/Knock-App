import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, MessageSquareWarning, Bug } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ReportBugPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Link href="/settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="h-4 w-4" />
        Back to Settings
      </Link>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <MessageSquareWarning className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Report a Bug</CardTitle>
              <CardDescription>Help us improve by reporting any bugs you find.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bug-location">Where did you find the bug?</Label>
              <Input id="bug-location" placeholder="e.g., Wallet page, a specific game" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bug-description">Bug Description</Label>
              <Textarea id="bug-description" placeholder="Please describe the bug and the steps to reproduce it." rows={5} />
            </div>
            <Button className="w-full btn-gradient">
                <Bug className="mr-2 h-4 w-4" /> Submit Report
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
