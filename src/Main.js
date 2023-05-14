import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from './Main'
import SignUp from './Pages/signup'

const router = createBrowserRouter([
  {
    path: "/",
    element: App,
  },
  {
    path: "/signup",
    element: SignUp,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);