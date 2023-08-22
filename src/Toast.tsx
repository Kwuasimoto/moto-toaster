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
    <div {...props} class={props.class} style={"pointer-events: auto;"}>
      {props.children}
    </div>
  );
};
