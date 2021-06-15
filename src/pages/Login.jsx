import React from "react";

const Login = () => {
  return (
    <div style={{ display: "grid", height: "100vh", placeItems: "center" }}>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="email"
          placeholder="email"
          style={{ padding: "10px", margin: "10px" }}
        />
        <input
          type="password"
          placeholder="password"
          style={{ padding: "10px", margin: "10px" }}
        />
        <button style={{ padding: "10px", margin: "10px" }}>Log in</button>
      </form>
    </div>
  );
};

export default Login;
