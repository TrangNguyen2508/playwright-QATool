import { expect, APIRequestContext } from '@playwright/test'
import { constants } from '../../constants/constants'

// GET ALL BOOKS
export async function getBooks(request: APIRequestContext) {

    const response = await request.get(
        `${constants.baseUrl}${constants.endpoints.getBook}`
    )

    expect(response.status()).toBe(200)

    const body = await response.json()

    return body.books
}

// GET BOOK BY TITLE

export async function getBookByTitle(
    request: APIRequestContext,
    bookTitle: string
) {

    const books = await getBooks(request)

    const selectedBook = books.find(
        (book: any) => book.title === bookTitle
    )

    expect(selectedBook).toBeDefined()

    return selectedBook
}

// CHECK BOOK EXISTS
export async function checkBookExists(
    request: APIRequestContext,
    token: string,
    userId: string,
    isbn: string,
) {

    const response = await request.get(
        `${constants.baseUrl}${constants.endpoints.collection}/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    expect(response.status()).toBe(200)

    const body = await response.json()

    const existingBook = body.books.find(
        (book: any) => book.isbn === isbn
    )

    return existingBook
}

// ADD BOOK
export async function addBook(
    request: APIRequestContext,
    token: string,
    userId: string,
    isbn: string
) {

    const response = await request.post(
        `${constants.baseUrl}${constants.endpoints.addBook}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },

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

    expect(response.status()).toBe(201)

    console.log('Book added successfully')
}

// DELETE BOOK
export async function deleteBook(
    request: APIRequestContext,
    token: string,
    userId: string,
    isbn: string
) {

    const response = await request.delete(
        `${constants.baseUrl}${constants.endpoints.deleteBook}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },

            data: {
                isbn,
                userId
            }
        }
    )

    expect(response.status()).toBe(204)

    console.log('Book deleted successfully')
}