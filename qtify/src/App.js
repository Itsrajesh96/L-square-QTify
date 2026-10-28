import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";

function App() {
  return (
    <>
      <Navbar searchData={[]} />
      <Hero />
      <Section title="Top Albums" />
    </>
  );
}

export default App;