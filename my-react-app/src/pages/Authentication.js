import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };
  console.log(authData);
  const response = await fetch(
    process.env.REACT_APP_BACKEND_URL + "api/login",
    {
      method: "POST",
      body: JSON.stringify(authData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response);

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticated user" }, { status: 500 });
  }

  const resData = await response.json();
  localStorage.setItem("token", resData["token"]);
  return redirect("/");
}
