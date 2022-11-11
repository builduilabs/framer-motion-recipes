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

```jsx
<div className="absolute inset-x-0 bottom-6 flex justify-center">
  <div className="flex aspect-[3/2] h-14">
    {images.map((image) => (
      <img key={image} src={image} className="h-full object-cover" />
    ))}
  </div>
</div>
```

Works, but we have overflow. Add wrapper w/overflow-hidden.

# Step - animate

Sweet! Ready to animate. Same idea as before.

```jsx
<motion.div
  animate={{ x: `-${index * 100}%` }}
  className="flex aspect-[3/2] h-14"
>
```

Tracks the carousel

# Step - buttons

Let's wrap these in buttons. Need shrink-0 so they don't shrink.

```jsx
{
  images.map((image) => (
    <button className="shrink-0" key={image}>
      <img src={image} className="h-full object-cover" />
    </button>
  ));
}
```

Make the click work:

```jsx
<button onClick={() => setIndex(i)} />
```

Boom! Declarative rendering.

# Step - aspect ratio buttons

If you remember from iOS, the nav has the middle picture at full aspect ratio, and the others shrink.

```jsx
<button
  className={`${i === index ? "aspect-[3/2]" : "aspect-[1/3]"} shrink-0`}
/>
```

We see this breaks our `x` calculation. Multiply by 1/3.

```
animate={{ x: `-${index * 100 * (1 / 3)}%` }}
```

Closer... we actually want to go from midpoint to midpoint.

```
animate={{ x: `-${index * 100 * (1 / 3 / (3 / 2))}%` }}
```

Boom. Perfectly centered.

Since these are now related let's extract to a variable.

```jsx
let fullAspectRatio = 3 / 2;
let collapsedAspectRatio = 1 / 3;
```

And replace everywhere. Boom!

# Step - Animate aspect ratio

Now for the fun part! Turn button into motion.button, and change style to animate:

```jsx
<motion.button
  onClick={() => setIndex(i)}
  key={image}
  className="shrink-0"
  animate={{
    aspectRatio:
      i === index ? fullAspectRatio : collapsedAspectRatio,
  }}
>
```

Love it. Change aspect ratios, still works. Click carousel, works beautifully.

# Step - More details. Margins and gap.

Create some separation.

```
marginLeft: i === index ? "10%" : 0,
marginRight: i === index ? "10%" : 0,
```

Update our center calculation.

```
animate={{
  x: `-${
    index * 100 * (collapsedAspectRatio / fullAspectRatio) +
    margin
  }%`,
}}
```

Let's refactor this to variants:

```
animate={i === index ? "active" : "inactive"}
variants={{
  active: {
    aspectRatio: fullAspectRatio,
    marginLeft: `${margin}%`,
    marginRight: `${margin}%`,
  },
  inactive: {
    aspectRatio: collapsedAspectRatio,
    marginLeft: 0,
    marginRight: 0,
  },
}}
```

Nice. Let's make active buttons 100% opacity and inactive ones 50%. And add whileHover = 1.

Let's also add a gap between the inactive photos. Because we're using flex we can use the gap css property.

We can see it affects the `x` calculation, so let's parameterize it.

```
x: `-${
  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
  margin +
  index * gap
}%`,
```

Play with duration. So cool.

Little detail:

```jsx
<motion.img animate={{ opacity: i === index ? 1 : 0.3 }} />
```

# Step - keypress

Finally - we've done all this work, let's take advantage of it!

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
