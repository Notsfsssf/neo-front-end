import React, {useState} from "react";
import {ArticleBean} from "../Home/Article";
import API from "../API";
import {constants} from "http2";
import {createMuiTheme, Fab, Grid, TextField, Theme} from "@material-ui/core";
import {createStyles, makeStyles, useTheme} from "@material-ui/styles";
import {green, purple} from "@material-ui/core/colors";
import NavigationIcon from '@material-ui/icons/Navigation';
import Editor from 'for-editor'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        dense: {
            marginTop: 16,
        },
        menu: {
            width: 200,
        },
    }),
);

export default function AdminArticleCreate() {
    const classes = useStyles();

    async function postArticle() {
        const response = await API.post("/article", article,
            {
                headers: {
                    "Authorization": localStorage.getItem("authorization")
                }
            })
        if (response.status === 200) {
            alert("ok")
        }
    }

    const [article, setArticle] = useState<ArticleBean>({
        content: "",
        createTime: "",
        id: undefined,
        summary: "",
        title: "",
        updateTime: "",
        userId: undefined
    })
    const handleChange = (name: keyof ArticleBean) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticle({...article, [name]: event.target.value});
    };

    function handleContent(value: string) {
        setArticle({...article, ['content']: value});
    }

    return (
        <>
            <form noValidate autoComplete="off">
                <TextField
                    fullWidth
                    id="Title"
                    label="Title"
                    value={article.title}
                    onChange={handleChange('title')}
                    margin="normal"
                    variant="filled"
                />
                <TextField
                    fullWidth
                    id="Summary"
                    label="Summary"
                    value={article.summary}
                    onChange={handleChange('summary')}
                    margin="normal"
                    variant="filled"
                />
            </form>
            <Editor value={article.content} onChange={handleContent}/>
            <Fab variant="extended" aria-label="delete" className={classes.fab} onClick={postArticle}>
                <NavigationIcon className={classes.extendedIcon}/>
                Extended
            </Fab>
        </>
    )
}