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
        <div className="relative">
          <img src={images[index]} className="aspect-[3/2] object-cover" />

          {index > 0 && (
            <button
              className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition hover:bg-white/80"
              onClick={() => setIndex(index - 1)}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}

          {index + 1 < images.length && (
            <button
              className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition hover:bg-white/80"
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
