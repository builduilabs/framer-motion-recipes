import { useScroll } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";

export default function Header() {
  let ref = useRef();
  let { scrollY } = useScroll({ target: ref });

  useEffect(() => {
    scrollY.onChange((latest) => {
      let previous = scrollY.getPrevious();
      console.log(previous - latest);
    });
  }, [scrollY]);

  return (
    <div className="flex h-screen flex-col items-center justify-center overscroll-y-contain bg-gradient-to-br from-slate-700 to-slate-900 py-8 px-6 text-slate-600">
      <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden rounded-2xl bg-white ">
        <div className="flex-1 overflow-y-scroll border-l">
          <header className="sticky top-0 flex items-center justify-between border-b bg-white p-8">
            <p className="text-lg font-semibold">Logo</p>
            <nav className="flex space-x-3 text-sm">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </nav>
          </header>

          <main ref={ref} className="p-8">
            <h1 className="h-8 rounded bg-slate-100 text-2xl font-bold" />
            <div className="mt-8 space-y-6">
              {[...Array(90).keys()].map((i) => (
                <div key={i} className="space-y-2 text-sm">
                  <p className="h-4 w-5/6 rounded bg-slate-100" />
                  <p className="h-4 rounded bg-slate-100" />
                  <p className="h-4 w-4/6 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
