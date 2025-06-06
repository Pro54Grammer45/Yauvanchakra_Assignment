'use client';

import { notifyError } from "@/utils/toast";

const useDisableForDemo = (): { handleDisableForDemo: () => boolean } => {
  const handleDisableForDemo = (): boolean => {
    const isDisableForDemoEnable = process.env.NEXT_PUBLIC_DISABLE_FOR_DEMO === "true";
    if (isDisableForDemoEnable) {
      notifyError("This feature is disabled for demo!");
      return true; // Indicate that the feature is disabled
    }
    return false; // Indicate that the feature is enabled
  };

  return {
    handleDisableForDemo,
  };
};

export default useDisableForDemo;
