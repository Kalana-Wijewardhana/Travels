"use client";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { ExperienceSection } from "@/components/experience-section";
import { Footer } from "@/components/footer";
import { ToursSection } from "@/components/tours-section";
import { StoriesSection } from "@/components/stories-section";
import { AboutSection } from "@/components/about-section";
import { FAQSection } from "@/components/faq-section";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main>
        <HeroSection />
        <ToursSection />
        <HowItWorks />
        {/* <StoriesSection /> */}
        <ExperienceSection />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
