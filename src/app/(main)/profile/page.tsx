import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockUser } from '@/lib/mock-data';
import { Edit, Gamepad2, LogOut, ShieldCheck, Trophy, Wallet } from 'lucide-react';

const stats = [
  { icon: Gamepad2, label: 'Total Games', value: mockUser.totalGames },
  { icon: Trophy, label: 'Wins', value: mockUser.wins },
  { icon: Wallet, label: 'Total Earned', value: `₹${mockUser.totalEarned.toLocaleString()}`},
];

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
       <div>
        <h1 className="text-3xl font-bold tracking-tighter">My Profile</h1>
        <p className="text-muted-foreground">View and manage your account details.</p>
      </div>

      <Card>
        <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="text-3xl">{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{mockUser.name}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Verified Player
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center my-6">
                {stats.map(stat => (
                    <div key={stat.label} className="p-4 bg-card rounded-lg">
                        <stat.icon className="w-8 h-8 mx-auto text-primary mb-2" />
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col sm:flex-row gap-4">
                <Button className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
                <Button variant="destructive" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
