import React, {Component} from "react";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../../api/api";
import _ from 'lodash';
import queryString from "query-string";

export default class MovieList extends Component {
    constructor() {
        super();

        this.state = {
            movies: []
        };
    }

    getMovies = (filters, page) => {
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
            request.with_genres=genres;
        }

        let link = `${API_URL}/discover/movie?${queryString.stringify(request, {arrayFormat: 'comma'})}`;
        fetch(link)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    movies: data.results
                });
                this.props.onChangePage(data['total_pages'], "total_page");
            });
    };

    componentDidMount() {
        // const sort_by = this.props.filters.sort_by
        // const {
        //   filters: { sort_by }
        // } = this.props;
        // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
        // fetch(link)
        //   .then(response => {
        //     return response.json();
        //   })
        //   .then(data => {
        //     this.setState({
        //       movies: data.results
        //     });
        //   });
        this.getMovies(this.props.filters, this.props.page);
    }

    // componentWillReceiveProps(nextProps) {
    //   console.log("props", this.props, "nextProps", nextProps);
    //   if (nextProps.filters.sort_by !== this.props.filters.sort_by) {
    //     // const {
    //     //   filters: { sort_by }
    //     // } = nextProps;
    //     // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
    //     // fetch(link)
    //     //   .then(response => {
    //     //     return response.json();
    //     //   })
    //     //   .then(data => {
    //     //     this.setState({
    //     //       movies: data.results
    //     //     });
    //     //   });
    //     this.getMovies(nextProps.filters);
    //   }
    // }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate", prevProps.page, this.props.page);

        if (prevProps.filters !== this.props.filters) {
        //if (!_.isEqual(prevProps.filters, this.props.filters)) {
            this.props.onChangePage(1);
            this.getMovies(this.props.filters, 1);
        }

        if (this.props.page !== prevProps.page) {
            this.getMovies(this.props.filters, this.props.page);
        }
    }

    render() {
        const {movies} = this.state;
        // console.log("filters", this.props.filters);
        return (
            <div className="row">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} className="col-6 mb-4">
                            <MovieItem item={movie}/>
                        </div>
                    );
                })}
            </div>
        );
    }
}
