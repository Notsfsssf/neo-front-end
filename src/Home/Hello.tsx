import React, {useEffect, useState} from "react";
import {
    Button,
    Card, CardActionArea,
    CardActions,
    CardContent, CardMedia,
    Container,
    createMuiTheme,
    Grid, Hidden,
    makeStyles,
    Typography,
    Theme,
    createStyles
} from "@material-ui/core";
import API from "../API";
import {RouteComponentProps} from "react-router";
import {green, purple} from "@material-ui/core/colors";
import {ArticleBean} from "./Article";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
        },
        cardDetails: {
            flex: 1,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        cardGrid: {
            padding: 30
        },
        heroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
            marginTop: theme.spacing(4),
        },
        cardMedia: {
            width: 160,
        },
    }),
)


export default function Hello(props: RouteComponentProps) {
    const classes = useStyles();
    const [data, setData] = useState([]);
    useEffect(() => {

        async function f() {
            let response = await API.get(`/article`)
            setData(response.data);
        }

        f()
    }, [])

    function jumpTo(id: number | undefined) {
        props.history.push("/article/" + id)
    }

    const listItem = data.map((article: ArticleBean) =>
        <Grid item xs={12} md={6} key={article.id}>
            <CardActionArea component="a" href={"/article/" + article.id}>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {article.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {article.createTime}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {article.summary}
                            </Typography>
                            <Typography variant="subtitle1" color="primary" onClick={() => jumpTo(article.id)}>
                                Continue reading...
                            </Typography>
                        </CardContent>
                    </div>
                    <Hidden xsDown>
                        <CardMedia
                            className={classes.cardMedia}
                            image="https://source.unsplash.com/random"
                            title="Image title"
                        />
                    </Hidden>
                </Card>
            </CardActionArea>
        </Grid>
    )
    const hero = <div className={classes.heroContent}>
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Something short and leading about the collection below—its contents, the creator, etc.
                Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                entirely.
            </Typography>
            <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Button variant="contained" color="primary">
                            GO TO MY GITHUB PAGE
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary">
                            DOWNLOAD MY APP
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    </div>
    return (
        <React.Fragment>
            {hero}
            <Grid container spacing={4} className={classes.cardGrid}>
                {listItem}
            </Grid>
        </React.Fragment>
    )
}