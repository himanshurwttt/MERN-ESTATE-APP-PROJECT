import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const user = currentUser !== null;

  return (
    <nav>
      <div className="left">
        <Link href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>LamaEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Agents</Link>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img
              src={
                currentUser.avatar != null
                  ? currentUser.avatar
                  : "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?size=626&ext=jpg&ga=GA1.1.1757842217.1718464723&semt=ais_user"
              }
              alt=""
            />
            <span style={{ marginRight: "15px" }}>{currentUser.username}</span>
            {location.pathname != "/profile" ? (
              <Link to="/profile" className="profile">
                <div className="notification">3</div>
                <span>Profile</span>
              </Link>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="user">
            <Link className="profile" to="/login">
              Sign in
            </Link>
            <Link to="/register" className="profile">
              Sign up
            </Link>
          </div>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>

          {!currentUser ? (
            <>
              <Link to="/">Sign in</Link>
              <Link to="/">Sign up</Link>
            </>
          ) : (
            <Link to="/profile">profile</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
