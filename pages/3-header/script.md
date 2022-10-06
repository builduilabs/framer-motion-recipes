Add sticky top-0 bg-white to header.

```jsx
<header className="sticky top-0 flex items-center justify-between border-b p-8">
```

# Add a delay

```jsx
let { scrollYProgress: x } = useScrollWithThreshold(300, {
  container,
  offset: ["start", "end"],
});
let scrollYProgress = useTransform(x, [0.75, 1], [0, 1]);
```
