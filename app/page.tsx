import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Architecture } from "@/components/sections/architecture";
import { Research } from "@/components/sections/research";
import { Cta } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <Solution />
        <Architecture />
        <Research />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
