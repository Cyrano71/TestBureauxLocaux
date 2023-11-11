import { Link } from "react-router-dom";

function HomePage() {
  const token = localStorage.getItem("token");
  let content = (
    <p>
      Go to <Link to="realestate"> the list of realestate </Link>
    </p>
  );
  if (!token) {
    content = (
      <div>
        <p>Login is required in order to fetch data from the backend</p>
        <Link to="login">Login</Link>
      </div>
    );
  }
  return (
    <>
      <h1>My home page</h1>
      {content}
    </>
  );
}

export default HomePage;
