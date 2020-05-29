import { searchFilter } from "../utils/search.js";

const initialState = {
    day: 1,
    startDataArray: [],
    filteredDataArray: [],
    searchInput: "",
    category: "departure"
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SHIFT":
      return Object.assign({}, state, {
        category: action.category
      });
    case "SET_SEARCH":
      return Object.assign({}, state, {
        searchInput: action.search.toLowerCase()
      });
    case "RUN_FILTER":
      var newData = state.startDataArray[
        action.stateToPropsCategory || state.category
      ].filter(x => {
        return x["planeTypeID.code"]
          .toLowerCase()
          .includes(action.search || state.searchInput);
      });
      return Object.assign({}, state, {
        category: action.category || state.category,
        searchInput: action.search || state.searchInput,
        filteredDataArray: searchFilter(state.searchInput, newData)
      });
    case "LOAD_DATA_START":
      return Object.assign({}, state, {
        day: action.day
      });
    case "LOAD_DATA_END":
      var newData = action.payload.data[state.category].filter(element => {
        return (
          element["planeTypeID.code"] &&
          element["planeTypeID.code"]
            .toLowerCase()
            .includes(action.search || state.searchInput)
        );
      });
      return Object.assign({}, state, {
        startDataArray: action.payload.data,
        category: Object.keys(action.payload.data)[0],
        filteredDataArray: searchFilter(state.searchInput, newData)
      });
    default:
      return state;
  }
}
























