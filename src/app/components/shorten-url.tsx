import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";

interface UrlFormProps {
  userId: string;
  addUrl: (formData: FormData) => Promise<void>;
}
export default function ShortenUrl({ userId, addUrl }: UrlFormProps) {
  const [url, setUrl] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("original", url);
    formData.append("userId", userId);

    try {
      await addUrl(formData);
      toast.success("url shortened successfully.");
      setUrl("");
    } catch (error) {
      toast.error("Error shortening url. Please try again.");
      console.error("Error shortening task:", error);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="text-blue-500" size={24} />
          URL Shortener
        </CardTitle>
        <CardDescription>
          Shorten your long URLs into memorable, shareable links
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            placeholder="Enter your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Shorten URL
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
