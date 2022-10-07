## Sticky header

To start, make the header sticky with CSS. Add `shadow` to header. Add `fixed inset-x-0`, and give it a bg-white. Need to make parent relative.

Sweet! Let's add 20 units of padding to the article. In business.

# useScroll

So to get the header shrinking with scroll we're going to use the useScroll() hook.

```jsx
let { scrollY } = useScroll();

useEffect(() => {
  return scrollY.onChange((current) => {
    console.log(current);
  });
}, [scrollY]);
```

Turns out these MotionValues are stateful.

```jsx
let { scrollY } = useScroll();

useEffect(() => {
  return scrollY.onChange((current) => {
    let previous = scrollY.getPrevious();
    console.log({ previous, current });
  });
}, [scrollY]);
```

If we scroll down, cur > prev; if we scroll up, cur < prev.

So let's calculate the diff!

```js
let diff = current - previous;
console.log({ diff });
```

Look at that, as we scroll down the diff is positive, and down its negative. So now we know how much the user just scrolled on every frame.

# Creating a Motion Value

So now that we have this information, how can we use it to update our height? Well this is where custom Motion Values come in. We can actually make our own Motion Values, and update them whenever we want.

And we do that with useMotionValue()

```js
// default
let height = useMotionValue(50);

// update with set
height.set(200);
```

So maybe you can see where I'm going with this... if we bring this into our effect, this is how we can get our height to respond to our scroll changes.

So if we start at the top and start our height at 80, and take the first case of scrolling down. When we scroll down, we want to start shrinking our header. And every frame we scroll we have how many pixels we've scrolled down by. So we can just subtract this diff from current height of the header to get the new height of the header.

```js
if (scrollingDown) {
  height.set(currentHeight - diff);
}

// we know these
if (diff > 0) {
  height.set(height.get() - diff);
}
```

Look at that – header shrinks when we scroll down. Pretty neat!

We see it's shrinking too much - use Math.max to clamp:

```js
height.set(Math.max(height.get() - diff, 50));
```

Can set to 300 to see.

Same in other direction. Subtract the diff, it's negative, so it'll add. Clamp at 80 with Math.min.

Look at this. Changes no matter what. And if we look at this, can see its the same expression. We're just clamping.

We can combine the two:

```js
height.set(Math.min(Math.max(newHeight, 50), 80));
```

Sometimes little confusing, wish we had this in JS (other languages do):

```js
let clamp = (value, min, max) => Math.min(Math.max(value, min), max);
```

So let's recap...

Boom. Like a movie. The frame runs again and again. For any frame, if you tell me the previous scroll position, the current scroll position, and the current height, I can tell you exactly what the new height should be.

Now we're not done, we want to fade out the nav, shrink the logo, and even blur the background. I'd encourage you to play around with this and try them on your own, but in the next lesson we're going to talk about my favorite topic in React, Composition, and talk about how we can extract the core logic of what we wrote here and make it reusable, so we can pull off those other effects super easily.

# PART 2

# Height as a function of scroll

Now the cool thing about these motion values is that we can use them to set css properties directly on motion elements. So come to header, turn into motion.header, add `style={{height: scrollY}}`.

Now obviously dont want to be exactly the height, want it to be some function of what we've scrolled.

Might try something like this:

```
style={{ height: scrollY * .1 }}
```

but doens't work.

This is where useTransform comes in.

```js
let height = useTransform(scrollY, (v) => 80 + 0.1 * v);
let height = useTransform(scrollY, (v) => 80 - v);
let height = useTransform(scrollY, (v) => Math.max(80 - 0.1 * v, 50));
```

See this is pretty powerful. 3 lines of code!

# Start growing

We want the header to start growing as soon as we start scrolling up again. We want it to start growing when we scroll up - regardless of where we are in the document. Doesn't matter if we've scrolled 500 px or 1500px - what matters is that we started scrolling up. And once we do that we want to start knocking pixles off of the header's height.

So it's not actually a function of the scroll position (whether we're at 500px or 1500px) – it's a function of the _change_ in the scroll position (whether we've just scrolled up 50 pixels, or just scrolled down 50 pixels). It's the difference or the derivative of the scroll position.

So how might we find that difference? We'll we need the current scroll position and the previous scroll position. Then we can just calculate the difference.

<!-- So we need a new variable to keep track of the header's height, and responds to changes in scroll direction. -->

<!-- We want the header to start scrolling as soon as we start scrolling up again, and to do this we want to drop down a level and make our own motion value. -->

We can do this by creating our own Motion Value with the useMotionValue hook.

```js
let height = useMotionValue(80);
```

Default value, and we can set it by calling .set

```js
height.set(300);
```

Maybe you can see where I'm going with this - to get our new motion value to respond to changes in scroll, we're going to bring back our effect and call .set() in the callback.

```js
useEffect(() => {
  return scrollY.onChange((current) => {
    height.set(current);
  });
}, [height, scrollY]);
```

So, this is how you work with your own motion values.

But like we said, the height isn't actually a function of the current scroll value – it doesnt' matter if we're at 1000 or 2000, what matters is if we're scrolling up or down.

If we log the scroll value, we'll see that when we scroll down the value is increasing, and when we scroll up its decreasing. So if we had access to both the previous scroll value and the current scroll value in any framer, we'd be able to tell whether the user is scrolling up down.

Well it turns out these Motion Values are stateful and have exactly this information!

```js
let previous = scrollY.getPrevious();
console.log({ current, previous });
```

Calculate the diff:

```js
let diff = current - previous;
```

If it's positive we're scrolling down, if negative we're scrolling up!

So now, let's think about our header's height. We want it to shrink when we scroll down and start growing again when we scroll up. So let's start with the case where we scroll up. We'll set the height to 50 and we want it to start growing again when we scroll up. So, when the diff is negative, we want to set the height equal to the current height plus the number of pixels that the user has scrolled!

```js
if (diff < 0) {
  height.set(currentHeight + pixelsScrolled);
}
```

```js
let newHeight = height.get() - diff;
```

Look at that: every time we start scrolling up, we start adding those pixels.

Don't want that to go above 80, so

```js
height.set(Math.min(height.get() - diff, 80));
```

Boom! Other side

```
} else {
  height.set(height.get() - diff);
}
```

Don't want that to get smaller than 50, so math.max.

Take a look:

```jsx
if (diff < 0) {
  height.set(Math.min(height.get() - diff, 80));
} else {
  height.set(Math.max(height.get() - diff, 50));
}
```

```js
let newHeight = height.get() - diff;

height.set(clamp(newHeight, 50, 80));
```

Boom. Like a movie. The frame runs again and again. For any frame, if you tell me the previous scroll position, the current scroll position, and the current height, I can tell you exactly what the new height should be.

---

# Add a delay

```jsx
let { scrollYProgress: x } = useScrollWithThreshold(300, {
  container,
  offset: ["start", "end"],
});
let scrollYProgress = useTransform(x, [0.75, 1], [0, 1]);
```

```js
let clamp = (num, min, max) => Math.min(Math.max(num, min), max);
```
