```diff
diff --git a/pages/6-carousel-part-2/index.js b/pages/6-carousel-part-2/index.js
index 0c2ca18..829eb65 100644
--- a/pages/6-carousel-part-2/index.js
+++ b/pages/6-carousel-part-2/index.js
@@ -1,7 +1,6 @@
 import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
 import { useState } from "react";
 import { AnimatePresence, motion, MotionConfig } from "framer-motion";
-import useKeypress from "react-use-keypress";

 let images = [
   "/images/1.jpeg",
@@ -10,57 +9,21 @@ let images = [
   "/images/4.jpeg",
   "/images/5.jpeg",
   "/images/6.jpeg",
-  "/images/1.jpeg?",
-  "/images/2.jpeg?",
-  "/images/3.jpeg?",
-  "/images/4.jpeg?",
-  "/images/5.jpeg?",
-  "/images/6.jpeg?",
-  "/images/1.jpeg?1",
-  "/images/2.jpeg?1",
-  "/images/3.jpeg?1",
-  "/images/4.jpeg?1",
-  "/images/5.jpeg?1",
-  "/images/6.jpeg?1",
-  "/images/1.jpeg?2",
-  "/images/2.jpeg?2",
-  "/images/3.jpeg?2",
-  "/images/4.jpeg?2",
-  "/images/5.jpeg?2",
-  "/images/6.jpeg?2",
 ];

-let collapsedAspectRatio = 1 / 3;
-let fullAspectRatio = 3 / 2;
-let gap = 2;
-let margin = 12;
-
 export default function Page() {
   let [index, setIndex] = useState(0);

-  useKeypress("ArrowRight", () => {
-    if (index + 1 < images.length) {
-      setIndex(index + 1);
-    }
-  });
-
-  useKeypress("ArrowLeft", () => {
-    if (index > 0) {
-      setIndex((i) => i - 1);
-    }
-  });
-
   return (
     <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
       <div className="h-full bg-black">
         <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
           <div className="relative overflow-hidden">
             <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
-              {images.map((image, i) => (
-                <motion.img
+              {images.map((image) => (
+                <img
                   key={image}
                   src={image}
-                  animate={{ opacity: i === index ? 1 : 0.3 }}
                   className="aspect-[3/2] object-cover"
                 />
               ))}
@@ -95,47 +58,6 @@ export default function Page() {
               )}
             </AnimatePresence>
           </div>
-
-          <div className="absolute inset-x-0 bottom-6 flex justify-center overflow-hidden">
-            <motion.div
-              initial={false}
-              animate={{
-                x: `-${
-                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
-                  index * gap +
-                  margin
-                }%`,
-              }}
-              style={{ aspectRatio: fullAspectRatio, gap: `${gap}%` }}
-              className="flex h-14"
-            >
-              {images.map((image, i) => (
-                <motion.button
-                  key={image}
-                  onClick={() => setIndex(i)}
-                  whileHover={{ opacity: 1 }}
-                  initial={false}
-                  animate={i === index ? "active" : "inactive"}
-                  variants={{
-                    active: {
-                      marginLeft: `${margin}%`,
-                      marginRight: `${margin}%`,
-                      opacity: 1,
-                      aspectRatio: fullAspectRatio,
-                    },
-                    inactive: {
-                      marginLeft: "0%",
-                      marginRight: "0%",
-                      opacity: 0.5,
-                      aspectRatio: collapsedAspectRatio,
-                    },
-                  }}
-                >
-                  <motion.img src={image} className="h-full object-cover" />
-                </motion.button>
-              ))}
-            </motion.div>
-          </div>
         </div>
       </div>
     </MotionConfig>
```

# Step - Nav

Copy + paste image map to bottom. Set `h-14`. Ok, want to center. Make the containing div aspect-3/2, h-14. Now can use mx-auto.

```jsx
<div className="absolute inset-x-0 bottom-6 mx-auto flex aspect-[3/2] h-14">
  {images.map((image) => (
    <img key={image} src={image} className="aspect-[3/2] object-cover" />
  ))}
</div>
```

Works, but we have overflow. Add wrapper w/overflow-hidden.

```jsx
<div className="absolute inset-x-0 bottom-6 overflow-hidden">
  <div className="mx-auto flex aspect-[3/2] h-14"></div>
</div>
```

Sweet! Ready to animate. Same idea as before.

```jsx
<motion.div
  animate={{ x: `-${index * 100}%` }}
  className="mx-auto flex aspect-[3/2] h-14"
>
```

```jsx
<div className="absolute inset-x-0 bottom-6 overflow-hidden">
  <motion.div
    initial={false}
    animate={{ x: `${-index * 50}%` }}
    className="mx-auto mt-8 flex aspect-[3/2] h-14 gap-1"
  >
    {images.map((image, i) => (
      <motion.button
        initial={false}
        animate={{ width: i === index ? "100%" : "50%" }}
        onClick={() => setIndex(i)}
        key={image}
        className="inline-block w-full shrink-0"
      >
        <motion.img
          initial={false}
          animate={{ opacity: i === index ? 1 : 0.5 }}
          whileHover={{ opacity: 1 }}
          className="h-full object-cover"
          src={image}
        />
      </motion.button>
    ))}
  </motion.div>
</div>
```

# Step - keypress

```js
useKeypress("ArrowRight", () => {
  if (index + 1 < images.length) {
    setIndex(index + 1);
  }
});

useKeypress("ArrowLeft", () => {
  if (index > 0) {
    setIndex((i) => i - 1);
  }
});
```

# Step - Opacity, img resolution

Little detail

```jsx
<motion.img animate={{ opacity: i === index ? 1 : 0.3 }} />
```
