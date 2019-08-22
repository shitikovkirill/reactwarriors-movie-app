import React from "react";
import Checkbox from "../Elements/Checkbox";
import PropTypes from "prop-types";
import {ListGroup, ListGroupItem} from 'reactstrap';
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
            <div className="form-group">
                <p>Жанры:</p>
                <ListGroup>
                    {this.state.genres.map(item => (
                        <ListGroupItem key={item.id}>
                            <Checkbox
                                title={item.name}
                                name={"genre"}
                                value={item.id}
                                checked={this.isChecked(item.id)}
                                onChange={this.handleChange}
                            />
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        );
    }
}
