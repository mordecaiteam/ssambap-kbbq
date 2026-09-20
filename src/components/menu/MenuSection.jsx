import MenuItem from "./MenuItem";

export default function MenuSection({ section }) {
  const imageItems = section.items.filter((item) => item.image);
  const standardItems = section.items.filter((item) => !item.image);

  return (
    <section
      id={section.id}
      className="scroll-mt-40 border-t border-white/10 py-16 md:py-20"
    >
      {/* Section heading */}
      <div className="grid gap-5 lg:grid-cols-[220px_1fr] lg:gap-12">
        <div>
          {section.number && (
            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/25">
              {section.number}
            </span>
          )}

          <h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-white md:text-3xl">
            {section.title}
          </h2>
        </div>

        {section.note && (
          <p className="max-w-2xl self-end text-xs leading-6 text-white/40 md:text-sm">
            {section.note}
          </p>
        )}
      </div>

      {/* Regular menu items */}
      {standardItems.length > 0 && (
        <div className="mt-10 grid gap-x-14 md:grid-cols-2">
          {standardItems.map((item, index) => (
            <MenuItem
              key={`${section.id}-${item.name}-${index}`}
              item={item}
            />
          ))}
        </div>
      )}

      {/* Featured photographed dishes */}
      {imageItems.length > 0 && (
        <div
          className={`grid gap-5 ${
            standardItems.length > 0 ? "mt-12" : "mt-10"
          } md:grid-cols-2 lg:gap-6`}
        >
          {imageItems.map((item, index) => (
            <MenuItem
              key={`${section.id}-${item.name}-image-${index}`}
              item={item}
            />
          ))}
        </div>
      )}
    </section>
  );
}