import React, { useEffect, useState } from "react";
import { Card, Container, ListItemText, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "react-router-dom";
import API from "../API";
import { Copyright } from "../SignIn";


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
            <Container maxWidth="sm" className={classes.container}>

                <ListItemText primary={data.title} secondary={data.createTime} />
                <ReactMarkdown
                    source={data.content}
                    escapeHtml={false}
                />
                {
                    data.updateTime?<ListItemText primary='修改于' secondary={data.updateTime}  />:<></>
                }
                <CCCopyright />
            </Container>


        </React.Fragment>
    )

}