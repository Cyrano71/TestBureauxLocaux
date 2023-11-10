import { Link, json, useLoaderData, useNavigate } from "react-router-dom";
import classes from "./Products.module.css";

export default function ProductsPage(props) {
  const data = useLoaderData();
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("add");
  };
  console.log(data)
  return (
    <>
      <strong>RealEstate Page</strong>

      <ol className={classes["alternating-colors"]}>
        {data
          .sort(function (a, b) {
            return a.id - b.id;
          })
          .map((item) => {
            return (
              <li key={item.id}>
                <Link to={`${item.id}`}>
                  <strong>RealEstate {item.id}</strong>
                </Link>
                <p>{item.title}</p>
              </li>
            );
          })}
      </ol>

      <p>
        <button
          onClick={navigateHandler}
          className={classes["button-3"]}
          role="button"
        >
          Create new RealEstate
        </button>
      </p>
    </>
  );
}

export async function loadAllRealEstate() {
  const token = localStorage.getItem("token");
  const response = await fetch(process.env.REACT_APP_BACKEND_URL + "api/", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw json(
      { message: "Could not fetch realestate items" },
      {
        status: 500,
      }
    );
  }
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
