export interface Address {
  readonly street: string;
  readonly number: string;
  readonly complement?: string;
  readonly district?: string;
  readonly city: string;
  readonly region: string;
  readonly postalCode: string;
  readonly country: string;
}

export interface ContactChannel {
  readonly type: "phone" | "email" | "url";
  readonly label: string;
  readonly value: string;
  readonly href: string;
}

export interface OpeningHours {
  readonly id: string;
  readonly days: readonly string[];
  readonly isClosed: boolean;
  readonly opens?: string;
  readonly closes?: string;
}

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export type ServiceArea =
  | {
      readonly type: "city";
      readonly city: string;
      readonly region: string;
      readonly country: string;
      readonly label: string;
    }
  | {
      readonly type: "country";
      readonly name: string;
      readonly countryCode: string;
      readonly label: string;
    };
