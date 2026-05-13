import { test, expect } from '@playwright/test'
import { login } from '../../apis/api-clients/auth.api'
import { checkBookExists, addBook, deleteBook, getBookByTitle } from '../../apis/api-clients/books.api'
import user from '../../test-data/user.json'


test('Bookstore flow', async ({ request }) => {

    const token = await login(request)

    const userId = user.userId

    const selectedBook = await getBookByTitle(
        request,
        'Git Pocket Guide'
    )

    const isbn = selectedBook.isbn

    const existingBook = await checkBookExists(
        request,
        token,
        userId,
        isbn
    )

    if (existingBook) {
        await deleteBook(request, token, userId, isbn)
    }

    await addBook(request, token, userId, isbn)

    await deleteBook(request, token, userId, isbn)

})