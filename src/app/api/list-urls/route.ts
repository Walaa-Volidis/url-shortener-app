import prisma from "@/lib/prisma";
import { z } from "zod";
import { getUser } from "@/lib/get-user";

const ZUrlSchema = z.object({
  id: z.string(),
  original: z.string(),
  shortened: z.string(),
  createdAt: z.string().datetime(),
  userId: z.string(),
});

export async function GET() {
  const user = await getUser();
  const response = await prisma.shortenedURL.findMany({
    where: {
      userId: user.id,
    },
  });
  const formattedResponse = response.map((url) => ({
    ...url,
    createdAt: url.createdAt.toISOString(),
  }));
  const validatedResponse = ZUrlSchema.array().parse(formattedResponse);
  return Response.json(validatedResponse);
}
