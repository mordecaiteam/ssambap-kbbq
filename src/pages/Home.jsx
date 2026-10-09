import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import FeaturedDishes from "../components/home/FeaturedDishes";
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
          One continuous wrapper for every home section
      ===================================================== */}
      <div className="relative">
        {/* ===================================================
            MOBILE BACKGROUND
            Only visible below 768px
        =================================================== */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-fixed md:hidden"
          style={{
            backgroundImage: `url("${mobileHomeBackground}")`,
            backgroundSize: "cover",
          }}
          aria-hidden="true"
        />

        {/* ===================================================
            DESKTOP BACKGROUND
            Only visible at 768px and above
        =================================================== */}
        <div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat bg-fixed md:block"
          style={{
            backgroundImage: `url("${homeBackground}")`,
          }}
          aria-hidden="true"
        />

        {/* ===================================================
            ONE CONSISTENT DARK OVERLAY
        =================================================== */}
        <div
          className="pointer-events-none absolute inset-0 bg-black/55"
          aria-hidden="true"
        />

        {/* ===================================================
            HOME PAGE SECTIONS
        =================================================== */}
        <div className="relative z-10">
          <Intro />
          <FeaturedDishes />
          <Experience />
          <GalleryPreview />
        </div>
      </div>
    </main>
  );
}