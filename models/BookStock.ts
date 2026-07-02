/**
 * データアクセスとサービスを実装する
 * 図書在庫インターフェイス
 */
export interface BookStock {
    stockUuid: string;  // 図書在庫Id(UUID)
    stock: number;      // 図書在庫数
}