import { PageComposer } from "@/composition/page-composer";
import type { PresetId } from "@/domain/site";

import { resolveDemoPage } from "../_lib/resolve-demo-page";
import { PresetDemoSwitcher } from "./preset-demo-switcher";

interface DemoPresetPageProps {
  readonly presetId: PresetId;
}

export function DemoPresetPage({ presetId }: DemoPresetPageProps) {
  return (
    <>
      <PageComposer page={resolveDemoPage(presetId)} />
      <PresetDemoSwitcher currentPresetId={presetId} />
    </>
  );
}
