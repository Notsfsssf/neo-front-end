import React, { useEffect, useState, ComponentProps } from "react";
import { Card, Container, ListItemText, Typography, Link, Theme, List, ListItem, ListItemAvatar, Avatar, Divider, Paper, TextField, Button, Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { RouteComponentProps } from "react-router-dom";
import API from "../API";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontSize: 14,
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        paper: {
            padding: theme.spacing(1),

        },
        container: {
            padding: theme.spacing(2)
        },
        root: {
            width: '100%',

        },
        inline: {
            display: 'inline',
        }

    }));

interface RouterInfo {
    id: string
}
export interface CommentInfo {
    id: string
}
export interface ArticleProps extends RouteComponentProps<RouterInfo> {

}

export class ArticleBean {
    id: number | undefined
    userId: number | undefined
    title: string = ""
    content: string = ""
    summary: string = ""
    updateTime: string = ""
    createTime: string = ""
}
export class CommentBean {
    id: number | undefined
    content: string | undefined
    name: string | undefined
    email: string | undefined
    articleId: number | undefined
    createTime: string | undefined
}
function CCCopyright() {
    return (
        <>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://perol.me/">
                    Perol Website
            </Link>{' '}
                {new Date().getFullYear()}
                {'. Built with '}
                <Link color="inherit" href="https://material-ui.com/">
                    Material-UI.
            </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                版权声明：本文为Perol原创文章，遵循
            <Link color="inherit" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">
                    CC 4.0 by-sa
            </Link>
                版权协议，转载请附上原文出处链接和本声明。
        </Typography>
        </>
    );
}
const useCreateCommentStyles = makeStyles((theme: Theme) =>
    createStyles({

        textField: {
  
        },
        editor: {

        },
        button: {
            margin: theme.spacing(1),
        }

    }));
export function CreateComment(props: CommentInfo) {
    const classes = useCreateCommentStyles();
    const [data, setData] = useState<CommentBean>({
        id: undefined,
        content: "",
        name: "",
        email: "",
        createTime: "",
        articleId: parseInt(props.id)
    })
    async function create() {
        if (data.name && data.content && data.email) {
            let response = await API.post('/comment', data)
            window.location.reload(true)
        }

    }
    const handleChange = (name: keyof CommentBean) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [name]: event.target.value });
    };
    function handleContent(value: string) {
        setData({ ...data, ['content']: value });
    }
    return (<>
        <Grid container>
            <Grid item xs={12}>
                <TextField label="Comment" margin="normal" multiline fullWidth
                    variant="outlined" value={data.content}  className={classes.textField} onChange={handleChange('content')} />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="outlined-name"
                    label="Name"
                    fullWidth
                    className={classes.textField}
                    value={data.name}
                    onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="outlined-email"
                    fullWidth
                    label="Email"
                    className={classes.textField}
                    value={data.email}
                    onChange={handleChange('email')}
                    margin="normal"
                    variant="outlined"
                />
            </Grid>

            <Grid item xs={12}>
                <Button variant="outlined" color="primary" className={classes.button} onClick={create}>
                    评论
      </Button>
            </Grid>
        </Grid>
    </>)
}
export function CommentList(props: CommentInfo) {
    const classes = useStyles();
    const [data, setData] = useState([])
    useEffect(function () {
        async function f() {
            let response = await API.get(`/comment/` + props.id)

            setData(response.data);
        }

        f()
    }, [])
    const comments = data.map((comment: CommentBean) =>
        <>
            <ListItem alignItems="center" key={comment.id}>
                <ListItemAvatar>
                    <Avatar >{typeof comment.name === "string" ? comment.name.substr(0, 1) : "A"}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={comment.name}
                    secondary={
                        <React.Fragment>

                            {comment.content}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
    return (<>
        <List className={classes.root}>
            {comments}
        </List>
    </>)
}
export default function Article(props: ArticleProps) {
    const classes = useStyles();
    const id: string = props.match.params.id
    const [data, setData] = useState<ArticleBean>({
        content: "",
        createTime: "",
        id: undefined,
        summary: "",
        title: "",
        updateTime: "",
        userId: undefined
    });
    useEffect(function () {
        async function f() {
            let response = await API.get(`/article/` + id)

            setData(response.data);
        }

        f()
    }, [])


    const ReactMarkdown = require('react-markdown/with-html')

    return (
        <React.Fragment>

            <Grid container spacing={2} className={classes.container} >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <ListItemText primary={data.title} secondary={data.createTime} />
                        <ReactMarkdown
                            source={data.content}
                            escapeHtml={false}
                        />
                        {
                            data.updateTime ? <ListItemText primary='修改于' secondary={data.updateTime} /> : <></>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <CommentList id={id} />
                </Grid>
                <Grid item xs={12}>
                    <CreateComment id={id} />
                </Grid>
                <Grid item xs={12}>
                    <CCCopyright />
                </Grid>
            </Grid>


        </React.Fragment>
    )

}