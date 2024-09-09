import { describe, it, expect } from "vitest";
import { validateNotEmpty } from "./validation";

it("should throw an error if an empty string is provided as a value", () => {
    const testInput = ""

    const validationFn = () => validateNotEmpty(testInput)

    expect(validationFn).toThrow()
})


it("should throw an error if an blank string is provided as a value", () => {
    const testInput = "    "
    const testErrorMesssage = "TEST ERROR"

    const validationFn = () => validateNotEmpty(testInput, testErrorMesssage)

    expect(validationFn).toThrow(testErrorMesssage)
})