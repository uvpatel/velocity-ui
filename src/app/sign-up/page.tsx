import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center px-6 py-10">
      <Card className="glass-panel w-full border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Join the registry, save favorites, and publish components with a managed workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-6">
          <Input type="text" placeholder="Full name" />
          <Input type="email" placeholder="you@company.com" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Create account</Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/sign-in">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
