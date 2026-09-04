import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Journey from "../components/Journey";
import Footer from "../components/Footer";

function Landing() {
  return (
    <>
      <Navbar />

      <main className="pt-20">

        {/* =========================
            HOME / HERO
        ========================== */}

        <section
          id="home"
          className="scroll-mt-20"
        >
          <Hero />
        </section>


        {/* =========================
            FEATURES
        ========================== */}

        <section
          id="features"
          className="scroll-mt-20"
        >
          <Features />
        </section>


        {/* =========================
            HOW IT WORKS
        ========================== */}

        <section
          id="how-it-works"
          className="scroll-mt-20"
        >
          <Journey />
        </section>


        {/* =========================
            FOOTER
        ========================== */}

        <Footer />

      </main>
    </>
  );
}

export default Landing;