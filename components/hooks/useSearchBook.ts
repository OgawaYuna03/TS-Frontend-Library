import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { ISearchBookService } from "@/interfaces/ISearchBookService";
import { Book } from "@/models/Book";
import { useState } from "react";

export const useSearchBook = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchService = container.get<ISearchBookService>(
    TYPES.ISearchBookService
  );

  const search = async (keyword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await searchService.execute(keyword);
      console.log(result);
      setBooks(result);
      return true;
    } catch (err: unknown) {
      setBooks([]);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("検索中に予期せぬエラーが発生しました。");
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    books,
    isLoading,
    error,
    search,
  };
};