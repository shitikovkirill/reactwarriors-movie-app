import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from "./MoviesHOC";
import PropTypes from 'prop-types';


const MoviesList = ({movies, isLoaded}) => {
    return (
        <div className="row">
            {
                isLoaded ?
                    <img src="/images/preloader.gif" alt="" className="preloader position-absolute"/> :
                    movies.map(movie => {
                        return (
                            <div key={movie.id} className="col-6 mb-4">
                                <MovieItem item={movie}/>
                            </div>
                        );
                    })
            }
        </div>
    )
};

MoviesList.defaultProps = {
    movies: [],
    isLoaded: false
};

MoviesList.propTypes = {
    movies: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool
};

export default MoviesHOC(MoviesList);
