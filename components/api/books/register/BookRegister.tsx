"use client";

import { useRegisterBook } from "@/components/hooks/useRegisterBook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";

/**
 * 演習 8-12 図書登録画面コンポーネントを実装し動作確認する
 * 図書登録画面のUIコンポーネント
 */
export const BookRegister = () => {
    const router = useRouter();

    // カスタムHookから状態と関数を取得する
    const {
        formData,
        categories,
        errors,
        isLoading,
        isSuccess,
        handleChange,
        handleCategoryChange,
        handleSubmit,
        resetForm,
    } = useRegisterBook();

    // フォーム送信時のUI側イベントハンドラ
    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // デフォルトの画面遷移を防止する
        await handleSubmit(); // Hookの送信処理を実行する
    };

    return (
        <>
            <div className="container mx-auto py-10 max-w-lg">
                <h1 className="text-2xl font-bold mb-6">図書新規登録</h1>

                <form onSubmit={onSubmit} className="space-y-6">
                    {/* 図書名入力 */}
                    <div className="space-y-2">
                        <Label htmlFor="title">図書名</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="例：はらぺこあおむし"
                            className={errors.title ? "border-red-500" : ""}

                        />
                        {errors.submit && <div className="flex items-center gap-1 text-sm text-red-500">
                            <CircleAlert className="h-4 w-4" />
                            <span>{errors.submit}</span>
                        </div>}
                        {errors.title && <div className="flex items-center gap-1 text-sm text-red-500">
                            <CircleAlert className="h-4 w-4" />
                            <span>{errors.title}</span>
                        </div>}
                    </div>
                    <div className="space-y-6">
                        {/* 価格入力 */}
                        <div className="space-y-2">
                            <Label htmlFor="author">著者名</Label>
                            <Input
                                id="author"
                                name="author"
                                type="string"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="例：エリック・カール"
                                className={errors.author ? "border-red-500" : ""}

                            />
                            {errors.author && <div className="flex items-center gap-1 text-sm text-red-500">
                                <CircleAlert className="h-4 w-4" />
                                <span>{errors.author}</span>
                            </div>}
                        </div>
                        {/* カテゴリ選択 */}
                        <div className="space-y-2">
                            <Label htmlFor="categoryId">カテゴリ</Label>
                            <Select value={formData.categoryId} onValueChange={handleCategoryChange} >
                                <SelectTrigger className={errors.category ? "border-red-500" : ""} >
                                    <SelectValue placeholder="カテゴリを選択してください" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.categoryId} value={cat.categoryId}> {cat.name}
                                        </SelectItem>))}
                                </SelectContent>
                            </Select>
                            {errors.category && <div
                                className="flex items-center gap-1 text-sm text-red-500">
                                <CircleAlert className="h-4 w-4" />
                                <span>{errors.category}</span>
                            </div>
                            }
                        </div>
                        {/* 在庫数入力 */}
                        <div className="space-y-2">
                            <Label htmlFor="stock">在庫数</Label>
                            <Input
                                id="stock"
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
                    </div>

                    {/* 通信エラー等の表示 */}
                    {errors.system && <div className="flex items-center gap-1 text-sm text-red-500">
                        <CircleAlert className="h-4 w-4" />
                        <span>{errors.system}</span>
                    </div>}

                    {/* 登録ボタン */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="submit" className="w-48" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    登録中...
                                </>
                            ) : (
                                "図書を登録する"
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/")}
                        >
                            キャンセル
                        </Button>
                    </div>
                </form>
            </div>

            {/* ★ カスタムHookの isSuccess に応じてモーダルを表示 */}
            {isSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                        <h3 className="text-xl font-bold mb-4">登録完了</h3>
                        <p className="text-gray-600 mb-8">図書の登録が完了しました。</p>
                        <Button
                            // ユーザーが「確認」を押したタイミングで入力画面へ遷移する
                            onClick={resetForm}
                            className="w-full">
                            入力画面に戻る
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};