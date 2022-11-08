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
