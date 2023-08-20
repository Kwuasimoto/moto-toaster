import { Component, createEffect, createSignal, For, JSX } from "solid-js";
import { Toast } from "./Toast";
import { toasterService } from "./toaster.service";
import { toasterState } from "./toaster.state";

export const Toaster: Component<any> = (props) => {
  const [toaster, setToaster] = createSignal<JSX.Element>();

  createEffect(() => {
    if (toaster()) {
      toasterState.setToaster(toaster);
    }
  });

  return (
    <>
      <div
        ref={setToaster}
        class="pointer-events-none absolute inset-0 flex h-full w-full flex-col"
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
                onClick={(e) => {
                  if (item.onClickOffClose && e.target === e.currentTarget)
                    toasterService.removeToast(toastRef);
                }}
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
