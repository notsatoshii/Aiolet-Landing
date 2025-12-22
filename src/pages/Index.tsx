import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import WhatIsAiolet from "@/components/sections/WhatIsAiolet";
import WhyAITeams from "@/components/sections/WhyAITeams";
import SwarmManagement from "@/components/sections/SwarmManagement";
import Templates from "@/components/sections/Templates";
import Marketplace from "@/components/sections/Marketplace";
import WhoItsFor from "@/components/sections/WhoItsFor";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import { InfiniteGridBackground } from "@/components/ui/infinite-grid-background";

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <InfiniteGridBackground />
      <Header />
      <HeroSection />
      <section id="features">
        <WhatIsAiolet />
      </section>
      <WhyAITeams />
      <SwarmManagement />
      <section id="templates">
        <Templates />
      </section>
      <section id="marketplace">
        <Marketplace />
      </section>
      <WhoItsFor />
      <section id="waitlist">
        <FinalCTA />
      </section>
      <Footer />
    </main>
  );
};

export default Index;
