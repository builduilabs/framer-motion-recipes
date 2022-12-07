import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
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

export default function Page() {
  let [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"));
  let month = parse(monthString, "yyyy-MM", new Date());

  function nextMonth() {
    let next = addMonths(month, 1);

    setMonthString(format(next, "yyyy-MM"));
  }

  function previousMonth() {
    let previous = subMonths(month, 1);

    setMonthString(format(previous, "yyyy-MM"));
  }

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <div className="flex min-h-screen items-start bg-stone-800 pt-16 text-stone-900">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
        <div className="py-8">
          <div className="flex flex-col justify-center rounded text-center">
            <header className="relative flex justify-between px-8">
              <button
                className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                onClick={previousMonth}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <p className="absolute inset-0 flex items-center justify-center font-semibold">
                {format(month, "MMMM yyyy")}
              </p>
              <button
                className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                onClick={nextMonth}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </header>

            <div className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm">
              <span className="font-medium text-stone-500">Su</span>
              <span className="font-medium text-stone-500">Mo</span>
              <span className="font-medium text-stone-500">Tu</span>
              <span className="font-medium text-stone-500">We</span>
              <span className="font-medium text-stone-500">Th</span>
              <span className="font-medium text-stone-500">Fr</span>
              <span className="font-medium text-stone-500">Sa</span>
              {days.map((day) => (
                <span
                  className={`${
                    isSameMonth(day, month) ? "" : "text-stone-300"
                  } font-semibold`}
                  key={format(day, "yyyy-MM-dd")}
                >
                  {format(day, "d")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
