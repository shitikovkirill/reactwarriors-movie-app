import React, {Component} from "react";
import CallApi from "../../api/request";

export default (MoviesComponent) => class MoviesHOC extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            isLoaded: true,
        };
    }

    getMovies = (filters, page) => {
        this.setState({isLoaded: true});
        CallApi.get('/discover/movie', {
            params: this.getParamsByFilters(filters, page)
        })
            .then(data => {
                this.setState({
                    movies: data.results
                });
                this.props.onChangePage("total_page", data.total_pages);
            })
            .then(() => {
                this.setState({isLoaded: false});
            });
    };

    getParamsByFilters(filters, page){
        const {sort_by, year, genres} = filters;

        const request = {
            sort_by,
            page,
        };

        if (year) {
            request.year = year
        }

        if (genres.length) {
            request.with_genres = genres;
        }

        return request;
    }

    componentDidMount() {
        this.getMovies(this.props.filters, this.props.page);
    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate", prevProps.page, this.props.page);

        if (prevProps.filters !== this.props.filters) {
            //if (!_.isEqual(prevProps.filters, this.props.filters)) {
            this.props.onChangePage("page", 1);
            this.getMovies(this.props.filters, 1);
        }

        if (this.props.page !== prevProps.page) {
            this.getMovies(this.props.filters, this.props.page);
        }
    }

    render() {
        const {movies, isLoaded} = this.state;
        return (
            <MoviesComponent movies={movies} isLoaded={isLoaded}/>
        );
    }
}
