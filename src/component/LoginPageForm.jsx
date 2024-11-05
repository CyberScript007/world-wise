import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../component/LoginPageForm.module.css";
import { useAuthenticateContext } from "../contexts/AuthenticateContext";
import Button from "./Button";

function LoginPageForm() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuthenticateContext();
  const navigate = useNavigate();

  const handleOnSubmit = function (e) {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <section className={styles.form_container}>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.form_control}>
          <label htmlFor="email" className={styles.form_label}>
            Email address
          </label>
          <input
            type="email"
            id="email"
            className={styles.form_input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="password" className={styles.form_label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.form_input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="success">login</Button>
      </form>
    </section>
  );
}

export default LoginPageForm;
