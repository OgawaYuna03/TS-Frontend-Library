import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardName } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  BookPlus,
  Pencil,
  Trash2,
} from "lucide-react";

export default function MenuPage() {
  return (

    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-10 relative"
      style={{
        backgroundImage: "url('/images/rapunzel-bg.png')",
      }}
    >      <div className="text-center space-y-4 mb-12">
       <aside className="w-64 rounded-[2rem] bg-white/85 border border-purple-200 shadow-xl p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-8">
        図書管理システム
      </h2>

      <nav className="space-y-4">
        <Link href="/api/books/search" className="flex items-center gap-3 rounded-2xl bg-purple-300 px-4 py-3 text-white font-bold">
          <Search className="h-5 w-5" />
          図書検索
        </Link>

        <Link href="/api/books/register" className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-purple-700 font-bold">
          <BookPlus className="h-5 w-5" />
          図書登録
        </Link>

        <Link href="/api/books/update" className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-purple-700 font-bold">
          <Pencil className="h-5 w-5" />
          図書変更
        </Link>

        <Link href="/api/books/delete" className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-purple-700 font-bold">
          <Trash2 className="h-5 w-5" />
          図書削除
        </Link>
      </nav>
    </aside>
        <div className="text-6xl"></div>

        <h1 className="text-6xl font-extrabold text-violet-700 drop-shadow-lg tracking-wide">
          図書管理システム
        </h1>
        <p className="text-lg text-purple-900/80 font-medium">
          お気に入りの一冊を見つけよう
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">



        {/* メニュー4：図書キーワード検索 */}
        <Card className="
  rounded-[2rem]
  border-2
  border-violet-200
  bg-violet-50/80
  backdrop-blur-md
  shadow-xl
  transition-all
  duration-300
  hover:-translate-y-2
  hover:shadow-2xl
">            <CardHeader className="items-center text-center">

            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
              <Search className="h-8 w-8 text-violet-600" />
            </div>

            <CardName className="text-xl text-violet-700">
              図書検索
            </CardName>

            <CardDescription>
              登録されている図書を検索します
            </CardDescription>

          </CardHeader>
          <CardContent>
            <Button
              asChild
              className=" w-full rounded-full bg-violet-400 hover:bg-violet-500 " >
              <Link href="/api/books/search">検索画面へ</Link>
            </Button>
          </CardContent>
        </Card>

        {/* メニュー5：図書登録 */}
        <Card className="
  rounded-[2rem]
  border-2
  border-pink-200
  bg-pink-50/80
  backdrop-blur-md
  shadow-xl
  transition-all
  duration-300
  hover:-translate-y-2
  hover:shadow-2xl
">           <CardHeader className="items-center text-center">

            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
              <BookPlus className="h-8 w-8 text-pink-600" />
            </div>

            <CardName className="text-xl text-pink-700">
              図書登録
            </CardName>

            <CardDescription>
              新しい図書をシステムに登録します
            </CardDescription>

          </CardHeader>

          <CardContent>
            <Button
              asChild
              className="w-full rounded-full bg-pink-400 hover:bg-pink-500"
            >
              <Link href="/api/books/register">
                登録画面へ
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* メニュー6：図書変更 */}
        <Card className="
  rounded-[2rem]
  border-2
  border-amber-200
  bg-amber-50/80
  backdrop-blur-md
  shadow-xl
  transition-all
  duration-300
  hover:-translate-y-2
  hover:shadow-2xl
">          <CardHeader className="items-center text-center">

            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <Pencil className="h-8 w-8 text-amber-600" />
            </div>

            <CardName className="text-xl text-amber-700">
              図書変更
            </CardName>

            <CardDescription>
              登録済みの図書情報を変更・更新します
            </CardDescription>

          </CardHeader>

          <CardContent>
            <Button
              asChild
              className="w-full rounded-full bg-amber-400 hover:bg-amber-500"
            >
              <Link href="/api/books/update">
                変更画面へ
              </Link>
            </Button>
          </CardContent>
        </Card>
        {/* メニュー6：図書変更 */}
        <Card className="
      rounded-[2rem]
      border-2
  border-rose-200
  bg-rose-50/80
  backdrop-blur-md
  shadow-xl
  transition-all
  duration-300
  hover:-translate-y-2
  hover:shadow-2xl
">                  <CardHeader className="items-center text-center">

            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
              <Trash2 className="h-8 w-8 text-rose-600" />
            </div>

            <CardName className="text-xl text-rose-700">
              図書削除
            </CardName>

            <CardDescription>
              登録済みの図書情報を削除します
            </CardDescription>

          </CardHeader>

          <CardContent>
            <Button
              asChild
              className="w-full rounded-full bg-rose-400 hover:bg-rose-500"
            >
              <Link href="/api/books/delete">
                削除画面へ
              </Link>
            </Button>
          </CardContent>
        </Card>


      </div>
    </div>
  );
}