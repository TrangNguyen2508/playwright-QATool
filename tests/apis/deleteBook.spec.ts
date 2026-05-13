import { test, expect } from '@playwright/test'

test('Bookstore API flow', async ({ request }) => {

    // LOGIN
    const loginReponse = await request.post(
        'https://demoqa.com/Account/v1/GenerateToken',
        {
            data: {
                userName: 'TrangNT',
                password: 'Admin@123'
            }
        }
    )
    expect(loginReponse.status()).toBe(200);

    const reponseBody = await loginReponse.json();

    const token = reponseBody.token;

    expect(token).toBeTruthy()

    // SEARCH

    const searchResponse = await request.get(
        'https://demoqa.com/BookStore/v1/Books'
    );
    expect(searchResponse.status()).toBe(200)
    const searchBook = await searchResponse.json();
    const result = searchBook.books;
    expect(result.length).toBeGreaterThan(0);

    // SELECT FIRST BOOK
    const firstBook = result[0];
    const isbn = firstBook.isbn;


    // ADD BOOK TO COLLECTION
    const userId = 'de5f07a7-b7f7-4fe8-afd6-ea6083cef186'

    //CHECK EXISTING BOOKS
    const getCollectionResponse = await request.get(
        'https://demoqa.com/Account/v1/User/de5f07a7-b7f7-4fe8-afd6-ea6083cef186',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    const collectionResult = await getCollectionResponse.json();
    console.log('get collection=========', collectionResult)

    const existingBook = collectionResult.books.find(
        (book: any) => book.isbn === isbn
    )
    if (existingBook) {
        console.log('Book already exists')

        // delete book
        const deleteResponse = await request.delete(
            'https://demoqa.com/BookStore/v1/Book',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },

                data: {
                    isbn: isbn,
                    userId: userId
                }
            }
        )

        // console.log(await deleteResponse.json())

        expect(deleteResponse.status()).toBe(204)

        console.log('Book deleted successfully')
    } else {
        console.log('Book does not exist')

        // add book directly
        const addBookResponse = await request.post(
            'https://demoqa.com/BookStore/v1/Books',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },

                data: {
                    userId: userId,
                    collectionOfIsbns: [
                        {
                            isbn: isbn
                        }
                    ]
                }
            }
        )
        // console.log(await addBookResponse.json())
        expect(addBookResponse.status()).toBe(201)

        console.log('Book added successfully')
        // delete book
        const deleteResponse = await request.delete(
            'https://demoqa.com/BookStore/v1/Book',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },

                data: {
                    isbn: isbn,
                    userId: userId
                }
            }
        )

        // console.log(await deleteResponse.json())

        expect(deleteResponse.status()).toBe(204)

        console.log('Book deleted successfully')


    }
})