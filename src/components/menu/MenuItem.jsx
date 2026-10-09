import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Expand, Flame, X } from "lucide-react";
import { dietaryLabels, menuThumbnail } from "../../data/menuData";

export default function MenuItem({ item }) {
  const [activeImage, setActiveImage] = useState(null);

  const images = useMemo(() => {
    if (item.images?.length) return item.images.filter((entry) => entry?.src);
    const entries = [];
    if (item.image) entries.push({ src: item.image, label: item.imageLabel || null });
    if (item.tableImage) entries.push({ src: item.tableImage, label: "Table Grill" });
    return entries;
  }, [item]);

  useEffect(() => {
    if (!activeImage) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage]);

  return (
    <>
      <article className="border-b border-white/10 py-6 md:py-7">
        {item.category && (
          <p className="mb-2 text-[8px] font-medium uppercase tracking-[0.2em] text-white/25">
            {item.category}
          </p>
        )}
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="text-sm font-medium tracking-[-0.01em] text-white md:text-base">
                    {item.name}
                  </h3>
                  {item.korean && <span className="text-xs text-white/30">{item.korean}</span>}
                  {item.spicy && <Flame size={13} strokeWidth={1.5} aria-label="Spicy" className="text-white/45" />}
                </div>
              </div>
              {item.price && (
                <span className="shrink-0 text-sm font-medium text-white/85 md:text-[15px]">
                  {item.price}
                </span>
              )}
            </div>
            {item.description && (
              <p className="mt-2 max-w-2xl text-xs leading-5 text-white/40 md:text-[13px] md:leading-6">
                {item.description}
              </p>
            )}
            {item.note && (
              <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
                {item.note}
              </p>
            )}
            {item.dietary?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.dietary.map((tag) => <DietaryTag key={tag} tag={tag} />)}
              </div>
            )}
          </div>
          {images.length > 0 && (
            <div className="flex shrink-0 gap-2">
              {images.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  aria-label={`View larger image of ${item.name}${image.label ? ` — ${image.label}` : ""}`}
                  className="group/image relative h-20 w-20 overflow-hidden border border-white/10 bg-white/5 sm:h-24 sm:w-24"
                >
                  <img
                    src={menuThumbnail(image.src)}
                    alt={`${item.imageAlt || item.name}${image.label ? ` — ${image.label}` : ""}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                  />
                  <span className="absolute inset-0 bg-black/0 transition-colors group-hover/image:bg-black/20" />
                  <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center bg-black/70 text-white opacity-90">
                    <Expand size={12} strokeWidth={1.5} />
                  </span>
                  {image.label && (
                    <span className="absolute bottom-0 left-0 right-0 bg-black/75 px-1.5 py-1 text-center text-[7px] font-medium uppercase tracking-[0.12em] text-white/80">
                      {image.label}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </article>
      {activeImage && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.name} image viewer`}
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 px-4 py-6 md:px-10 md:py-10"
        >
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); setActiveImage(null); }}
            aria-label="Close image"
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 md:right-8 md:top-8"
          >
            <X size={22} strokeWidth={2} />
          </button>
          <div onClick={(event) => event.stopPropagation()} className="flex max-h-full w-full max-w-5xl flex-col items-center">
            <img
              src={activeImage.src}
              alt={`${item.imageAlt || item.name}${activeImage.label ? ` — ${activeImage.label}` : ""}`}
              className="max-h-[72vh] max-w-full object-contain"
            />
            <div className="mt-5 w-full max-w-3xl text-center">
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <h2 className="text-xl font-medium tracking-[-0.025em] text-white md:text-2xl">{item.name}</h2>
                {item.korean && <span className="text-sm text-white/35">{item.korean}</span>}
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                {activeImage.label && <span>{activeImage.label}</span>}
                {activeImage.label && item.price && <span className="text-white/20">•</span>}
                {item.price && <span>{item.price}</span>}
                {(item.spicy || activeImage.spicy) && <span className="text-white/20">•</span>}
                {(item.spicy || activeImage.spicy) && <span className="inline-flex items-center gap-1"><Flame size={11} strokeWidth={1.5} /> Spicy</span>}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function DietaryTag({ tag }) {
  const label = dietaryLabels[tag] || tag;
  return (
    <span title={label} aria-label={label} className="inline-flex items-center border border-white/15 px-1.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-white/40">
      {tag}
    </span>
  );
}
