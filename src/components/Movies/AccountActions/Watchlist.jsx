import React from "react";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ActionHOC from './ActionHOC';
import {AppContextHOC} from "../../HOC/AppContextHOC";

function Watchlist({selected=false, switchSelect}) {
    return selected ? <BookmarkIcon onClick={switchSelect}/> : <BookmarkBorderIcon onClick={switchSelect}/>
}

export default AppContextHOC(ActionHOC(Watchlist))