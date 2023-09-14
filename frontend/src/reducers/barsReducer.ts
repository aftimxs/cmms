import { ADD_BAR, DELETE_BAR } from "../actionTypes/actionTypes.ts";

const initialState = {
    bars: [],
}

const barsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BAR:
      return {
        ...state,
        bars: state.numOfItems + 1,
      };

    case DELETE_BAR:
      return {
        ...state,
        bars: state.numOfItems - 1,
      };
    default:
      return state;
  }
};

export default barsReducer;