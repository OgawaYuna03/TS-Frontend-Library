"use client";

import { useRegisterBook } from "@/components/hooks/useRegisterBook";
import { Book } from "@/models/Book";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const RegisterBook = () => {
  const router = useRouter();
  const { register, isLoading, error } = useRegisterBook();

  const [Name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryUuid, setCategoryUuid] = useState("");
  const [stock, setStock] = useState("");

  const categories = [
    { categoryUuid: "c-001", Name: "小説" },
    { categoryUuid: "c-002", Name: "コンピュータ" },
    { categoryUuid: "c-003", Name: "歴史" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedCategory = categories.find(
      (category) => category.categoryUuid === categoryUuid
    );

    const newBook: Book = {
      bookId: crypto.randomUUID(),
      Name,
      author,
      category: {
        categoryUuid,
        Name: selectedCategory?.Name ?? "",
      },
      stock: {
        stockUuid: crypto.randomUUID(),
        stock: Number(stock),
      },
    };

    const success = await register(newBook);

    if (success) {
      router.push("/");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">図書登録</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 whitespace-pre-wrap">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={Name}
          onChange={(e) => setName(e.target.value)}
          placeholder="書名"
          required
          className="w-full px-3 py-2 border rounded-md"
        />

        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="著者名"
          required
          className="w-full px-3 py-2 border rounded-md"
        />

        <select
          value={categoryUuid}
          onChange={(e) => setCategoryUuid(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">分類を選択してください</option>

          {categories.map((category) => (
            <option key={category.categoryUuid} value={category.categoryUuid}>
              {category.Name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="蔵書数"
          required
          className="w-full px-3 py-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-bold ${
            isLoading ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          {isLoading ? "登録処理中..." : "登録する"}
        </button>
      </form>
    </div>
  );
};