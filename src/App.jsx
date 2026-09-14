import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import DesignWork from "./components/DesignWork";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <DesignWork />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
