import React from 'react';
import './App.css';
import Home from "./Home";
import { Route, Redirect, Switch } from 'react-router-dom';
import Article from "./Home/Article";
import SignIn from "./SignIn";
import ErrorPage from "./ErrorPage";
import Admin from "./Admin/Admin";
import { createMuiTheme } from "@material-ui/core";
import { green, orange, purple } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import MessageBoard from './MessageBoard';
import NotFoundPage from './NotFoundPage';

const outerTheme = createMuiTheme({
    palette: {
        secondary: {
            main: orange[500],
        },
    },
});
const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={outerTheme}>
                <Switch>
                    <Route path='/signin' component={SignIn} />
                    <Route path='/admin' component={Admin} />
               
                    <Route path='/' component={Home} />
                
                   
                </Switch>
            </ThemeProvider>
        </div>
    );

}

export default App;
