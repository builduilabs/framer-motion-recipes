import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useState } from "react";

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
    <div className="h-full bg-black">
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
        <div className="relative overflow-hidden">
          <div className="flex aspect-[3/2] w-full">
            <img
              src={images[index]}
              className="h-full w-full shrink-0 object-cover"
            />
          </div>

          {index > 0 && (
            <button
              className="absolute left-2 top-[calc(50%-16px)] flex h-8 w-8 items-center justify-center rounded-full bg-white"
              onClick={() => setIndex(index - 1)}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}

          {index + 1 < images.length && (
            <button
              className="absolute right-2 top-[calc(50%-16px)] flex h-8 w-8 items-center justify-center rounded-full bg-white"
              onClick={() => setIndex(index + 1)}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
