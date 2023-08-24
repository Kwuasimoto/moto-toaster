import { Component } from "solid-js";
import { ToastProps } from "../types";

/**
 * This element wraps the JSX supplied by the render property on the Toast Type
 * 
 * It is not recommended to use this element within the [toasterService.useToast] function.
 *
 * @param props ToastProps - The properties supplied by the [toasterService.useToast] function.
 * @returns Toast JSX rendered within the Toaster
 */
export const Toast: Component<ToastProps> = (props) => {
  return (
    <div style={"pointer-events: auto;"} {...props}>
      {props.children}
    </div>
  );
};
