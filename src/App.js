import "./App.css";
import ChatMain from "./pages/ChatMain";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
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
    </Router>
  );
}

export default App;
