import { ASTROLOGY_DISCLAIMER } from "@/lib/constants";

export function SiteDisclaimer() {
  return (
    <p className="max-w-sm text-sm leading-6 text-muted-foreground">
      {ASTROLOGY_DISCLAIMER}
    </p>
  );
}
