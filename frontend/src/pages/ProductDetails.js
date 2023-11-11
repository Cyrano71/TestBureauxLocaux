import { useLoaderData, json, Link } from "react-router-dom";
import classes from "./ProductDetails.module.css";

export default function ProductDetailsPage() {
  const data = useLoaderData();

  return (
    <div className={classes.card}>
      <div className={classes["card__title"]}>
        <h3>RealEstate details</h3>
      </div>
      <div className={classes["card__body"]}>
        <div className={classes["half"]}>
          <div className={classes["featured_text"]}>
            <h1>{data.title}</h1>
            <p className={classes["sub"]}>{data.addresse}</p>
            <p className={classes["sub"]}>{data.transaction_type}</p>
            <p className={classes["sub"]}>{data.realty_type}</p>    
            <p className={classes["price"]}>{data.pub_date}</p>
          </div>
        </div>
      </div>
      <div className={classes["card__footer"]}>
        <Link
          to="update"
          state={{
            title: data.title,
            addresse: data.addresse,
            transaction_type: data.transaction_type,
            realty_type: data.realty_type,
          }}
          className={classes["button-3"]}
        >
          Update Item
        </Link>
      </div>
    </div>
  );
}

export async function loadRealState({ params }) {
  console.log(params.realestateId);
  const token = localStorage.getItem("token");
  const response = await fetch(
    process.env.REACT_APP_BACKEND_URL + "api/" + params.realestateId + "/",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!response.ok) {
    throw json(
      { message: "Could not fetch realstate " + params.realestateId },
      {
        status: 500,
      }
    );
  }
  const responseData = await response.json();
  console.log(responseData[0]);
  return responseData[0];
}
