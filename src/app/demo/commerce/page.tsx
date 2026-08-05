import type { Metadata } from "next";

import { DemoPresetPage } from "../_components/demo-preset-page";
import { resolveDemoMetadata } from "../_lib/resolve-demo-page";

export const metadata: Metadata = resolveDemoMetadata("commerce");

export default function CommerceDemoPage() {
  return <DemoPresetPage presetId="commerce" />;
}
