import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const shortened = request.nextUrl.searchParams.get("shortened");
  console.log("hey shortened url", shortened);
  if (!shortened) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const url = await prisma.shortenedURL.findUnique({
      where: { shortened: shortened },
    });

    if (!url) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

    return NextResponse.json({ original: url.original });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
