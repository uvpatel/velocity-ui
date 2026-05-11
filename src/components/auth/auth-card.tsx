"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Github, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

type AuthCardProps = {
  mode: "sign-in" | "sign-up" | "forgot-password";
};

export function AuthCard({ mode }: AuthCardProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isSignUp = mode === "sign-up";
  const isForgotPassword = mode === "forgot-password";

  function handleSubmit(formData: FormData) {
    setMessage(null);

    startTransition(async () => {
      const email = String(formData.get("email") ?? "");
      const password = String(formData.get("password") ?? "");
      const name = String(formData.get("name") ?? "");

      if (isForgotPassword) {
        await authClient.requestPasswordReset({
          email,
          redirectTo: `${window.location.origin}/reset-password`,
        });
        setMessage("Check your inbox for reset instructions.");
        return;
      }

      if (isSignUp) {
        const result = await authClient.signUp.email({
          email,
          password,
          name,
          callbackURL: "/dashboard",
        });

        setMessage(result.error?.message ?? "Account created. Verify your email to continue.");
        return;
      }

      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });

      setMessage(result.error?.message ?? "Signed in. Redirecting to your dashboard.");
    });
  }

  function handleOAuth(provider: "github" | "google") {
    startTransition(async () => {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    });
  }

  return (
    <Card className="glass-panel w-full border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle>{isForgotPassword ? "Reset password" : isSignUp ? "Create account" : "Sign in"}</CardTitle>
        <CardDescription>
          {isForgotPassword
            ? "Enter your email and we will send a secure reset link."
            : "Access saved components, teams, registry publishing, and admin workflows."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pb-6">
        {!isForgotPassword ? (
          <div className="grid gap-2 sm:grid-cols-2">
            <Button type="button" variant="outline" onClick={() => handleOAuth("github")} disabled={isPending}>
              <Github className="size-4" />
              GitHub
            </Button>
            <Button type="button" variant="outline" onClick={() => handleOAuth("google")} disabled={isPending}>
              <Mail className="size-4" />
              Google
            </Button>
          </div>
        ) : null}

        <form action={handleSubmit} className="space-y-4">
          {isSignUp ? <Input name="name" type="text" placeholder="Full name" required minLength={2} /> : null}
          <Input name="email" type="email" placeholder="you@company.com" required />
          {!isForgotPassword ? <Input name="password" type="password" placeholder="Password" required minLength={12} /> : null}
          <Button className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
            {isForgotPassword ? "Send reset link" : isSignUp ? "Create account" : "Continue"}
          </Button>
        </form>

        {message ? <div className="rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-sm text-muted-foreground">{message}</div> : null}

        {!isForgotPassword ? (
          <div className="flex justify-between text-sm text-muted-foreground">
            <Link href={isSignUp ? "/sign-in" : "/sign-up"}>{isSignUp ? "Sign in instead" : "Create account"}</Link>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            Remember your password? <Link href="/sign-in">Sign in</Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
