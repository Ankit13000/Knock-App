'use client';

import Link from 'next/link';
import { Zap, LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M21.35 11.1h-9.2v2.8h5.3c-.2 1.9-1.2 3.4-2.9 4.5v2.3h3c1.8-1.6 2.8-4.1 2.8-6.8 0-.6-.1-1.2-.2-1.8z"/>
        <path fill="#34A853" d="M12.15 22c2.4 0 4.5-1.1 6-2.9l-3-2.3c-.8.6-1.8.9-2.9.9-2.2 0-4.1-1.5-4.8-3.5H3.05v2.4c1.4 2.8 4.3 4.8 7.1 4.8z"/>
        <path fill="#FBBC05" d="M7.35 14.2c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V8.2H3.05c-.8 1.6-1.3 3.4-1.3 5.4s.5 3.8 1.3 5.4l4.3-3.6z"/>
        <path fill="#EA4335" d="M12.15 6.4c1.3 0 2.5.5 3.4 1.4l2.6-2.6C16.6 3.2 14.5 2 12.15 2 9.35 2 6.45 4 5.05 6.8l4.3 3.5c.7-2 2.6-3.5 4.8-3.5z"/>
    </svg>
);


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(mobileNumber)) {
      toast({
        variant: 'destructive',
        title: 'Invalid Mobile Number',
        description: 'Please enter a valid 10-digit mobile number.',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call to validate credentials and send OTP
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'OTP Sent!',
      description: `A 6-digit code has been sent to ${mobileNumber}.`,
    });
    
    router.push(`/otp?mobile=${mobileNumber}`);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-grid-pattern p-4">
      <Card className="w-full max-w-md shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <Zap className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-3xl font-bold tracking-tighter">Welcome Back!</CardTitle>
          <CardDescription>Enter your credentials to receive a login OTP.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="mobile-number">Mobile Number</Label>
                <Input id="mobile-number" type="tel" placeholder="Your 10-digit mobile number" required value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
            </div>
            <Button type="submit" className="w-full btn-gradient" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Sending OTP...' : 'Login with OTP'}
            </Button>
          </form>
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
             <p className="text-sm text-muted-foreground">
                Don't have an account? <Link href="/signup" className="underline text-primary">Sign Up</Link>
            </p>
             <p className="text-sm text-muted-foreground">
                <Link href="/home" className="underline">Continue as Guest</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
