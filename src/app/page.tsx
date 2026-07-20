import Benefits from "@/components/sections/Benefits";
import Faq from "@/components/sections/Faq";
import Features from "@/components/sections/Features";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Nav from "@/components/sections/Nav";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Trio from "@/components/sections/Trio";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Trio />
        <Features />
        <Stats />
        <Testimonials />
        <Benefits />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
