import { Book } from "@/models/Book";

export interface IDeleteBookService {
    execute(bookId: string): Promise<void>;
}