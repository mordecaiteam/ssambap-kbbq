import Hero from "../components/Hero";
import Intro from "../components/Intro";
import FeaturedDishes from "../components/FeaturedDishes";
import Experience from "../components/Experience";
import GalleryPreview from "../components/GalleryPreview";
import VisitCTA from "../components/VisitCTA";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <Intro />
      <FeaturedDishes />
      <Experience />
      <GalleryPreview />
      <VisitCTA />
    </main>
  );
}