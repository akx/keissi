import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainView from "./MainView";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />,
  },
  {
    path: "/help",
    element: (
      <div>
        aa-puu-va! <Link to="/">back...</Link>
      </div>
    ),
  },
]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
