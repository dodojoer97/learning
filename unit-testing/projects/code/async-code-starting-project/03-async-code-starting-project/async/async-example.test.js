import {expect, it} from "vitest"
import { generateToken, generateTokenPromise } from "./async-example"

it('should generate a token value', (done) => {
    const testUesrEmail = "test@test.com"
    generateToken(testUesrEmail, (error, token) => {
        try {
            expect(token).toBeDefined()
            // expect(token).toBe(2)
            done()
        }catch(err) {
            done(err)
        }
    })
})



it('should generate a token value', () => {
    const testUesrEmail = "test@test.com"
    return expect(generateTokenPromise(testUesrEmail)).resolves.toBeDefined()
})


it('should generate a token value', async () => {
    const testUesrEmail = "test@test.com"
    const token = await generateTokenPromise(testUesrEmail)
    expect(token).toBeDefined()
})