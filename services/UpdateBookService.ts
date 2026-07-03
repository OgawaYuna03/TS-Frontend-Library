import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";

import type { IBookRepository } from "@/interfaces/IBookRepository";
import type { IUpdateBookService } from "@/interfaces/IUpdateBookService";
import type { Book } from "@/models/Book";
import type { BookRegistration } from "@/models/BookRegistration";

@injectable()
export class UpdateBookService implements IUpdateBookService {
    constructor(
        @inject(TYPES.IBookRepository)
        private readonly bookRepository: IBookRepository
    ) { }

    async execute(bookId: string, book: BookRegistration): Promise<Book> {
        return await this.bookRepository.update(bookId, book);
    }
}