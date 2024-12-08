import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  console.log("Request: ", request);
  const { name, email } = await request.json();
  await prisma.user.upsert({
    where: { email },
    update: {
      name,
      email,
    },
    create: {
      name,
      email,
    },
  });
}
