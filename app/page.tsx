import { DashboardPreview } from "@/components/home/dashboard-preview";
import { FaqSection } from "@/components/home/faq-section";
import { FeatureGrid } from "@/components/home/feature-grid";
import { HomeHero } from "@/components/home/home-hero";
import { PricingPreview } from "@/components/home/pricing-preview";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <FeatureGrid />
      <DashboardPreview />
      <PricingPreview />
      <FaqSection />
    </main>
  );
}
