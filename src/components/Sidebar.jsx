import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <NavLink to="/">
          <li className="nav-item">
            <i className="bi bi-grid"></i>
            <span>Home</span>
          </li>
        </NavLink>

        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-menu-button-wide"></i>
            <span>Init Project</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
              <NavLink to="/users">
                <i className="bi bi-people"></i>
                <span>User</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/good-types">
                <i className="bi bi-alarm"></i>
                <span>Good Type</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/goods">
                <i className="bi bi-backpack2"></i>
                <span>Good</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/warehouses">
                <i className="bi bi-houses"></i>
                <span>Warehouse</span>
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-journal-text"></i>
            <span>Operation</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
              <NavLink to="/warehouse-allocation">
                <i className="bi bi-receipt"></i>
                <span>Warehouse Allocation</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="warehouse-dispatch">
                <i className="bi bi-receipt-cutoff"></i>
                <span>Warehouse Dispatche</span>
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}
