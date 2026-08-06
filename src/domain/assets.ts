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

export interface VideoAsset {
  readonly src: `/${string}`;
  readonly poster: ImageAsset;
  readonly width: number;
  readonly height: number;
  readonly decorative: true;
}

export type HeroMedia =
  | {
      readonly type: "image";
      readonly asset: ImageAsset;
    }
  | {
      readonly type: "video";
      readonly asset: VideoAsset;
    };
