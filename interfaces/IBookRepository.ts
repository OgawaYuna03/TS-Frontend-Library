import { Book } from "../models/Book";
import { BookRegistration } from "@/models/BookRegistration";/**
 * 演習 6-2 データアクセスとサービスを実装する
 * 商品リポジトリインターフェース
 */
export interface IBookRepository {
    /**
     * 指定したキーワードで図書を検索して取得する
     * @param keyword 検索キーワード
     * @returns 検索にヒットした図書のリスト（非同期）
     */
    searchKeyword(keyword: string): Promise<Book[]>;
   // existsByTitle(title: string): Promise<void>;

    register(book: BookRegistration): Promise<Book>;

    update(bookId: string, book:BookRegistration):Promise<Book>;

    delete(bookId:string):Promise<void>;
}