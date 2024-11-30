import prisma from "@/lib/prisma";
import { z } from "zod";

const ZUrlSchema = z.object({
  id: z.string(),
  original: z.string(),
  shortened: z.string(),
  createdAt: z.string().datetime(),
  userId: z.string(),
});

export async function GET() {
  const response = await prisma.shortenedURL.findMany({});
  console.log("hey response", response);
  const formattedResponse = response.map((url) => ({
    ...url,
    createdAt: url.createdAt.toISOString(),
  }));
  console.log("hey formated", formattedResponse);
  const validatedResponse = ZUrlSchema.array().parse(formattedResponse);
  return Response.json(validatedResponse);
}
