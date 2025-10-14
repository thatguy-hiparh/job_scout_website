import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Contact message received:", body);
    return NextResponse.json({ ok: true });
  } catch {
    return new NextResponse("Bad request", { status: 400 });
  }
}
