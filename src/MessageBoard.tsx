import React from "react";
import { CommentList, CreateComment } from "./Home/Article";
import Grid from "@material-ui/core/Grid";
import { RouteComponentProps } from "react-router-dom";
interface RouteInfo {
}
export interface MessageBoardProps extends RouteComponentProps<RouteInfo> {

}
function MessageBoard(props: MessageBoardProps) {
    const messageBoardId = "999"
    return (<>
        <Grid container>
            <CommentList id={messageBoardId} />
            <CreateComment id={messageBoardId} />
        </Grid>
    </>)
}
export default MessageBoard;