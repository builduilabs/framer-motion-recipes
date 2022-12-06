import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { addMonths, format, parse, subMonths } from "date-fns";
import { useState } from "react";

export default function Page() {
  let [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"));
  let month = parse(monthString, "yyyy-MM", new Date());

  function nextMonth() {
    setMonthString(format(addMonths(month, 1), "yyyy-MM"));
  }

  function prevMonth() {
    setMonthString(format(subMonths(month, 1), "yyyy-MM"));
  }

  return (
    <div className="flex min-h-screen items-start bg-stone-800 pt-16">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
        <div className="py-8">
          <div className="flex flex-col justify-center rounded text-center">
            <header className="relative flex justify-between px-8">
              <button
                className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                onClick={prevMonth}
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
          </div>
        </div>
      </div>
    </div>
  );
}
