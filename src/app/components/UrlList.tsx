import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";

interface ShortenedURL {
  original: string;
  shortened: string;
  created: string;
}

interface URLTableProps {
  shortenedUrls: ShortenedURL[];
  onCopy: (url: string) => void;
  onVisit: (url: string) => void;
}

export default function UrlList({
  shortenedUrls,
  onCopy,
  onVisit,
}: URLTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>A list of your shortened URLs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3">Original URL</TableHead>
              <TableHead className="px-6 py-3">Shortened URL</TableHead>
              <TableHead className="px-6 py-3">Created</TableHead>
              <TableHead className="px-6 py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shortenedUrls.map((item, i) => (
              <TableRow key={i} className="bg-white border-b hover:bg-gray-50">
                <TableCell className="px-6 py-4 max-w-xs truncate">
                  {item.original}
                </TableCell>
                <TableCell className="px-6 py-4 font-medium">
                  {item.shortened}
                </TableCell>
                <TableCell className="px-6 py-4">{item.created}</TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onCopy(item.shortened)}
                    >
                      <Copy size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onVisit(item.shortened)}
                    >
                      <ExternalLink size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
