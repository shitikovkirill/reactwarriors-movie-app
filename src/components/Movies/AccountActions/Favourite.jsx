import React from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import ActionHOC from './ActionHOC';
import {AppContextHOC} from "../../HOC/AppContextHOC";

function Favourite({selected=false, switchSelect}) {
    return selected ? <StarIcon onClick={switchSelect}/> : <StarBorderIcon onClick={switchSelect}/>
}

export default AppContextHOC(ActionHOC(Favourite))