import { FaqSection } from "@wew/screens/home/faqSection";
import { HeroSection } from "@wew/screens/home/heroSection";
import { JobListingsSection } from "@wew/screens/home/jobListingsSection";
import { TestimonialsSection } from "@wew/screens/home/testimonialsSection";

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
