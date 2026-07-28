import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";

// Team Ferris

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Toaster richColors position="bottom-center" />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
