import "./App.css";
import ChatMain from "./pages/ChatMain";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* // <Router> */}
      <Switch>
        <Route path="/me" exact>
          <div className="app">
            <ChatMain />
          </div>
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      {/* </Router> */}
    </>
  );
}

export default App;
