import {
    Avatar, Box, Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel, Grid,
    Link,
    TextField, Theme,
    Typography
} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";
import React, {useState} from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import API from "./API";
import {RouteComponentProps} from "react-router";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Perol Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'. Built with '}
            <Link color="inherit" href="https://material-ui.com/">
                Material-UI.
            </Link>
        </Typography>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        '@global': {
            body: {
                backgroundColor: theme.palette.common.white,
            },
        },
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

export default function SignIn(props: RouteComponentProps) {
    const classes = useStyles();
    const [name, setName] = useState<string>("perol")
    const [password, setPassword] = useState<string>("1122")

    async function onSubmit() {
        const response = await API.post("/login", {
            "name": name,
            "password": password
        })
        if (response.status === 200) {
            const header = response.data
            alert(header)
            localStorage.setItem("authorization", header);
            props.history.push("/admin")
        } else alert(response.status)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form action="/login" className={classes.form} method="post" noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        value={name}
                        onChange={(event => setName(event.target.value))}
                        fullWidth
                        id="username"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={password}
                        onChange={(event => setPassword(event.target.value))}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        onClick={onSubmit}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    )
}