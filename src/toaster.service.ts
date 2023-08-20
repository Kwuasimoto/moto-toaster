import { Toast, ToasterService } from "../types";
import { createStore } from "solid-js/store";
import { toasterState } from "./toaster.state";

const [toasterService] = createStore<ToasterService>({
  getToastRef: (accessor) => {
    const toastElement = <HTMLDivElement>accessor();
    return toasterState.getToastRef(toastElement.id);
  },
  useToast: (toasts): Toast[] => {
    toasts.forEach((toast) => {
      if (!toast.unique) {
        toast.id = `toast-container-${toast.id}-${toasterState.toasts.length}`;
        toasterState.setToast(toast);
        return;
      }

      if (toasterState.toasts.every((item) => item.id !== toast.id)) {
        toasterState.setToast(toast);
      }
    });
    return toasts;
  },
  removeToast: (toast): boolean => {
    const ele = <HTMLDivElement>toast();
    if (ele && "id" in ele) {
      return toasterState.removeToast(ele.id);
    }
    return false;
  },
});

export { toasterService };
