import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

export default function Measure() {
  return (
    <MotionConfig>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-700 to-slate-900 pt-40">
        <div className="mx-8 grid w-full grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Component key={i} />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}

function Component() {
  let [isHovered, setIsHovered] = useState(false);

  console.log("hi");
  return (
    <div className="relative">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="overflow-hidden rounded-2xl bg-white"
        initial={false}
        layout
        variants={{
          small: {
            // width: "100%",
            position: "relative",
          },
          large: {
            position: "absolute",
            left: -20,
            right: -20,
            top: -20,
            // width: "auto",
          },
        }}
        animate={isHovered ? "large" : "small"}
        // animate={{ width: isHovered ? 500 : 400 }}
        // animate={{ scale: isHovered ? 2 : 1 }}
      >
        <div className="aspect-video w-full bg-green-500"></div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
            >
              <div className="p-8">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Magnam sint est natus magni accusamus dignissimos delectus,
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
