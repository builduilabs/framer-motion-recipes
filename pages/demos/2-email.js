import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Icons from "@heroicons/react/outline";

let titles = [
  ["Apple's newest iPhone is here", "Watch our July event"],
  [
    "Nintendo's Newsletter for July",
    "Introducing Strike, a 5-on-5 soccer game",
  ],
  ["Your funds have been processed", "See your latest deposit online"],
  ["This Week in Sports", "The finals are heating up"],
  ["Changelog update", "Edge subroutines and more"],
  ["React Hawaii is here!", "Time for fun in the sun"],
];

let base = 4;
let t = (d) => d * base;

export default function Page() {
  // let [step, setStep] = useState(1);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setStep((step) => {
  //       return step === 1 ? 2 : 1;
  //     });
  //   }, 500);
  // }, []);

  // useEffect(() => {
  //   let x = setInterval(() => {
  //     setStep((step) => {
  //       return step === 1 ? 2 : 1;
  //     });
  //   }, base * 900);

  //   return () => clearInterval(x);
  // }, [step]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-300">
      <div className="h-[400px] w-full max-w-md">
        <EmailComponent />
      </div>
    </div>
  );
}

function EmailComponent() {
  const [messages, setMessages] = useState([...Array(12).keys()]);
  const [selectedMessages, setSelectedMessages] = useState([]);

  // console.log({ selectedMessages });
  // console.log({ messages });
  // useEffect(() => {
  //   // setSelectedMessages([8]);
  //   let x = setInterval(() => {
  //     addMessage();
  //     // setStep((step) => {
  //     //   return step !== 5 ? step + 1 : 1;
  //     // });
  //   }, 1000);
  //   return () => clearInterval(x);
  // }, [addMessage]);

  function toggleMessage(mid) {
    if (selectedMessages.includes(mid)) {
      setSelectedMessages((messages) => messages.filter((id) => id !== mid));
    } else {
      setSelectedMessages((messages) => [mid, ...messages]);
    }
  }

  function addMessage() {
    let newId = (messages.at(-1) || 0) + 1;
    setMessages((messages) => [...messages, newId]);
  }

  function archiveMessages() {
    setMessages((messages) =>
      messages.filter((id) => !selectedMessages.includes(id))
    );
    setSelectedMessages([]);
  }

  return (
    <div className="max-h-full overflow-hidden rounded-2xl shadow">
      <div className="flex flex-col bg-zinc-100 py-2">
        <div className="border-b px-5">
          <div className="flex justify-between py-2 text-right">
            <button
              onClick={addMessage}
              className="-mx-2 rounded px-2 py-1 text-zinc-400 hover:text-zinc-500 active:bg-zinc-200"
            >
              <Icons.MailIcon className="h-5 w-5 " />
            </button>
            <button
              onClick={archiveMessages}
              className="-mx-2 rounded px-2 py-1 text-zinc-400 hover:text-zinc-500 active:bg-zinc-200"
            >
              <Icons.ArchiveIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <ul className="overflow-y-scroll px-3 pt-2">
          <AnimatePresence initial={false}>
            {[...messages].reverse().map((mid) => (
              <motion.li
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: {
                    type: "spring",
                    bounce: 0.3,
                    opacity: { delay: t(0.025) },
                  },
                }}
                exit={{ height: 0, opacity: 0 }}
                // transition={{ opacity: { duration: 2 } }}
                transition={{
                  duration: t(0.15),
                  type: "spring",
                  bounce: 0,
                  // type: "tween",
                  // ease: "circOut",
                  opacity: { duration: t(0.03) },
                }}
                key={mid}
                className="relative"
              >
                <div className="py-0.5 transition">
                  <button
                    onClick={() => toggleMessage(mid)}
                    className={`${
                      selectedMessages.includes(mid)
                        ? "bg-sky-500"
                        : "hover:bg-zinc-200"
                    } block w-full cursor-pointer truncate rounded py-3 px-3 text-left transition`}
                  >
                    <p
                      className={`${
                        selectedMessages.includes(mid)
                          ? "text-white"
                          : "text-zinc-500"
                      } truncate text-sm font-medium transition`}
                    >
                      {titles[mid % titles.length][0]}
                    </p>
                    <p
                      className={`${
                        selectedMessages.includes(mid)
                          ? "text-sky-200"
                          : "text-zinc-400"
                      } truncate text-xs transition`}
                    >
                      {titles[mid % titles.length][1]}
                    </p>
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
