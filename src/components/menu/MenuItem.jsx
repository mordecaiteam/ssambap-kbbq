import { Flame } from "lucide-react";
import { dietaryLabels } from "../../data/menuData";

export default function MenuItem({ item }) {
  const hasImage = Boolean(item.image);

  if (hasImage) {
    return (
      <article className="group overflow-hidden border border-white/10 bg-black">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
          <img
            src={item.image}
            alt={item.imageAlt || item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Category */}
          {item.category && (
            <p className="mb-2 text-[8px] font-medium uppercase tracking-[0.2em] text-white/25">
              {item.category}
            </p>
          )}

          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-base font-medium tracking-[-0.02em] text-white md:text-lg">
                  {item.name}
                </h3>

                {item.korean && (
                  <span className="text-sm text-white/35">
                    {item.korean}
                  </span>
                )}

                {item.spicy && (
                  <Flame
                    size={14}
                    strokeWidth={1.5}
                    aria-label="Spicy"
                    className="text-white/45"
                  />
                )}
              </div>

              {item.note && (
                <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
                  {item.note}
                </p>
              )}
            </div>

            {item.price && (
              <span className="shrink-0 text-sm font-medium text-white md:text-base">
                {item.price}
              </span>
            )}
          </div>

          {item.description && (
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/45">
              {item.description}
            </p>
          )}

          {item.dietary?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {item.dietary.map((tag) => (
                <DietaryTag key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="border-b border-white/10 py-5 first:pt-0">
      {/* Category */}
      {item.category && (
        <p className="mb-2 text-[8px] font-medium uppercase tracking-[0.2em] text-white/25">
          {item.category}
        </p>
      )}

      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-sm font-medium tracking-[-0.01em] text-white md:text-[15px]">
              {item.name}
            </h3>

            {item.korean && (
              <span className="text-xs text-white/30">
                {item.korean}
              </span>
            )}

            {item.spicy && (
              <Flame
                size={13}
                strokeWidth={1.5}
                aria-label="Spicy"
                className="text-white/40"
              />
            )}
          </div>

          {item.description && (
            <p className="mt-1.5 max-w-xl text-xs leading-5 text-white/40 md:text-[13px]">
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
              {item.dietary.map((tag) => (
                <DietaryTag
                  key={tag}
                  tag={tag}
                  compact
                />
              ))}
            </div>
          )}
        </div>

        {item.price && (
          <span className="shrink-0 text-sm font-medium text-white/80">
            {item.price}
          </span>
        )}
      </div>
    </article>
  );
}

function DietaryTag({ tag, compact = false }) {
  const label = dietaryLabels[tag] || tag;

  return (
    <span
      title={label}
      aria-label={label}
      className={`inline-flex items-center border border-white/15 font-medium uppercase text-white/40 ${
        compact
          ? "px-1.5 py-1 text-[8px] tracking-[0.12em]"
          : "px-2 py-1 text-[8px] tracking-[0.15em]"
      }`}
    >
      {tag}
    </span>
  );
}