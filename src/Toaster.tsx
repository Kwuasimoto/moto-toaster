import { Component, createEffect, createSignal, For, JSX } from "solid-js";
import { Toast } from "./Toast";
import { toasterService } from "./toaster.service";
import { toasterState } from "./toaster.state";

export const Toaster: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [toaster, setToaster] = createSignal<JSX.Element>();

  createEffect(() => {
    if (toaster()) {
      toasterState.setToaster(toaster);
    }
  });

  return (
    <>
      <div
        id={props.id || "moto-toaster"}
        ref={setToaster}
        style={"pointer-events: none; position: absolute; inset: 0; display: flex; height: 100%; width: 100%; flex-direction: column"}
        class={props.class}
        {...props}
      >
        <For each={toasterState.toasts}>
          {(item) => {
            const [toastRef, setToastRef] = createSignal<JSX.Element>();

            createEffect(() => {
              if (toastRef()) toasterState.setToastRef(item.id, toastRef);
            });

            return (
              <Toast
                ref={setToastRef}
                id={item.id}
                class={item.class}
                onclick={(e) => {
                  if (item.onClickOffClose && e.target === e.currentTarget)
                    toasterService.removeToast(toastRef);
                }}
                {...item.props}
              >
                {item.render(toastRef)}
              </Toast>
            );
          }}
        </For>
      </div>
      {/*RENDER REST OF APPLICATION*/}
      {props.children}
    </>
  );
};
