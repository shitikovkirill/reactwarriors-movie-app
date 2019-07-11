import React from "react";
import SortBy from "./SortBy";
import YearFilter from "./YearFilter";
import GenreFilter from "./GenreFilter"

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, year, genres },
      page,
      onChangeFilters,
      onChangePage,
      resetFilters
    } = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <YearFilter year={year} onChangeFilters={onChangeFilters} />
        <GenreFilter onChangeFilters={onChangeFilters} checkedItems={genres}/>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={onChangePage.bind(null, page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {resetFilters()}}
          >
            Сбросить фильтры
          </button>
        </div>
      </form>
    );
  }
}
