import React, { useEffect, useState } from "react";
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
import { RouteComponentProps, Link } from "react-router-dom";
import { green, purple } from "@material-ui/core/colors";
import { ArticleBean } from "./Article";


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
    function onPenBlankLink(url: string) {
        window.open(url)
    }
    const hero = <div className={classes.heroContent}>
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                欢迎
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                这是我的个人主页，记录开发日常中所踩的坑,测试spring boot在开发环境上的配置需求.
            </Typography>
            <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => onPenBlankLink('https://github.com/Notsfsssf')}>
                            前往我的 GITHUB 主页
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary" onClick={() => onPenBlankLink('https://play.google.com/store/apps/developer?id=Perol_Notsf')}>
                            下载我开发的 APP
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    </div>
    const errorContainer = <>
        <p>Spring boot挂掉了</p>
    </>
    return (
        <React.Fragment>
            {hero}
            <Grid container spacing={4} className={classes.cardGrid}>
                {data.length === 0 ? errorContainer : listItem}
            </Grid>
        </React.Fragment>
    )
}