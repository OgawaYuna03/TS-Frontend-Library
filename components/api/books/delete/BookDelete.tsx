"use client";

import { useDeleteBook } from "@/components/hooks/useDeleteBook";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CircleAlert } from "lucide-react";
import { Book } from "@/models/Book";


export const BookDelete = () => {
    const {
        keyword,
        setKeyword,
        books,
        selectedBook,
        errors,
        isLoading,
        isSuccess,
        search,
        selectBook,
        resetForm,
        handleDelete,
    } = useDeleteBook();

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">図書削除</h1>
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
                            {books.map((book) => (
                                <TableRow key={book.bookId}>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell className="text-center">
                                        {book.category.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {book.stock} 冊
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => selectBook(book)}
                                        >
                                            削除
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {errors.submit && (
                <p className="text-sm text-red-500">{errors.submit}</p>
            )}
            {selectedBook && (
                <AlertDialog open={!!selectedBook}
                    onOpenChange={(open) => {
                        if (!open) resetForm();
                    }}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>図書を削除しますか？</AlertDialogTitle>

                            <AlertDialogDescription>
                                「{selectedBook.title}」を削除します。
                                <br />
                                この操作は取り消せません。
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={resetForm}>
                                キャンセル
                            </AlertDialogCancel>

                            <AlertDialogAction onClick={handleDelete}>
                                削除する
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            {isSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                        <h3 className="text-xl font-bold mb-4">削除完了</h3>
                        <p className="text-gray-600 mb-8">図書の削除が完了しました。</p>
                        <Button
                            // ユーザーが「確認」を押したタイミングで入力画面へ遷移する
                            onClick={resetForm}
                            className="w-full">
                            戻る
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};