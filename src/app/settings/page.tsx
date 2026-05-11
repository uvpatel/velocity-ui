import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 md:px-10 lg:px-12">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Account settings</h1>
        <p className="mt-2 text-muted-foreground">Profile, security, notifications, billing, and workspace preferences.</p>
      </div>

      <Card className="glass-panel border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your display name and notification email.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Display name" />
          <Input placeholder="Email address" type="email" />
          <div className="md:col-span-2">
            <Button>Save changes</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
