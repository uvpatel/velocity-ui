"use client";

import { useMemo, useState } from "react";
import { Bot, Command, Search, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const commands = [
  "Generate dashboard widget",
  "Create registry manifest",
  "Refactor into Server Component",
  "Audit accessibility states",
  "Draft MDX documentation",
];

export function AiCommandPalette() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => commands.filter((command) => command.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Bot className="size-4" />
        </span>
        <div>
          <div className="font-medium">AI command palette</div>
          <div className="text-sm text-muted-foreground">Search prompts, actions, and generated drafts.</div>
        </div>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Search commands" />
      </div>
      <div className="mt-3 space-y-2">
        {filtered.map((command, index) => (
          <button
            key={command}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition hover:bg-accent",
              index === 0 && "border-primary/40 bg-accent/50",
            )}
          >
            <span className="flex items-center gap-2">
              <Command className="size-3.5 text-muted-foreground" />
              {command}
            </span>
            <WandSparkles className="size-3.5 text-muted-foreground" />
          </button>
        ))}
      </div>
      <Button className="mt-4 w-full">Run selected command</Button>
    </div>
  );
}
