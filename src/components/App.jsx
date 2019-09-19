import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import { API_URL, API_KEY_3 } from "../api/api";
import fetchApi from "../api/request";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class App extends React.Component {

    initialState = {
        user: null,
        session_id: null,
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

    updateUser = user => {
        this.setState({
            user
        });
    };

    updateSessionId = session_id => {
        cookies.set("session_id", session_id, {
            path: "/",
            maxAge: 2592000
        });
        this.setState({
            session_id
        });
    };

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

    componentDidMount() {
        const session_id = cookies.get("session_id");
        if (session_id) {
            fetchApi(
                `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
            ).then(user => {
                this.updateUser(user);
            });
        }
    }

    render() {
        const {filters, pagination: {page, total_page}, user} = this.state;
        return (
            <div>
                <Header
                    user={user}
                    updateUser={this.updateUser}
                    updateSessionId={this.updateSessionId}
                />
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
