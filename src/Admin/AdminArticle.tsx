import React, {useState} from "react";
import {Grid, TextField, Theme} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";
import {ArticleBean} from "../Home/Article";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        dense: {
            marginTop: theme.spacing(2),
        },
        menu: {
            width: 200,
        },
    }),
);
export function AdminArticle() {
    const [value,setValue]=useState<ArticleBean>({
        content: "",
        createTime: "",
        id: undefined,
        summary: "",
        title: "",
        updateTime: "",
        userId: undefined
    })
    const classes = useStyles();
    return(<>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <TextField
                id="outlined-name"
                label="Title"
                className={classes.textField}
                value={value.title}
                onChange={(event)=>{
                    value.title=event.target.value
                }}
                margin="normal"
                variant="outlined"
            />
        </Grid>
        </Grid>
    </>)
}