import "./App.css";
import RootLayout from "./pages/Root";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage, { loadAllRealEstate } from "./pages/Products";
import ProductDetailsPage, { loadRealState } from "./pages/ProductDetails";
import NewProductPage from "./pages/NewProduct";
import { action as eventFormAction } from './components/ProductForm';
import UpdateProductPage from "./pages/UpdateProduct";
import AuthenticationPage, {action as authAction} from "./pages/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "login", element: <AuthenticationPage />, action: authAction },
      { path: "realestate", element: <ProductsPage />, loader: loadAllRealEstate },
      { path: "realestate/add", element: <NewProductPage />, action: eventFormAction },
      { path: "realestate/:realestateId/update", element: <UpdateProductPage />, action: eventFormAction },
      { path: "realestate/:realestateId", element: <ProductDetailsPage />, loader: loadRealState  },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
