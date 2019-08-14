import React, {useEffect, useState} from "react";
import {Card, Container, ListItemText, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {RouteComponentProps} from "react-router-dom";
import API from "../API";


const useStyles = makeStyles({
    title: {
        fontSize: 14,
    },
    container: {
        margin: 8
    }

});

interface RouterInfo {
    id: any
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

export default function Article(props: ArticleProps) {
    const classes = useStyles();
    const id = props.match.params.id
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
            <Container maxWidth="xs" className={classes.container}>

                    <ListItemText primary={data.title} secondary={data.createTime} />

                {/*<Typography variant="h5" component="h2">*/}
                {/*    {data.title}*/}
                {/*</Typography>*/}
                <ReactMarkdown
                    source={data.content}
                    escapeHtml={false}
                />
            </Container>


        </React.Fragment>
    )

}