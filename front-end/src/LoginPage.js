import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    // Add your login logic here (e.g., API call)
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        loginData
      );
      const { success, message } = response.data;
      if (success) {
        console.log("Login successful:");
      } else {
        console.log("Login failed:", message);
      }
      setLoginData({
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div>
      <h1> Login Page</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginData.username}
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/registration">Register Here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

