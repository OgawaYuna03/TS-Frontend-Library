/**
 * データアクセスとサービスを実装する
 * 図書カテゴリインターフェイス
 */
export interface BookCategory {
    categoryId: string;  // 図書カテゴリId(UUID)
    name: string;          // 図書カテゴリ名
}