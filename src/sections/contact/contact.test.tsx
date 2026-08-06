import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ContactSection as ContactSectionProps } from "@/domain/sections";
import { ContactSection } from "./contact";

const baseProps = {
  id: "contact",
  type: "contact",
  variant: "compact",
  title: "Vamos conversar",
  channels: [],
  openingHours: [],
} as const satisfies ContactSectionProps;

describe("ContactSection", () => {
  it("renders without optional contact details or social links", () => {
    render(<ContactSection {...baseProps} />);

    expect(
      screen.getByRole("heading", { name: "Vamos conversar" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders the WhatsApp action and an accessible Instagram icon link", () => {
    render(
      <ContactSection
        {...baseProps}
        action={{
          id: "whatsapp-contact",
          label: "Contato por WhatsApp",
          href: "https://wa.me/5511999999999?text=Ol%C3%A1",
          kind: "external",
        }}
        socialLinks={[
          {
            id: "instagram",
            label: "Abrir Instagram da Soma Laboral",
            href: "https://www.instagram.com/somalaboral/",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("link", { name: /Contato por WhatsApp/ }),
    ).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
    const instagram = screen.getByRole("link", {
      name: "Abrir Instagram da Soma Laboral",
    });
    expect(instagram).toHaveAttribute(
      "href",
      "https://www.instagram.com/somalaboral/",
    );
    expect(instagram.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("presents a service area and textual availability without an address", () => {
    const { container } = render(
      <ContactSection
        {...baseProps}
        availabilityText="Segunda a sexta, em horário comercial."
        serviceArea={{
          city: "Americana",
          region: "SP",
          country: "BR",
          label: "Americana/SP",
        }}
        variant="split"
      />,
    );

    expect(screen.getByText("Região atendida")).toBeInTheDocument();
    expect(screen.getByText("Americana/SP")).toBeInTheDocument();
    expect(
      screen.getByText("Segunda a sexta, em horário comercial."),
    ).toBeInTheDocument();
    expect(container.querySelector("address")).not.toBeInTheDocument();
  });
});
