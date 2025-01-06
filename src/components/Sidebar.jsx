import { FaArrowDown, FaDochub, FaGoodreads, FaHome, FaInfoCircle, FaList, FaListOl, FaUserPlus } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FcAlarmClock } from "react-icons/fc";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <NavLink to="/">
          <li className="nav-item">
            <FaHome className="mx-1" />
            <span>Home</span>
          </li>
        </NavLink>

        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
          <FaInfoCircle className="mx-1"/>
            <span>Init Project</span>
            <FaArrowDown className="ms-auto"/>
          </a>
          <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
              <NavLink to="/users">
                <FaUserPlus className="mx-2" />
                <span>User</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/good-types">
                <FcAlarmClock className="mx-2"/>
                <span>Good Type</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/goods">
                <FaGoodreads className="mx-2"/>
                <span>Good</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/warehouses">
                <FaHouse className="mx-2"/>
                <span>Warehouse</span>
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
            <FaDochub className="mx-1"/>
            <span>Operation</span>
            <FaArrowDown className="ms-auto"/>
          </a>
          <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
              <NavLink to="/warehouse-allocation">
                <FaList className="mx-2"/>
                <span>Warehouse Allocation</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="warehouse-dispatch">
                <FaListOl className="mx-2"/>
                <span>Warehouse Dispatch</span>
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}
