import React, { useEffect, useState } from "react";
import {
    Button,
    Card, CardActionArea,
    CardContent, CardMedia,
    Container,
    Grid, Hidden,
    makeStyles,
    Typography,
    Theme,
    createStyles,
    ListItem,
    List,
    ListItemText,
    Divider
} from "@material-ui/core";
import API from "../API";
import { RouteComponentProps } from "react-router-dom";
import { ArticleBean } from "./Article";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
        },
        cardDetails: {
            flex: 1,
        },
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
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
    const [requestError, setRequestError] = useState(false)
    useEffect(() => {

        async function f() {
            try {
                let response = await API.get(`/article`)
                setData(response.data);
            } catch (e) {
                setRequestError(true)
            }
        }

        f()
    }, [])

    function jumpTo(id: number | undefined) {
        props.history.push("/article/" + id)
    }

    const listItem = data.map((article: ArticleBean) =>
        <ListItem button key={article.id}>
            <ListItemText
            onClick={()=>jumpTo(article.id)}
                primary={article.title}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                            {article.updateTime}
                        </Typography>
                        {article.summary}
                    </React.Fragment>
                }
            />
        </ListItem>
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
                这是Perol_Notsf的个人主页，记录开发日常中所踩的坑,测试spring boot在开发环境上的配置需求.
            </Typography>
            <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => onPenBlankLink('https://github.com/Notsfsssf')}>
                            前往我的 GITHUB 主页
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary" onClick={() => onPenBlankLink('https://notsfsssf.github.io/Pix-EzViewer/')}>
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
    const empty = <>
        Blank
</>
    return (
        <React.Fragment>
            {hero}
            <Grid container>
                <Grid item xs={12}>
                    <List className={classes.root}>
                        {requestError ? errorContainer : data.length === 0 ? empty : listItem}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}