import React from "react";
import { CommentList, CreateComment } from "./Home/Article";
import Grid from "@material-ui/core/Grid";
import { RouteComponentProps } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme, createStyles } from "@material-ui/core";
interface RouteInfo {
}
export interface MessageBoardProps extends RouteComponentProps<RouteInfo> {

}
const useStyles = makeStyles((theme:Theme)=>createStyles({
 
        root: {
            padding: theme.spacing(2)
        },
  
}));
function MessageBoard(props: MessageBoardProps) {
    const classes = useStyles();
    const messageBoardId = "999"
    return (<>
        <Grid container className={classes.root}>
            <Grid xs={12}>
            <Typography variant="h3" gutterBottom>
        留言板
      </Typography>
            </Grid>
            <CommentList id={messageBoardId} />
            <CreateComment id={messageBoardId} />
        </Grid>
    </>)
}
export default MessageBoard;