import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";

function useScrollWithClamp({ clamp, ...rest }) {
  let { scrollY } = useScroll(rest);
  let pixelsScrolled = useMotionValue(0);
  let scrollYProgressClamped = useTransform(pixelsScrolled, [0, clamp], [0, 1]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      let previous = scrollY.getPrevious();
      let diff = latest - previous;
      let currentPixelsScrolled = pixelsScrolled.get();
      let shouldGrow = diff > 0 && currentPixelsScrolled < clamp;
      let shouldShrink = diff < 0 && currentPixelsScrolled > 0;

      if (shouldGrow || shouldShrink) {
        pixelsScrolled.set(currentPixelsScrolled + diff);
      }
    });
  }, [clamp, pixelsScrolled, scrollY]);

  return { scrollYProgressClamped };
}

export default function Header() {
  let container = useRef();
  let { scrollYProgressClamped } = useScrollWithClamp({
    clamp: 500,
    container,
    offset: ["start", "end"],
  });

  return (
    <div className="flex h-screen flex-col items-center justify-center overscroll-y-contain bg-gradient-to-br from-slate-700 to-slate-900 py-8 px-6 text-slate-600">
      <div className="relative mx-auto flex w-full max-w-3xl flex-1 overflow-hidden bg-white">
        <div ref={container} className="z-0 flex-1 overflow-y-scroll border-l">
          <motion.header
            style={{
              height: useTransform(scrollYProgressClamped, [0, 1], [100, 60]),
              background: useMotionTemplate`rgba(255 255 255 / ${useTransform(
                scrollYProgressClamped,
                [0, 1],
                [1, 0.1]
              )})`,
            }}
            className="absolute inset-x-0 top-0 flex items-center justify-between  px-8 shadow backdrop-blur-md"
          >
            <motion.p
              style={{
                scale: useTransform(scrollYProgressClamped, [0, 1], [1, 0.9]),
              }}
              className="origin-left text-xl font-semibold"
            >
              Logo
            </motion.p>
            <motion.nav
              style={{
                opacity: useTransform(scrollYProgressClamped, [0, 1], [1, 0]),
              }}
              className="flex space-x-4 text-sm font-medium text-slate-400"
            >
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </motion.nav>
          </motion.header>

          <main className="px-8 pt-[148px]">
            <h1 className="h-8 rounded bg-slate-200 text-2xl font-bold" />
            <div className="mt-8 space-y-6">
              {[...Array(2).keys()].map((i) => (
                <div key={i} className="space-y-2 text-sm">
                  <p className="h-4 w-5/6 rounded bg-slate-200" />
                  <p className="h-4 rounded bg-slate-200" />
                  <p className="h-4 w-4/6 rounded bg-slate-200" />
                </div>
              ))}
              <div className="h-64 rounded bg-slate-500"></div>
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
