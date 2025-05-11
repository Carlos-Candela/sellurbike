import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Grid } from "react-loading-icons";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { Toaster } from "react-hot-toast";


const App = lazy(() => import("./App"));
const container = document.getElementById("root");
if (!container._reactRootContainer) {
const root = createRoot(document.getElementById("root"));
root.render(
  
  <BrowserRouter>
    <Provider store={store}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen bg-[#c9c4f4]">
            <Grid />
          </div>
        }
      >
        <App />
        <Toaster
          toastOptions={{
            position: "top-right",
            style: {
              background: "#283046",
              color: "white",
            },
          }}
        />
      </Suspense>
    </Provider>
  </BrowserRouter>
  
);
}