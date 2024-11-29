import prisma from "@/lib/prisma";
import { z } from "zod";
import { nanoid } from "nanoid";

const ZUrlSchema = z.object({
  original: z.string(),
  shortened: z.string(),
  userId: z.string(),
});
const baseUrl = "https://shorturl.at/";
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    console.log("formData", formData);
    const originalUrl = formData.get("original");
    const userId = formData.get("userId");
    const uniqueId = nanoid(6);
    const shortenedUrl = `${baseUrl}${uniqueId}`;

    const urlData = ZUrlSchema.parse({
      original: originalUrl,
      userId: userId,
      shortened: shortenedUrl,
    });

    const response = await prisma.shortenedURL.create({ data: urlData });
    console.log("hey response", response);
    return new Response(JSON.stringify(response), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
    });
  }
}
