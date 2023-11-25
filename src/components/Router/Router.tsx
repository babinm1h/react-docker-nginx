import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import { PostsLazy } from "../Posts/PostsLazy";
import { AboutLazy } from "../About/AboutLazy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/posts", element: <PostsLazy /> },
      { path: "/about", element: <AboutLazy /> },
    ],
  },
]);



