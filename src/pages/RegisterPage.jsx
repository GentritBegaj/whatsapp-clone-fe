import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const user = {
    username,
    email,
    password,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/", user);
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "grid", height: "100vh", placeItems: "center" }}>
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          placeholder="username"
          style={{ padding: "10px", margin: "10px" }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          style={{ padding: "10px", margin: "10px" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          style={{ padding: "10px", margin: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={{ padding: "10px", margin: "10px" }}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
