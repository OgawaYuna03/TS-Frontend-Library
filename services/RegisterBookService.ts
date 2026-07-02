import { injectable, inject } from "inversify";
import { IRegisterBookService } from "@/interfaces/IRegisterBookService";
import { Book } from "@/models/Book";
import type { IBookRepository } from "@/interfaces/IBookRepository";
import { TYPES } from "@/di/types";
/**
 * 演習 8-4 Serviceの実装とDIコンテナへの登録
 * ユーザー登録サービス実装クラス
 */
@injectable()
export class RegisterBookService implements IRegisterBookService {
    private bookRepository: IBookRepository;
    /**
     * コンストラクタ
     * @param bookRepository BookRepository のインスタンスを注入する
     */
    constructor(
        @inject(TYPES.IBookRepository) bookRepository: IBookRepository
    ) {
        this.bookRepository = bookRepository;
    }

    

    /**
     * ユーザーを登録する
     * @param book 登録ユーザー
     */
    async register(book: Book): Promise<void> {
        // リポジトリの処理をそのまま呼び出す
        await this.bookRepository.register(book);
    }
}