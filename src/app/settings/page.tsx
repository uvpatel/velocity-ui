import { PageShell } from "@/components/site/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <PageShell className="max-w-5xl">
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
      <Card className="glass-panel border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage sessions, OAuth providers, and password recovery settings.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 pb-6 text-sm text-muted-foreground md:grid-cols-3">
          {["Email verification required", "GitHub OAuth enabled", "Google OAuth enabled"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-background/70 px-4 py-3">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
