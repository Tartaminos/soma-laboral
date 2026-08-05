import { describe, expect, it } from "vitest";

import { defaultTheme } from "@/site/theme/default-theme";
import { resolveThemeCss } from "@/styles/resolve-theme";

describe("theme resolver", () => {
  it("publishes the known semantic tokens", () => {
    const css = resolveThemeCss(defaultTheme);
    expect(css).toContain("--color-background:#fbfaf7");
    expect(css).toContain("--color-focus:#b34700");
    expect(css).toContain("--content-width:72rem");
  });
});
