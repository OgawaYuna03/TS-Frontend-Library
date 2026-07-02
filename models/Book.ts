import { BookCategory } from "./BookCategory";
import { BookStock } from "./BookStock";
/**
 * 演習 6-2 データアクセスとサービスを実装する
 * 商品インターフェイス
 */
export interface Book {
    bookId: string;        // 図書Id(UUID)
    title: string;               // 図書名
    author: string;              // 著者名
    category: BookCategory;  // 商品カテゴリ
    stock: number;        // 商品在庫数
}