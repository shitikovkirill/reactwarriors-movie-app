import React from "react";
import PropTypes from "prop-types";

export default class ControlButtons extends React.Component {
    static propTypes = {
        page: PropTypes.number.isRequired,
        totalPage: PropTypes.number.isRequired,
        resetFilters: PropTypes.func.isRequired,
        onChangePage: PropTypes.func.isRequired,
    };

    render() {
        const {page, totalPage, resetFilters, onChangePage} = this.props;
        return (
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-light"
                    disabled={page === 1}
                    onClick={onChangePage.bind(null,"page", page - 1)}
                >
                    Назад
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={onChangePage.bind(null, "page", page + 1)}
                    disabled={page >= totalPage}
                >
                    Вперед
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={resetFilters}
                >
                    Сбросить фильтры
                </button>
            </div>
        );
    }
}
