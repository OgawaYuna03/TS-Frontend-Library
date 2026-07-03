import { IBookCategoryRepository } from "@/interfaces/IBookCategoryRepository";
import { BookCategory } from "@/models/BookCategory";
import { injectable } from "inversify";
/**
 * 演習 8-9 リポジトリの実装を作成する
 * 商品カテゴリリポジトリ実装クラス
 */
@injectable()
export class BookCategoryRepository implements IBookCategoryRepository {
    /**
     * すべての商品カテゴリを取得する
     * @returns すべての商品カテゴリのリスト（非同期）
     */
    async findAll(): Promise<BookCategory[]> {
        const response = await fetch("/proxy-api/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("商品カテゴリの取得に失敗しました。");
        }
        return await response.json();
    }
    /**
     * 指定したIDの商品カテゴリを取得する
     * @param id 商品カテゴリId(UUID)
     * @returns 商品カテゴリ（非同期）
     */
    async findById(id: string): Promise<BookCategory> {
        const response = await fetch(`/proxy-api/categories/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("商品カテゴリ詳細の取得に失敗しました。");
        }
        return await response.json();
    }
}