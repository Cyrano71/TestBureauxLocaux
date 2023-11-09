import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <div id="bordure">
        <div className="center">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <div id="footer"> </div>
    </>
  );
}

export default RootLayout;