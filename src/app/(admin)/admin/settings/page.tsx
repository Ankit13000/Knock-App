
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
import { Shield } from "lucide-react";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [minLength, setMinLength] = useState(8);
  const [requireUpper, setRequireUpper] = useState(true);
  const [requireNumber, setRequireNumber] = useState(true);
  const [requireSpecial, setRequireSpecial] = useState(false);

  const handleSavePolicy = () => {
    toast({
      title: "Policy Saved",
      description: "Password policy has been updated.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Admin Settings</h1>
        <p className="text-muted-foreground">Manage admin panel and app-wide settings.</p>
      </div>

      <Card className="max-w-2xl">
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
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authentication Settings
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
  );
}
