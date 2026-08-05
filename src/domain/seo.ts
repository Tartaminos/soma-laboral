export type StructuredDataType =
  | "LocalBusiness"
  | "ProfessionalService"
  | "Store";

export interface SeoConfiguration {
  readonly defaultTitle: string;
  readonly titleTemplate: string;
  readonly defaultDescription: string;
  readonly locale: string;
  readonly socialImage?: `/${string}`;
  readonly structuredDataType: StructuredDataType;
}
