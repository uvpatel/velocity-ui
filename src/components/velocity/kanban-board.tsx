import { GripVertical } from "lucide-react";

const lanes = [
  { title: "Backlog", cards: ["Audit keyboard flow", "Draft docs page"] },
  { title: "In review", cards: ["AI command palette", "Billing matrix"] },
  { title: "Shipped", cards: ["Button primitive", "Dashboard shell"] },
];

export function KanbanBoard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {lanes.map((lane) => (
        <section key={lane.title} className="rounded-xl border bg-card p-3 shadow-sm">
          <div className="mb-3 flex items-center justify-between px-1 text-sm font-medium">
            {lane.title}
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{lane.cards.length}</span>
          </div>
          <div className="space-y-2">
            {lane.cards.map((card) => (
              <article key={card} className="flex items-center gap-3 rounded-lg border bg-background p-3 text-sm">
                <GripVertical className="size-4 text-muted-foreground" />
                {card}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
