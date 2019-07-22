import React from "react";
import PropTypes from "prop-types";
import getYearList from "../Helpers/YearList"


export default class YearFilter extends React.Component {

    static propTypes = {
        year: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        onChangeFilters: PropTypes.func.isRequired
    };

    static defaultProps = {
        options: getYearList()
    };

    render() {
        const {year, onChangeFilters, options} = this.props;
        return (
            <div className="form-group">
                <label htmlFor="year">Год выпуска:</label>
                <select
                    id="year"
                    className="form-control"
                    name="year"
                    value={year}
                    onChange={onChangeFilters}
                >
                    <option value="" disabled>
                        Выбирете год
                    </option>
                    {options.map(option => (
                        <option key={option.year} value={option.year}>
                            {option.year}
                        </option>
                    ))}
                    {/*
          <option value="popularity.desc">Популярные по убыванию</option>
          <option value="popularity.asc">Популярные по возростанию</option>
          <option value="vote_average.desc">Рейтинг по убыванию</option>
          <option value="vote_average.asc">Рейтинг по возростанию</option>
          */}
                </select>
            </div>
        );
    }
}
