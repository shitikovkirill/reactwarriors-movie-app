import React from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import ActionHOC from './ActionHOC';
import {AppContextHOC} from "../../HOC/AppContextHOC";

function Favourite({selected, switchSelect}) {
    return selected ? <StarIcon onClick={switchSelect}/> : <StarBorderIcon onClick={switchSelect}/>
}

Favourite.defaultProps = {
    selected: false
};

export default AppContextHOC(ActionHOC(Favourite))