## Step

Show Things, break down the animation:

- Background color
- Animated check
- Glow
- Scale

Let's take this as inspiration to animate our wizard.

Quick look at the current code. Show code, step state, show three states of step.

Now let's get animating!

## Step

To start, let's animate background.

Change to motion.div, add `animate={{opacity: 0}}`

```jsx
<motion.div animate={{ opacity: status === "complete" ? 0.25 : 1 }}
```

So this is the basic idea for doing state-based animations with framer motion.

But we don't want to animate opacity, we want bgColor. So let's change this:

```jsx
animate={{ backgroundColor: status === "complete" ? "#3b82f6" : "#fff" }}
```

Pretty cool!

Now, FM uses JS to animate our elements, which means we can't use our css classes here. So this is kind of a bummer to have to use the hex value here, I don't about you but I'm not a native hex speaker. So I have a tailwind plugin that I use to expose all of the tw color as css variables, which means we can change this to var(--blue-500), and var(--white). Def recommend this to preserve your workflow whether you use tailwind or your own css variables.

## Step

Next, see that border is not animating. Let's move that over

```
borderColor:
  status === "complete" || status === "active"
    ? "var(--blue-500)"
    : "var(--slate-200)",
```

Can see it but hard to see. Sometimes when writing animation I like to slow things down, we can do that with another prop called transition which us all these neat controls, one of which is `duration`. Let's make it a second. Now we can clearly see the border is animating.

We can also see the text color is not, so let's move these last classes up.

```jsx
animate={{
  backgroundColor:
    status === "complete" ? "var(--blue-500)" : "var(--white)",
  borderColor:
    status === "complete" || status === "active"
      ? "var(--blue-500)"
      : "var(--slate-200)",
  color:
    status === "complete" || status === "active"
      ? "var(--blue-500)"
      : "var(--slate-400)",
}}
```

Great, everything is animating! And now we can delete all of our conditional classes.

## Step

We've unlocked a lot of power here by moving things to FM, but if you're like me, you look at this code and find it pretty confusing. For example, if we wanted to know what happened when a button goes from inactive to active, what would it be? Hard to tell by looking at this.

Extract to variants. Start with bgColor

```jsx
variants={{
  inactive: {
    backgroundColor: "var(--white)",
  },
  active: {
    backgroundColor: "var(--white)",
  },
  complete: {
    backgroundColor: "var(--blue-500)",
  },
}}
```

Now to actually use that, instead of passing all these styles to `animate` we want to pass the current variant name. Well we already have it so just pass

```
animate={status}
```

save, and now we can se we're back to animating just the background color.

Great! Let's bring over the rest, save.

```jsx
animate={status}
variants={{
  inactive: {
    backgroundColor: "var(--white)",
    borderColor: "var(--slate-200)",
    color: "var(--slate-400)",
  },
  active: {
    backgroundColor: "var(--white)",
    borderColor: "var(--blue-500)",
    color: "var(--blue-500)",
  },
  complete: {
    backgroundColor: "var(--blue-500)",
    borderColor: "var(--blue-500)",
    color: "var(--blue-500)",
  },
}}
```

Now look at animation, remove transition, back to look great just like before but check out this code – much easier to read. Can even tell just by looking what's gonna happen when we go from inactive to active.

## Step

Now, one thing I really like about the Things animation is how the checkmark draws itself. (b roll). Cool right?

Let's make our check mark do the same thing.

Turns out can use motion.path, use animate, and FM gives us `pathLength`. Show hot reload going from 0 to 1. Add duration 1s and see it animate. Pretty awesome right? So easy to animate this check.

Now, the check is getting conditionally rendered so it only exists in the complete state. We want to kick off the animation when it gets rendered. How to do this? Use another prop in our arsenal, `initial`:

So pathLoenght 0 for initial, 1 for animate. Boom done.

```jsx
<motion.path
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
```

Let's tweak the transition. First slow down `duration` to 1. Now, the bg is fading in to blue, so wait

```js
{
  ease: "easeOut",
  type: "tween",
  delay: t(0.2),
  duration: t(0.3),
}
```

And maybe we even speed up the background color fade.

## Step

Everything looks great - but if we reload, we can see there's a mount animation. Blah blah initial, look at tooltip, easy way to disable is by setting initial to false. Much better!

## Step

Ok - next, the Things animation also has this subtle but really nice glow that happens when you check a box. Makes it feel much more satisfying. Let's add it to our wizard!

```jsx
<motion.div
  initial={false}
  animate={status}
  transition={{ delay: 0.2 }}
  variants={{
    active: {
      scale: 1,
      opacity: 1,
    },
    complete: {
      scale: 1.25,
      opacity: 0,
    },
  }}
  className="absolute inset-0 rounded-full bg-blue-200"
></motion.div>
```

Like how it looked without opacity, remove it. Nice active/completed "feel" to it. Let's tweak the transition:

```jsx
<motion.div
  initial={false}
  animate={status}
  transition={{
    duration: 0.6,
    delay: 0.2,
    type: "tween",
    ease: "circOut",
  }}
  variants={{
    active: {
      scale: 1,
    },
    complete: {
      scale: 1.25,
    },
  }}
  className="absolute inset-0 rounded-full bg-blue-200"
></motion.div>
```

Awesome! On the way back, we don't want the delay. Fortunately, we can actually put transitions that are specific to variants, nested within those variants!

```js
variants={{
  active: {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  complete: { scale: 1.25 },
}}
```

## Step

Duplicating `animate`. Turns out if we add to parent, we can delete these from children:

```jsx
<motion.div animate={status} className="relative">
```

And all children motion elements will inherit the current active variant. This is awesome bc it lets children define what it means for them to be in a particular state like active or complete, but the parent determines what the actual current state is, in one spot, and its shared.

## Step

Ok, this is lookin pretty good especially for our first animation. Before we wrap let's tweak our highlight animation a bit more, and we can do that using the transiiton prop. If we look we can see theres all sorts of cool stuff in here, but the main one is `type`. A huge benefit of FM is powerful transition types, like spring: check it out, our highlight is bouncing.

You could imagine where youd want ot use this but for our case we want to go with tween, blah blah blah:

```js
transition={{
  delay: 0.1,
  type: "tween",
  ease: "circOut",
  duration: 0.5,
}}
```

Feels nicer, heavier, more satisfying. Kind of eases into the completed state.

# Step

Last piece –

# Outro

Recap. Basic way to animate with FM is with motion elements. They take in a animate prop which can be object of css props. Blah blah blah.

All done!
