
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Expand, Flame, X } from "lucide-react";

// =========================================================
// IMAGE LOOKUP
// =========================================================

const menuFiles = import.meta.glob(
  "../../assets/menu/**/*.webp",
  {
    eager: true,
    import: "default",
  }
);

const imageLookup = new Map();

for (const [path, url] of Object.entries(menuFiles)) {
  if (path.includes("/thumbs/")) continue;

  const filename = path.split("/").pop();
  const folder = path.slice(0, path.lastIndexOf("/"));
  const thumbnailPath = `${folder}/thumbs/${filename}`;

  imageLookup.set(filename.replace(/\.webp$/i, ""), {
    original: url,
    thumbnail: menuFiles[thumbnailPath] || url,
  });
}

function getImage(filename) {
  return imageLookup.get(filename) || null;
}

// =========================================================
// SHARED SOUP OPTIONS
// =========================================================

const soupChoices = [
  {
    name: "Soon Doo Boo",
    image: "traditional-soon-doo-boo",
    spicy: true,
  },
  {
    name: "Kimchi Jigae",
    image: "traditional-kimchi-jigae",
    spicy: true,
  },
  {
    name: "Dwenjang Jigae",
    image: "traditional-dwenjang-jigae",
  },
];

// =========================================================
// COMBO DATA
// =========================================================

const comboDetails = {
  1: {
    title: "Korean Beef Set",
    price: "$160",
    color: "#C94B4B",
    colorSoft: "rgba(201,75,75,0.12)",
    bbq: [
      {
        name: "Wang Kalbi Gui",
        image: "table-bbq-wang-kalbi-gui",
      },
      {
        name: "Bulgogi",
        image: "table-bbq-bulgogi",
      },
      {
        name: "Chadol Bagi",
        image: "table-bbq-cha-dol-bagi",
      },
    ],
    sides: [
      {
        name: "Small Pajun",
        image: "appetizer-pajun-small",
        options: ["Vegetable", "Kimchi", "Seafood"],
      },
      {
        name: "Egg Custard",
        image: "appetizer-steamed-egg-custard",
      },
    ],
  },

  2: {
    title: "Korean Pork Set",
    price: "$140",
    color: "#D6AE48",
    colorSoft: "rgba(214,174,72,0.12)",
    bbq: [
      {
        name: "Dae Gi Kalbi",
        image: "table-bbq-dae-gi-kalbi",
      },
      {
        name: "Sam Gyub Sal",
        image: "table-bbq-sam-gyub-sal",
      },
      {
        name: "Hang Jeong Sal",
        image: "table-bbq-hang-jeong-sal",
      },
    ],
    sides: [
      {
        name: "Small Pajun",
        image: "appetizer-pajun-small",
        options: ["Vegetable", "Kimchi", "Seafood"],
      },
      {
        name: "Egg Custard",
        image: "appetizer-steamed-egg-custard",
      },
    ],
  },

  3: {
    title: "Korean BBQ Set",
    price: "$150",
    color: "#638CC7",
    colorSoft: "rgba(99,140,199,0.12)",
    bbqNote:
      "Choose any 2 BBQ selections, except Beef Kalbi and Steamed Seafood.",
    entreeChoices: [
      {
        name: "Spicy Chicken",
        image: "traditional-spicy-chicken",
        spicy: true,
      },
      {
        name: "Squid Bokkum",
        image: "traditional-squid-bokkum",
        spicy: true,
      },
      {
        name: "Jayook Tofu Kimchi",
        image: "traditional-jayook-tofu-kimchi",
        spicy: true,
      },
    ],
    sides: [
      {
        name: "Large Pajun",
        image: "appetizer-pajun-large",
        options: ["Vegetable", "Kimchi", "Seafood"],
      },
      {
        name: "Egg Custard",
        image: "appetizer-steamed-egg-custard",
      },
    ],
  },
};

function getComboNumber(name = "") {
  const match = name.match(/combo\s*#?\s*(\d+)/i);
  return match ? Number(match[1]) : null;
}

// =========================================================
// GROUP HEADING
// =========================================================

function GroupHeading({ title, detail }) {
  return (
    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
      <h4 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
        {title}
      </h4>

      {detail && (
        <span className="text-[10px] text-white/35">
          {detail}
        </span>
      )}
    </div>
  );
}

// =========================================================
// DISH ROW
// =========================================================

function ComboDish({ dish, onImageClick }) {
  const image = getImage(dish.image);

  return (
    <div className="flex items-start gap-4 border-b border-white/10 py-5 last:border-b-0 sm:gap-5">
      <div className="min-w-0 flex-1 self-center">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h5 className="text-sm font-medium tracking-[-0.01em] text-white md:text-base">
            {dish.name}
          </h5>

          {dish.spicy && (
            <Flame
              size={13}
              strokeWidth={1.5}
              aria-label="Spicy"
              className="text-white/45"
            />
          )}
        </div>

        {dish.options && (
          <div className="mt-2">
            <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-white/35">
              Choose your pancake
            </p>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/55">
              {dish.options.map((option, index) => (
                <span key={option} className="inline-flex items-center gap-2">
                  {option}
                  {index < dish.options.length - 1 && (
                    <span className="text-white/20">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {image && (
        <button
          type="button"
          onClick={() =>
            onImageClick({
              src: image.original,
              name: dish.name,
              spicy: dish.spicy,
              options: dish.options,
            })
          }
          aria-label={`View larger image of ${dish.name}`}
          title="Click to enlarge"
          className="group relative h-20 w-20 shrink-0 cursor-zoom-in overflow-hidden bg-white/5 sm:h-24 sm:w-24"
        >
          <img
            src={image.thumbnail}
            alt={dish.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="pointer-events-none absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center bg-black/70 text-white">
            <Expand size={12} strokeWidth={1.5} />
          </span>
        </button>
      )}
    </div>
  );
}

// =========================================================
// DINNER COMBO CARD
// =========================================================

export default function DinnerComboCard({ item }) {
  const [activeImage, setActiveImage] = useState(null);

  const comboNumber = getComboNumber(item.name);
  const details = comboDetails[comboNumber];

  useEffect(() => {
    if (!activeImage) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow =
        previousHtmlOverflow;

      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage]);

  if (!details) return null;

  return (
    <>
      <article className="min-w-0">
        {/* COLORED COMBO HEADER */}
        <div
          className="relative mb-7 overflow-hidden border-b pb-6 pl-5 pr-2 pt-5 sm:pl-6"
          style={{
            borderColor: details.color,
            background: `linear-gradient(90deg, ${details.colorSoft}, transparent 85%)`,
          }}
        >
          {/* Color accent */}
          <span
            className="absolute bottom-0 left-0 top-0 w-[3px]"
            style={{ backgroundColor: details.color }}
          />

          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: details.color }}
              >
                Combo #{comboNumber}
              </p>

              <h3 className="mt-2 text-xl font-medium tracking-[-0.035em] text-white md:text-2xl">
                {details.title}
              </h3>
            </div>

            <span className="shrink-0 text-xl font-medium text-white md:text-2xl">
              {item.price || details.price}
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {/* BBQ */}
          <section>
            <GroupHeading
              title="Korean BBQ Set"
              detail={details.bbq ? "Included" : "Choose 2"}
            />

            {details.bbq ? (
              details.bbq.map((dish) => (
                <ComboDish
                  key={dish.name}
                  dish={dish}
                  onImageClick={setActiveImage}
                />
              ))
            ) : (
              <p className="py-4 text-sm leading-6 text-white/55">
                {details.bbqNote}
              </p>
            )}
          </section>

          {/* ENTRÉE CHOICES */}
          {details.entreeChoices && (
            <section>
              <GroupHeading
                title="Choice of 1 Entrée"
                detail="Choose 1"
              />

              {details.entreeChoices.map((dish) => (
                <ComboDish
                  key={dish.name}
                  dish={dish}
                  onImageClick={setActiveImage}
                />
              ))}
            </section>
          )}

          {/* SOUP */}
          <section>
            <GroupHeading
              title="Choice of 1 Soup"
              detail="Choose 1"
            />

            {soupChoices.map((dish) => (
              <ComboDish
                key={dish.name}
                dish={dish}
                onImageClick={setActiveImage}
              />
            ))}
          </section>

          {/* SIDES */}
          <section>
            <GroupHeading title="Plus" />

            {details.sides.map((dish) => (
              <ComboDish
                key={dish.name}
                dish={dish}
                onImageClick={setActiveImage}
              />
            ))}

            <div className="border-t border-white/10 py-4">
              <p className="text-sm text-white/65">
                4 Bowls of Rice
              </p>
            </div>
          </section>
        </div>
      </article>

      {/* IMAGE LIGHTBOX */}
      {activeImage &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeImage.name} image viewer`}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 px-4 py-6 md:px-10"
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveImage(null);
              }}
              aria-label="Close image"
              className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
            >
              <X size={23} strokeWidth={2} />
            </button>

            <div
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-full w-full max-w-5xl flex-col items-center"
            >
              <img
                src={activeImage.src}
                alt={activeImage.name}
                className="max-h-[75vh] max-w-full object-contain"
              />

              <div className="mt-5 text-center">
                <h2 className="text-xl font-medium text-white md:text-2xl">
                  {activeImage.name}
                </h2>

                {activeImage.spicy && (
                  <p className="mt-2 flex items-center justify-center gap-2 text-xs text-white/45">
                    <Flame size={12} strokeWidth={1.5} />
                    Spicy
                  </p>
                )}

                {activeImage.options && (
                  <p className="mt-2 text-xs text-white/45">
                    Options: {activeImage.options.join(" · ")}
                  </p>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
