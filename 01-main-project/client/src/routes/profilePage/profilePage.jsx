import { useState } from "react";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogOut = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:8800/api/auth/logout`, {
        method: "POST",
      });
      if (res.ok) {
        localStorage.removeItem("user");
        navigate("/");
        console.log(res);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              E-mail: <b>john@gmail.com</b>
            </span>
            <button disabled={isLoading} onClick={handleLogOut}>
              LogOut
            </button>
            {error && (
              <span
                style={{
                  color: "red",
                  fontWeight: "500",
                  fontSize: "small",
                }}
              >
                {error}
              </span>
            )}
          </div>
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
