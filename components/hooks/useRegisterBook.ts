import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { IRegisterBookService } from "@/interfaces/IRegisterBookService";
import { Book } from "@/models/Book";
import { BookCategory } from "@/models/BookCategory";
import { BookRegistration } from "@/models/BookRegistration";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

/**
 * 演習 8-11 状態管理とサービスを繋ぐカスタムHookを実装する
 * 商品登録画面の状態管理とイベントハンドリングを行うカスタムHook
 */
export const useRegisterBook = () => {
    // DIコンテナからサービスを取得する
    const service = container.get<IRegisterBookService>(TYPES.IRegisterBookService);
    // --- Stateの定義 ---
    const [formData, setFormData] = useState<BookRegistration>({
        title: "",
        author: "",
        stock: 0,
        categoryId: "",
        categoryName: ""
    });
    const [categories, setCategories] = useState<BookCategory[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // 入力フォームと状態を初期化して、入力画面に戻る処理
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

    // --- 画面初期表示時にカテゴリ一覧を取得する ---
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await service.getCategories();
                setCategories(data);
            } catch (error: any) {
                setErrors((prev) => ({ ...prev, system: "カテゴリ一覧の取得に失敗しました。" }));
            }
        };
        fetchCategories();
    }, []);

    // --- 入力の変更イベント ---
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            // authorとstockは数値に変換して保存する
            [name]: name === "stock" ? Number(value) : value
        }));

        // 入力した項目のエラーを消す
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }, []);

    // --- カテゴリ選択時に詳細情報を取得する ---
    const handleCategoryChange = useCallback((categoryId: string) => {
        const category = categories.find((c) => c.categoryId === categoryId);

        setFormData((prev) => ({
            ...prev,
            categoryId,
            categoryName: category?.name ?? "",
        }));
    }, [categories]);

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
        if (!formData.categoryId) {
            newErrors.category = "分類を選択してください。";
        }

        if (!formData.stock) {
            newErrors.stock = "蔵書数は必須です。";
        } else if (formData.stock < 0) {
            newErrors.stock = "蔵書数は0以上で入力してください。";
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // --- [登録]ボタンクリック時にデータを永続化する ---
    const handleSubmit = useCallback(async (): Promise<Book | null> => {
        if (!validateForm()) return null;
        setIsLoading(true);
        try {
            await service.validateBookTitle(formData.title);

            // サービスの登録処理を実行し、結果を返す
            const result = await service.execute(formData);
            if (result) {
                setIsSuccess(true);
            }
            return result;
        } catch (error: any) {
            if (error.message.includes("その図書名は既に存在します")) {
                setErrors((prev) => ({
                    ...prev,
                    title: error.message,
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    submit: error.message,
                }));
            }

            return null;
        } finally {
            setIsLoading(false);
        }
    }, [formData, service]);

    // UIコンポーネントに必要なプロパティと関数を返す
    return {
        formData,
        categories,
        errors,
        isLoading,
        isSuccess,
        handleChange,
        handleCategoryChange,
        handleSubmit,
        resetForm
    };
};