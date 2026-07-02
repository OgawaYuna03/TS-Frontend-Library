import { Book } from "@/models/Book";
/**
 * 演習 8-2 ユーザー登録用のモデルとインターフェイスを作成する
 * ユーザー登録サービスインターフェイス
 */
export interface IRegisterBookService {

    /**
     * 図書を登録する
     * @param book 
     */
    register(book: Book): Promise<void>;
}