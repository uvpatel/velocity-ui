import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center px-6 py-10">
      <Card className="glass-panel w-full border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Use email/password or OAuth to access your dashboard and registry tools.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-6">
          <Input type="email" placeholder="you@company.com" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Continue</Button>
          <div className="flex justify-between text-sm text-muted-foreground">
            <Link href="/sign-up">Create account</Link>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
