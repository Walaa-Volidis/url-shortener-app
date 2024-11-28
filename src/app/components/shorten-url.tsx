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

interface URLInputProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: () => void;
}

export default function ShortenUrl({ url, setUrl, onSubmit }: URLInputProps) {
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
        <form onSubmit={onSubmit} className="flex gap-4">
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
