import React from "react";
import PropTypes from "prop-types";
import CallApi from "../../api/request";

export default (GenresComponent) => class GenresHOC extends React.Component {

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
        CallApi.get('/genre/movie/list')
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
                    : this.props.checkedItems.filter((item) => currentItem !== item),
                name: "genres",
            }
        })
    };

    isChecked(currentItem) {
        return this.props.checkedItems.includes(String(currentItem));
    }

    render() {
        return (
            <GenresComponent
                genres={this.state.genres}
                isChecked={this.isChecked.bind(this)}
                handleChange={this.handleChange.bind(this)}
            />
        );
    }
}
