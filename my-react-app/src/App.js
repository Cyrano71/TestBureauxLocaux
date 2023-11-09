import logo from './logo.svg';
import './App.css';
import RootLayout from "./pages/Root";
import { useEffect } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    async function auth() {
      const response = await fetch("http://localhost:8000/polls/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"username":"jehan","password":"1234"})
      })
      const data = await response.json();
      localStorage.setItem("token", data["token"])
    }
    auth()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
