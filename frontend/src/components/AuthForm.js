import { Form, useActionData, useNavigation } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
      <h1>Log in</h1>
        {actionData && actionData.errors && (
          <ul>
            {Object.values(actionData.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {actionData && actionData.message && <p>{actionData.message}</p>}
        <p>
          <label htmlFor="username">Email</label>
          <input id="username" type="text" name="username" required defaultValue="jehan"/>
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" defaultValue="1234" required />
        </p>
        <div className={classes.actions}>
          <button disabled={isSubmitting}>{isSubmitting? "Submitting..." : "Submit"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
