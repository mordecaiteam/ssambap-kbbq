
import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import FeaturedDishes from "../components/home/FeaturedDishes";
import VisitUs from "../components/home/VisitUs";
import Experience from "../components/home/Experience";
import GalleryPreview from "../components/home/GalleryPreview";

import homeBackground from "../assets/home-page-bkgnd.png";
import mobileHomeBackground from "../assets/home-page-bkgnd(1).png";

export default function Home() {
  return (
    <main className="bg-black text-white">
      {/* =====================================================
          HERO
          Keeps its own slideshow/background
      ===================================================== */}
      <Hero />

      {/* =====================================================
          HOME CONTENT
          Shared background for all home sections
      ===================================================== */}
      <div className="relative isolate overflow-hidden bg-black">
        {/* ===================================================
            MOBILE BACKGROUND
            - Preserves the image's original proportions
            - Repeats vertically throughout the content
            - Avoids mobile fixed-background zoom issues
        =================================================== */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url("${mobileHomeBackground}")`,
            backgroundPosition: "center top",
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
          }}
        />

        {/* ===================================================
            DESKTOP BACKGROUND
            Keeps the existing fixed background appearance
        =================================================== */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-cover bg-center bg-no-repeat bg-fixed md:block"
          style={{
            backgroundImage: `url("${homeBackground}")`,
          }}
        />

        {/* ===================================================
            DARK OVERLAY
            Maintains readability across all sections
        =================================================== */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black/55"
        />

        {/* ===================================================
            MOBILE GRADIENT
            Softens the transitions between repeated images
        =================================================== */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.08))",
          }}
        />

        {/* ===================================================
            HOME PAGE SECTIONS
        =================================================== */}
        <div className="relative z-10">
          <Intro />
          <FeaturedDishes />
          <VisitUs />
          <Experience />
          <GalleryPreview />
        </div>
      </div>
    </main>
  );
}
