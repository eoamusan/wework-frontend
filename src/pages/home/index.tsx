import { FaqSection } from "@wew/pages/home/faqSection";
import { HeroSection } from "@wew/pages/home/heroSection";
import { JobListingsSection } from "@wew/pages/home/jobListingsSection";
import { TestimonialsSection } from "@wew/pages/home/testimonialsSection";

export default function HomePage() {
  return (
    <main className="bg-main-bg">
      <div className="mx-auto flex w-full flex-col gap-8">
        <HeroSection />
        <JobListingsSection />
        <TestimonialsSection />
        <FaqSection />
      </div>
    </main>
  );
}
