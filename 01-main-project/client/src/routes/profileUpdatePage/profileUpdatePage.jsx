import { useContext } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";

function ProfileUpdatePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={
            currentUser.avatar ||
            "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?size=626&ext=jpg&ga=GA1.1.1757842217.1718464723&semt=ais_user"
          }
          alt=""
          className="avatar"
          defaultValue={currentUser.avatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
