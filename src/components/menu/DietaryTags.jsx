const labels = {
  GF: "Gluten Free",
  V: "Vegetarian",
  VG: "Vegan",
};

export default function DietaryTags({
  dietary = [],
  spicy = false,
}) {
  if (!dietary.length && !spicy) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {spicy && (
        <span
          title="Spicy"
          className="border border-white/15 px-2 py-1 text-[8px] font-medium uppercase tracking-[0.18em] text-white/45"
        >
          Spicy
        </span>
      )}

      {dietary.map((tag) => (
        <span
          key={tag}
          title={labels[tag]}
          className="border border-white/15 px-2 py-1 text-[8px] font-medium uppercase tracking-[0.18em] text-white/45"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}