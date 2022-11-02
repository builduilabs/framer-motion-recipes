import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useState } from "react";
import useKeypress from "react-use-keypress";

let images = [
  "/images/1.jpeg",
  "/images/2.jpeg",
  "/images/3.jpeg",
  "/images/4.jpeg",
  "/images/5.jpeg",
  "/images/6.jpeg",
];

export default function Page() {
  let [index, setIndex] = useState(0);

  useKeypress("ArrowRight", () => {
    if (index + 1 < images.length) {
      setIndex(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  });

  return (
    <MotionConfig
      transition={{
        // New
        duration: 0.7,
        ease: [0.32, 0.72, 0, 1],

        // Original
        // type: "spring",
        // stiffness: 300,
        // damping: 30,
      }}
    >
      <div className="h-full bg-black">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `${index * -100}%` }}
              className="flex aspect-[3/2] w-full"
            >
              {images.map((image, i) => (
                <motion.img
                  key={image}
                  src={image}
                  className="h-full w-full shrink-0 object-cover"
                  animate={{ opacity: i === index ? 1 : 0.3 }}
                />
              ))}
            </motion.div>
            <AnimatePresence>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, transition: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-[calc(50%-16px)] flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-[calc(50%-16px)] flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <motion.div
            initial={false}
            animate={{ x: `${-index * 50}%` }}
            className="mx-auto mt-8 flex aspect-[3/2] h-16 gap-1"
          >
            {images.map((image, i) => (
              <motion.button
                initial={false}
                animate={{ width: i === index ? "100%" : "50%" }}
                onClick={() => setIndex(i)}
                key={image}
                className="inline-block w-full shrink-0"
              >
                <motion.img
                  initial={false}
                  animate={{ opacity: i === index ? 1 : 0.5 }}
                  whileHover={{ opacity: 1 }}
                  className="aspect-[3/2] h-full object-cover"
                  src={image}
                />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
