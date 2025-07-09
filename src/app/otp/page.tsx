'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck } from 'lucide-react';

function OtpPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  const mobileNumber = searchParams.get('mobile');

  useEffect(() => {
    if (!mobileNumber) {
      // Redirect if mobile number is not present
      router.push('/signup');
    }
  }, [mobileNumber, router]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      if (otp === '123456') {
        toast({
          title: 'Account Created!',
          description: 'Welcome to Knock! Redirecting you now...',
        });
        // In a real app, you'd create a user account here using the data from localStorage
        try {
            localStorage.removeItem('signupData'); 
        } catch (error) {
            console.error("Could not remove signup data from local storage", error);
        }
        router.push('/home');
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid OTP',
          description: 'The OTP you entered is incorrect. Please try again.',
        });
        setIsLoading(false);
      }
    }, 1000);
  };
  
  const handleResendOtp = async () => {
      setIsResending(true);
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsResending(false);
      
      toast({
        title: 'OTP Resent!',
        description: `A new 6-digit code has been sent to ${mobileNumber}. (Hint: it's 123456)`,
      });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-grid-pattern p-4">
      <Card className="w-full max-w-md shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-3xl font-bold tracking-tighter">Verify Your Number</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to <br />
            <span className="font-semibold text-foreground">{mobileNumber}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password</Label>
              <Input
                id="otp"
                type="tel"
                placeholder="••••••"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                autoFocus
                className="text-center text-2xl tracking-[0.5em]"
              />
            </div>

            <Button type="submit" className="w-full btn-gradient" disabled={isLoading || otp.length !== 6}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Button>
          </form>
          
          <div className="text-center text-sm text-muted-foreground">
            Didn't receive the code?{' '}
            <Button
                variant="link"
                className="p-0 h-auto text-primary"
                onClick={handleResendOtp}
                disabled={isResending}
            >
                {isResending ? 'Resending...' : 'Resend OTP'}
            </Button>
          </div>

           <div className="text-center">
                <Link href="/signup" className="text-sm text-muted-foreground underline">
                    Change mobile number
                </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function OtpPage() {
    return (
        <Suspense fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }>
            <OtpPageContent />
        </Suspense>
    )
}
