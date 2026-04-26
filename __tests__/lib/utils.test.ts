import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("Utils - cn function", () => {
  it("should merge simple class names", () => {
    const result = cn("px-2", "py-1");
    expect(result).toContain("px-2");
    expect(result).toContain("py-1");
  });

  it("should handle conditional classes", () => {
    const result = cn("px-2", true && "py-1");
    expect(result).toContain("px-2");
    expect(result).toContain("py-1");
  });

  it("should handle falsy conditional classes", () => {
    const result = cn("px-2", false && "py-1");
    expect(result).toContain("px-2");
    expect(result).not.toContain("py-1");
  });

  it("should merge tailwind classes correctly", () => {
    const result = cn("px-2 py-1", "px-4");
    // Should use the last px value (px-4 overrides px-2)
    expect(result).toContain("px-4");
    expect(result).toContain("py-1");
  });

  it("should handle object syntax", () => {
    const result = cn({
      "px-2": true,
      "py-1": true,
      "text-red": false,
    });
    expect(result).toContain("px-2");
    expect(result).toContain("py-1");
    expect(result).not.toContain("text-red");
  });

  it("should handle empty input", () => {
    const result = cn("");
    expect(result).toBe("");
  });

  it("should handle multiple string inputs", () => {
    const result = cn("text-sm", "font-bold", "text-gray-800");
    expect(result).toContain("text-sm");
    expect(result).toContain("font-bold");
    expect(result).toContain("text-gray-800");
  });

  it("should handle array of classes", () => {
    const result = cn(["px-2", "py-1"]);
    expect(result).toContain("px-2");
    expect(result).toContain("py-1");
  });
});
