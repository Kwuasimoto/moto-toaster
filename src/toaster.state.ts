import { createStore } from "solid-js/store";
import { ToasterState, ToastRef } from "../types";
import { Accessor } from "solid-js";

/**
 * create - Adds toast to toaster overlay.
 * remove - removes toast by id.
 */
const [toasterState, setToasterState] = createStore<ToasterState>({
  toasts: [],
  toastRefs: [],
  toaster: () => null,
  getToastRef: (id): Accessor<ToastRef> | undefined => {
    return toasterState.toastRefs.find((item) => item().id === id);
  },
  setToast: (toast) => {
    setToasterState("toasts", (prev) => {
      return toast.insertionMethod === "prepend"
        ? [toast, ...prev]
        : [...prev, toast];
    });
    if (toast.duration) {
      setTimeout(() => toasterState.removeToast(toast.id), toast.duration);
    }
  },
  setToastRef: (id, accessor) => {
    setToasterState("toastRefs", (prev) => [...prev, () => ({ id, accessor })]);
  },
  setToaster: (toasterRef) => setToasterState("toaster", toasterRef),
  removeToast: (id) => {
    setToasterState("toasts", (prevToasts) =>
      prevToasts.filter((toast) => toast.id !== id),
    );
    return true; // Return true for success, you can add more logic if needed
  },
  removeToastRef: (id) => {
    setToasterState("toastRefs", (prev) => [
      ...prev.filter((item) => item().id !== id),
    ]);
    return true;
  },
});

export { toasterState };
