/**
 * 演習 8-8 リポジトリとDTOインターフェイスを実装する
 * 図書登録のためのDTO(インターフェイス)
 */
export interface BookRegistration {
    title: string;          // 図書名
    author: string;         // 価格
    stock: number;         // 在庫数
    categoryId: string;    // 図書カテゴリId(UUID)
    categoryName: string;  // 図書カテゴリ名
}