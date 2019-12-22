import React from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import withMovieAction from './MovieActionHOC';
import {AppContextHOC} from "../../HOC/AppContextHOC";

function Favourite({selected, disable, switchSelect}) {
    let additionalProps = {};
    if (disable){
        additionalProps['color'] = 'disabled'
    } else {
        additionalProps['onClick'] = switchSelect
    }
    return selected ? <StarIcon {...additionalProps} /> :
        <StarBorderIcon {...additionalProps} />
}

Favourite.defaultProps = {
    selected: false,
    disable: false,
};

export default AppContextHOC(withMovieAction(Favourite))