import { describe, it, expect, vi } from "vitest";

// Functions
import {generateReportData} from "./data"

describe("generateReportData", () => {
    it("should execute logFn if provided", () => {
        // Spy
        const logger = vi.fn(() => {})
        generateReportData(logger)
        expect(logger).toBeCalled()
    })
})