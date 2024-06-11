import { Outlet } from "react-router-dom";

function Main() {
  return (
    <main id="main" className="main">
      <Outlet />
    </main>
  );
}

export default Main;
