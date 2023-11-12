import { Link, json, useLoaderData, useNavigate } from "react-router-dom";
import classes from "./Items.module.css";
import { useState } from "react";

export default function ItemsPage() {
  const data = useLoaderData();
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("add");
  };
  const changeHandler = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <>
      <strong>RealEstate Page</strong>

        <div className={classes["search"]}>
          <input
            type="text"
            className={classes["searchTerm"]}
            placeholder="What are you looking for?"
            onChange={changeHandler}
          />
        </div>

      <ol className={classes["alternating-colors"]}>
        {data
          .filter((item) => item.title.includes(filterValue))
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
        <button onClick={navigateHandler} className={classes["button-3"]}>
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
    const errorMessage = await response.text();
    throw json(
      { message: "Could not fetch realestate items : " + errorMessage },
      {
        status: 500,
      }
    );
  }

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
