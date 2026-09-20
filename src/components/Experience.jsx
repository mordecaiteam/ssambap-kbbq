export default function Experience() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-28 text-white md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-white/40">
            The Ssambap Experience
          </p>

          <h2 className="text-[clamp(4rem,10vw,9rem)] font-medium leading-[0.85] tracking-[-0.06em]">
            GRILL.
            <br />
            WRAP.
            <br />
            SHARE.
          </h2>
        </div>

        <div className="mx-auto mt-20 max-w-4xl overflow-hidden bg-white/5">
          <img
            src="/images/experience.jpg"
            alt="Korean barbecue and banchan"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-7 text-white/50 md:text-base">
          Gather around the grill with banchan, fresh lettuce, rice,
          and everything you need to build your own ssam.
        </p>
      </div>
    </section>
  );
}