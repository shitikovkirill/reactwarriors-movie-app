import React from "react";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import withMovieAction from './MovieActionHOC';
import {AppContextHOC} from "../../HOC/AppContextHOC";

function Watchlist({selected, switchSelect}) {
    return selected ? <BookmarkIcon onClick={switchSelect}/> : <BookmarkBorderIcon onClick={switchSelect}/>
}

Watchlist.defaultProps = {
    selected: false
};

export default AppContextHOC(withMovieAction(Watchlist))