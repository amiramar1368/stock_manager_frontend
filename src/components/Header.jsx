import { NavLink, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ACtive2FA from "./user/Active2FA";

import useAxios from "../customHook/useAxios";

export default function Header() {
  const httpService = useAxios();
  const navigate = useNavigate();
  const user = localStorage.user;
  const fullname = JSON.parse(user).fullname;

  const handleSignOut = async () => {
    const data  = await httpService.get("/users/sign-out");
    if (data.success) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <NavLink to="/" className="logo d-flex align-items-center">
          <img src="/img/logo.png" alt="" />
          <span className="d-none d-lg-block">Stock Manager</span>
        </NavLink>
      </div>

      <div className="search-bar">
        <form className="search-form d-flex align-items-center" method="POST" action="#">
          <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown"></a>
          </li>

          <li className="nav-item dropdown pe-3">
            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src="/img/amir.jpg" alt="Profile" className="rounded-circle" />
              <span className="d-none d-md-block dropdown-toggle ps-2">{fullname}</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{fullname}</h6>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <i className="bi bi-person"></i>
                  <ACtive2FA />
                </a>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <i className="bi bi-box-arrow-right"></i>
                  <span onClick={handleSignOut}>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <Toast />
    </header>
  );
}
