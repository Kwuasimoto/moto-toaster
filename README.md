## Moto-Toaster

A simple, minimally styled SolidJS toaster that focuses on reactivity rather than targeting the dom.


### Notes:
Simultaneous toasters not supported, use one Toaster at a time. <br/>
If you need multi toaster support, apply an ID to the Toaster and within the For, check for id before rendering toast. <br/>
I'll get around to implementing it sometime soon likely. </br>

### All Components Included
```
./src/Toast.tsx
./src/Toaster.tsx
./src/toaster.service.ts
./src/toaster.state.ts
```
___
## Getting Started


Install the dependency
```npm
npm i moto-toaster
```

Place the Toaster element anywhere in your application where you want the toasts to appear. (lazy loading is optional)</br>
```typescript jsx
import { lazily } from "solidjs-lazily"
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
import {
  Component,
  ComponentProps,
  onCleanup,
} from "solid-js";

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
        class: "TailwindCSS Styles go here to style <Toast/> element rendered in <Toaster/>",
        unique: true,
        id: "registration-toast",
        insertionMethod: "prepend",
        onClickOffClose: false,
        duration: 0,
        render: (ref) => <div>Toast Content</div>,
      },
    ]);
  };

  return (<></>);
};

```





