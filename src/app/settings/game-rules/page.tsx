import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, FileText } from 'lucide-react';

export default function GameRulesPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Link href="/settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="h-4 w-4" />
        Back to Settings
      </Link>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Game Rules</CardTitle>
              <CardDescription>General rules for all competitions.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Welcome to Knock! To ensure a fair and enjoyable experience for everyone, please adhere to the following rules:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All games are skill-based. The outcome depends on your ability, not chance.</li>
            <li>One account per player. Multiple accounts are not permitted and will result in a ban.</li>
            <li>Entry fees are non-refundable once a competition has started.</li>
            <li>Winnings are credited to your in-app wallet and can be withdrawn according to our withdrawal policy.</li>
            <li>Any form of cheating, hacking, or exploiting bugs will result in immediate disqualification and account suspension.</li>
            <li>In case of a tie, the prize pool will be split equally among the tied players unless specified otherwise in the competition details.</li>
            <li>Decisions made by the Knock administration are final.</li>
          </ul>
          <p>Specific rules for each game type can be found on the respective competition detail pages.</p>
        </CardContent>
      </Card>
    </div>
  );
}
