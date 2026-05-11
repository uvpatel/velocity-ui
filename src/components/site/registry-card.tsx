import Link from "next/link";
import { ArrowRight, Download, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { RegistryItem } from "@/lib/registry";

export function RegistryCard({ item }: { item: RegistryItem }) {
  return (
    <Card className="glass-panel h-full border-white/10 bg-white/5">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription className="mt-2 leading-6">{item.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="rounded-full">
            v{item.version}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 pb-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="rounded-full">
            {item.category}
          </Badge>
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 bg-background/70 px-3 py-2 font-mono text-xs text-muted-foreground">
          {item.installCommand}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Download className="size-3.5" />
              {item.analytics.downloads.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1">
              <Heart className="size-3.5" />
              {item.analytics.likes.toLocaleString()}
            </span>
          </div>
          <Button size="sm" asChild>
            <Link href={`/registry/${item.slug}`}>
              View
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
