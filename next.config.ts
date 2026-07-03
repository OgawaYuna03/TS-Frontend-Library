import type { NextConfig } from "next";
/**
 * 演習 8-1 APIプロキシ(BFF)の設定を追加する
 * Next.js プロジェクトの設定ファイル
 * ブラウザのセキュリティ制限（CORS）を回避し、フロントエンドから
 * 安全にバックエンドAPIを呼び出すための中継ルールを定義
 */
const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/proxy-api/books",
        destination: "http://20.78.35.126/app2/library/api/books",
      },
      {
        source: "/proxy-api/books/:path*",
        destination: "http://20.78.35.126/app2/library/api/books/:path*",
      },
      {
        source: "/proxy-api/books",
        destination: "http://20.78.35.126/app2/library/api/books",
      },
      {
        source: "/proxy-api/categories",
        destination: "http://20.78.35.126/app2/library/api/categories",
      }
    ];
  }
};
export default nextConfig;