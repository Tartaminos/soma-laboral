import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { PresetDemoSwitcher } from "./preset-demo-switcher";

afterEach(cleanup);

describe("preset demo switcher", () => {
  it("announces its state and identifies the current preset", async () => {
    const user = userEvent.setup();
    render(<PresetDemoSwitcher currentPresetId="commerce" />);

    const trigger = screen.getByRole("button", {
      name: "Alternar preset de demonstração",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Presets de demonstração" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Comércio, atual" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<PresetDemoSwitcher currentPresetId="services" />);

    const trigger = screen.getByRole("button", {
      name: "Alternar preset de demonstração",
    });
    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    expect(
      screen.queryByRole("navigation", { name: "Presets de demonstração" }),
    ).not.toBeInTheDocument();
  });

  it("closes when an option is selected or the trigger is toggled", async () => {
    const user = userEvent.setup();
    render(<PresetDemoSwitcher currentPresetId="services" />);

    const trigger = screen.getByRole("button", {
      name: "Alternar preset de demonstração",
    });
    await user.click(trigger);
    const commerceLink = screen.getByRole("link", { name: "Comércio" });
    commerceLink.addEventListener("click", (event) => event.preventDefault());
    await user.click(commerceLink);
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
