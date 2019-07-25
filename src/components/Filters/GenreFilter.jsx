import React from "react";
import Checkbox from "../Elements/Checkbox";
import PropTypes from "prop-types";
import {API_KEY_3, API_URL} from "../../api/api";

export default class GenreFilter extends React.Component {

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

        let clone = [...this.props.checkedItems];

        if (isChecked) {
            clone.push(currentItem);
        } else {
            clone = clone.filter((item) => currentItem != item)
        }

        this.props.onChangeFilters({
            target: {
                value: clone,
                name: "genres",
            }
        })
    };

    isChecked(currentItem) {
        return this.props.checkedItems.includes(String(currentItem));
    }

    render() {
        return (
            <div className="form-group">
                <p>Жанры:</p>
                {this.state.genres.map(item => (
                    <Checkbox
                        key={item.id}
                        title={item.name}
                        name={"genre"}
                        value={item.id}
                        checked={this.isChecked(item.id)}
                        onChange={this.handleChange}
                    />
                ))}
            </div>
        );
    }
}
