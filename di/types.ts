/**
 * データアクセスとサービスを実装する
 * DIコンテナ用の識別子(Symbol)定義
 */
export const TYPES = {
    // インフラストラクチャ層
    IBookRepository: Symbol.for("IBookRepository"),
    // サービス(ユースケース)層
    ISearchBookService: Symbol.for("ISearchBookService"),
    IRegisterBookService: Symbol.for("IRegisterBookService"),
    IBookCategoryRepository: Symbol.for("IBookCategoryRepository"),
    IUpdateBookService: Symbol.for("IUpdateBookService"),
    IDeleteBookService: Symbol.for("IDeleteBookService")


};