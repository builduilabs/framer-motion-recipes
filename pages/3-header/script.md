## Sticky header

To start, make the header sticky with CSS. Add `shadow` to header. Add `absolute inset-x-0`, and give it a bg-white. Need to make parent relative.

Sweet! Let's add 20 units of padding to the article. In business.

# useScroll with container

So to get the header shrinking with scroll we're going to use the useScroll() hook.

# Add a delay

```jsx
let { scrollYProgress: x } = useScrollWithThreshold(300, {
  container,
  offset: ["start", "end"],
});
let scrollYProgress = useTransform(x, [0.75, 1], [0, 1]);
```
