import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StoreContextProvider } from "src/scenes/StoreContextProvider";

import { Landing } from "src/scenes/Landing";

import { TopBar } from "src/components/TopBar";
import "./Styles/App.scss";

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
    <div id="app">
      <TopBar />
      <RouterProvider router={router} />
    </div>
  );
}
