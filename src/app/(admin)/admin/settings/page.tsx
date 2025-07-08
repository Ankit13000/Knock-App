
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/admin/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Shield, KeyRound } from "lucide-react";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  
  // Password Policy State
  const [minLength, setMinLength] = useState(8);
  const [requireUpper, setRequireUpper] = useState(true);
  const [requireNumber, setRequireNumber] = useState(true);
  const [requireSpecial, setRequireSpecial] = useState(false);

  // Admin Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSavePolicy = () => {
    toast({
      title: "Policy Saved",
      description: "User password policy has been updated.",
    });
  };

  const handleSavePassword = () => {
    if (!newPassword || !confirmPassword || !currentPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all password fields.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "New passwords do not match.",
        });
        return;
    }
    if (newPassword.length < 8) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "New password must be at least 8 characters long.",
        });
        return;
    }
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    // Reset fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Admin Settings</h1>
        <p className="text-muted-foreground">Manage admin panel and app-wide settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the admin panel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                        <Label htmlFor="theme-toggle" className="font-semibold">Theme</Label>
                        <p className="text-sm text-muted-foreground">Select a light, dark, or system theme.</p>
                        </div>
                        <ThemeToggle />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <KeyRound className="h-5 w-5" />
                    Admin Password
                </CardTitle>
                <CardDescription>
                    Update the password for your admin account.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        />
                    </div>
                    <Button onClick={handleSavePassword} className="w-full sm:w-auto">
                        Update Password
                    </Button>
                </CardContent>
            </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              User Password Policy
            </CardTitle>
            <CardDescription>
              Define the password policy for all user accounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="min-length">Minimum Password Length</Label>
              <Input 
                id="min-length" 
                type="number" 
                value={minLength} 
                onChange={(e) => setMinLength(Number(e.target.value))} 
                className="mt-2 w-24"
              />
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="require-upper" 
                  checked={requireUpper}
                  onCheckedChange={(checked) => setRequireUpper(Boolean(checked))}
                />
                <Label htmlFor="require-upper" className="font-normal cursor-pointer">
                  Require at least one uppercase letter (A-Z)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="require-number"
                  checked={requireNumber}
                  onCheckedChange={(checked) => setRequireNumber(Boolean(checked))}
                />
                <Label htmlFor="require-number" className="font-normal cursor-pointer">
                  Require at least one number (0-9)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="require-special"
                  checked={requireSpecial}
                  onCheckedChange={(checked) => setRequireSpecial(Boolean(checked))}
                />
                <Label htmlFor="require-special" className="font-normal cursor-pointer">
                  Require at least one special character (!, @, #, etc.)
                </Label>
              </div>
            </div>
            <Button onClick={handleSavePolicy} className="w-full sm:w-auto">
              Save Password Policy
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
