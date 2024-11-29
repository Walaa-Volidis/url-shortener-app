//import useSWR, { mutate } from "swr";
import { z } from "zod";

const ZUrlSchema = z.object({
  id: z.string(),
  original: z.string(),
  shortened: z.string(),
  userId: z.string(),
});

export function useUrl(userId: string | undefined) {
  const addUrl = async (formData: FormData) => {
    try {
      const response = await fetch("/api/create-url", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add URL");
      }
      console.log(userId);
      const url = await response.json();
      ZUrlSchema.parse(url);
    } catch (error) {
      console.error("Failed to add URL:", error);
    }
  };

  return {
    addUrl,
  };
}
