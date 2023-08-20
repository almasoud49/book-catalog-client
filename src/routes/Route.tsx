import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home"
import PrivateRoute from "./PrivateRoute";
import BookDetails from "../components/BookDetails";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/home",
                element: (
                  <PrivateRoute>
                    <Home />,
                  </PrivateRoute>
                ),
              },
              {
                path: "/book/:id",
                element: <BookDetails />,
              },
        ],
        },
        {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
]);

export default routes;