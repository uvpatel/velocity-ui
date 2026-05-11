import { NextResponse } from "next/server";
import { registryCatalog } from "@/lib/registry";

export async function GET() {
  return NextResponse.json({
    registry: registryCatalog,
    generatedAt: new Date().toISOString(),
  });
}
