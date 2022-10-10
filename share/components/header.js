import Link from "next/link";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../redux/authSlice";

const Header = () => {
  const [cookies] = useCookies([
    "accessToken",
    "userId",
    "email",
  ]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (cookies.accessToken) {
      dispatch(setLogin(cookies.accessToken));
    }
  }, []);

  const handleLogout = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    console.log("proses logout");
    dispatch(setLogout());
  };
  let menu;
  if (!auth.isLoggedIn) {
    menu = (
      <li className="nav-item">
        <Link href="/login">
          <a className="nav-link">Login</a>
        </Link>
      </li>
    );
  } else {
    menu = (
      <li
        className="nav-item"
        style={{ cursor: "pointer" }}
        onClick={handleLogout}
      >
        <a className="nav-link">Logout</a>
      </li>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link">Home</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/blogs">
            <a className="nav-link">Blogs</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/users">
            <a className="nav-link">Users</a>
          </Link>
        </li>
        {menu}
      </ul>
    </nav>
  );
};

export default Header;
