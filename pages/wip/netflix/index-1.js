// import { AnimatePresence, motion } from "framer-motion";
// import { useState } from "react";
// import useMeasure from "react-use-measure";

// export default function Auto() {
//   let [showing, setShowing] = useState(false);

//   return (
//     <div className="flex min-h-screen items-start bg-gradient-to-br from-slate-700 to-slate-900 pt-40">
//       <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8">
//         <button onClick={() => setShowing(!showing)}>Toggle</button>

//         <AnimatePresence>
//           {showing && (
//             <motion.div
//               initial={{ height: 0 }}
//               animate={{ height: "auto" }}
//               exit={{ height: 0 }}
//               className="overflow-hidden"
//             >
//               <p className="mt-8">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
//                 molestias amet tempore cupiditate exercitationem? Illo,
//                 reprehenderit optio! Molestiae nesciunt soluta dolorem,
//                 similique impedit sit, earum suscipit ullam aperiam nemo illum.
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

export default function Measure() {
  let [showing, setShowing] = useState(false);
  let [ref, bounds] = useMeasure();

  return (
    <div className="flex min-h-screen items-start bg-gradient-to-br from-slate-700 to-slate-900 pt-40">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8">
        <button onClick={() => setShowing(!showing)}>Toggle</button>

        <motion.div
          animate={{ height: bounds.height }}
          className="mt-8 overflow-hidden"
        >
          <div ref={ref}>
            {showing ? (
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                molestias amet tempore cupiditate exercitationem? Illo,
                reprehenderit optio! Molestiae nesciunt soluta dolorem,
                similique impedit sit, earum suscipit ullam aperiam nemo illum.
              </p>
            ) : (
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
