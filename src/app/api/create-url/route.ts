import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

const baseUrl = "https://shorturl.at/";
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const originalUrl = formData.get("original") as string;
    const userId = formData.get("userId") as string;
    const uniqueId = nanoid(6);
    const shortened = `${baseUrl}${uniqueId}`;

    const urlData = {
      original: originalUrl,
      userId: userId,
      shortened: shortened,
    };

    const response = await prisma.shortenedURL.create({ data: urlData });
    return new Response(JSON.stringify(response), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
    });
  }
}
