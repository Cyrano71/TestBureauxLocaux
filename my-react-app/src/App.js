import "./App.css";
import RootLayout from "./pages/Root";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage, { loadAllRealEstate } from "./pages/Products";
import ProductDetailsPage, { loadRealState } from "./pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "realestate", element: <ProductsPage />, loader: loadAllRealEstate },
      { path: "realestate/:realestateId", element: <ProductDetailsPage />, loader: loadRealState  },
    ],
  },
]);

function App() {
  useEffect(() => {
    async function auth() {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "polls/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "jehan", password: "1234" }),
        }
      );
      console.log(response)
      const data = await response.json();
      localStorage.setItem("token", data["token"]);
    }
    auth();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
