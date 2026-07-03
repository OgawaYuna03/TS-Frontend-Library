import { IBookRepository } from "@/interfaces/IBookRepository";
import { ISearchBookService } from "@/interfaces/ISearchBookService";
import { Container } from "inversify";
import { TYPES } from "./types";
import { BookRepository } from "@/infrastructures/BookRepository";
import { SearchBookService } from "@/services/SearchBookService";
import { RegisterBookService } from "@/services/RegisterBookService";
import { IBookCategoryRepository } from "@/interfaces/IBookCategoryRepository";
import { BookCategoryRepository } from "@/infrastructures/BookCategoryRepository";
import { IRegisterBookService } from "@/interfaces/IRegisterBookService";
import { IUpdateBookService } from "@/interfaces/IUpdateBookService";
import { UpdateBookService } from "@/services/UpdateBookService";
import { IDeleteBookService } from "@/interfaces/IDeleteBookService";
import { DeleteBookService } from "@/services/DeleteBookService";

/**
 * 演習 6-2 データアクセスとサービスを実装する
 * DIコンテナの初期化と依存関係の登録
 */
const container = new Container();
// ---------------------------------------------------------
// バインディング（登録）設定
// ---------------------------------------------------------
// リポジトリの登録(モック版を紐付ける)
container.bind<IBookRepository>(TYPES.IBookRepository).to(BookRepository);
// サービス(ユースケース)の登録
container.bind<ISearchBookService>(TYPES.ISearchBookService).to(SearchBookService);
container.bind<IRegisterBookService>(TYPES.IRegisterBookService).to(RegisterBookService);
container.bind<IBookCategoryRepository>(TYPES.IBookCategoryRepository).to(BookCategoryRepository);
container.bind<IUpdateBookService>(TYPES.IUpdateBookService).to(UpdateBookService);
container.bind<IDeleteBookService>(TYPES.IDeleteBookService).to(DeleteBookService);



export { container };