import { describe, it, expect, vi } from "vitest";
import {sendDataRequest} from "./http"
import { HttpError } from "./errors";

const testResponseData = {test: 'test'}
const testFetch = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
        if(typeof options.body !== 'string') {
            reject("Not a string")
        }

        const testResponse = {
            ok: true,
            json() {
                return new Promise((resolve, reject) => {
                    resolve(testResponseData)
                })
            }
        }
        resolve(testResponse)
    })
})

vi.stubGlobal("fetch", testFetch)

it("should return any available response data", () => {
    const testData = {key: "test"}
    return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData)
})

it("should convert the provided data into JSON before sending the request", () => {
    const testData = {key: "test"}
    return expect(sendDataRequest(testData)).resolves.not.rejects.toBe("Not a string")
})

it("should throw an HttpError in case of non-ok responses", () => {
    testFetch.mockImplementationOnce(
        (url, options) => {
            return new Promise((resolve, reject) => {
                const testResponse = {
                    ok: false,
                    json() {
                        return new Promise((resolve, reject) => {
                            resolve(testResponseData)
                        })
                    }
                }
                resolve(testResponse)
            })
        }
    )
    const testData = {key: "test"}
    return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError)

})