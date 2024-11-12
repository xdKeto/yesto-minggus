import BlurBackground from "./components/BlurBackground";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills"
import Experiences from "./components/Experiences";
import Contacts from "./components/Contacts";

function App() {
  return (
    <>
      <BlurBackground />
      <Navbar />
      <main className="antialiased overflow-x-hidden overflow-y-hidden max-w-7xl mx-auto relative z-10">
      <Navbar />
        <Hero />
        <Projects />
        <Skills/>
        <Experiences/>
        <Contacts/>
      </main>
    </>
  );
}

export default App;
