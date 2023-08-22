import { Accessor, JSX } from "solid-js";

export interface ToasterState {
  /**
   * A function that returns the toaster HTMLDivElement.
   */
  toaster: Accessor<JSX.Element | null>;
  /**
   * sets the toaster reference.
   * @param toasterRef
   */
  setToaster: (toasterRef: Accessor<JSX.Element | null>) => void;
  /**
   * Toast elements rendered in the For-loop of the toaster.
   */
  toasts: Toast[];
  /**
   * Toast refs that can be fetched with getToastRef in toasterService, or directly through state with id.
   */
  toastRefs: Accessor<ToastRef>[];
  /**
   * gets the toast ref from the state by id.
   * @param id
   */
  getToastRef: (id: string) => Accessor<ToastRef> | undefined;
  /**
   * sets a toast in the toasts array.
   * @param toast
   */
  setToast: (toast: Toast) => void;
  /**
   * sets a toaster ref by id.
   * @param id
   * @param accessor
   */
  setToastRef: (id: string, accessor: Accessor<JSX.Element | null>) => void;
  /**
   * remove toast by id.
   * @param id
   */
  removeToast: (id: string) => boolean;
  /**
   * Remove toast ref by id.
   * @param id
   */
  removeToastRef: (id: string) => boolean;
}

/**
 * Main utility for creating/removing toasts reactively.
 */
export interface ToasterService {
  /**
   * Get a toastRef from toaster state.
   * @param accessor The accessor associated with the ToasterRef.
   */
  getToastRef: (
    accessor: Accessor<JSX.Element | undefined>,
  ) => Accessor<ToastRef> | undefined;
  /**
   * Renders toasts reactively within the Toaster.
   * @param toasts an array of toasts that are rendered via the Toast['render'] function. These toasts are rendered within a <Toast> element. The properties of the objects passed to the array for useToasts will be spread on the Toast element. And a ref will be forwarded.
   */
  useToast: (toasts: Toast[]) => Toast[];
  /**
   * Removes toast from toaster state.
   * @param toast
   */
  removeToast: (toast: Accessor<JSX.Element>) => boolean;
}

export type Toast = JSX.HTMLAttributes<any> & {
  /**
   * The id used to fetch the reference.
   */
  id: string;
  /**
   * renders a JSX.Element within a Toast Element in the Toaster(toaster.service.ts)
   * @param ref the reference to the Toast element rendered within the toaster.
   */
  render: (ref: Accessor<JSX.Element>) => JSX.Element;
  /**
   * The direct reference to the HTMLDivElement,
   *
   * typable - <HTMLDivElement>ref()
   */
  ref?: Accessor<JSX.Element>;
  /**
   * The props passed to the Toast element in Toast['render'] function.
   */
  props?: JSX.HTMLAttributes<HTMLDivElement>
  /**
   * If user clicks off of toast, close the toast.
   */
  onClickOffClose?: boolean;
  /**
   * Event
   */
  onClickOff?: () => void;
  /**
   * the duration of the toast.
   *
   * if (duration <= 0) toast will not close.
   */
  duration?: number;
  /**
   * prepend - Places the toast at the left end of the toasts array.
   * push - Places the toast to the right side of the toasts array.
   */
  insertionMethod?: ToastInsertionMethod;
  /**
   * Only allows one toast of each ID to be created at once.
   */
  unique?: boolean;
};

export type ToastInsertionMethod = "prepend" | "push";
export type ToastProps = JSX.HTMLAttributes<HTMLDivElement>;
export type ToastRef = { id: string; accessor: Accessor<JSX.Element | null> };
