import { AnimatePresence, motion } from "framer-motion";
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
  let [{ index, direction }, set] = useState({ index: 0, direction: null });
  let [ref, bounds] = useMeasure();

  return (
    <div className="flex h-full flex-col justify-center bg-black">
      <div className="relative">
        <motion.div
          animate={{ x: `${index * -100}%` }}
          transition={{
            x: {
              type: "spring",
              stiffness: 300,
              damping: 30,
            },
            opacity: { duration: 0.2 },
          }}
          className="flex aspect-video w-full"
          ref={ref}
        >
          {images.map((image, i) => (
            <motion.img
              key={image}
              src={image}
              // custom={direction}
              // variants={{
              //   enter: (direction) => ({
              //     x: bounds.width * direction,
              //     opacity: 0,
              //   }),
              //   center: { x: 0, opacity: 1 },
              //   exit: (direction) => ({
              //     x: -bounds.width * direction,
              //     opacity: 0,
              //   }),
              // }}
              className="h-full w-full shrink-0 object-cover"
              transition={{
                // x: {
                //   type: "spring",
                //   stiffness: 300,
                //   damping: 30,
                // },
                opacity: { duration: 0.2 },
              }}
              animate={{ opacity: i === index ? 1 : 0 }}
              // initial="enter"
              // animate="center"
              // exit="exit"
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {index > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0, transition: "none" }}
              transition={{ opacity: { duration: 0.2 } }}
              whileHover={{ opacity: 1 }}
              className="absolute left-2 top-[calc(50%-16px)] flex h-8 w-8 items-center justify-center rounded-full bg-white"
              onClick={() => set({ index: index - 1, direction: -1 })}
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
              transition={{ opacity: { duration: 0.2 } }}
              whileHover={{ opacity: 1 }}
              className="absolute right-2 top-[calc(50%-16px)] flex h-8 w-8 items-center justify-center rounded-full bg-white"
              onClick={() => set({ index: index + 1, direction: 1 })}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
