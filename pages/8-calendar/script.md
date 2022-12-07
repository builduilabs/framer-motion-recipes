# Step

Inspired by airbnb's calendar.

First let's add the days.

```jsx
<div className="mt-6 grid grid-cols-7 px-8">
  <span>1</span>
  <span>2</span>
  <span>3</span>
  <span>4</span>
  <span>5</span>
  <span>6</span>
  <span>7</span>
</div>
```

Programatically. Could get this:

```jsx
let days = eachDayOfInterval({
  start: startOfMonth(month),
  end: endOfMonth(month),
});
```

Render:

```jsx
{
  days.map((day) => (
    <span key={format(day, "yyyy-MM-dd")}>{format(day, "d")}</span>
  ));
}
```

Boom.

Now let's get the days of week in here.

```jsx
<span className="font-medium text-stone-500">Su</span>
<span className="font-medium text-stone-500">Mo</span>
<span className="font-medium text-stone-500">Tu</span>
<span className="font-medium text-stone-500">We</span>
<span className="font-medium text-stone-500">Th</span>
<span className="font-medium text-stone-500">Fri</span>
<span className="font-medium text-stone-500">Sa</span>
```

Add some `gap-y-6`, And make the days `font-semibold`, and make the whole grid `text-sm`.

Now, dec 1 falls on thursday so we really need to pad the left and right with the rest of the week. Use `startOfWeek` and `endOfWeek`.

```jsx
let days = eachDayOfInterval({
  start: startOfWeek(startOfMonth(month)),
  end: endOfWeek(endOfMonth(month)),
});
```

Dim out days not in current month.

```
className={isSameMonth(day, month) ? "" : "text-stone-300"}
```

Lookin good!

# Step

Let's animate this thing!

Gonna slide em out, similar to image carousel but difference is there's an infinite number of months. So instead of sliding a container, we're going to animate each month using initial, animate and exit.

So let's wrap month in motion.div and start with mount animation:

```jsx
<motion.div initial={{ x: "100%" }} animate={{ x: "0%" }}>
  <header />
  <div />
</motion.div>
```

Only works on initial render! That's because this div is only mounted once. Not changing per month.

Let's key it so it does!

```jsx
<motion.div key={monthString} initial={{ x: "100%" }} animate={{ x: "0%" }} />
```

Sweet! Let's slow it down.

```jsx
<MotionConfig transition={{ duration: 3 }} />
```

Find bg-white, add overflow-hidden. Sweet.

Let's go ahead and add exit, and wrap a presence.

```jsx
<AnimatePresence>
  <motion.div
    key={monthString}
    initial={{ x: "100%" }}
    animate={{ x: "0%" }}
    exit={{ x: "-100%" }}
  />
</AnimatePresence>
```

Old n' trusty:

```jsx
<AnimatePresence mode="popLayout" />
```

Need to add `relative` to `overflow-hidden` div to get this to work.

Now, can also disable initial with `initial={false}` on AnimatePresence.

# Step

Don't want these buttons to move. So let's move these animations down to the title:

```jsx
<motion.p
  key={monthString}
  initial={{ x: "100%" }}
  animate={{ x: "0%" }}
  exit={{ x: "-100%" }}
  className="absolute inset-0 flex items-center justify-center font-semibold"
/>
```

We're gonna see some strange behavior. Enter seems to work but not exit. This is because AnimatePresence needs to be direct parent of els with an exit animation.

If we comment it out then add one here, we see it works! But this is kind of a bummer. We don't want to have to add these everywhere.

Instead, we can use variants.

Let's undo, put it back at the root, and refactor to variants. And as we saw earlier in the course variants flow down.

Let's refactor root div to variants:

```jsx
<motion.div
  key={monthString}
  initial="enter"
  animate="middle"
  exit="exit"
  variants={{
    enter: { x: "100%" },
    middle: { x: "0%" },
    exit: { x: "-100%" },
  }}
/>
```

Now if we comment out variants, nothing happens.

But if we come to our motion.p and paste them in, look at that

```jsx
<motion.p
  variants={{
    enter: { x: "100%" },
    middle: { x: "0%" },
    exit: { x: "-100%" },
  }}
  className="absolute inset-0 flex items-center justify-center font-semibold"
/>
```

So the variants flow down. And every child inherits the current variant state from the root.

This is a great way to build animations like this where certain elements animate differently from each other.

Let's do the same thing for our div, this is gonna use the same variants here so let's stick these in a variable.

```jsx
<motion.div
  variants={variants}
  className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm"
/>
```

Boom!

Cool right?

Now Airbnb's calendar even has the weekday names here fixed. Let's do that. We'll just duplicate the grid code.

```jsx
<>
  <div className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm">
    <span className="font-medium text-stone-500">Su</span>
    <span className="font-medium text-stone-500">Mo</span>
    <span className="font-medium text-stone-500">Tu</span>
    <span className="font-medium text-stone-500">We</span>
    <span className="font-medium text-stone-500">Th</span>
    <span className="font-medium text-stone-500">Fri</span>
    <span className="font-medium text-stone-500">Sa</span>
  </div>

  <motion.div
    variants={variants}
    className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm"
  />
</>
```

Pretty cool right! Love this feature of variants.

Now if we look close, we'll actually see the weekday titles seem to get bolder. It's because they have no animation, but because we're using mode popLayout, there's two copies of these on top of each other. We can hide the exiting ones immediately:

```jsx
<motion.div
  variants={{
    exit: { visibility: "hidden" },
  }}
  className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm"
/>
```

We also need to do this to our buttons. Let's make a variable

```jsx
let removeImmediately = {
  exit: { visibility: "hidden" },
};
```

and pass this in to our buttons and weekday header.

```jsx
<motion.button
  variants={removeImmediately} />

<motion.div
  variants={removeImmediately}
  className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm"
/>
```

Fixed!

# Step: Direction

Ok! Next step, change direction on forward/back. This is interesting because in our image carousel, this kinda came for free, because we were sliding the parent container to a specific `x` value based on the selected index. So the whole container moved in the correct direction without us having to do any more work.

Here, because we have an infinite number of months, we need to animate each one individually. So knowing the current month is August 2023, is not enough to fully define its enter and exit animations. If we get to aug from sep, needs to come in from left, if we get there from july, need to come in from the right.

So, we need to know the direction we clicked so that we can get these numbers right:

```jsx
let variants = {
  enter: { x: "100%" },
  middle: { x: "0%" },
  exit: { x: "-100%" },
};
```

Few ways we could do this but for now, let's just create a new piece of state to store the direction!

```jsx
function nextMonth() {
  let next = addMonths(month, 1);

  setMonthString(format(next, "yyyy-MM"));
  setDirection(1);
}
```

Now we have direction, how can use it in our variants? Could inline it right here, but there is a better way. The `custom` prop.

If we hover over it, see we can pass data and turn our variants into funtions that return objects. Make them dynamic.

Let's pass in direction:

```jsx
<motion.p variants={variants} custom={direction} />
```

Now we can make our variant a function that takes in direction. Let's log the direction:

```jsx
let variants = {
  enter: (direction) => {
    console.log({ direction });
    return { x: "100%" };
  },
  middle: { x: "0%" },
  exit: { x: "-100%" },
};
```

We see it! One's undefined, let's pass it in down here as well. Now we see both!

Ok, let's multiply the 100 by our direction:

```jsx
enter: (direction) => {
  console.log({ direction });
  return { x: `${100 * direction}%` };
};
```

Something happening! Let's comment out our exit animation for the moment. Looks good.

Now let's try the exit:

```text
exit: (direction) => {
  console.log({ direction });
  return { x: `${-100 * direction}%` };
}
```

Ok! Lot going on. Let's slow down. First one is weird. But then it works. And if we change direction... again, first exit animation is wrong, but then its correct.

Looking at the logs gives us a hint. Value seems behind - seems stale.

Add a label to the month.

```
{format(month, "MMMM yyyy")} (d: {direction})
```

This direction is 1, new direction is -1. So exiting element gets the old, stale value of direction. Because FM is cloning this in order to run its unmount animation. But React has already unmounted it. So there's no chance to update its props. It's already been removed from the tree – we're just running our animation on a static clone of some DOM. So we see we get a stale value.

Fortunately FM has our back here. How do we enable exit animations in the first place in FM? We use AnimatePresence. So if come up here to AP, look at its props, we'll find `custom`. Read description. Sounds like what we want.

```jsx
<AnimatePresence mode="popLayout" initial={false} custom={direction} />
```

Boom! Look at that. It's giving our dynamic variants the updated value of direction. Which is exactly what we want since we want the directions to align for both entering and exiting elements.

# Step: Remove interruptibility. Only once at a time

Now, want to make a point about interruptibility. If we slow this down and interrupt, will see some strange behavior. In our Image carousel we kind of got this behavior for free since we were animating a single container to its final `x` value. Here, it's more complicated. Making this work correctly with basically an infinite number of months is beyond the scope of this video, so we're going to handle this the same way airbnb does, which is prevent cycling while the animation is still running.

We can do this with some new state, `isAnimating`, that we set in our handlers and reset in `onExitComplete`.

```jsx
function nextMonth() {
  if (isAnimating) return;

  let next = addMonths(month, 1);

  setMonthString(format(next, "yyyy-MM"));
  setDirection(1);
  setIsAnimating(true);
}

function previousMonth() {
  if (isAnimating) return;

  let previous = subMonths(month, 1);

  setMonthString(format(previous, "yyyy-MM"));
  setDirection(-1);
  setIsAnimating(true);
}
```

```jsx
<AnimatePresence
  mode="popLayout"
  initial={false}
  custom={direction}
  onExitComplete={() => setIsAnimating(false)}
/>
```

Not ideal but a good compromise that prevents a lot of potential bugs.

# Step: gradient

Slow down transition. Let's soften this text collision.

```jsx
<motion.div
  className="absolute inset-0"
  style={{
    backgroundImage:
      "linear-gradient(to right, white 15%, transparent 30%, transparent 70%, white 85%)",
  }}
  variants={removeImmediately}
/>
```

# Step: Resizable panel

Hopefully you noticed... opportunity to bring in resizable panel from previous lesson.

```jsx
function ResizablePanel({ children }) {
  let [ref, bounds] = useMeasure();

  return (
    <motion.div animate={{ height: bounds.height > 0 ? bounds.height : null }}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}
```

# Ref

```jsx
let transition = { type: "tween", ease: "easeInOut", duration: 0.3 };
// let transition = { type: "spring", bounce: 0, duration: 0.3 };
let variants = {
  enter: ({ direction }) => ({
    opacity: 0,
    x: `${direction * 100}%`,
  }),
  center: {
    x: `0%`,
    // opacity: [0, 1, 1],
    opacity: 1,
    transition: {
      ...transition,
      opacity: { ...transition, times: [0, 0.75, 1] },
    },
  },
  exit: ({ direction }) => ({
    opacity: 0,
    // opacity: [1, 0, 0],
    x: `${-direction * 100}%`,
    transition: {
      ...transition,
      opacity: { ...transition, times: [0, 0.25, 1] },
    },
  }),
};

function ResizablePanel({ children }) {
  let [ref, bounds] = useMeasure();

  return (
    <motion.div animate={{ height: bounds.height > 0 ? bounds.height : null }}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}
```
