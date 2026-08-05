import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MobileNavigation } from "@/sections/site-header/mobile-navigation";

describe("mobile navigation", () => {
  it("announces state and returns focus when closed", async () => {
    const user = userEvent.setup();
    render(
      <MobileNavigation
        items={[{ id: "contact", label: "Contato", href: "#contact" }]}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Navegação móvel" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Fechar menu" }));
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
