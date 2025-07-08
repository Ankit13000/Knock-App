'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const RazorpayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 283.5" className="h-8 w-8">
        <path d="M219.8,98.5H163V94.9c0-1.2,0.9-2,2-2h45.2c1.2,0,2-0.9,2-2V73.4c0-1.2-0.9-2-2-2h-45.2c-1.2,0-2-0.9-2-2V30.1 c0-1.2-0.9-2-2-2H118c-1.2,0-2,0.9-2,2v41.2H64.9c-1.2,0-2,0.9-2,2v17.5c0,1.2,0.9,2,2,2H116v1.4L40.6,183.3c-1.1,1.4-0.3,3.5,1.5,3.5 h51.6v45.1c0,1.2,0.9,2,2,2h45.2c1.2,0,2-0.9,2-2v-45.1h45.2c1.2,0,2-0.9,2-2v-18.7c0-1.2-0.9-2-2-2h-45.2v-3.7l69.7-87.1 c1-1.2,0.1-3.2-1.4-3.2h-48.4V98.5z" fill="#528FF0"/>
    </svg>
);

const StripeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="h-8 w-8">
        <path d="M57,8H7A4,4,0,0,0,3,12V52a4,4,0,0,0,4,4H57a4,4,0,0,0,4-4V12A4,4,0,0,0,57,8ZM24,47a4,4,0,0,1-4,4H12a4,4,0,0,1-4-4V42a4,4,0,0,1,4-4h8a4,4,0,0,1,4,4Zm0-14a4,4,0,0,1-4,4H12a4,4,0,0,1-4-4V28a4,4,0,0,1,4-4h8a4,4,0,0,1,4,4ZM53,42a5,5,0,0,1-5,5H34a1,1,0,0,1,0-2h9.2a3,3,0,1,0,0-6H36a5,5,0,0,1-5-5V27a5,5,0,0,1,5-5h9.4a1,1,0,0,1,0,2H38.8a3,3,0,1,0,0,6H48a5,5,0,0,1,5,5Z" fill="#6772E5"/>
    </svg>
);


export default function IntegrationsPage() {
    const [razorpayEnabled, setRazorpayEnabled] = useState(true);
    const [razorpayKey, setRazorpayKey] = useState('rzp_test_1234567890ABCD');
    const [stripeEnabled, setStripeEnabled] = useState(false);
    const [stripeKey, setStripeKey] = useState('');
    const { toast } = useToast();

    const handleSave = (gateway: string) => {
        toast({
            title: 'Settings Saved',
            description: `${gateway} settings have been updated.`,
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tighter">Payment Integrations</h1>
                <p className="text-muted-foreground">Connect and manage your payment gateways.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <RazorpayIcon />
                                <CardTitle>Razorpay</CardTitle>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="razorpay-enabled"
                                    checked={razorpayEnabled}
                                    onCheckedChange={setRazorpayEnabled}
                                />
                                <Label htmlFor="razorpay-enabled">Enabled</Label>
                            </div>
                        </div>
                        <CardDescription>
                            Popular in India, supports UPI, Cards, Netbanking, and Wallets.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="razorpay-key">Key ID</Label>
                            <Input 
                                id="razorpay-key" 
                                value={razorpayKey} 
                                onChange={(e) => setRazorpayKey(e.target.value)} 
                                placeholder="Enter your Razorpay Key ID"
                                disabled={!razorpayEnabled}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="razorpay-secret">Key Secret</Label>
                            <Input 
                                id="razorpay-secret"
                                type="password"
                                value="••••••••••••••••"
                                placeholder="Enter your Razorpay Key Secret"
                                disabled={!razorpayEnabled}
                                readOnly
                            />
                        </div>
                        <Button className="w-full" onClick={() => handleSave('Razorpay')} disabled={!razorpayEnabled}>
                            Save Razorpay Settings
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                     <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <StripeIcon />
                                <CardTitle>Stripe</CardTitle>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="stripe-enabled"
                                    checked={stripeEnabled}
                                    onCheckedChange={setStripeEnabled}
                                />
                                <Label htmlFor="stripe-enabled">Enabled</Label>
                            </div>
                        </div>
                        <CardDescription>
                            Global leader in online payments, supports a wide range of cards.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="stripe-key">Publishable Key</Label>
                            <Input 
                                id="stripe-key" 
                                value={stripeKey}
                                onChange={(e) => setStripeKey(e.target.value)}
                                placeholder="Enter your Stripe Publishable Key"
                                disabled={!stripeEnabled}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stripe-secret">Secret Key</Label>
                            <Input 
                                id="stripe-secret"
                                type="password"
                                value={stripeEnabled ? '' : '••••••••••••••••'}
                                placeholder="Enter your Stripe Secret Key"
                                disabled={!stripeEnabled}
                            />
                        </div>
                        <Button className="w-full" onClick={() => handleSave('Stripe')} disabled={!stripeEnabled}>
                            {stripeEnabled && !stripeKey ? 'Connect Stripe' : 'Save Stripe Settings'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
