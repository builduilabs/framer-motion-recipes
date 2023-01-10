import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { createContext } from "react";
import { useContext } from "react";
import useMeasure from "react-use-measure";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100">
      <div className="flex h-[400px] w-full max-w-md flex-col">
        <ResizablePanelComponent />
      </div>
    </div>
  );
}

let transition = { type: "ease", ease: "easeInOut", duration: 0.4 };

function ResizablePanelComponent() {
  let [status, setStatus] = useState("idle");
  let [ref, bounds] = useMeasure();

  // useEffect(() => {
  //   let x = setInterval(() => {
  //     setStatus((status) => {
  //       return status === "idle" ? "success" : "idle";
  //     });
  //   }, 2000);

  //   return () => clearInterval(x);
  // }, []);

  return (
    <MotionConfig transition={transition}>
      <div className="mx-auto w-full max-w-md">
        <div className="relative overflow-hidden rounded bg-white text-zinc-900 shadow">
          <div className="px-8 pt-8">
            <p className="text-lg font-medium">Reset password</p>
          </div>

          <motion.div
            animate={{ height: bounds.height > 0 ? bounds.height : null }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
          >
            <div ref={ref}>
              <AnimatePresence mode="popLayout">
                {status === "idle" || status === "saving" ? (
                  <motion.div
                    exit={{ opacity: 0 }}
                    transition={{
                      ...transition,
                      duration: transition.duration / 2,
                    }}
                    key="form"
                  >
                    <Form
                      onSubmit={async () => await delay(1000)}
                      afterSave={() => setStatus("success")}
                      className="p-8"
                    >
                      <p className="text-sm text-zinc-500">
                        Enter your email to reset your password:
                      </p>
                      <div className="mt-2">
                        <input
                          className="block w-full rounded border border-zinc-300 text-zinc-800 shadow-sm"
                          type="email"
                          required
                          defaultValue="sam@buildui.com"
                        />
                      </div>
                      <div className="mt-8 text-right">
                        <Form.Button className="rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white">
                          Email me my link
                        </Form.Button>
                      </div>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      ...transition,
                      duration: transition.duration / 2,
                      delay: transition.duration / 2,
                    }}
                  >
                    <p className="p-8 text-sm text-zinc-500">
                      Email sent! Check your inbox to continue.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <p className="mt-4 text-sm text-zinc-400">
          <span className="underline">Reach out</span> to us if you need more
          help.
        </p>
      </div>
    </MotionConfig>
  );
}

let formContext = createContext();

function Form({ onSubmit, afterSave, children, ...props }) {
  let [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    await onSubmit();
    setStatus("success");
    await delay(1250);
    afterSave();
  }

  return (
    <formContext.Provider value={{ status }}>
      <form onSubmit={handleSubmit} {...props}>
        <fieldset disabled={status !== "idle"}>{children}</fieldset>
      </form>
    </formContext.Provider>
  );
}

Form.Button = function FormButton({ children, className, ...rest }) {
  let { status } = useContext(formContext);

  let disabled = status !== "idle";

  return (
    <MotionConfig transition={{ ...transition, duration: 0.15 }}>
      <button
        type="submit"
        disabled={disabled}
        className={`${className} relative transition duration-200 ${
          disabled ? "bg-opacity-80" : "hover:bg-opacity-80"
        }`}
        {...rest}
      >
        <AnimatePresence mode="wait">
          {status === "saving" && (
            <motion.div
              key="a"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex justify-center py-2"
            >
              <Spinner />
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="b"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex justify-center py-2"
            >
              <CheckIcon className="h-full" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className={status === "idle" ? "" : "invisible"}>{children}</span>
      </button>
    </MotionConfig>
  );
};

function Spinner({ className, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} h-full w-auto animate-spin`}
      style={{
        animationTimingFunction: "steps(8, end)",
        animationDuration: ".75s",
      }}
      {...rest}
    >
      <rect
        style={{ opacity: 0.4 }}
        x={11}
        y={2}
        width={2}
        height={6}
        rx={1}
        fill="currentColor"
      />
      <rect
        style={{ opacity: 0.4 }}
        x={18.364}
        y={4.22183}
        width={2}
        height={6}
        rx={1}
        transform="rotate(45 18.364 4.222)"
        fill="currentColor"
      />
      <rect
        x={22}
        y={11}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform="rotate(90 22 11)"
        fill="currentColor"
      />
      <rect
        x={19.7782}
        y={18.364}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform="rotate(135 19.778 18.364)"
        fill="currentColor"
      />
      <rect
        x={13}
        y={22}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform="rotate(-180 13 22)"
        fill="currentColor"
      />
      <rect
        x={5.63603}
        y={19.7782}
        width={2}
        style={{ opacity: 0.6 }}
        height={6}
        rx={1}
        transform="rotate(-135 5.636 19.778)"
        fill="currentColor"
      />
      <rect
        x={2}
        y={13}
        width={2}
        style={{ opacity: 0.8 }}
        height={6}
        rx={1}
        transform="rotate(-90 2 13)"
        fill="currentColor"
      />
      <rect
        x={4.22183}
        y={5.63603}
        width={2}
        height={6}
        rx={1}
        transform="rotate(-45 4.222 5.636)"
        fill="currentColor"
      />
    </svg>
  );
}

async function delay(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
