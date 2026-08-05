interface BaseImageAsset {
  readonly src: `/${string}`;
  readonly width: number;
  readonly height: number;
  readonly priority?: boolean;
}

export interface InformativeImageAsset extends BaseImageAsset {
  readonly decorative: false;
  readonly alt: string;
}

export interface DecorativeImageAsset extends BaseImageAsset {
  readonly decorative: true;
}

export type ImageAsset = InformativeImageAsset | DecorativeImageAsset;
