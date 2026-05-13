import {expect, APIRequestContext} from '@playwright/test'
import user from '../../test-data/user.json'
import {constants} from '../../constants/constants'

export async function login(request: APIRequestContext) {

    const response = await request.post(
        `${constants.baseUrl}${constants.endpoints.generateTokenEndpoint}`,
        {
            data: {
                userName: user.username,
                password: user.password
            }
        }
    )

    expect(response.status()).toBe(200);
    const body = await response.json()
    const token = body.token;
    expect(token).toBeTruthy()

    return body.token


}