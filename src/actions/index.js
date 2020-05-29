import { days } from "../containers/app";

export function fetchData(day) {
  return async dispatch => {
    try {
      dispatch({ type: "LOAD_DATA_START", day });
      const response = await fetch(`/data/${day}.json`);
      const data = (await response.json()).body;
      dispatch({ type: "LOAD_DATA_END", payload: { data, day } });
    } catch(err) {
      console.log(err);
    }
  };
};

export const setShift = category => ({
  type: "SET_SHIFT",
  category
});

export const filter = args => ({
  type: "RUN_FILTER",
  ...args
});

export const setSearch = search => ({
  type: "SET_SEARCH",
  search
});