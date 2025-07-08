import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Receipt } from 'lucide-react';

export default function PaymentPolicyPage() {
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
              <CardTitle className="text-2xl">Payment Policy</CardTitle>
              <CardDescription>Our policies regarding payments, entry fees, and withdrawals.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="font-semibold">Last updated: {new Date().toLocaleDateString()}</p>
            <h4 className="font-semibold">1. Deposits</h4>
            <p>You can add funds to your wallet using various payment methods. All transactions are securely processed. The deposited amount will reflect in your wallet balance immediately.</p>
            <h4 className="font-semibold">2. Entry Fees</h4>
            <p>Entry fees for competitions are deducted from your wallet balance. Entry fees are generally non-refundable once a competition has started, as they are pooled into the prize for the winner(s).</p>
            <h4 className="font-semibold">3. Winnings</h4>
            <p>Winnings from competitions are credited directly to your in-app wallet. You can use these funds for future games or withdraw them.</p>
            <h4 className="font-semibold">4. Withdrawals</h4>
            <p>You can request to withdraw funds from your wallet to your bank account. Withdrawals are processed and may take 2-3 business days to reflect in your account. Minimum withdrawal amounts may apply.</p>
            <h4 className="font-semibold">5. Refunds</h4>
            <p>If a competition is cancelled by us, entry fees will be refunded in full. If you experience a verified technical issue on our end, we may issue a refund at our discretion. Please contact support for assistance.</p>
        </CardContent>
      </Card>
    </div>
  );
}
