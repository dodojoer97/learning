import { describe, it, expect } from "vitest";
import { HttpError, ValidationError } from "./errors";

describe("class HttpError", () => {
    it("should contain the provided status code, message and data", () => {
        const testStatus = 1
        const testMessage= "Test"
        const testData = {key: "Test"}
        const testError = new HttpError(testStatus, testMessage, testData)

        expect(testError.statusCode).toBe(testStatus)
        expect(testError.message).toBe(testMessage)
        expect(testError.data).toBe(testData)
    })

    it("should contain undefined data if no data is provided", () => {
        const testStatus = 1
        const testMessage= "Test"
        const testError = new HttpError(testStatus, testMessage)

        expect(testError.statusCode).toBe(testStatus)
        expect(testError.message).toBe(testMessage)
        expect(testError.data).toBeUndefined()
    })
})



describe("class ValidationError" , () => {
    it("should contain the providede message", () => {
        const testMessage = "MESSAGE"
        const testError = new ValidationError(testMessage)
        expect(testError.message).toBe(testMessage)
    })
})