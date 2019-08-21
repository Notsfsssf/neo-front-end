import React, { useEffect, useState, ComponentProps } from "react";
import { Card, Container, ListItemText, Typography, Link, Theme, List, ListItem, ListItemAvatar, Avatar, Divider, Paper, TextField } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { RouteComponentProps } from "react-router-dom";
import API from "../API";
import { Copyright } from "../SignIn";
import classes from "*.module.css";


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
            margin: 8,

        },
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
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
function CreateComment(){
    const classes = useStyles();
    const [data, setData] = useState<CommentBean>({
        id:undefined,
        content:"",
        name:"",
        email:"",
        createTime:""
    })
    async function create(){
        if(data.name&&data.content&&data.email){
            let response = await API.post('/comment',data)
        }
      
    }
    const handleChange = (name: keyof CommentBean) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [name]: event.target.value });
      };
    
    return (<>
     <TextField
        id="outlined-name"
        label="Name"
        className={classes.textField}
        value={data.name}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
      />
       <TextField
        id="outlined-email"
        label="Email"
        className={classes.textField}
        value={data.email}
        onChange={handleChange('email')}
        margin="normal"
        variant="outlined"
      />
    </>)
}
function CommentAndEditor(props: CommentInfo) {
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
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar >1</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Ali Connors
                             </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
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
            <Container maxWidth="sm" className={classes.container}>

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
                <CommentAndEditor id={id} />
                <CCCopyright />
            </Container>


        </React.Fragment>
    )

}