import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:px-10 lg:px-12">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Admin console</h1>
        <p className="mt-2 text-muted-foreground">Moderate registry submissions, review comments, and inspect platform health.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          ["Pending submissions", "18"],
          ["Flagged comments", "4"],
          ["Active workspaces", "92"],
        ].map(([label, value]) => (
          <Card key={label} className="glass-panel border-white/10 bg-white/5">
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-3xl">{value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="glass-panel border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Moderation queue</CardTitle>
          <CardDescription>Approve or reject registry items before they are published.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3 pb-6">
          <Button>Approve selected</Button>
          <Button variant="outline">Send feedback</Button>
        </CardContent>
      </Card>
    </main>
  );
}
