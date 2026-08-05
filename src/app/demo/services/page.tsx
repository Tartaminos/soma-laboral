import type { Metadata } from "next";

import { DemoPresetPage } from "../_components/demo-preset-page";
import { resolveDemoMetadata } from "../_lib/resolve-demo-page";

export const metadata: Metadata = resolveDemoMetadata("services");

export default function ServicesDemoPage() {
  return <DemoPresetPage presetId="services" />;
}
