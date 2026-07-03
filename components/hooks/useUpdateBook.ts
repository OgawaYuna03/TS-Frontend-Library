import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import type { ISearchBookService } from "@/interfaces/ISearchBookService";
import type { IUpdateBookService } from "@/interfaces/IUpdateBookService";
import type { Book } from "@/models/Book";
import type { BookRegistration } from "@/models/BookRegistration";
import { ChangeEvent, useCallback, useState } from "react";

export const useUpdateBook = () => {
    const searchService = container.get<ISearchBookService>(
        TYPES.ISearchBookService
    );

    const updateService = container.get<IUpdateBookService>(
        TYPES.IUpdateBookService
    );

    const [keyword, setKeyword] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const [formData, setFormData] = useState<BookRegistration>({
        title: "",
        author: "",
        stock: 0,
        categoryId: "",
        categoryName: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const resetForm = useCallback(() => {
        setFormData({
            title: "",
            author: "",
            stock: 0,
            categoryId: "",
            categoryName: ""
        });
        setErrors({});
        setIsSuccess(false); // モーダルを閉じる
    }, []);
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
        setFormData({
            title: book.title,
            author: book.author,
            stock: book.stock,
            categoryId: book.category.categoryId,
            categoryName: book.category.name,
        });
        setErrors({});
        setIsSuccess(false);
    }, []);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "stock" ? Number(value) : value,
        }));

        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }, []);

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = "書名は必須です。";
        } else if (formData.title.length > 50) {
            newErrors.title = "書名は50文字以内で入力してください。";
        }

        if (!formData.author.trim()) {
            newErrors.author = "著者名は必須です。";
        } else if (formData.author.length > 30) {
            newErrors.author = "著者名は30文字以内で入力してください。";
        }

        if (!formData.stock) {
            newErrors.stock = "蔵書数は必須です。";
        } else if (formData.stock < 0) {
            newErrors.stock = "蔵書数は0以上で入力してください。";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = useCallback(async (): Promise<Book | null> => {
        if (!selectedBook) {
            setErrors({ submit: "更新する図書を選択してください。" });
            return null;
        }

        if (!validateForm()) return null;

        setIsLoading(true);

        try {
            const result = await updateService.execute(selectedBook.bookId, formData);

            setIsSuccess(true);
            setSelectedBook(result);

            return result;
        } catch (error: any) {
            setErrors({ submit: error.message });
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [selectedBook, formData, updateService]);

    const cancelEdit = useCallback(() => {
        setSelectedBook(null);
        setFormData({
            title: "",
            author: "",
            stock: 0,
            categoryId: "",
            categoryName: "",
        });
        setErrors({});
        setIsSuccess(false);
    }, []);

    return {
        keyword,
        setKeyword,
        books,
        selectedBook,
        formData,
        errors,
        isLoading,
        isSuccess,
        search,
        selectBook,
        handleChange,
        handleSubmit,
        cancelEdit,
        resetForm,
    };
};