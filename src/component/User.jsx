import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import styles from "../component/User.module.css";
import { useAuthenticateContext } from "../contexts/AuthenticateContext";

function User() {
  const { user, logout } = useAuthenticateContext();
  const navigate = useNavigate();

  const handleLogOut = function () {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.user}>
      <figure>
        <img src={user.img} alt={user.name} />
        <figcaption>Welcome {user.name}</figcaption>
      </figure>
      <Button type="logout" onClick={handleLogOut}>
        logout
      </Button>
    </div>
  );
}

export default User;
