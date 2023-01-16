import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StoreContextProvider } from "./scenes/StoreContextProvider";

import { Landing } from "./scenes/Landing";

import { TopBar } from "./components/TopBar";
import styles from "./index.module.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/:gameId",
    element: <StoreContextProvider />,
  },
]);

export function App() {
  return (
    <div id={styles.app}>
      <TopBar />
      <RouterProvider router={router} />
    </div>
  );
}
