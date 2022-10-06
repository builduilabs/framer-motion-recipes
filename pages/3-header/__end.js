import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";

function useScrollWithBound(bound, rest) {
  let { scrollY } = useScroll(rest);
  let scrollYBounded = useMotionValue(0);
  let scrollYProgressBounded = useTransform(scrollYBounded, [0, bound], [0, 1]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      let previous = scrollY.getPrevious();
      let diff = latest - previous;
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
  let container = useRef();
  let { scrollYBounded } = useScrollWithBound(600, {
    container,
    offset: ["start", "end"],
  });

  // Delay progress until 50% of the bound is scrolled
  let scrollYProgressBounded = useTransform(
    scrollYBounded,
    [0, 500, 600],
    [0, 0, 1]
  );

  return (
    <div className="flex h-screen flex-col items-center justify-center overscroll-y-contain bg-gradient-to-br from-slate-700 to-slate-900 py-8 px-6 text-slate-600">
      <div className="relative mx-auto flex w-full max-w-3xl flex-1 overflow-hidden bg-white">
        <div ref={container} className="z-0 flex-1 overflow-y-scroll border-l">
          <motion.header
            style={{
              height: useTransform(scrollYProgressBounded, [0, 1], [80, 50]),
              backgroundColor: useMotionTemplate`rgba(255 255 255 / ${useTransform(
                scrollYProgressBounded,
                [0, 1],
                [1, 0.1]
              )})`,
            }}
            className="absolute inset-x-0 top-0 flex items-center justify-between px-8 shadow backdrop-blur-md"
          >
            <motion.p
              style={{
                scale: useTransform(scrollYProgressBounded, [0, 1], [1, 0.9]),
              }}
              className="flex origin-left items-center text-xl font-semibold uppercase"
            >
              <span className="inline-block -rotate-90 text-[10px] leading-[0]">
                The
              </span>{" "}
              <span className="-ml-1 text-xl tracking-[-.075em]">
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
          </motion.header>

          <main className="px-8 pt-32">
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
    </div>
  );
}
