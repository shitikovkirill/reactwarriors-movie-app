import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";

export default class App extends React.Component {

    initialState = {
        filters: {
            sort_by: "popularity.desc",
            year: "",
            genres: [],
        },
        pagination: {
            page: 1,
            total_page: null,
        },
    };

    constructor() {
        super();

        this.state = this.initialState;
    }

    onChangeFilters = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [name]: value
            }
        }));
    };

    onChangePagination = (key, value) => {
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                [key]: value
            }
        }));
    };

    resetFilters = () => {
        this.setState(this.initialState);
    };

    render() {
        const {filters, pagination: {page, total_page}} = this.state;
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-4">
                            <div className="card" style={{width: "100%"}}>
                                <div className="card-body">
                                    <h3>Фильтры:</h3>
                                    <Filters
                                        page={page}
                                        totalPage={total_page}
                                        filters={filters}
                                        onChangeFilters={this.onChangeFilters}
                                        onChangePage={this.onChangePagination}
                                        resetFilters={this.resetFilters}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <MoviesList
                                filters={filters}
                                page={page}
                                onChangePage={this.onChangePagination}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
