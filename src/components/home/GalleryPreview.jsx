import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";

// Use existing optimized assets. Collage loads thumbnails; lightbox uses originals.
const galleryAssets = import.meta.glob("../../assets/gallery/**/*.webp", {
  eager: true,
  import: "default",
});
const menuAssets = import.meta.glob("../../assets/menu/**/*.webp", {
  eager: true,
  import: "default",
});

function galleryPhoto(category, filename, alt) {
  const folder = `../../assets/gallery/${category}`;
  const full = galleryAssets[`${folder}/${filename}.webp`];
  return full
    ? { src: full, thumb: galleryAssets[`${folder}/thumbs/${filename}.webp`] || full, alt }
    : null;
}

function menuPhoto(filename, alt) {
  const match = Object.keys(menuAssets).find(
    (path) => !path.includes("/thumbs/") && path.endsWith(`/${filename}.webp`)
  );
  if (!match) return null;
  const folder = match.slice(0, match.lastIndexOf("/"));
  return {
    src: menuAssets[match],
    thumb: menuAssets[`${folder}/thumbs/${filename}.webp`] || menuAssets[match],
    alt,
  };
}

// First image is the visual hook: a full Korean BBQ spread.
// Menu images are reused without copying or re-encoding them.
const galleryImages = [
  galleryPhoto("korean-bbq", "gallery-korean-bbq-table-1", "Korean barbecue feast at Ssambap"),
  menuPhoto("table-bbq-wang-kalbi-gui", "Wang Kalbi Gui, Korean grilled short ribs") ||
    galleryPhoto("korean-bbq", "gallery-rib-bbq-set", "Korean barbecue short ribs"),
  galleryPhoto("korean-dishes", "gallery-ssambap", "Ssambap Korean lettuce wraps and side dishes"),
  menuPhoto("bibimbap-dolsot-bibimbap", "Sizzling dolsot bibimbap") ||
    galleryPhoto("korean-dishes", "gallery-kimchi-jigae-set", "Traditional Korean meal at Ssambap"),
  galleryPhoto("restaurant", "gallery-restaurant-interior", "Inside Ssambap Korean BBQ"),
  menuPhoto("table-bbq-bulgogi", "Marinated Korean bulgogi") ||
    galleryPhoto("korean-bbq", "gallery-korean-bbq-table-2", "Korean BBQ shared at the table"),
].filter(Boolean);

const mobilePositions = [
  "col-span-3 row-span-5",
  "col-span-3 row-span-3",
  "col-span-3 row-span-4",
  "col-span-3 row-span-4",
  "col-span-3 row-span-3",
  "col-span-3 row-span-5",
];
const desktopPositions = [
  "col-span-5 row-span-5",
  "col-span-3 row-span-3",
  "col-span-4 row-span-3",
  "col-span-7 row-span-2",
  "col-span-4 row-span-3",
  "col-span-8 row-span-3",
];

export default function GalleryPreview() {
  const [activeImage, setActiveImage] = useState(null);
  const isOpen = activeImage !== null;
  const close = () => setActiveImage(null);
  const previous = () => setActiveImage((index) =>
    index === null ? null : (index - 1 + galleryImages.length) % galleryImages.length
  );
  const next = () => setActiveImage((index) =>
    index === null ? null : (index + 1) % galleryImages.length
  );

  useEffect(() => {
    if (!isOpen) return;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowLeft")
        setActiveImage((index) => (index - 1 + galleryImages.length) % galleryImages.length);
      if (event.key === "ArrowRight")
        setActiveImage((index) => (index + 1) % galleryImages.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
    };
  }, [isOpen]);

  if (!galleryImages.length) return null;

  return (
    <>
      <section className="border-t border-white/10 px-6 py-20 text-white md:px-10 md:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 md:mb-12">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">A Look Inside</p>
            <h2 className="text-5xl font-bold tracking-[-0.055em] md:text-7xl">Ssambap KBBQ</h2>
          </div>

          <div className="grid h-[680px] grid-cols-6 grid-rows-12 gap-1 overflow-hidden border border-white/15 sm:h-[820px] md:hidden">
            {galleryImages.map((image, index) => (
              <GalleryImage key={`mobile-${image.src}`} image={image} index={index} onClick={setActiveImage} className={mobilePositions[index]} priority={index === 0} />
            ))}
          </div>
          <div className="hidden h-[720px] grid-cols-12 grid-rows-8 gap-1 overflow-hidden border border-white/15 md:grid lg:h-[820px]">
            {galleryImages.map((image, index) => (
              <GalleryImage key={`desktop-${image.src}`} image={image} index={index} onClick={setActiveImage} className={desktopPositions[index]} priority={index === 0} />
            ))}
          </div>

          <div className="mt-10 flex justify-center md:mt-12">
            <Link to="/gallery" className="group flex h-13 items-center gap-4 border border-white/40 bg-black/30 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black">
              View Gallery
              <ArrowRight size={15} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {isOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 text-white" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={close}>
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-50 flex items-center justify-between p-4 md:p-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {String(activeImage + 1).padStart(2, "0")} <span className="mx-2 text-white/30">/</span> {String(galleryImages.length).padStart(2, "0")}
            </p>
            <button type="button" onClick={(event) => { event.stopPropagation(); close(); }} aria-label="Close gallery" className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-2xl transition hover:scale-105 md:h-14 md:w-14"><X size={25} strokeWidth={2.25} /></button>
          </div>
          <button type="button" onClick={(event) => { event.stopPropagation(); previous(); }} aria-label="Previous image" className="absolute left-3 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/70 transition hover:bg-white hover:text-black md:left-8 md:h-14 md:w-14"><ChevronLeft size={24} strokeWidth={1.5} /></button>
          <div className="relative z-10 flex h-full w-full items-center justify-center px-16 pb-16 pt-20 md:px-28 md:pb-20 md:pt-24" onClick={close}>
            <img key={galleryImages[activeImage].src} src={galleryImages[activeImage].src} alt={galleryImages[activeImage].alt} onClick={(event) => event.stopPropagation()} className="max-h-full max-w-full object-contain" />
          </div>
          <button type="button" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next image" className="absolute right-3 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/70 transition hover:bg-white hover:text-black md:right-8 md:h-14 md:w-14"><ChevronRight size={24} strokeWidth={1.5} /></button>
          <p className="pointer-events-none absolute bottom-5 left-1/2 z-40 w-[70%] -translate-x-1/2 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70 md:bottom-7">{galleryImages[activeImage].alt}</p>
        </div>, document.body
      )}
    </>
  );
}

function GalleryImage({ image, index, onClick, className = "", priority = false }) {
  return (
    <button type="button" onClick={() => onClick(index)} aria-label={`View ${image.alt}`} className={`group relative min-h-0 min-w-0 cursor-zoom-in overflow-hidden bg-black text-left ${className}`}>
      <img src={image.thumb} alt={image.alt} loading={priority ? "eager" : "lazy"} decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]" />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
      <span className="pointer-events-none absolute bottom-3 right-3 text-[8px] font-semibold tracking-[0.2em] text-white/0 transition-colors duration-300 group-hover:text-white/80">{String(index + 1).padStart(2, "0")}</span>
    </button>
  );
}
