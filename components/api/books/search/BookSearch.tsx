"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchBook } from "@/components/hooks/useSearchBook";

export const BookSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { books, isLoading, error, search } = useSearchBook();

  const isKeywordInvalid = keyword.length === 0 || keyword.length > 50;

  const handleSearchClick = () => {
    if (isKeywordInvalid) return;
    search(keyword);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center border-b pb-4">
        図書検索
      </h2>

      <div className="mb-8">
        <label className="block font-bold mb-2">書名キーワード</label>

        <div className="flex justify-center items-center gap-4">
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="書名キーワードを入力..."
            className="max-w-sm"
          />

          <Button
            onClick={handleSearchClick}
            disabled={isLoading || isKeywordInvalid}
            className="px-8"
          >
            {isLoading ? "検索中..." : "検索"}
          </Button>
        </div>

        <p className="mt-2 text-sm text-gray-500 text-center">
          50文字以内で入力してください（{keyword.length} / 50）
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 whitespace-pre-wrap">
          {error}
        </div>
      )}

      <p className="mb-4 font-bold">検索結果：{books.length} 件</p>

      {books.length === 0 && !isLoading && (
        <p className="text-center text-muted-foreground py-4">
          図書が見つかりません。
        </p>
      )}

      {books.length > 0 && (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>書名</TableHead>
                <TableHead>著者名</TableHead>
                <TableHead className="text-center">分類</TableHead>
                <TableHead className="text-right">蔵書数</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {books.map((book) => (
                <TableRow key={book.title}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell className="text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {book.category.name}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {book.stock}{" "}
                    <span className="text-muted-foreground text-xs">冊</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};