# Step

To start, let's fade out the form when it exits and fade in the message when it mounts. First time exit animation on a single element - need a key (show docs).

```jsx
<AnimatePresence>
   {status === "idle" || status === "saving" ? (
      <motion.div key='form' exit={{ opacity: 0 }}>
      <Form>{/* ... */}</Form>
      </motion.div>
   ) : (
      //
   )}
</AnimatePresence>
```

Something's happening... let's get a MotionConfig with duration 10 to slow it down.

So: new child is being appended immediately, and then our exit animation runs. But we actually don't want that new child to mount until after our exiting element has finished unmounting. It would be nice if we could tell Framer Motion to wait until the exit animation has finished before mounting the new element.

Well it turns out that there's a prop on `AnimatePresence` called `mode` that let's us do exactly this. So `mode` determines how to handle entering/exiting elements, and we can see the default is sync which ----. And that's what's happening here. Soon as we rerender, new element is being added, and exiting is unmounted, which triggers our exit animation.

So let's try `wait`. Now it waits.

So this mode is how we control the orchestration of entering and exiting elements, and it takes effect when a single rerender triggers both new elements being mounted to the component tree and old elements being unmounted from the tree.

So now that we're waiting, let's add a mount animation to our message.

```jsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
```

Look at this in full speed, this is probably what you see on a lot of sites. And you can see why, but it comes off as lazy and creates a sort of uncanny valley, because we're using animation for part of the interface but not all of it, and it really kinda sticks out.

So let's now try to animate the height.

# Step

First add to exiting element:

```jsx
<motion.div exit={{ opacity: 0, height: 0 }} key="form" />
```

Ok - let's slow this down. First exit anim runs, then enter. So first let's take care of this overflow, because Framer Motion is keeping this element in place using absolute positioning, which causes this to overflow outside of the panel. Add `overflow-hidden`.

That takes care of that. And now, the new element just appears, lets animate its height.

```jsx
<motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: "auto" }}
/>
```

Shrinks and fades out, then new element grows and fades in.

Full speed, strange accordion behavior. Not what we want.

Let's go back to `mode='sync'`. Closer... slow it down. 30 secs. Inspector. Growing and shrinking.

It's almost what we want but you can see, we're animating each element at the same time. But this approach is just fundamentally not aligned with what we're trying to do here. If we put duration to 3 and look, conceptually we have two different animations. The content of the panel is fading out and in, but then at the same time, the panel itself is animating its height. And it would be much simpler if we could actually treat these as two separate animations, where we just trigger the height animation on the panel, while at the same time triggering the fade on the contents.

So let's remove the height animation from the two elements and instead animate the panel directly.

# Step

Remove height from all animation.

Now since the heights aren't being animated, sync mode is not what we want. Lets change back to wait. Looks pretty good.

And now let's animate the panel's height. This is the overall panel, but this is the part that's changing. So let's wrap a div around the dynamic content, turn it into a motion.div, and this is where we want to animate height.

```jsx
<motion.div animate={{ height: 100 }}>
```

So like we saw in the lesson 2, height can take different values, and animate between them. It can also take 0 and auto. And auto is what we want. Snaps to dynamic contents. So ideally we could leave this auto, and it would snap to its new height. But we see when we leave it as auto, there's no animation. And so, framer motion doesn't support this. We can go from 0 to auto to reveal, and we can go from auto to 0 to hide, but we can't go from auto to auto, to resize. And that's exactly what we're trying to pull off here.

So instead, what we if we new the actual height in terms of pixels. Let's inspect - and we see its 84. And if we refresh, go back to auto, we can see the form is 204.

So if we went from 204 to 84 then we'd have our animation.

So let's use our same logic, and go from 204 to 84:

```jsx
<motion.div
   animate={{
      height: status === "idle" || status === "saving" ? 204 : 84,
   }}
>
```

Look at that.

Now orchestration issue. 3 animations, but the fades happen after each other. And they all share the duration of 1. So 2 seconds for fades but panel is in 1.

```jsx
<motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }} key="form" />
```

All happening perfecrtly aligned. This is the right way to think about this animation, two phases happening in parallel.

Let's parameterize these numbers. You'll see I have an transition up here.

```jsx
<motion.div
  transition={{
    ...transition,
    duration: transition.duration / 2,
  }}
/>
```

# Step: Magic number

So this is a great approach, except there's one problem: magic numbers. Add content, breaks animation. Height needs to be dynamic.

So since we can't use auto to measure this, how might we solve this? Well turns out there's a quite a few libraries out there designed to do just this, and today we're going to use useMeasure from react-use-measure.

```jsx
let [ref, bounds] = useMeasure();
```

Let's see how this works. useEffect, comment out height animation, see rerender. Submit form, see rerender. See 84.

So let's bring back in our height animation adn use bounds.height.

```jsx
<motion.div animate={{ height: bounds.height }} ref={ref} />
```

Ok, seeing 203.8 which is strange, but more importantly, height animation is not working.

chicken and egg. Need to measure dynamic content and then set it. Can't do that on the same element that we're setting the height.

Need a new div that's always auto height, that we can use to measure, and then set it on the parent. So let's add a new div and put the ref here.

And now if we refresh, see 204, click it, then we go down to 84. So we have our height animation back.

# Step

Ok - our panel is animating but we kinda broke something. Let's slow down to 3.

Panel doesn't animate height until exit animation completes. This is because we're using mode wait. So we don't give useMeasure a chance to measure the height of the message until after the form has faded out.

If we go back to sync, doesn't work. 204, to 288 (sum), back down to 84. So that's not going to work for us either.

And this is where the last mode comes in. popLayout, read it. Lets useMeausre immediately measure the new document, so we get our 84 right away.

Now we see an issue with overflow here, and this is due to how popLayout is implemented. It's actually creating a new stacking context. If we add relative to our panel that overflow-hidden is on, it fixes it.

Now finally, because popLayout triggers the exit and enter animations at the same time, we see this kind of cross-fading behavior happening with our dynamic contents. That's becuase we're not using wait anymore to wait for exit to finish before mounting.

This could be a nice effect for something like an image carousel but here it's not what we want. We can fix that by dropping down a level and adding a delay to our enter animation.

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    ...transition,
    duration: transition.duration / 2,
    delay: transition.duration / 2,
  }}
/>
```

Refresh. And now we're back in business.

So popLayout is the perfect mode for what we're doing here. It pops out the exiting element, giving useMeasure an opportunity to measure the ending height of the panel so that it can start its height animation immediately.

# Step

Ok - let's bring the our transition duration back to say 0.4. If we look close we can actually see the panel move a bit, and in the inspector we can see the height is being animated on initial render. This has to do with how useMeasure work, and that fact it gives us 0 on the first render. So there's one frame where framer motion is trying to animate this panel down to 0, then immediately after the rerender it animates it back to 204.

So 0 is really more like undefined. So we can add

```jsx
animate={{ height: bounds.height > 0 ? bounds.height : null }}
```

Ok - now for some fun. Let's tweak these transitions. Delete console. Bring duration back down to 0.4. Fades look pretty good but the height animation feels a little too abrupt.

Let's come to our height and play around. Let's try type spring. Little bouncy. Bounce goes from 0 to 1.

Try 0. Looks p good, could use that. Try .2, I like that, subtle. Slow it down a bit. .5, .8.

```jsx
<motion.div
  animate={{ height: bounds.height > 0 ? bounds.height : null }}
  transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
/>
```

Now we've lost relationship between the bounce and the fades, but IME this is ok. The bounce is actually taking .8 seconds, but fades are done in 0.4. But because end of bounce is so subtle, I find the eye works best here, and it's best to just tinker with this until it feels right.

So there you have it! Let's take a look at the before and after.

Few moving pieces here, resizing something with dynamic contents is just fundamnetally harder than something that completely exits to height 0 or enters from height 0.
