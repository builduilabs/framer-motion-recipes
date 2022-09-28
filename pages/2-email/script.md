## Step

Let's start with fetch new email button. Little jarring.

Add a mount animation. We know how to do that!

```jsx
<motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
```

## Step

Would be awesome if height could animate so it slides down.

You might know that CSS can't transition height to auto. Check it out.

```js
<motion.li
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  key={mid}
  className="relative h-20 py-0.5 transition-all"
>
```

Toggle h-20 to h-40 or h-0, works. But h-auto doesn't.

This is one of the reasons I love framer motion so much. Check this out.

```jsx
<motion.li
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: "auto" }}
/>
```

Boom. Awesome right?

Now we're seeing a bit of "jumping" with the height animation. This is because animating to/from 'auto' height requires measuring the DOM, and there's no perfect way to do this. In our case, the problem is because we have padding on the entering element, so the easiest way is to move this padding inside of our motion element.

Let's wrap a new div with the padding.

UI is exactly the same, but now look at that. Buttery smooth. And even if we press it while it's happening it recalculates. So it's fully interruptible.

Just with these two lines of code!! How great is that?

And of course we can customize this with the transition prop:

```
transition={{ type: "spring", bounce: 0.75, duration: 2 }}
```

Could slap overflow-hidden on `<li>` to hide it while growing.

## Step

Got mount animations working. But what about when we archive? Let's get this working.

This is called an exit animation, and we get it with the `exit` prop. If we look at the docs for exit, ...read

Add

```
exit={{ height: 0 }}
```

Wrap in AnimatePresence. Voila!

Let's add opacity: 0. Looks great!

Usually I like the fade out to happen a little faster than the height:

```
transition={{ opacity: { duration: 0.2 } }}
```

## Step

Give the page a reload. We're seeing mount animations. Look at props on AnimatePresence, initial. Read description. initial={false}, boom!

## Step

Ok, before we leave this demo, let's add a feature. We want to mkae it so we can select multiple messages and archive them.

Add button:

```jsx
<button className="-mx-2 rounded px-2 py-1 text-slate-400 hover:text-slate-500 active:bg-slate-200">
  <Icons.ArchiveIcon className="h-5 w-5" />
</button>
```

Add selectedMessages. Style them.

```jsx
<button
  onClick={() => selectMessage(mid)}
  className={`${
    selectedMessages.includes(mid)
      ? "bg-blue-500"
      : "hover:bg-slate-200"
  } block w-full cursor-pointer truncate rounded py-3 px-3 text-left `}
>
```

```jsx
<p
  className={`${
    selectedMessages.includes(mid)
      ? "text-white"
      : "text-slate-500"
  } truncate text-sm font-medium`}
>
  {titles[mid % titles.length][0]}
</p>
<p
  className={`${
    selectedMessages.includes(mid)
      ? "text-blue-200"
      : "text-slate-400"
  } truncate text-xs`}
>
  {titles[mid % titles.length][1]}
</p>
```

Add archive button, make click select, archive all selected

```js
function archiveSelectedMessages() {
  setMessages((messages) =>
    messages.filter((id) => !selectedMessages.includes(id))
  );
  setSelectedMessages([]);
}
```

"Look we can make a feature without changing animation code"

## Step

Show non-animated with archive

# Todo

- call out margin in between messages? start it out with margin, show jitter, explain margin collapse messees browsers ability to calculate height.

- make version with archive selected that has no animation
