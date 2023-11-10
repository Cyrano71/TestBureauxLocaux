import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import classes from "./ProductForm.module.css";

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue="My amazing office"
        />
      </p>
      <p>
        <label htmlFor="addresse">Addresse</label>
        <input
          id="addresse"
          type="text"
          name="addresse"
          required
          defaultValue="st germain des près"
        />
      </p>
      <p>
        <label htmlFor="transaction_type">Transaction Type</label>
        <input
          id="transaction_type"
          type="text"
          name="transaction_type"
          list="transaction_types"
          required
          defaultValue={event ? event.title : ""}
        />
         <datalist id="transaction_types">
              <option value="rental" />
              <option value="sale" />
            </datalist>
      </p>
      <p>
        <label htmlFor="realty_type">Realty Type</label>
        <input
          id="realty_type"
          type="text"
          name="realty_type"
          list="realty_types"
          required
          defaultValue={event ? event.title : ""}
        />
            <datalist id="realty_types">
              <option value="office" />
              <option value="land plot" />
              <option value="warehouse" />
              <option value="retail" />
              <option value="coworking" />
            </datalist>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    addresse: data.get("addresse"),
    transaction_type: data.get("transaction_type"),
    realty_type: data.get("realty_type"),
    pub_date: new Date().toJSON()
  };

  let url = process.env.REACT_APP_BACKEND_URL + "api/create/";

  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/realestate");
}
