import { Component } from "solid-js";
import { ToastProps } from "../types";

export const Toast: Component<ToastProps> = (props) => {
  return (
    <div {...props} class={props.class} style={"pointer-events: auto;"}>
      {props.children}
    </div>
  );
};
