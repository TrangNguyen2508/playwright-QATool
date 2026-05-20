import { APIRequestContext , APIResponse } from '@playwright/test'
import { constants } from '../../constants/constants'
import { Book } from '../../types/api/book.type'
import { authHeader } from '../../utils/headers'

// GET ALL BOOKS
export async function getBooks(request: APIRequestContext): Promise<{
    books: Book[],
    getBooksResponse: APIResponse
}> {

    const getBooksResponse = await request.get(
        `${constants.baseUrl}${constants.endpoints.getBook}`
    )

    const body = await getBooksResponse.json()

    return {
        books: body.books,
        getBooksResponse
    }
}

// GET BOOK BY TITLE
export async function getBookByTitle(
    request: APIRequestContext,
    bookTitle: string
): Promise<Book> {

    const { books } = await getBooks(request)

    const book = books.find(
        book => book.title === bookTitle
    )
    if (!book) {
    throw new Error(`Book with title "${bookTitle}" not found`)
}

    return book
}

// CHECK BOOK EXISTS
export async function findBookInCollection(
    request: APIRequestContext,
    token: string,
    userId: string,
    isbn: string,
): Promise<{
    existingBook: Book | undefined
    collectionResponse: APIResponse
}> {

    const collectionResponse = await request.get(
        `${constants.baseUrl}${constants.endpoints.collection}/${userId}`,
        {
            headers: authHeader(token)
        }
    )

    const body: { books: Book[] } = await collectionResponse.json()
    const existingBook = body.books.find(
        book => book.isbn === isbn
    )

    return {
        existingBook,
        collectionResponse
    }
}

// ADD BOOK
export async function addBook(
    request: APIRequestContext,
    token: string,
    userId: string,
    isbn: string
): Promise<APIResponse> {

    return await request.post(
        `${constants.baseUrl}${constants.endpoints.addBook}`,
        {
            headers: authHeader(token),

            data: {
                userId,
                collectionOfIsbns: [
                    {
                        isbn
                    }
                ]
            }
        }
    )
}

// DELETE BOOK
export async function deleteBook(
    request: APIRequestContext,
    token: string,
    userId: string,
    isbn: string
): Promise<APIResponse> {

    return await request.delete(
        `${constants.baseUrl}${constants.endpoints.deleteBook}`,
        {
            headers: authHeader(token),

            data: {
                isbn,
                userId
            }
        }
    )
}