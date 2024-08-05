import { Navbar } from "@/components/layout/navbar";
import { BenefitsSection } from "@/components/layout/sections/benefits";
import BooksSection from "@/components/layout/sections/books";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TestimonialSection } from "@/components/layout/sections/testimonial";




export default function Home() {
  return (
    <>
     <Navbar />
      <HeroSection />
      <SponsorsSection />
      <BooksSection />
      <BenefitsSection />
      <FeaturesSection />
      <BenefitsSection />
      <ServicesSection />
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
