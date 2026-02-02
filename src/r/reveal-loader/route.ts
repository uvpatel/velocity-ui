import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "reveal-loader",
    type: "ui",
    files: [
      {
        path: "components/ui/reveal-loader.tsx",
        content: `
export function RevealLoader() {
  return (
    <div className="animate-pulse text-center">
      Loading...
    </div>
  );
}
        `.trim()
      }
    ]
  });
}
