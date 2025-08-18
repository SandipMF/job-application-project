import type React from "react";
import "./Login.css";
import { useState } from "react";
import { login } from "../../../services/authApis";
import { LOCAL_STORAGE_KEY_TOKEN } from "../../../storage";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const errors: string[] = [];
      if (!email) errors.push("Please enter email id.");
      if (!password) errors.push("Please enter password.");

      if (errors.length > 0) {
        alert(
          "Please check the following validation errors:\n" + errors.join("\n")
        );
        return;
      }

      await login(email, password)
        .then((response) => {
          if (response.data) {
            localStorage.setItem(
              LOCAL_STORAGE_KEY_TOKEN,
              response.data.authentication.sessionToken
            );
            window.location.href = "/";
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="login-div">
      <h2>Login</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Username/Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <a href="/registration">Register</a>
      </p>
    </div>
  );
};

export default Login;
