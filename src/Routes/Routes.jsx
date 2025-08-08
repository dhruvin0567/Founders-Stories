import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../Pages/Home/Home";
import CategoryPage from "../Pages/Home/CategoryPage";
import SingleBlogPage from "../Pages/SingleBlog/SingleBlogPage";
import NotFound from "../Pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "category/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "blog/:slug",
        element: <SingleBlogPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
