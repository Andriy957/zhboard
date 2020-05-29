import React from "react";
import { connect } from "react-redux";

import { fetchData } from "../actions";
import { filter } from "../actions";
import { setSearch } from "../actions";
import { searchFilter } from "../utils/search.js";
import TableData from "../components/TableData";
import TableSearch from "../components/TableSearch";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../components/app.css";

const daysArray = ["yesterday", "today", "tomorrow"];

class Root extends React.Component {
  componentDidMount() {
    this.props.onFetchData(daysArray[this.props.day]);
  }

  render() {
    const { onFilter, onSetSearch, onFetchData } = this.props;
    const { day, startDataArray, filteredDataArray, searchInput, category } = this.props;
      
    return (
      <div>
       <div className="content">
        <div className="header-wrapper">
          <Header/>
        </div>
        
        <div className="searchTitle">SEARCH FLIGHT</div>
        
        <div className="search-wrapper">
            <TableSearch value={searchInput}
                     onChange={e => onSetSearch(e.target.value)}
                     onSearch={value => onFilter({ searchInput: value })}
            />
        </div>
            
       <div className="buttonCategory">
         {startDataArray && Object.keys(startDataArray).map(element => (
            <button data-category={element} 
                    onClick={e => onFilter({category: e.target.dataset.category})}
                    className={element === category ? "active" : "noActive"}>
                    {element}
            </button>
          ))}
       </div>

       <div className="row">
            <span className="title">Yesterday: </span><span className="title">Today: </span><span className="title">Tomorrow: </span>
       </div>

       <div className="buttonDays">
          {daysArray && daysArray.map((element, index) => (
            <button key={element}
                    onClick={() => onFetchData(element)}
                    className={element === day ? "activeDay" : "noActiveDay"}>
                    {element}
            </button>
          ))}
       </div>

        {startDataArray && (<TableData dataAttribute={filteredDataArray} />)}

        </div>
       <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
   day: state.reducer.day,
   startDataArray: state.reducer.startDataArray,
   filteredDataArray: state.reducer.filteredDataArray,
   searchInput: state.reducer.searchInput,
   category: state.reducer.category
});

const matchDispatchToProps = dispatch => ({
   onFilter: args => dispatch(filter(args)),
   onSetSearch: search => dispatch(setSearch(search)),
   onFetchData: day => dispatch(fetchData(day))
});

export const ConnectedRoot = connect(
   mapStateToProps,
   matchDispatchToProps
)(Root);