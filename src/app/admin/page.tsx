import { PageShell } from "@/components/site/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminQueue } from "@/lib/platform";

export default function AdminPage() {
  return (
    <PageShell className="max-w-6xl">
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
        <CardContent className="space-y-4 pb-6">
          {adminQueue.map((item) => (
            <div key={item.name} className="grid gap-3 rounded-xl border border-white/10 bg-background/70 px-4 py-3 md:grid-cols-[1fr_0.6fr_0.9fr] md:items-center">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">{item.author}</div>
              </div>
              <div className="text-sm text-muted-foreground">{item.status}</div>
              <div className="text-sm text-muted-foreground">{item.risk}</div>
            </div>
          ))}
          <div className="flex flex-wrap gap-3">
            <Button>Approve selected</Button>
            <Button variant="outline">Send feedback</Button>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
