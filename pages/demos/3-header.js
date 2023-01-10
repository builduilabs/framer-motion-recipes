import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

import { useEffect, useRef } from "react";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-700">
      <div className="flex h-[400px] w-full max-w-md flex-col">
        <HeaderComponent />
      </div>
    </div>
  );
}

let clamp = (number, min, max) => Math.min(Math.max(number, min), max);

function useBoundedScroll(bounds, scrollOptions) {
  let { scrollY } = useScroll(scrollOptions);
  let scrollYBounded = useMotionValue(0);
  let scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, bounds],
    [0, 1]
  );

  setInterval(() => {});

  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious();
      let diff = current - previous;
      let newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds));
    });
  }, [bounds, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

function HeaderComponent() {
  let containerEl = useRef(null);
  let targetRef = useRef(null);
  let { scrollYBoundedProgress } = useBoundedScroll(200, {
    target: targetRef,
    container: containerEl,
  });
  let scrollYBoundedProgressThrottled = scrollYBoundedProgress;
  // let scrollYBoundedProgressThrottled = useTransform(
  //   scrollYBoundedProgress,
  //   [0, 1],
  //   [0, 1]
  // );

  // useEffect(() => {
  //   containerEl.current.scrollTop = 2232;
  //   let x, y;

  //   x = setTimeout(() => {
  //     y = setInterval(() => {
  //       let currentScroll = containerEl.current.scrollTop;
  //       let newScroll = currentScroll === 2232 ? 2132 : 2232;

  //       containerEl.current.scroll({ top: newScroll, behavior: "smooth" });
  //     }, 2000);
  //   }, 0);

  //   return () => {
  //     clearTimeout(x);
  //     clearInterval(y);
  //   };
  // }, []);

  return (
    <div className="mx-auto flex max-h-full w-full max-w-3xl flex-1 overflow-hidden rounded bg-white text-zinc-600 backdrop-blur-0">
      <div className="z-0 flex-1 overflow-y-scroll" ref={containerEl}>
        <motion.header
          style={{
            height: useTransform(
              scrollYBoundedProgressThrottled,
              [0, 1],
              [80, 50]
            ),
            backgroundColor: useMotionTemplate`rgb(255 255 255 / ${useTransform(
              scrollYBoundedProgressThrottled,
              [0, 1],
              [1, 0.1]
            )})`,
          }}
          className="sticky inset-x-0 top-0 flex h-20 shadow-sm backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
            <motion.p
              style={{
                scale: useTransform(
                  scrollYBoundedProgressThrottled,
                  [0, 1],
                  [1, 0.9]
                ),
              }}
              className="flex origin-left items-center text-xl font-semibold uppercase"
            >
              <span className="-ml-1.5 inline-block -rotate-90 text-[8px] leading-[0]">
                The
              </span>
              <span className="-ml-1 text-xl tracking-[-.075em]">
                Daily Bugle
              </span>
            </motion.p>
            <motion.nav
              style={{
                opacity: useTransform(
                  scrollYBoundedProgressThrottled,
                  [0, 1],
                  [1, 0]
                ),
              }}
              className="flex space-x-4 text-xs font-semibold text-zinc-500"
            >
              <a href="#">News</a>
              <a href="#">Sports</a>
              <a href="#">Culture</a>
            </motion.nav>
          </div>
        </motion.header>

        <main className="bg-white px-8 pt-12" ref={targetRef}>
          <h1 className="h-10 w-4/5 rounded bg-zinc-200 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array(2).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-zinc-200" />
                <p className="h-4 rounded bg-zinc-200" />
                <p className="h-4 w-4/6 rounded bg-zinc-200" />
              </div>
            ))}
            <div className="h-64 rounded bg-zinc-200"></div>
            {[...Array(90).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-zinc-200" />
                <p className="h-4 rounded bg-zinc-200" />
                <p className="h-4 w-4/6 rounded bg-zinc-200" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
