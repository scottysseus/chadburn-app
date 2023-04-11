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

window.addEventListener("load", function () {
  setTimeout(function () {
    // This hides the address bar:
    window.scrollTo(0, 1);
  }, 0);
});

export function App() {
  return (
    <div id="app">
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <TopBar />
      <RouterProvider router={router} />
    </div>
  );
}
