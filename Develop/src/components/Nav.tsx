import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <div>Nav</div>
      <nav className="nav-bar">
        <div className="nav-logo">Candidate Search</div>
        <ul className="nav-links">
          <li className={pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={pathname === "/candidates" ? "active" : ""}>
            <Link to="/candidates">Potential Candidates</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
