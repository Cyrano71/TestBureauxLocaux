import "./App.css";
import RootLayout from "./pages/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import ItemsPage, { loadAllRealEstate } from "./pages/Items";
import ItemDetailsPage, { loadRealState } from "./pages/ItemDetails";
import NewItemPage from "./pages/NewItem";
import { action as eventFormAction } from './components/ItemForm';
import UpdateItemPage from "./pages/UpdateItem";
import AuthenticationPage, {action as authAction} from "./pages/Authentication";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "login", element: <AuthenticationPage />, action: authAction },
      { path: "realestate", element: <ItemsPage />, loader: loadAllRealEstate },
      { path: "realestate/add", element: <NewItemPage />, action: eventFormAction },
      { path: "realestate/:realestateId/update", element: <UpdateItemPage />, action: eventFormAction },
      { path: "realestate/:realestateId", element: <ItemDetailsPage />, loader: loadRealState  },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
