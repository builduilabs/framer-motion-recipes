# Half

```
transition={{
   ...transition,
   duration: transition.duration / 2,
}}
```

# Diff

```diff
diff --git a/pages/7-resizable-panel/index.js b/pages/7-resizable-panel/index.js
index f2bbdd3..4c51d9b 100644
--- a/pages/7-resizable-panel/index.js
+++ b/pages/7-resizable-panel/index.js
@@ -1,49 +1,88 @@
 import { AnimatePresence, motion, MotionConfig } from "framer-motion";
 import { useState } from "react";
 import { CheckIcon } from "@heroicons/react/solid";
+import useMeasure from "react-use-measure";
 import { createContext } from "react";
 import { useContext } from "react";

-export default function ResizablePanel() {
+let transition = { type: "ease", ease: "easeInOut" };
+
+export default function Measure() {
   let [status, setStatus] = useState("idle");
+  let [ref, { height }] = useMeasure();

   return (
-    <div className="flex min-h-screen items-start bg-zinc-900 pt-28">
-      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800">
-        <div className="px-8 pt-8">
-          <p className="text-lg text-white">Reset password</p>
-        </div>
-
-        {status === "idle" || status === "saving" ? (
-          <div className="p-8">
-            <Form
-              onSubmit={async () => await delay(1000)}
-              afterSave={() => setStatus("success")}
-            >
-              <p className="text-sm text-zinc-400">
-                Enter your email to get a password reset link:
-              </p>
-              <div className="mt-3">
-                <input
-                  className="block w-full rounded border-none text-slate-900"
-                  type="email"
-                  required
-                />
-              </div>
-              <div className="mt-8 text-right">
-                <Form.Button className="rounded bg-indigo-500 px-5 py-2 text-sm font-medium text-white ">
-                  Email me my link
-                </Form.Button>
-              </div>
-            </Form>
+    <MotionConfig transition={transition}>
+      <div className="flex min-h-screen items-start bg-zinc-900 pt-28">
+        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800">
+          <div className="px-8 pt-8">
+            <p className="text-lg text-white">Reset password</p>
           </div>
-        ) : (
-          <p className="p-8 text-sm text-zinc-400">
-            Email sent! Check your inbox to continue.
-          </p>
-        )}
+          <div>
+            <div>
+              <motion.div
+                animate={{ height: height === 0 ? "auto" : height }}
+                transition={{
+                  type: "spring",
+                  duration: 0.8,
+                  bounce: 0.2,
+                }}
+                initial={false}
+              >
+                <div ref={ref}>
+                  <AnimatePresence initial={false} mode="popLayout">
+                    {status === "idle" || status === "saving" ? (
+                      <motion.div
+                        initial={{ opacity: 0 }}
+                        animate={{ opacity: 1 }}
+                        exit={{ opacity: 0 }}
+                        className="p-8"
+                        key="b"
+                      >
+                        <Form
+                          onSubmit={async () => await delay(1000)}
+                          afterSave={() => setStatus("success")}
+                        >
+                          <p className="text-sm text-zinc-400">
+                            Enter your email to get a password reset link:
+                          </p>
+                          <div className="mt-3">
+                            <input
+                              className="block w-full rounded border-none text-slate-900"
+                              type="email"
+                              required
+                            />
+                          </div>
+                          <div className="mt-8 text-right">
+                            <Form.Button className="rounded bg-indigo-500 px-5 py-2 text-sm font-medium text-white ">
+                              Email me my link
+                            </Form.Button>
+                          </div>
+                        </Form>
+                      </motion.div>
+                    ) : (
+                      <motion.p
+                        initial={{ opacity: 0 }}
+                        animate={{ opacity: 1 }}
+                        exit={{ opacity: 0 }}
+                        key="a"
+                        transition={{
+                          ...transition,
+                          delay: 0.2,
+                        }}
+                        className="p-8 text-sm text-zinc-400"
+                      >
+                        Email sent! Check your inbox to continue.
+                      </motion.p>
+                    )}
+                  </AnimatePresence>
+                </div>
+              </motion.div>
+            </div>
+          </div>
+        </div>
       </div>
-    </div>
+    </MotionConfig>
   );
 }

@@ -70,8 +109,6 @@ function Form({ onSubmit, afterSave, children, ...props }) {
   );
 }

-let transition = { type: "ease", ease: "easeInOut" };
-
 Form.Button = function FormButton({ children, className, ...rest }) {
   let { status } = useContext(formContext);
```
