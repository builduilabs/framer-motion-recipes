import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useState } from "react";
import useMeasure from "react-use-measure";

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

  return (
    <MotionConfig
      transition={{
        // x: { type: "spring", stiffness: 300, damping: 30 },
        x: { type: "spring", bounce: 0, duration: 1 },
        width: { type: "spring", bounce: 0, duration: 1 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="flex h-full flex-col justify-center bg-black">
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: `${index * -100}%` }}
            // transition={{
            //   x: {
            //     type: "spring",
            //     stiffness: 300,
            //     damping: 30,
            //   },
            // }}
            className="flex aspect-[3/2] w-full"
          >
            {images.map((image, i) => (
              <motion.img
                key={image}
                src={image}
                className="h-full w-full shrink-0 object-cover"
                // transition={{
                //   opacity: { duration: 0.2 },
                // }}
                animate={{ opacity: i === index ? 1 : 0 }}
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {index > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, transition: "none" }}
                // transition={{ opacity: { duration: 0.2 } }}
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
                exit={{ opacity: 0, transition: "none" }}
                // transition={{ opacity: { duration: 0.2 } }}
                whileHover={{ opacity: 1 }}
                className="absolute right-2 top-[calc(50%-16px)] flex h-8 w-8 items-center justify-center rounded-full bg-white"
                onClick={() => setIndex(index + 1)}
              >
                <ChevronRightIcon className="h-6 w-6" />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="">
            <motion.div
              initial={false}
              animate={{ x: `${-index * 50}%` }}
              // transition={{
              //   x: {
              //     type: "spring",
              //     stiffness: 300,
              //     damping: 30,
              //   },
              // }}
              className="mx-auto mt-8 flex aspect-[3/2] h-32 gap-1"
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
                    // transition={{
                    //   opacity: { duration: 0.2 },
                    // }}
                    className="aspect-[3/2] h-full object-cover"
                    src={image}
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
