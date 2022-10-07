import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

function useBoundedScroll(bound, rest) {
  let { scrollY } = useScroll(rest);
  let scrollYBounded = useMotionValue(0);
  let scrollYProgressBounded = useTransform(scrollYBounded, [0, bound], [0, 1]);

  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious();
      let diff = current - previous;
      let currentPixelsScrolled = scrollYBounded.get();
      let shouldGrow = diff > 0 && currentPixelsScrolled < bound;
      let shouldShrink = diff < 0 && currentPixelsScrolled > 0;

      if (shouldGrow || shouldShrink) {
        scrollYBounded.set(currentPixelsScrolled + diff);
      }
    });
  }, [bound, scrollYBounded, scrollY]);

  return { scrollYBounded, scrollYProgressBounded };
}

export default function Header() {
  let { scrollYBounded } = useBoundedScroll(600, {
    offset: ["start", "end"],
  });

  // Delay progress until 50% of the bound is scrolled
  let scrollYProgressBounded = useTransform(
    scrollYBounded,
    [0, 500, 600],
    [0, 0, 1]
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden text-slate-600">
      <div className="z-0 flex-1 overflow-y-scroll">
        <motion.header
          style={{
            height: useTransform(scrollYProgressBounded, [0, 1], [80, 50]),
            backgroundColor: useMotionTemplate`rgba(255 255 255 / ${useTransform(
              scrollYProgressBounded,
              [0, 1],
              [1, 0.1]
            )})`,
          }}
          className="fixed inset-x-0 flex shadow-sm backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
            <motion.p
              style={{
                scale: useTransform(scrollYProgressBounded, [0, 1], [1, 0.9]),
              }}
              className="flex origin-left items-center text-xl font-semibold uppercase"
            >
              <span className="inline-block -rotate-90 text-[10px] leading-[0]">
                The
              </span>{" "}
              <span className="-ml-1 text-2xl tracking-[-.075em]">
                Daily Bugle
              </span>
            </motion.p>
            <motion.nav
              style={{
                opacity: useTransform(scrollYProgressBounded, [0, 1], [1, 0]),
              }}
              className="flex space-x-4 text-xs font-medium text-slate-400"
            >
              <a href="#">News</a>
              <a href="#">Sports</a>
              <a href="#">Culture</a>
            </motion.nav>
          </div>
        </motion.header>

        <main className="px-8 pt-28">
          <h1 className="h-10 w-4/5 rounded bg-slate-200 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array(2).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
            <div className="h-64 rounded bg-slate-200"></div>
            {[...Array(90).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
