import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Link href="/settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="h-4 w-4" />
        Back to Settings
      </Link>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Privacy Policy</CardTitle>
              <CardDescription>How we handle your data.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="font-semibold">Last updated: {new Date().toLocaleDateString()}</p>
            <p>Your privacy is important to us. It is Knock Inc.'s policy to respect your privacy regarding any information we may collect from you across our application, Knock.</p>
            <h4 className="font-semibold">1. Information We Collect</h4>
            <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
            <h4 className="font-semibold">2. How We Use Your Information</h4>
            <p>We use the information we collect in various ways, including to provide, operate, and maintain our app, improve, personalize, and expand our app, and understand and analyze how you use our app.</p>
            <h4 className="font-semibold">3. Security</h4>
            <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
        </CardContent>
      </Card>
    </div>
  );
}
