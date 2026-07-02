import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { IRegisterBookService } from "@/interfaces/IRegisterBookService";
import { Book } from "@/models/Book";
import { useState } from "react";

export const useRegisterBook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const registerService = container.get<IRegisterBookService>(
    TYPES.IRegisterBookService
  );

  const register = async (book: Book): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await registerService.register(book);
      return true;
    } catch (err: any) {
      setError(err.message || "予期せぬエラーが発生しました。");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    register,
  };
};