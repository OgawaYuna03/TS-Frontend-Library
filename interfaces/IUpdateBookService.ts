import { Book } from "@/models/Book";
import { BookRegistration } from "@/models/BookRegistration";

export interface IUpdateBookService {
    execute(bookId: string, book: BookRegistration): Promise<Book>;
}