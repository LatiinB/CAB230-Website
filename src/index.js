import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './Pages/home'
import SignUp from './Pages/signup'
import SignIn from './Pages/signin'
import Movies from './Pages/movies'
import MovieDetails from './Pages/moviedetail'
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/moviedetails",
    element: <MovieDetails />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();