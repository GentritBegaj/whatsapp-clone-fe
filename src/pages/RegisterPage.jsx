import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        console.log(response);
        const data = await response.json();
        console.log(data);
      } else {
        console.log("Error while registering");
      }
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
