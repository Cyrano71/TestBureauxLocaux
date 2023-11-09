import { useParams, useLoaderData, json } from "react-router-dom";

export default function ProductDetailsPage(props) {
  const params = useParams();
  const data = useLoaderData();

  return (
      <div>
        <h1>{data.title}</h1>
        <p>{data.addresse}</p>
        <p>{data.transaction_type}</p>
        <p>{data.pub_date}</p>
        <button>Acquire</button>
      </div>
  );
}

export async function loadRealState({ params }) {
  console.log(params.realestateId);
  const token = localStorage.getItem("token");
  const response = await fetch(process.env.REACT_APP_BACKEND_URL + "polls/" + params.realestateId + "/", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw json(
      { message: "Could not fetch realstate " +  params.realestateId},
      {
        status: 500,
      }
    );
  }
  const responseData = await response.json();
  console.log(responseData[0]);
  return responseData[0];
}