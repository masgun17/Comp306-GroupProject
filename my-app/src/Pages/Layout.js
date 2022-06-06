import { Outlet, Link } from "react-router-dom";
import '../Styles/Layout.css'

const Layout = () => {
  let userLogged = sessionStorage.getItem('isLogin');

  return (
    <>
      <nav className="Toolbar">
        <Link className="LayoutButton" to="/">Home</Link>
        <Link className="LayoutButton" to="/topfilms">Top 20</Link>
        {userLogged === 'true' ? (
        <Link className="LayoutButton" to="/profile">Profil</Link>
        ) : (
          null
        )}
          {userLogged === 'true' ? (
          <button class="btn btn-primary" style={{ "font-size": "30px" }} onClick={() => {
            sessionStorage.setItem('username', '');
            sessionStorage.setItem('isLogin', 'false');
            sessionStorage.setItem('uid', '');

            window.location.reload(false);
          }}><Link to="/">Logout</Link></button>

        ) : (
        <Link className="LayoutButton" to="/login">Login</Link>
        )}
      </nav>
      <Outlet />
    </>
  );
};
export default Layout;
