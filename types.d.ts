import { Accessor, JSX } from "solid-js";

export interface ToasterState {
  toaster: Accessor<JSX.Element | null>;
  
  setToaster: (toasterRef: Accessor<JSX.Element | null>) => void;

  toasts: Toast[];

  toastRefs: Accessor<ToastRef>[];

  getToastRef: (id: string) => Accessor<ToastRef> | undefined;

  setToast: (toast: Toast) => void;

  setToastRef: (id: string, accessor: Accessor<JSX.Element | null>) => void;

  removeToast: (id: string) => boolean;

  removeToastRef: (id: string) => boolean;
}

export interface ToasterService {
  getToastRef: (
    accessor: Accessor<JSX.Element | undefined>,
  ) => Accessor<ToastRef> | undefined;

  useToast: (toasts: Toast[]) => Toast[];

  removeToast: (toast: Accessor<JSX.Element>) => boolean;
}

export type Toast = JSX.HTMLAttributes<any> & {
  id: string;

  render: (ref: Accessor<JSX.Element>) => JSX.Element;

  ref?: Accessor<JSX.Element>;

  props?: JSX.HTMLAttributes<HTMLDivElement>

  onClickOffClose?: boolean;

  onClickOff?: () => void;

  duration?: number;

  insertionMethod?: ToastInsertionMethod;

  unique?: boolean;
};

export type ToastInsertionMethod = "prepend" | "push";
export type ToastProps = JSX.HTMLAttributes<HTMLDivElement>;
export type ToastRef = { id: string; accessor: Accessor<JSX.Element | null> };
