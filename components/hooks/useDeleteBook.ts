"use client";
import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import type { ISearchBookService } from "@/interfaces/ISearchBookService";
import type { IDeleteBookService } from "@/interfaces/IDeleteBookService";
import type { Book } from "@/models/Book";
import { useCallback, useState } from "react";

export const useDeleteBook = () => {
    const searchService = container.get<ISearchBookService>(
        TYPES.ISearchBookService
    );

    const deleteService = container.get<IDeleteBookService>(
        TYPES.IDeleteBookService
    );

    const [keyword, setKeyword] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const search = useCallback(async () => {
        setIsLoading(true);
        setErrors({});

        try {
            const result = await searchService.execute(keyword);
            setBooks(result);
        } catch (error: any) {
            setErrors({ search: error.message });
        } finally {
            setIsLoading(false);
        }
    }, [keyword, searchService]);

    const selectBook = useCallback((book: Book) => {
        setSelectedBook(book);
        setErrors({});
        setIsSuccess(false);
    }, []);

    const handleDelete = useCallback(async (): Promise<void> => {
        if (!selectedBook) {
            setErrors({ submit: "削除する図書を選択してください。" });
            return;
        }

        setIsLoading(true);

        try {
            await deleteService.execute(selectedBook.bookId);

            setBooks((prev) =>
                prev.filter((book) => book.bookId !== selectedBook.bookId)
            );
            setSelectedBook(null);
            setIsSuccess(true);
        } catch (error: any) {
            setErrors({ submit: error.message });
        } finally {
            setIsLoading(false);
        }
    }, [selectedBook, deleteService]);

    const resetForm = useCallback(() => {
        setSelectedBook(null);
        setErrors({});
        setIsSuccess(false);
    }, []);

    return {
        keyword,
        setKeyword,
        books,
        selectedBook,
        errors,
        isLoading,
        isSuccess,
        search,
        selectBook,
        handleDelete,
        resetForm,
    };
};