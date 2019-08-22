import React, { useEffect, useState, ComponentProps } from "react";
import { Card, Container, ListItemText, Typography, Link, Theme, List, ListItem, ListItemAvatar, Avatar, Divider, Paper, TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { RouteComponentProps } from "react-router-dom";
import API from "../API";
import { Copyright } from "../SignIn";
import classes from "*.module.css";
import Editor from 'for-editor'

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
    articleId:number|undefined
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
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
          },
          editor:{
              height:100,
          },
          button: {
            margin: theme.spacing(1),
          }

    }));
function CreateComment(props:CommentInfo){
    const classes = useCreateCommentStyles();
    const [data, setData] = useState<CommentBean>({
        id:undefined,
        content:"",
        name:"",
        email:"",
        createTime:"",
        articleId:parseInt(props.id)
    })
    async function create(){
        if(data.name&&data.content&&data.email){
            let response = await API.post('/comment',data)
            window.location.reload(true)
        }
      
    }
    const handleChange = (name: keyof CommentBean) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [name]: event.target.value });
      };
      function handleContent(value: string) {
        setData({...data, ['content']: value});
    }
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
        <TextField label="Comment"         margin="normal"
        variant="outlined" value={data.content} className={classes.editor}  onChange={handleChange('content')}/>
        <Button variant="contained" className={classes.button} onClick={create}>
        Default
      </Button>
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
                    <Avatar >{typeof comment.name ==="string"?comment.name.substr(0,1):"A"}</Avatar>
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
                <CreateComment id={id}/>
                <CCCopyright />
            </Container>


        </React.Fragment>
    )

}