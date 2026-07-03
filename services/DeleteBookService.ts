import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";

import type { IBookRepository } from "@/interfaces/IBookRepository";
import type { IDeleteBookService } from "@/interfaces/IDeleteBookService";
@injectable()
export class DeleteBookService implements IDeleteBookService {
    constructor(
        @inject(TYPES.IBookRepository)
        private readonly bookRepository: IBookRepository
    ) { }

    public async execute(bookId: string): Promise<void> {
     await this.bookRepository.delete(bookId);
    }
}