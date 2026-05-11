import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center px-6 py-10">
      <Card className="glass-panel w-full border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Choose a new password</CardTitle>
          <CardDescription>Use the secure token from your email to complete password reset.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-6">
          <Input type="password" placeholder="New password" minLength={12} />
          <Input type="password" placeholder="Confirm password" minLength={12} />
          <Button className="w-full">Update password</Button>
        </CardContent>
      </Card>
    </main>
  );
}
