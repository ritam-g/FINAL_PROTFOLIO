import StatusBar from "@/components/layout/StatusBar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

/**
 * Home page — composes all portfolio sections in order.
 * All real logic lives in the section components.
 */
export default function Home() {
  return (
    <main>
      <StatusBar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
    </main>
  );
}
