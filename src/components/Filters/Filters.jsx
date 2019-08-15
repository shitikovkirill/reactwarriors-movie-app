import React from "react";
import SortBy from "./SortBy";
import YearFilter from "./YearFilter";
import GenreFilter from "./GenreFilter"
import ControlButtons from "./ControlButtons";
import PageCounter from "./PageCounter";

export default class Filters extends React.Component {
    render() {
        const {
            filters: {sort_by, year, genres},
            page,
            totalPage,
            onChangeFilters,
            onChangePage,
            resetFilters
        } = this.props;
        return (
            <form className="mb-3">
                <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters}/>
                <YearFilter year={year} onChangeFilters={onChangeFilters}/>
                <GenreFilter onChangeFilters={onChangeFilters} checkedItems={genres}/>
                <ControlButtons page={page} onChangePage={onChangePage} totalPage={totalPage} resetFilters={resetFilters}/>
                <PageCounter page={page} totalPage={totalPage}/>
            </form>
        );
    }
}
