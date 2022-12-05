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

export default function Page() {
  // Use the useState hook to manage the current date in state
  let [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"));
  let [previousMonthString, setPreviousMonthString] = useState(monthString);
  let [isAnimating, setIsAnimating] = useState(false);
  let month = parse(monthString, "yyyy-MM", new Date());

  function nextMonth() {
    if (!isAnimating) {
      let nextDate = addMonths(parse(monthString, "yyyy-MM", new Date()), 1);
      setPreviousMonthString(monthString);
      setMonthString(format(nextDate, "yyyy-MM"));
    }
  }

  function prevMonth() {
    if (!isAnimating) {
      let prevDate = subMonths(parse(monthString, "yyyy-MM", new Date()), 1);
      setPreviousMonthString(monthString);
      setMonthString(format(prevDate, "yyyy-MM"));
    }
  }

  let direction = monthString > previousMonthString ? 1 : -1;

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <MotionConfig
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    >
      <div className="flex min-h-screen items-start bg-gradient-to-br from-slate-700 to-slate-900 pt-40">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
          <AnimatePresence
            mode="popLayout"
            initial={false}
            custom={{ direction }}
          >
            <motion.div
              variants={{
                enter: ({ direction }) => ({ x: `${direction * 100}%` }),
                center: { x: `0%` },
                exit: ({ direction }) => ({ x: `${-direction * 100}%` }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              custom={{ direction }}
              key={monthString}
            >
              <div className="p-8">
                <div className="flex flex-col justify-center rounded py-20 text-center">
                  <p className="font-semibold">{format(month, "MMMM yyyy")}</p>

                  <motion.div
                    layoutId="week"
                    className="mt-4 grid grid-cols-7 gap-x-2 gap-y-6 text-sm"
                  >
                    <span className="font-medium text-gray-500">Su</span>
                    <span className="font-medium text-gray-500">Mo</span>
                    <span className="font-medium text-gray-500">Tu</span>
                    <span className="font-medium text-gray-500">We</span>
                    <span className="font-medium text-gray-500">Th</span>
                    <span className="font-medium text-gray-500">Fr</span>
                    <span className="font-medium text-gray-500">Sa</span>
                  </motion.div>

                  <div className="mt-4 grid grid-cols-7 gap-x-2 gap-y-6 text-sm">
                    {days.map((day) => (
                      <span
                        key={format(day, "yyyy-MM-dd")}
                        className={`${
                          isSameMonth(day, month)
                            ? "text-gray-800"
                            : "text-gray-300"
                        } font-semibold`}
                      >
                        {format(day, "d")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between p-8">
            <button onClick={prevMonth}>Previous</button>
            <button onClick={nextMonth}>Next</button>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
