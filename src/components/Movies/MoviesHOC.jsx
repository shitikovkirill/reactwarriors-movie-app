import React, {Component} from "react";
import {API_URL, API_KEY_3} from "../../api/api";
import queryString from "query-string";

export default (MoviesComponent) => class MoviesHOC extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            isLoaded: true,
        };
    }

    getMovies = (filters, page) => {
        let link = this.getLinkByFilters(filters, page);
        this.setState({isLoaded: true});
        fetch(link)
            .then(response => {
                return response.json();
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

    getLinkByFilters(filters, page){
        const {sort_by, year, genres} = filters;

        const request = {
            api_key: API_KEY_3,
            language: "ru-RU",
            sort_by,
            page,
        };

        if (year) {
            request.year = year
        }

        if (genres.length) {
            request.with_genres = genres;
        }

        return `${API_URL}/discover/movie?${queryString.stringify(request, {arrayFormat: 'comma'})}`;
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
