import React from "react";
import Favourite from "./AccountActions/Favourite";
import Watchlist from "./AccountActions/Watchlist";

export default class MovieItem extends React.Component {
    render() {
        const {item} = this.props;
        return (
            <div className="card" style={{width: "100%"}}>
                <img
                    className="card-img-top card-img--height"
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
                    item.poster_path}`}
                    alt=""
                />
                <div className="card-body">
                    <h6 className="card-title">{item.title}</h6>
                    <div className="card-text">Рейтинг: {item.vote_average}</div>
                    <div className="row pt-4">
                        <div className="col-6">
                            <Favourite action="favorite" media_id={item.id} />
                        </div>
                        <div className="col-6">
                            <Watchlist action="watchlist" media_id={item.id} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
