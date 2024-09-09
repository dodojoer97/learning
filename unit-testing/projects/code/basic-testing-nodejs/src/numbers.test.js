import {it, expect} from "vitest"
import { transformToNumber } from "./util/numbers"

it("should return a number", () => {
    // Arrange
    const value = "1"

    // Act
    const transformed = transformToNumber(value)

    // Assert
    expect(transformed).toBe(1)
})

it("should throw an error if a non numeric value is provided", () => {
    // Arrange
    const value = "a"

    // Act
    const fn = ()=> {
        transformToNumber(value)
    }


    // Assert
    expect(fn).toThrowError("value must be a number")
})