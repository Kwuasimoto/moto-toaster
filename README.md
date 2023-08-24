## Moto-Toaster

A simple, minimally styled SolidJS toaster that focuses on reactivity rather than targeting the dom.

### Notes:

Simultaneous toasters not supported, use one Toaster at a time. Will be implemented soon.<br/>

### All Components Included

```
./src/Toast.tsx
./src/Toaster.tsx
./src/toaster.service.ts
./src/toaster.state.ts
```

---

## Getting Started

Install the dependency

```npm
npm i moto-toaster
```

Place the Toaster element anywhere in your application where you want the toasts to appear. (lazy loading is optional)</br>

```typescript jsx
import { lazily } from "solidjs-lazily";
const { Toaster } = lazily(() => import("moto-toaster"));

const App: Component = () => {
  return (
    <>
      <Header />
      {/*Will not appear over the header*/}
      <Toaster>
        <AppNavigation />
        <AppRouter />
      </Toaster>
      {/*Will not appear over the footer*/}
      <Footer />
    </>
  );
};

export default App;
```

Import the toasterService (indirect state access, toaster service is recommended) </br>
or the toasterState (direct state access, is less opinionated)

```typescript jsx
import { Component, ComponentProps, onCleanup } from "solid-js";

import { toasterService, toasterState } from "moto-toaster";

export const AnyComponent: Component<ComponentProps<any>> = () => {
  // Recommended for removing toasts if screen navigates away.
  onCleanup(() => {
    toasterState.removeToast("registration-toast");
  });

  const useToast = () => {
    toasterService.useToast([
      {
        // Properties for the <Toast/> element in the Toaster.
        // Supports all HTMLDivElement properties.
        class:
          "TailwindCSS Styles go here to style <Toast/> element rendered in <Toaster/>",
        unique: true,
        id: "registration-toast",
        insertionMethod: "prepend",
        onClickOffClose: false,
        duration: 0,
        render: (ref) => <div>Toast Content</div>,
      },
    ]);
  };

  return <></>;
};
```

# Options

## ToasterService

```typescript
export interface ToasterService {
  /**
   * Get a toastRef from toaster state.
   * @param accessor The accessor associated with the ToasterRef.
   */
  getToastRef: (
    accessor: Accessor<JSX.Element | undefined>
  ) => Accessor<ToastRef> | undefined;
  /**
   * Renders toasts reactively within the Toaster.
   * @param toasts an array of toasts that are rendered via the Toast['render'] function. These toasts are rendered within a <Toast> element. The properties of the objects passed to the array param in useToasts will be spread on the Toast element. And a ref will be forwarded for using other toaster functions with, or implementing your own logic.
   */

  useToast: (toasts: Toast[]) => Toast[];
  /**
   * Removes toast from toaster state.
   * @param toast
   */

  removeToast: (toast: Accessor<JSX.Element>) => boolean;
}
```

## Toast

```typescript
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
   * The props passed to the Toast element in Toaster.
   */
  props?: JSX.HTMLAttributes<HTMLDivElement>;

  /**
   * Closes toast element.
   */
  onClickOffClose?: boolean;

  /**
   * Event related to onClickOffClose.
   */
  onClickOff?: () => void;

  /**
   * the duration of the toast.
   *
   * if (duration <= 0) toast will not close.
   */
  duration?: number;

  /**
   * prepend - Places the toast at the left side of the toasts array.
   * push - Places the toast to the right side of the toasts array.
   */
  insertionMethod?: ToastInsertionMethod;

  /**
   * Only allows one toast of each ID to be created at once.
   */
  unique?: boolean;
};
```
