import React, {useEffect, useState} from "react";
import {ArticleBean, ArticleProps} from "../Home/Article";
import API from "../API";
import {Fab, Grid, Snackbar, TextField, Theme} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";
import NavigationIcon from '@material-ui/icons/Navigation';
import DeleteIcon from '@material-ui/icons/Delete';
import Editor from 'for-editor'
import {SnackbarOrigin} from "@material-ui/core/Snackbar";
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            margin: theme.spacing(1),
        },
        fabDelete: {
            margin: theme.spacing(1),

        },
        success: {
            backgroundColor: green[600],
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

export interface SnackBarState extends SnackbarOrigin {
    message: string;
    open: boolean;
}

export default function AdminArticleCreate(props: ArticleProps) {
    const classes = useStyles();
    const id = props.match.params.id

    async function postArticle() {
        let url = '/article'
        if (typeof id === 'string') {
            url = url + '/' + id
            const response = await API.patch(url, article,
                {
                    headers: {
                        "Authorization": localStorage.getItem("authorization")
                    }
                })

        } else {
            const response = await API.post(url, article,
                {
                    headers: {
                        "Authorization": localStorage.getItem("authorization")
                    }
                })

        }
        showSnackBar('ok')
    }
    async function deleteArticle(){
        const response = await API.delete('/article/'+id,{
            headers: {
                "Authorization": localStorage.getItem("authorization")
            }
        })
        showSnackBar('ok')
    }
    const [snackBar, setSnackBar] = useState<SnackBarState>({
        message: "",
        open: false,
        horizontal: "left",
        vertical: "bottom"
    })
    const [article, setArticle] = useState<ArticleBean>({
        content: "",
        createTime: "",
        id: undefined,
        summary: "",
        title: "",
        updateTime: "",
        userId: undefined
    })
    function showSnackBar(message:string){
        setSnackBar({...snackBar,['message']:message,['open']:true})
    }
    useEffect(() => {
        async function f() {
            let response = await API.get(`/article/` + id)
            setArticle(response.data);
        }

        if (typeof id === 'string') {
            f()
        }
    }, [])
    const handleChange = (name: keyof ArticleBean) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticle({...article, [name]: event.target.value});
    };

    function handleContent(value: string) {
        setArticle({...article, ['content']: value});
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                    <Editor value={article.content} onChange={handleContent}/>
                </Grid>
                <Grid item xs={2}>
                    <Fab variant="extended" aria-label="delete" className={classes.fab} onClick={postArticle}>
                        <NavigationIcon className={classes.extendedIcon}/>
                        {
                            typeof id === 'string' ? <p>Patch</p> : <p>Post</p>
                        }
                    </Fab>
                </Grid>
                {
                    typeof id === 'string' ? <Grid item xs={2}>
                        <Fab variant="extended" aria-label="delete" className={classes.fabDelete} onClick={deleteArticle}>
                            <DeleteIcon className={classes.extendedIcon}/>
                            Delete
                        </Fab>
                    </Grid> : <></>
                }
            </Grid>
            <Snackbar
                open={snackBar.open}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                autoHideDuration={2}
                className={classes.success}
                message={<span id="message-id">{snackBar.message}</span>}
            />
        </>
    )
}