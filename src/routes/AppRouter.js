import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ChatPage from "../pages/ChatPage";
import AuthRouter from "./AuthRouter";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  const { verificaToken, auth } = useContext(AuthContext);
  useEffect(() => {
    verificaToken();
  }, [verificaToken]);

  if (auth.checking) {
    return <h1>Espere por favor</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute isAuthenticated={auth.logged} path="/auth" component={AuthRouter} />
          <PrivateRoute isAuthenticated={auth.logged} exact path="/" component={ChatPage} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
