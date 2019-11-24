import React from "react";
import PropTypes from "prop-types";
import {API_KEY_3, API_URL} from "../../api/api";
import Genres from "./Genres";

export default class GenresContainer extends React.Component {

    static propTypes = {
        checkedItems: PropTypes.instanceOf(Array),
        onChangeFilters: PropTypes.func.isRequired
    };

    constructor() {
        super();

        this.state = {
            genres: [],
        };
    }

    componentDidMount() {
        this.getGenres();
    }

    getGenres() {
        let link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;

        fetch(link)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    genres: data.genres
                });
            });
    }

    handleChange = (event) => {
        const currentItem = event.target.value;
        const isChecked = event.target.checked;

        this.props.onChangeFilters({
            target: {
                value: isChecked
                    ? [...this.props.checkedItems, currentItem]
                    : this.props.checkedItems.filter((item) => currentItem != item),
                name: "genres",
            }
        })
    };

    isChecked(currentItem) {
        return this.props.checkedItems.includes(String(currentItem));
    }

    render() {
        return (
            <Genres
                genres={this.state.genres}
                isChecked={this.isChecked.bind(this)}
                handleChange={this.handleChange.bind(this)}
            />
        );
    }
}
