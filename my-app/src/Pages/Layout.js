import { Outlet, Link } from "react-router-dom";
import '../Styles/Layout.css'

const Layout = () => {
  return (
    <>
      <nav className="Toolbar">
        <Link className="LayoutButton" to="/">Home</Link>
        <Link className="LayoutButton" to="/profile">Profil</Link>
        <Link className="LayoutButton" to="/login">Login</Link>
      </nav>
      <Outlet />
    </>
  );
};
export default Layout;
