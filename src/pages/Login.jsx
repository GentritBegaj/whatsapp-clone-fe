import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setSuccessToast(true);

        localStorage.setItem("loggedIn", "true");

        setTimeout(() => {
          history.push("/me");
        }, 3000);
      } else {
        console.log("error logging in");
        setErrorToast(true);
      }
    } catch (error) {
      console.log(error);
      setErrorToast(true);
    }
  };

  return (
    <>
      <div style={{ display: "grid", height: "100vh", placeItems: "center" }}>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="email"
            placeholder="email"
            style={{ padding: "10px", margin: "10px" }}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="password"
            placeholder="password"
            style={{ padding: "10px", margin: "10px" }}
          />
          <button style={{ padding: "10px", margin: "10px" }}>Log in</button>
        </form>
      </div>
      <Toast
        show={successToast}
        onClose={() => {
          setSuccessToast(false);
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Success!</strong>
        </Toast.Header>
        <Toast.Body>
          <Spinner
            animation="border"
            variant="success"
            className="redirect-spinner"
          />
          Redirecting...
        </Toast.Body>
      </Toast>
      <Toast
        show={errorToast}
        onClose={() => {
          setErrorToast(false);
        }}
        delay={3000}
        autohide
        className="toast-msg toast-error"
      >
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>Something went wrong</Toast.Body>
      </Toast>
    </>
  );
};

export default Login;
