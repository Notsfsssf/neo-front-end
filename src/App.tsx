import React from "react";
import "./App.css";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import Admin from "./Admin/Admin";
import { createMuiTheme } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import SignUp from "./SignUp";

const outerTheme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[500]
    }
  }
});
const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={outerTheme}>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Home} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
