import { Play } from "lucide-react";

const YOUTUBE_VIDEO_ID = "MXfelO0kbns";

export default function Experience() {
  return (
    <section className="border-t border-white/10 px-6 py-20 text-white md:px-10 md:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
            The Ssambap Experience
          </p>

          <h2 className="text-[clamp(4rem,10vw,9rem)] font-bold leading-[0.82] tracking-[-0.065em]">
            GRILL.
            <br />
            WRAP.
            <br />
            SHARE.
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-5xl md:mt-14">
          <div className="relative aspect-video overflow-hidden border border-white/15">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
              title="The Ssambap Korean BBQ Experience"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-white/65">
            <Play
              size={12}
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
              Watch the Ssambap experience
            </span>
          </div>
        </div>

        <p className="mx-auto mt-7 max-w-xl text-center text-sm font-medium leading-7 text-white/75 md:text-base md:leading-8">
          Gather around the grill with banchan, fresh lettuce,
          rice, and everything you need to build your own ssam.
        </p>
      </div>
    </section>
  );
}