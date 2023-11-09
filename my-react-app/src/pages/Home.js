import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("realestate");
  };
  return (
    <>
      <h1>My home page</h1>
      <p>
        Go to <Link to="realestate"> the list of realestate </Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}

export default HomePage;