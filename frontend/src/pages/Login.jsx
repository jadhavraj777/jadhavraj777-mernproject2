import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // Import CSS

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert("Email and password are required!");
      return;
    }

    try {
      // Send login request to the backend API
      const res = await axios.post("http://localhost:4000/login", {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      console.log("Login Response:", res); // Log the full response for debugging

      if (res.status === 200) {
        // On successful login
        localStorage.setItem("username", res.data.username);
        setIsLoggedIn(true);
        navigate("/home");  // Redirect to home page on successful login
      } else {
        alert("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error); // Log error for debugging
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <p className="login-text">
          New user? <Link to="/register" className="login-link">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
