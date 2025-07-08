import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ShieldQuestion } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Link href="/settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="h-4 w-4" />
        Back to Settings
      </Link>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <ShieldQuestion className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Terms & Conditions</CardTitle>
              <CardDescription>The legal agreement between you and Knock.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="font-semibold">Last updated: {new Date().toLocaleDateString()}</p>
            <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Knock mobile application (the "Service") operated by Knock Inc. ("us", "we", or "our").</p>
            <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>
            <h4 className="font-semibold">1. Accounts</h4>
            <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
            <h4 className="font-semibold">2. Intellectual Property</h4>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Knock Inc. and its licensors.</p>
            <h4 className="font-semibold">3. Termination</h4>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        </CardContent>
      </Card>
    </div>
  );
}
