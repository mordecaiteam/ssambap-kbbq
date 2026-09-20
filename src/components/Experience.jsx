import { Play } from "lucide-react";

const YOUTUBE_VIDEO_ID = "MXfelO0kbns";

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

        <div className="mx-auto mt-20 max-w-5xl">
          <div className="relative aspect-video overflow-hidden border border-white/10 bg-white/5">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
              title="The Ssambap Korean BBQ Experience"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-white/30">
            <Play
              size={12}
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <span className="text-[9px] font-medium uppercase tracking-[0.2em]">
              Watch the Ssambap experience
            </span>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-7 text-white/50 md:text-base">
          Gather around the grill with banchan, fresh lettuce,
          rice, and everything you need to build your own ssam.
        </p>
      </div>
    </section>
  );
}