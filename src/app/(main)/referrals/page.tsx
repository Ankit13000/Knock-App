'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Copy, Gift, Share2 } from 'lucide-react';

export default function ReferralsPage() {
    const { user } = useUser();
    const { toast } = useToast();

    if (!user) {
      return null; // Handled by UserProvider
    }

    // Generate a mock referral code
    const referralCode = `${user.name.split(' ').join('').toUpperCase().slice(0, 5)}-${new Date().getFullYear()}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        toast({
            title: 'Copied!',
            description: 'Referral code copied to clipboard.',
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Join me on Knock!',
                text: `I'm inviting you to join Knock, a cool gaming app. Use my code ${referralCode} to sign up and get a bonus!`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support Web Share API
            handleCopy();
            toast({
                title: 'Share this link!',
                description: 'Sharing is not supported on this browser. Code copied instead.',
            });
        }
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tighter">Refer & Earn</h1>
                <p className="text-muted-foreground">Invite friends and get rewards when they join.</p>
            </div>

            <Card className="text-center bg-gradient-to-br from-primary/10 to-accent/10">
                <CardHeader>
                    <Gift className="w-16 h-16 mx-auto text-primary" />
                    <CardTitle className="text-2xl">Invite Your Friends!</CardTitle>
                    <CardDescription>
                        You and your friend will both get <span className="font-bold text-primary">₹50</span> when they play their first game.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground">Share your unique referral code:</p>
                    <div className="flex items-center gap-2 max-w-sm mx-auto">
                        <Input 
                            readOnly 
                            value={referralCode} 
                            className="text-center font-mono text-lg tracking-widest border-dashed" 
                        />
                        <Button size="icon" variant="outline" onClick={handleCopy}>
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                    <Button size="lg" className="w-full max-w-sm mx-auto btn-gradient" onClick={handleShare}>
                        <Share2 className="mr-2 h-5 w-5" /> Share Your Code
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your Referrals</CardTitle>
                    <CardDescription>Track the status of your invitations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                        <p>You haven't referred anyone yet.</p>
                        <p className="text-sm">Start sharing your code to see your referrals here!</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
