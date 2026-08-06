import { describe, expect, it } from "vitest";

import { defaultTheme } from "@/site/theme/default-theme";
import { resolveThemeCss } from "@/styles/resolve-theme";

describe("theme resolver", () => {
  it("publishes the known semantic tokens", () => {
    const css = resolveThemeCss(defaultTheme);
    expect(css).toContain("--color-background:#f4f5ef");
    expect(css).toContain("--color-focus:#9e2c36");
    expect(css).toContain("--content-width:76rem");
  });
});
