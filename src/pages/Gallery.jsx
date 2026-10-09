import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

// Optimized files live under src/assets/gallery/{category}/.
// Thumbnails are used in the grid; originals are used only in the viewer.
const assets = import.meta.glob("../assets/gallery/**/*.webp", {
  eager: true,
  import: "default",
});

const galleryPhotos = [
  { category: "korean-bbq", file: "gallery-korean-bbq-table-1.webp", title: "Korean Bbq Table 1" },
  { category: "restaurant", file: "gallery-restaurant-interior.webp", title: "Restaurant Interior" },
  { category: "korean-dishes", file: "gallery-ssambap.webp", title: "Ssambap" },
  { category: "korean-dishes", file: "gallery-banchan-rice-set-1.webp", title: "Banchan Rice Set 1" },
  { category: "korean-bbq", file: "gallery-rib-bbq-set.webp", title: "Rib Bbq Set" },
  { category: "restaurant", file: "gallery-restaurant-aquarium.webp", title: "Restaurant Aquarium" },
  { category: "korean-dishes", file: "gallery-kimchi-jigae-set.webp", title: "Kimchi Jigae Set" },
  { category: "korean-bbq", file: "gallery-korean-bbq-table-2.webp", title: "Korean Bbq Table 2" },
  { category: "restaurant", file: "gallery-restaurant-interior-2.webp", title: "Restaurant Interior 2" },
  { category: "korean-dishes", file: "gallery-banchan-rice-set-2.webp", title: "Banchan Rice Set 2" },
  { category: "korean-bbq", file: "gallery-korean-bbq-table-3.webp", title: "Korean Bbq Table 3" },
  { category: "restaurant", file: "gallery-restaurant-exterior.webp", title: "Restaurant Exterior" },
  { category: "more-food", file: "gallery-burger-1.webp", title: "Burger 1" },
  { category: "more-food", file: "gallery-burger-2.webp", title: "Burger 2" },
  { category: "more-food", file: "gallery-burger-3.webp", title: "Burger 3" },
  { category: "more-food", file: "gallery-burger-specials-2.webp", title: "Burger Specials 2" },
  { category: "more-food", file: "gallery-fried-chicken-platter-2.webp", title: "Fried Chicken Platter 2" },
  { category: "more-food", file: "gallery-fried-chicken-platter.webp", title: "Fried Chicken Platter" },
  { category: "restaurant", file: "gallery-restaurant-interior-3.webp", title: "Restaurant Interior 3" },
  { category: "more-food", file: "gallery-soup.webp", title: "Soup" },
  { category: "more-food", file: "gallery-spring-rolls-2.webp", title: "Spring Rolls 2" },
  { category: "more-food", file: "gallery-spring-rolls.webp", title: "Spring Rolls" },
  { category: "more-food", file: "gallery-sweet-sour-chicken.webp", title: "Sweet Sour Chicken" },
  { category: "more-food", file: "gallery-tuna-tartare-1.webp", title: "Tuna Tartare 1" },
  { category: "more-food", file: "gallery-tuna-tartare-2.webp", title: "Tuna Tartare 2" },
].map((photo) => ({
  ...photo,
  id: `${photo.category}/${photo.file}`,
  full: assets[`../assets/gallery/${photo.category}/${photo.file}`],
  thumb: assets[`../assets/gallery/${photo.category}/thumbs/${photo.file}`],
})).filter((photo) => photo.full);

// Reuse the exact optimized menu assets already installed for the menu page.
// Do not copy images into the gallery folder: each URL is shared by both pages.
const menuAssets = import.meta.glob("../assets/menu/**/*.webp", {
  eager: true,
  import: "default",
});

const menuPhotos = [
  { file: "table-bbq-wang-kalbi-gui", title: "Wang Kalbi Gui", category: "signature-dishes" },
  { file: "traditional-soon-doo-boo", title: "Soon Doo Boo", category: "signature-dishes" },
  { file: "bibimbap-dolsot-bibimbap", title: "Dolsot Bibimbap", category: "signature-dishes" },
  { file: "table-bbq-bulgogi", title: "Bulgogi", category: "signature-dishes" },
  { file: "appetizer-pajun-large", title: "Korean Pancake", category: "signature-dishes" },
  { file: "traditional-jap-chae", title: "Jap Chae", category: "signature-dishes" },
  { file: "lunch-combo-kimbap", title: "Kimbap", category: "signature-dishes" },
  { file: "lunch-combo-curry-katsu", title: "Curry Katsu", category: "signature-dishes" },
  { file: "traditional-kimchi-jigae", title: "Kimchi Jigae", category: "signature-dishes" },
  { file: "table-bbq-sam-gyub-sal", title: "Sam Gyub Sal", category: "signature-dishes" },
  { file: "traditional-spicy-pork", title: "Spicy Pork", category: "signature-dishes" },
  { file: "lunch-combo-ramyun-noodles", title: "Ramyun Noodles", category: "signature-dishes" },
  { file: "traditional-yook-gae-jang", title: "Yook Gae Jang", category: "signature-dishes" },
  { file: "appetizer-tukbockee", title: "Tteokbokki", category: "signature-dishes" },
];

const menuImageLookup = new Map();
for (const [path, url] of Object.entries(menuAssets)) {
  if (path.includes("/thumbs/")) continue;
  const filename = path.split("/").pop();
  const folder = path.slice(0, path.lastIndexOf("/"));
  menuImageLookup.set(filename, {
    full: url,
    thumb: menuAssets[`${folder}/thumbs/${filename}`] || url,
  });
}

const featuredPhotos = menuPhotos.map((photo) => ({
  ...photo,
  id: `menu/${photo.file}`,
  ...(menuImageLookup.get(`${photo.file}.webp`) || {}),
})).filter((photo) => photo.full);

// Interleave signature dishes with the original gallery photography.
const photos = [];
let featuredIndex = 0;
for (let index = 0; index < galleryPhotos.length; index += 1) {
  photos.push(galleryPhotos[index]);
  if (index % 2 === 1 && featuredIndex < featuredPhotos.length) {
    photos.push(featuredPhotos[featuredIndex]);
    featuredIndex += 1;
  }
}
photos.push(...featuredPhotos.slice(featuredIndex));
photos.forEach((photo, index) => {
  photo.shape = ["tall", "wide", "square", "tall", "square", "wide", "tall"][index % 7];
});

const filters = [
  { id: "all", label: "All" },
  { id: "signature-dishes", label: "Signature Dishes" },
  { id: "korean-bbq", label: "Korean BBQ" },
  { id: "korean-dishes", label: "Korean Dishes" },
  { id: "restaurant", label: "Our Restaurant" },
  { id: "more-food", label: "More Food" },
];

export default function Gallery() {
  const [category, setCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(null);
  const visible = useMemo(
    () => photos.filter((photo) => category === "all" || photo.category === category),
    [category]
  );
  const activePhoto = activeIndex === null ? null : visible[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const oldBody = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((n) => (n + 1) % visible.length);
      if (event.key === "ArrowLeft") setActiveIndex((n) => (n - 1 + visible.length) % visible.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = oldBody;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, visible.length]);

  const selected = filters.find((filter) => filter.id === category);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-12 sm:px-8 md:pt-20 lg:px-12">
        <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-9 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">Ssambap Korean BBQ</p>
            <h1 className="text-4xl font-medium tracking-[-0.05em] sm:text-5xl md:text-6xl">Gallery</h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/45">A closer look at our signature dishes, the grill, and the spaces that make Ssambap special.</p>
        </div>

        <nav aria-label="Gallery categories" className="mb-12 flex flex-wrap gap-2 border-b border-white/10 pb-7 md:mb-16">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => { setCategory(filter.id); setActiveIndex(null); }}
              aria-pressed={category === filter.id}
              className={`rounded-full border px-4 py-2.5 text-xs font-medium transition-colors sm:px-5 ${
                category === filter.id
                  ? "border-white bg-white text-black"
                  : "border-white/20 bg-white/[0.03] text-white/65 hover:border-white/50 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">{selected?.label}</p>
            <p className="mt-2 text-sm text-white/40">{visible.length} {visible.length === 1 ? "photo" : "photos"}</p>
          </div>
          <p className="hidden text-xs text-white/30 sm:block">Select a photo to view larger</p>
        </div>

        {/* CSS columns produce a staggered masonry collage with no layout library. */}
        <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4">
          {visible.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-white/5 text-left sm:mb-4"
              aria-label={`View ${photo.title}`}
            >
              <img
                src={photo.thumb || photo.full}
                alt={photo.title}
                loading={index < 4 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                  photo.shape === "tall" ? "aspect-[3/4]" : photo.shape === "wide" ? "aspect-[5/4]" : "aspect-square"
                }`}
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <span className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span>{photo.title}</span><Expand size={16} />
              </span>
            </button>
          ))}
        </div>
      </div>

      {activePhoto && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activePhoto.title} photo viewer`}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 px-4 py-16"
          onClick={() => setActiveIndex(null)}
        >
          <button type="button" aria-label="Close photo" onClick={() => setActiveIndex(null)} className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black md:right-8 md:top-8"><X size={22} /></button>
          {visible.length > 1 && (
            <>
              <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setActiveIndex((activeIndex - 1 + visible.length) % visible.length); }} className="absolute bottom-5 left-[calc(50%-70px)] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/80 text-white md:bottom-auto md:left-5"><ChevronLeft size={24} /></button>
              <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setActiveIndex((activeIndex + 1) % visible.length); }} className="absolute bottom-5 right-[calc(50%-70px)] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/80 text-white md:bottom-auto md:right-5"><ChevronRight size={24} /></button>
            </>
          )}
          <div onClick={(e) => e.stopPropagation()} className="flex max-h-full w-full max-w-6xl flex-col items-center">
            <img src={activePhoto.full} alt={activePhoto.title} className="max-h-[75vh] max-w-full object-contain" />
            <div className="mt-4 text-center">
              <p className="text-base font-medium text-white">{activePhoto.title}</p>
              <p className="mt-1 text-xs text-white/40">{activeIndex + 1} / {visible.length}</p>
            </div>
          </div>
        </div>, document.body
      )}
    </main>
  );
}
