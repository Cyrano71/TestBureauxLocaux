import { Link, json, useLoaderData } from "react-router-dom";

export default function ProductsPage(props) {
  const data = useLoaderData();
  return (
    <>
      <h2>The list of realstate page</h2>
      <ul>
        {data.sort().map((id) => {
          return (
            <li key={id}>
              <Link to={`${id}`}>RealEstate {id}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export async function loadAllRealEstate() {
  const token = localStorage.getItem("token");
  const response = await fetch(process.env.REACT_APP_BACKEND_URL + "polls/", {
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
