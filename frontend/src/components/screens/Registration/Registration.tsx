import { useState } from "react";
import "./Registration.css";
import { registerNewUser } from "../../../services/authApis";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log(name, email, password);
      const errors: string[] = [];
      if (!name) errors.push("Please enter name.");
      if (!email) errors.push("Please enter email id.");
      if (!password) errors.push("Please enter password.");

      if (errors.length > 0) {
        alert(
          "Please check the following validation errors:\n" + errors.join("\n")
        );
        return;
      }
      //   await axios.post(
      //     `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
      //     { name, email, password }
      //   );
      //   alert("Registration successful! Please login.");

      await registerNewUser({ name: name, email: email, password: password })
        .then((response) => {
          if (response.data) {
            alert("New user sussfully register.");
            window.location.href = "/login";
          }
        })
        .catch((error: Error) => {
          alert(error.message);
        });
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="reg-div">
      <h2>Registration</h2>

      <form className="reg-form">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="reg-btn" onClick={handleRegister}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Registration;
