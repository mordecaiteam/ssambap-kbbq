export default function Intro() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-28 text-white md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
          Our Story
        </p>

        <h2 className="mx-auto max-w-4xl text-4xl font-medium leading-[1.08] tracking-[-0.04em] md:text-6xl lg:text-7xl">
          Korean food is about more than the meal.
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/50 md:text-base">
          Traditional Korean flavors, tabletop barbecue, and dishes
          designed around the simple idea that food is better when
          shared.
        </p>
      </div>
    </section>
  );
}