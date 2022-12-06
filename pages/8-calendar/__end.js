import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

export default function Page() {
  // Use the useState hook to manage the current date in state
  let [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"));
  let [previousMonthString, setPreviousMonthString] = useState(monthString);
  let [isAnimating, setIsAnimating] = useState(false);
  let month = parse(monthString, "yyyy-MM", new Date());

  function nextMonth() {
    if (!isAnimating) {
      setPreviousMonthString(monthString);
      setMonthString(format(addMonths(month, 1), "yyyy-MM"));
    }
  }

  function prevMonth() {
    if (!isAnimating) {
      setPreviousMonthString(monthString);
      setMonthString(format(subMonths(month, 1), "yyyy-MM"));
    }
  }

  let direction = monthString > previousMonthString ? 1 : -1;

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <MotionConfig
      transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
    >
      <div className="flex min-h-screen  items-start bg-stone-800 pt-16">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
          <div className="absolute inset-x-0 z-10 flex justify-between px-8 pt-8 text-sm">
            <button
              className="flex items-center justify-center rounded-full p-1.5 hover:bg-stone-100"
              onClick={prevMonth}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              className="flex items-center justify-center rounded-full p-1.5 hover:bg-stone-100"
              onClick={nextMonth}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>

          <ResizablePanel>
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={{ direction }}
            >
              <motion.div
                key={monthString}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="py-8">
                  <div className="flex flex-col justify-center rounded text-center">
                    <motion.p
                      custom={{ direction }}
                      variants={{
                        enter: ({ direction }) => ({
                          x: `${direction * 100}%`,
                        }),
                        center: { x: `0%` },
                        exit: ({ direction }) => ({
                          x: `${-direction * 100}%`,
                        }),
                      }}
                      className="font-semibold"
                    >
                      {format(month, "MMMM yyyy")}
                    </motion.p>

                    <div className="mt-6 grid grid-cols-7 gap-x-2 gap-y-6 px-8 text-sm">
                      <span className="font-medium text-stone-500">Su</span>
                      <span className="font-medium text-stone-500">Mo</span>
                      <span className="font-medium text-stone-500">Tu</span>
                      <span className="font-medium text-stone-500">We</span>
                      <span className="font-medium text-stone-500">Th</span>
                      <span className="font-medium text-stone-500">Fr</span>
                      <span className="font-medium text-stone-500">Sa</span>
                    </div>

                    <motion.div
                      custom={{ direction }}
                      variants={{
                        enter: ({ direction }) => ({
                          x: `${direction * 100}%`,
                        }),
                        center: { x: `0%` },
                        exit: ({ direction }) => ({
                          x: `${-direction * 100}%`,
                        }),
                      }}
                      className="mt-4 grid grid-cols-7 gap-x-2 gap-y-6 px-8 text-sm"
                    >
                      {days.map((day) => (
                        <span
                          key={format(day, "yyyy-MM-dd")}
                          className={`${
                            isSameMonth(day, month)
                              ? "text-stone-800"
                              : "text-stone-300"
                          } font-semibold`}
                        >
                          {format(day, "d")}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </div>
      </div>
    </MotionConfig>
  );
}

function ResizablePanel({ children }) {
  let [ref, bounds] = useMeasure();

  return (
    <motion.div animate={{ height: bounds.height > 0 ? bounds.height : null }}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}
