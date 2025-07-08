import Link from 'next/link';
import { Zap, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M21.35 11.1h-9.2v2.8h5.3c-.2 1.9-1.2 3.4-2.9 4.5v2.3h3c1.8-1.6 2.8-4.1 2.8-6.8 0-.6-.1-1.2-.2-1.8z"/>
        <path fill="#34A853" d="M12.15 22c2.4 0 4.5-1.1 6-2.9l-3-2.3c-.8.6-1.8.9-2.9.9-2.2 0-4.1-1.5-4.8-3.5H3.05v2.4c1.4 2.8 4.3 4.8 7.1 4.8z"/>
        <path fill="#FBBC05" d="M7.35 14.2c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V8.2H3.05c-.8 1.6-1.3 3.4-1.3 5.4s.5 3.8 1.3 5.4l4.3-3.6z"/>
        <path fill="#EA4335" d="M12.15 6.4c1.3 0 2.5.5 3.4 1.4l2.6-2.6C16.6 3.2 14.5 2 12.15 2 9.35 2 6.45 4 5.05 6.8l4.3 3.5c.7-2 2.6-3.5 4.8-3.5z"/>
    </svg>
);


export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-grid-pattern p-4">
      <Card className="w-full max-w-md shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <Zap className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-3xl font-bold tracking-tighter">Get Started with Knock</CardTitle>
          <CardDescription>Enter your details to join the competition.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email or Mobile Number</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon">Coupon Code (Optional)</Label>
              <Input id="coupon" placeholder="Have a referral code?" />
            </div>
            <Link href="/home" className="w-full">
                <Button className="w-full btn-gradient">
                    <Mail className="mr-2 h-4 w-4" /> Continue with Email
                </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>
          <Button variant="outline" className="w-full">
            <GoogleIcon />
            <span className="ml-2">Sign in with Google</span>
          </Button>

          <div className="space-y-2 text-center">
            <div className="flex items-center space-x-2 justify-center">
                <Checkbox id="terms" required />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                >
                    I agree to the <Link href="#" className="underline text-primary">Terms & Conditions</Link>
                </label>
            </div>
             <p className="text-sm text-muted-foreground">
                <Link href="/home" className="underline">Continue as Guest</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
