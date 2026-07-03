import { BookDelete } from "@/components/api/books/delete/BookDelete";
/**
 * 演習 6-3 Reactコンポーネントを実装してUIを確認する
 * 商品キーワード検索ページ
 * URL: /api/books/search
 */
export default function BookDeletePage() {
  return (
    <main className="container mx-auto py-8">
      {/* 先ほど作成したUIコンポーネントを呼び出す */}
      <BookDelete />
    </main>
  );
}