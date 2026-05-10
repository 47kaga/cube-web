import type { ReactNode } from "react";
import { CRTFrame } from "./CRTFrame";

/** VCR-style outer shell; thin wrapper over CRTFrame for semantic naming. */
export function AnalogShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <CRTFrame variant="dark" className={className}>
      {children}
    </CRTFrame>
  );
}
