import prisma from "@/lib/prisma";
import { getUser } from "@/lib/get-user";

export async function GET() {
  const user = await getUser();
  const response = await prisma.shortenedURL.findMany({
    where: {
      userId: user.id,
    },
  });
  return Response.json(response);
}
