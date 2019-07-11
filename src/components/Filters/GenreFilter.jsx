import React from "react";
import Checkbox from "../Element/Checkbox";
import PropTypes from "prop-types";
import {API_KEY_3, API_URL} from "../../api/api";

export default class GenreFilter extends React.Component {

    static propTypes = {
        checkedItems: PropTypes.instanceOf(Map),
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
        const item = event.target.value;
        const isChecked = event.target.checked;

        let clone = new Map(this.props.checkedItems);
        clone.set(item, isChecked);

        this.props.onChangeFilters({
            target: {
                value: clone,
                name: "genres",
            }
        })
    };

    render() {
        return (
            <div className="form-group">
                <p>Жанры:</p>
                {this.state.genres.map(item => (
                    <label key={item.id}>
                        <Checkbox
                            name={"genre"}
                            value={item.id}
                            checked={this.props.checkedItems.get(""+item.id)}
                            onChange={this.handleChange}
                        />
                        {item.name}
                    </label>
                ))}
            </div>
        );
    }
}
