import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
