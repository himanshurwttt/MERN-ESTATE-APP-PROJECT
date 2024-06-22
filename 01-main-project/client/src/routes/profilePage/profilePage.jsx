import { useContext } from "react";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const { updateUser, currentUser } = useContext(AuthContext);

  const handleLogOut = async () => {
    await fetch(`http://localhost:8800/api/auth/logout`, {
      method: "POST",
    });
    localStorage.removeItem("user");
    updateUser(null);

    navigate("/");
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to={"/updateprofile"}>
              <button>Update Profile</button>
            </Link>
          </div>
          {currentUser ? (
            <div className="info">
              <span>
                Avatar:
                <img
                  src={
                    currentUser.avatar ||
                    "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?size=626&ext=jpg&ga=GA1.1.1757842217.1718464723&semt=ais_user"
                  }
                  alt=""
                />
              </span>
              <span>
                Username: <b>{currentUser.username}</b>
              </span>
              <span>
                E-mail: <b>{currentUser.email}</b>
              </span>
              <button onClick={handleLogOut}>LogOut</button>
            </div>
          ) : (
            ""
          )}

          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
