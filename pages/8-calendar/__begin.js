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
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

export default function Page() {
  let [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"));
  let month = parse(monthString, "yyyy-MM", new Date());

  function nextMonth() {
    let nextDate = addMonths(parse(monthString, "yyyy-MM", new Date()), 1);
    setMonthString(format(nextDate, "yyyy-MM"));
  }

  function prevMonth() {
    let prevDate = subMonths(parse(monthString, "yyyy-MM", new Date()), 1);
    setMonthString(format(prevDate, "yyyy-MM"));
  }

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
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

        <div>
          <div className="py-8">
            <div className="flex flex-col justify-center rounded text-center">
              <p className="font-semibold">{format(month, "MMMM yyyy")}</p>

              <div className="mt-6 grid grid-cols-7 gap-x-2 gap-y-6 px-8 text-sm">
                <span className="font-medium text-stone-500">Su</span>
                <span className="font-medium text-stone-500">Mo</span>
                <span className="font-medium text-stone-500">Tu</span>
                <span className="font-medium text-stone-500">We</span>
                <span className="font-medium text-stone-500">Th</span>
                <span className="font-medium text-stone-500">Fr</span>
                <span className="font-medium text-stone-500">Sa</span>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-x-2 gap-y-6 px-8 text-sm">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
