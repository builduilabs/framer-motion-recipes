Let's make this a little easier to read

```js
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
```

```jsx
let opacity = useMotionValue(1);

return scrollY.onChange((current) => {
  let newOpacity = opacity.get() - diff * 0.1;

  opacity.set(clamp(newOpacity, 0, 1));
})

<motion.nav style={{ opacity }}
```

Spidey sense. Abstraction. Really both functions of our scroll position, within a certain bounds. And if we had hook that responded with that, we can make these custom motion values simple transforms based off of that hook.

What if we had

```js
let { scrollYBounded } = useBoundedScroll(30);
```

and instead of following position, it used our behavior.

```js
function useBoundedScroll(bounds) {
  let { scrollY } = useScroll();
  let scrollYBounded = useMotionValue(0);

  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious();
      let diff = current - previous;
      let newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds));
    });
  }, [bounds, scrollY, scrollYBounded]);

  return { scrollYBounded };
}
```

Let's check it out

```js
useEffect(() => {
  return scrollYBounded.onChange((current) => {
    console.log(current);
  });
});
```

Sick! Let's derive

```js
let { scrollYBounded } = useBoundedScroll(100);
let height = useTransform(scrollYBounded, [0, 100], [80, 50]);
let opacity = useTransform(scrollYBounded, [0, 100], [1, 0]);
```

Awesome, but lets use %

```js
let scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1]);
```

Inline the transforms. Boom.

Let's scale the logo.

```jsx
<motion.p
  style={{
    scale: useTransform(scrollYBoundedProgress, [0, 1], [1, 0.9]),
  }}
/>
```

Now finally, let's blur the header.

```
bg-white/10 shadow backdrop-blur-md

backgroundColor: "rgb(255 255 255 / 0.1)",

Cant do this,

backgroundColor: `rgb(255 255 255 / ${useTransform(
  scrollYBoundedProgress,
  [0, 1],
  [1, 0.1]
)})`,

has our back.

backgroundColor: useMotionTemplate`rgb(255 255 255 / ${useTransform(
  scrollYBoundedProgress,
  [0, 1],
  [1, 0.1]
)})`,
```

Can even throttle it

```jsx
let scrollYBoundedProgressThrottled = useTransform(
  scrollYBoundedProgress,
  [0, 0.5, 1],
  [0, 0, 1]
);
```
