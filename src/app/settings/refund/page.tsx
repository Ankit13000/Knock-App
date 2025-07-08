import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Receipt } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Link href="/settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="h-4 w-4" />
        Back to Settings
      </Link>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Receipt className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Refund Policy</CardTitle>
              <CardDescription>Our policy on refunds for entry fees.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-semibold">Last updated: {new Date().toLocaleDateString()}</p>
          <h4 className="font-semibold">1. Entry Fees</h4>
          <p>Entry fees for competitions are generally non-refundable once the competition has started. This is because your entry fee is immediately pooled into the prize for the winner(s).</p>
          <h4 className="font-semibold">2. Cancellations</h4>
          <p>If a competition is cancelled by us for any reason, all entry fees for that competition will be refunded to the players' wallets in full.</p>
          <h4 className="font-semibold">3. Technical Issues</h4>
          <p>If you are unable to complete a game due to a verified technical issue on our end, we will review the case and may issue a refund at our discretion. Please contact support with details of the issue.</p>
           <h4 className="font-semibold">4. Withdrawing Funds</h4>
          <p>Refunds of deposited funds that have not been used as entry fees are subject to review. Please see our wallet withdrawal policy for more information.</p>
        </CardContent>
      </Card>
    </div>
  );
}
