import { motion } from "framer-motion";
import { useEffect, useState } from "react";

let base = 4;
let t = (d) => d * base;

export default function StepsComponent() {
  let [step, setStep] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setStep((step) => {
        return step === 1 ? 2 : 1;
      });
    }, 500);
  }, []);

  useEffect(() => {
    let x = setInterval(() => {
      setStep((step) => {
        return step === 1 ? 2 : 1;
      });
    }, base * 900);

    return () => clearInterval(x);
  }, [step]);

  return (
    <div className="flex min-h-screen scale-[3] items-center justify-center bg-white">
      <Step step={1} currentStep={step} />
    </div>
  );
}

function Step({ step, currentStep }) {
  let status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  return (
    <motion.div animate={status} className="relative">
      {/* Glow */}
      <motion.div
        variants={{
          active: {
            scale: 1,
            transition: {
              delay: t(0),
              duration: t(0.1),
            },
          },
          complete: {
            scale: 1.15,
            transition: {
              delay: t(0.2),
              duration: t(0.25),
              type: "tween",
              ease: "circOut",
            },
          },
        }}
        className="absolute inset-0 rounded-full bg-blue-300"
      ></motion.div>

      {/* Background */}
      <motion.div
        initial={false}
        variants={{
          active: {
            backgroundColor: "var(--white)",
            borderColor: "var(--blue-500)",
            color: "var(--blue-500)",
            transition: { duration: t(0.1), delay: t(0.05) },
          },
          complete: {
            backgroundColor: "var(--blue-500)",
            borderColor: "var(--blue-500)",
            color: "var(--blue-500)",
            transition: { duration: t(0.2), delay: t(0.05) },
          },
        }}
        transition={{ duration: t(0.2) }}
        className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold`}
      >
        <div className="relative flex items-center justify-center">
          {/* Number 1 */}
          <motion.span
            variants={{
              complete: { opacity: 0, transition: { duration: t(0.05) } },
              active: { opacity: 1, transition: { delay: t(0.05) } },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {step}
          </motion.span>
          <CheckIcon className="h-6 w-6 text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      {/* Check icon */}
      <motion.path
        variants={{
          active: {
            pathLength: 0,
            x: 4,
            transition: {
              type: "tween",
              ease: "easeOut",
              duration: t(0.1),
            },
          },
          complete: {
            pathLength: 1,
            x: 1,
            transition: {
              x: {
                delay: t(0.075),
                duration: t(0.35),
                type: "tween",
                ease: "easeOut",
              },
              pathLength: {
                delay: t(0.075),
                type: "tween",
                ease: "easeOut",
                duration: t(0.35),
              },
            },
          },
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
