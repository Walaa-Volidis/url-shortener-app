import useSWR, { mutate } from "swr";
import { z } from "zod";

const ZUrlSchema = z.object({
  id: z.string(),
  original: z.string(),
  shortened: z.string(),
  userId: z.string(),
  createdAt: z.string(),
});

const ZUrlAddSchema = z.object({
  original: z.string(),
  userId: z.string(),
});

export type Url = z.infer<typeof ZUrlSchema>;

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch url list");
  }
  const data = await response.json();
  return ZUrlSchema.array().parse(data);
};

export function useUrl(userId: string | undefined) {
  const { data: urls = [], error } = useSWR<Url[]>(
    userId ? `/api/list-urls` : null,
    fetcher
  );
  const addUrl = async (formData: FormData) => {
    try {
      const formDataUrl = ZUrlAddSchema.parse({
        original: formData.get("original"),
        userId: formData.get("userId"),
      });
      mutate(`/api/list-urls`, [...(urls || []), formDataUrl], false);
      console.log("hey formdataUrl", formDataUrl);
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
      mutate(`/api/list-urls`);
    } catch (error) {
      console.error("Failed to add URL:", error);
      mutate(`/api/list-urls`);
    }
  };

  //   try {

  //     if (!response.ok) {
  //       throw new Error("Failed to add task");
  //     }

  //     const newTask = await response.json();
  //     TaskWithIdSchema.parse(newTask);
  //     mutate(`/api/list-tasks?${query}`);
  //   } catch (error) {
  //     console.error("Failed to add task:", error);
  //     mutate(`/api/list-tasks?${query}`);
  //   }
  // };
  return {
    urls,
    error,
    addUrl,
  };
}
