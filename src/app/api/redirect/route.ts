import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const ZUrlSchema = z.object({
  id: z.string(),
  original: z.string(),
  shortened: z.string(),
  createdAt: z.string().datetime(),
  userId: z.string(),
});

export async function GET(request: NextRequest) {
  const shortenedUrl = request.nextUrl.searchParams.get("shortened");
  console.log("hey shortened url", shortenedUrl);
  if (!shortenedUrl) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const url = await prisma.shortenedURL.findUnique({
      where: { shortened: shortenedUrl },
    });

    if (!url) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

    const validatedUrl = ZUrlSchema.parse({
      ...url,
      createdAt: url.createdAt.toISOString(),
    });

    return NextResponse.json({ original: validatedUrl.original });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
