import { NavLink } from "react-router-dom";

import notFound from "../assets/images/404.png";

function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
      <img src={notFound}></img>
      <div>
        <p className="h1">Page Not Found</p>
        <NavLink to="/" className="btn btn-primary">
          Go Home
        </NavLink>
      </div>
    </div>
  );
}

export default NotFound;
