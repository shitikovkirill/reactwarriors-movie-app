import React from "react";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import withMovieAction from './MovieActionHOC';
import {AppContextHOC} from "../../HOC/AppContextHOC";

function Watchlist({selected, disable, switchSelect}) {
    let additionalProps = {};
    if (disable){
        additionalProps['color'] = 'disabled'
    } else {
        additionalProps['onClick'] = switchSelect
    }
    return selected ? <BookmarkIcon {...additionalProps}/> :
        <BookmarkBorderIcon {...additionalProps}/>
}

Watchlist.defaultProps = {
    selected: false,
    disable: false,
};

export default AppContextHOC(withMovieAction(Watchlist))