import {it, expect, vi} from "vitest"
import {promises as fs} from "fs"
import path from "path"

import writeData from "./io"


vi.mock("fs")
vi.mock("path", () => {
    return {
        default: {
            join(...args) {
                return args[args.length - 1]
            }
        }
    }
})

it("should execute the writeFile method", () => {
    const testData = "Test"
    const testFileName = "test.txt"
    writeData(testData, testFileName)
    expect(fs.writeFile).toBeCalled(testFileName, testData)
})

it("it should return a promise thata resolves to no value if called correctly", () => {
    const testData = "Test"
    const testFileName = "test.txt"

    return expect(writeData(testData, testFileName)).resolves.toBeUndefined()
})