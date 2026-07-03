import { BookUpdate } from "@/components/api/books/update/BookUpdate";
/**
 * 演習 6-3 Reactコンポーネントを実装してUIを確認する
 * 商品キーワード検索ページ
 * URL: /api/books/search
 */
export default function BookUpdatePage() {
  return (
    <main className="container mx-auto py-8">
      {/* 先ほど作成したUIコンポーネントを呼び出す */}
      <BookUpdate />
    </main>
  );
}