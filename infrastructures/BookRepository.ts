import { IBookRepository } from "@/interfaces/IBookRepository";
import { Book } from "@/models/Book";
import { BookRegistration } from "@/models/BookRegistration";
import { injectable } from "inversify";

/**
 * バックエンドAPIと通信を行い、図書データを取得する
 */
@injectable()
export class BookRepository implements IBookRepository {
  /**
   * 指定したキーワードで図書を検索する
   * @param keyword 検索キーワード
   * @returns 検索結果の図書リスト
   */
  public async searchKeyword(keyword: string): Promise<Book[]> {
    const params = new URLSearchParams({ keyword });

    const response = await fetch(`/proxy-api/books?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (errorData.message) {
        throw new Error(errorData.message);
      }

      if (errorData.errors) {
        const messages = Object.values(errorData.errors).flat().join("\n");
        throw new Error(messages);
      }

      throw new Error(`検索に失敗しました (Status: ${response.status})`);
    }

    const books: Book[] = await response.json();
    return books;
  }


  //追加機能
  async register(book: BookRegistration): Promise<Book> {
    const response = await fetch("/proxy-api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (errorData.message) {
        throw new Error(errorData.message);
      }

      if (errorData.errors) {
        const messages = Object.values(errorData.errors).flat().join("\n");
        throw new Error(messages);
      }

      throw new Error(`図書登録に失敗しました (Status: ${response.status})`);
    }
    return await response.json();
  }

  //更新機能

  /**
   * 図書を更新する
   * @param bookId 図書ID
   * @param book 更新内容
   * @returns 更新後の図書
   */
  public async update(
    bookId: string,
    book: BookRegistration
  ): Promise<Book> {

    const response = await fetch(`/proxy-api/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (errorData.message) {
        throw new Error(errorData.message);
      }

      if (errorData.errors) {
        const messages = Object.values(errorData.errors).flat().join("\n");
        throw new Error(messages);
      }

      throw new Error(`図書更新に失敗しました。(Status: ${response.status})`);
    }

    return await response.json();
  }


  //削除機能

  public async delete(bookId: string): Promise<void> {
    const response = await fetch(`/proxy-api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (errorData.message) {
        throw new Error(errorData.message);
      }

      if (errorData.errors) {
        const messages = Object.values(errorData.errors).flat().join("\n");
        throw new Error(messages);
      }

      throw new Error(`図書削除に失敗しました。(Status: ${response.status})`);
    }
  }


}
