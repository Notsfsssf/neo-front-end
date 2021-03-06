import {
  AppBar,
  Button,
  createStyles,
  CssBaseline,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Route, RouteComponentProps, Switch, Redirect } from "react-router-dom";
import Hello from "./Home/Hello";
import Article from "./Home/Article";
import NotFoundPage from "./NotFoundPage";
import MessageBoard from "./MessageBoard";
import API from "./API";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    appBar: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
    }
  })
);

export default function Home(props: RouteComponentProps) {
  const classes = useStyles();
  const [im, setIm] = useState(undefined);
  function jumpTo(url: string) {
    props.history.push("/" + url);
  }
  // useEffect(() => {
  //   const f = async () => {
  //     const au = localStorage.getItem("authorization");
  //     if (au) {
  //       const response = await API.get("/whoami", {
  //         headers: {
  //           Authorization: localStorage.getItem("authorization")
  //         }
  //       });
  //       if (response.status === 200) setIm(response.data);
  //     }
  //   };
  //   f();
  // }, []);
  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={() => jumpTo("")}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Blog
          </Typography>
          <Button color="inherit" onClick={() => jumpTo("message")}>
            Message
          </Button>
          <Button color="inherit" onClick={() => jumpTo("signin")}>
            {im ? im : <p>Login</p>}
          </Button>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Switch>
        <Route path="/article/:id" component={Article} />
        <Route path="/message" component={MessageBoard} />
        <Route path="/" component={Hello} />
      </Switch>
    </React.Fragment>
  );
}
