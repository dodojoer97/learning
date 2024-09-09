import {it, expect} from "vitest"

import {add} from "./math"

it('should summarize all number values in an array', () => {
    // Arrange
    const numbers = [1,2,3]

    // Act
    const result = add(numbers)

    // Assert
    expect(result).toBe(6)
})

it("should yield NaN if at least in invalid number is provided", () => {
    // Arrange
    const inputs = [1,2, 'a']

    // Act
    const result = add(inputs)

    // Assert
    expect(result).toBeNaN()
    
})


it("should throw an error if no value is passed into the function", () => {
    const fn = () => {
        add()
    }
    
    expect(fn).toThrow("numbers are mandatory")
})