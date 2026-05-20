import { test , expect } from '@playwright/test'
import { login } from '../../apis/api-clients/auth.api'
import { getBooks, findBookInCollection, addBook, deleteBook, getBookByTitle } from '../../apis/api-clients/books.api'
import user from '../../test-data/user.json'


test('Bookstore flow', async ({ request }) => {

    const token = await login(request)

    const userId = user.userId

    let isBookAdded = false
    // GET BOOKS
    const { getBooksResponse, books } = await getBooks(request)

    expect(getBooksResponse.status()).toBe(200)
    expect(books.length).toBeGreaterThan(0)

    // GET A BOOK BY TITLE
    const book = await getBookByTitle(
        request,
        'Git Pocket Guide'
    )
    expect(book).toBeDefined()
    const isbn = book.isbn

    // CHECK IF A BOOK IN COLLECTION
    const { existingBook, collectionResponse } = await findBookInCollection(
        request,
        token,
        userId,
        isbn
    )
    expect(collectionResponse.status()).toBe(200)

    // DELETE IF EXISTING
    if (existingBook) {
        await deleteBook(request, token, userId, isbn)
    }

    // ADD A BOOK   
    try {

        const addBookResponse = await addBook(request, token, userId, isbn)
        expect(addBookResponse.status()).toBe(201)

        isBookAdded = true
        const { existingBook: addedBook, collectionResponse: findAddedBookResponse } = await findBookInCollection(
            request,
            token,
            userId,
            isbn
        )


        expect(findAddedBookResponse.status).toBe(200)

        expect(addedBook).toBeDefined()

        console.log(`Book ${isbn} added successfully`)

        // DELETE A BOOK
    } finally {
        if (isBookAdded) {

            const deleteBookResponse = await deleteBook(request, token, userId, isbn)
            expect(deleteBookResponse.status()).toBe(204)
            const {
                existingBook: deletedBook,
                collectionResponse: finDeletedBookResponse
            } = await findBookInCollection(
                request,
                token,
                userId,
                isbn
            )

            expect(finDeletedBookResponse.status()).toBe(200)

            expect(deletedBook).toBeUndefined()

            console.log(`Book ${isbn} deleted successfully`)
        }
    }

})