"use client";

import { useUpdateBook } from "@/components/hooks/useUpdateBook";
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
import { CircleAlert } from "lucide-react";


export const BookUpdate = () => {
  const {
    keyword,
    setKeyword,
    books,
    selectedBook,
    formData,
    errors,
    isLoading,
    isSuccess,
    search,
    selectBook,
    handleChange,
    handleSubmit,
    cancelEdit,
    resetForm,
  } = useUpdateBook();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">図書変更</h1>

      {/* 検索エリア */}

      {/* 検索エリア */}
      <div className="mb-6">
        <label className="block font-bold mb-2">書名キーワード</label>

        <div className="flex gap-4">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="書名キーワードを入力..."
          />

          <Button
            onClick={search}
            disabled={isLoading || !keyword.trim() || keyword.length > 50}
          >
            {isLoading ? "検索中..." : "検索"}
          </Button>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          50文字以内で入力してください（{keyword.length} / 50）
        </p>
      </div>

      <p className="mb-4 font-bold text-gray-700">
        検索結果：{books.length} 件
      </p>

      {/* 検索結果テーブル */}
      {books.length > 0 && (
        <div className="border rounded-md mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>書名</TableHead>
                <TableHead>著者名</TableHead>
                <TableHead className="text-center">分類</TableHead>
                <TableHead className="text-right">蔵書数</TableHead>
                <TableHead className="text-center">操作</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {books.map((book) => {
                const isSelected = selectedBook?.bookId === book.bookId;

                return (
                  <TableRow
                    key={book.bookId}
                    className={isSelected ? "bg-blue-100" : ""}
                  >
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell className="text-center">{book.category.name}</TableCell>
                    <TableCell className="text-right">{book.stock} 冊</TableCell>

                    <TableCell className="text-center">
                      {isSelected ? (
                        <span className="text-blue-700 font-bold">選択中</span>
                      ) : (
                        <Button type="button" onClick={() => selectBook(book)}>
                          選択
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 編集フォーム */}
      {selectedBook && (
        <form onSubmit={onSubmit} className="space-y-6 border rounded-lg p-6">
          <h2 className="text-xl font-bold">図書情報変更</h2>

          <div className="space-y-2">
            <label className="font-bold">書名</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <div className="flex items-center gap-1 text-sm text-red-500">
              <CircleAlert className="h-4 w-4" />
              <span>{errors.title}</span>
            </div>}
          </div>

          <div className="space-y-2">
            <label className="font-bold">著者名</label>
            <Input
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={errors.author ? "border-red-500" : ""}

            />
            {errors.author && <div className="flex items-center gap-1 text-sm text-red-500">
              <CircleAlert className="h-4 w-4" />
              <span>{errors.author}</span>
            </div>}
          </div>

          <div className="space-y-2">
            <label className="font-bold">分類</label>
            <Input value={formData.categoryName} disabled />
          </div>

          <div className="space-y-2">
            <label className="font-bold">蔵書数</label>
            <Input
              name="stock"
              type="number"
              value={formData.stock || ""}
              onChange={handleChange}
              className={errors.stock ? "border-red-500" : ""}


            />
            {errors.stock && <div className="flex items-center gap-1 text-sm text-red-500">
              <CircleAlert className="h-4 w-4" />
              <span>{errors.stock}</span>
            </div>}
          </div>

          {errors.submit && (
            <p className="text-sm text-red-500">{errors.submit}</p>
          )}

          <div className="flex justify-end gap-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "更新中..." : "更新"}
            </Button>

            <Button type="button" variant="outline" onClick={cancelEdit}>
              キャンセル
            </Button>
          </div>
        </form>
      )}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h3 className="text-xl font-bold mb-4">更新完了</h3>
            <p className="text-gray-600 mb-8">図書の更新が完了しました。</p>
            <Button
              // ユーザーが「確認」を押したタイミングで入力画面へ遷移する
              onClick={resetForm}
              className="w-full">
              入力画面に戻る
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};