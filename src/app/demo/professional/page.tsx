import type { Metadata } from "next";

import { DemoPresetPage } from "../_components/demo-preset-page";
import { resolveDemoMetadata } from "../_lib/resolve-demo-page";

export const metadata: Metadata = resolveDemoMetadata("professional");

export default function ProfessionalDemoPage() {
  return <DemoPresetPage presetId="professional" />;
}
