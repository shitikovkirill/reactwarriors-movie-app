import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi from "../api/request";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppContext = React.createContext();

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
        showLoginForm: false
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

    onLogOut = () => {
        cookies.remove("session_id");
        this.setState({
            session_id: null,
            user: null
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
        this.setState({
            session_id
        });
        if (session_id) {
            CallApi.get('/account', {
                params: {
                    session_id: session_id
                }
            })
            .then(user => {
                this.updateUser(user);
            });
        }
    }

    toggleLoginForm = () => {
        this.setState(prevState => ({
            showLoginForm: !prevState.showLoginForm
        }));
    };

    render() {
        const {filters, pagination: {page, total_page}, user, session_id, showLoginForm} = this.state;
        return (
            <AppContext.Provider value={{
                user,
                updateUser: this.updateUser,
                session_id,
                updateSessionId: this.updateSessionId,
                onLogOut: this.onLogOut,
                showLoginForm,
                toggleLoginForm: this.toggleLoginForm
            }}>
                <div>
                <Header
                    user={user}
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
            </AppContext.Provider>
        );
    }
}
