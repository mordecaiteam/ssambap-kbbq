import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import samGyupSalImage from "../assets/menu/menu-sam-gyup-sal.jpg";
import bibimbapImage from "../assets/menu/menu-bibimbap.jpg";
import chickenWingImage from "../assets/menu/menu-chickenwing.jpg";

const galleryImages = [
  {
    src: samGyupSalImage,
    alt: "Korean barbecue at Ssambap Korean BBQ",
  },
  {
    src: chickenWingImage,
    alt: "Korean chicken wings at Ssambap Korean BBQ",
  },
  {
    src: bibimbapImage,
    alt: "Bibimbap at Ssambap Korean BBQ",
  },
];

export default function GalleryPreview() {
  const [activeImage, setActiveImage] = useState(null);

  const isLightboxOpen = activeImage !== null;

  const openLightbox = (index) => {
    setActiveImage(index);
  };

  const closeLightbox = () => {
    setActiveImage(null);
  };

  const showPreviousImage = () => {
    setActiveImage((current) => {
      if (current === null) return 0;

      return current === 0
        ? galleryImages.length - 1
        : current - 1;
    });
  };

  const showNextImage = () => {
    setActiveImage((current) => {
      if (current === null) return 0;

      return current === galleryImages.length - 1
        ? 0
        : current + 1;
    });
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent the page behind the lightbox from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen]);

  return (
    <>
      <section className="border-t border-white/10 bg-black px-6 py-28 text-white md:py-40">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16">
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/40">
              A Look Inside
            </p>

            <h2 className="text-5xl font-medium tracking-[-0.05em] md:text-7xl">
              Ssambap.
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Large Left Image */}
            <button
              type="button"
              onClick={() => openLightbox(0)}
              aria-label="View Korean barbecue image"
              className="group col-span-8 cursor-zoom-in overflow-hidden bg-white/5 text-left md:col-span-5"
            >
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
            </button>

            {/* Small Right Image */}
            <button
              type="button"
              onClick={() => openLightbox(1)}
              aria-label="View chicken wings image"
              className="group col-span-4 mt-20 cursor-zoom-in overflow-hidden bg-white/5 text-left md:col-span-3 md:col-start-8"
            >
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
            </button>

            {/* Bottom Image */}
            <button
              type="button"
              onClick={() => openLightbox(2)}
              aria-label="View bibimbap image"
              className="group col-span-8 col-start-3 mt-8 cursor-zoom-in overflow-hidden bg-white/5 text-left md:col-span-5 md:col-start-6"
            >
              <img
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
            </button>
          </div>

          <div className="mt-14 flex justify-end">
            <Link
              to="/gallery"
              className="group flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
            >
              View Gallery

              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 py-6 backdrop-blur-sm md:px-12"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-5 md:px-8 md:py-7">
            {/* Image Counter */}
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
              {String(activeImage + 1).padStart(2, "0")}
              <span className="mx-2 text-white/20">/</span>
              {String(galleryImages.length).padStart(
                2,
                "0"
              )}
            </p>

            {/* Close */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close image viewer"
              className="flex h-11 w-11 items-center justify-center border border-white/20 bg-black/40 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Previous */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black md:left-8 md:h-14 md:w-14"
          >
            <ChevronLeft
              size={23}
              strokeWidth={1.5}
            />
          </button>

          {/* Image */}
          <div
            className="relative flex h-full w-full items-center justify-center px-12 py-16 md:px-20"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={galleryImages[activeImage].src}
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].alt}
              className="max-h-[82vh] max-w-full object-contain"
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black md:right-8 md:h-14 md:w-14"
          >
            <ChevronRight
              size={23}
              strokeWidth={1.5}
            />
          </button>

          {/* Bottom Caption */}
          <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 md:bottom-7">
            <p className="whitespace-nowrap text-center text-[9px] font-medium uppercase tracking-[0.18em] text-white/40">
              {galleryImages[activeImage].alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}