import { types } from "../actionTypes/types";

// {
//   id: "asdsadasd",
//   title: "Boss Birthday",
//   start: moment().toDate(),
//   end: moment().add(2, "hours").toDate(),
//   notes: "buy cake",
//   user: {
//     _id: "123",
//     name: "aaron",
//   },
// },

const initialState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null,
      };

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
      };

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(
          (event) => event._id !== state.activeEvent._id
        ),
        activeEvent: null,
      };

    case types.eventLoad:
      return {
        ...state,
        events: [...action.payload],
      };

    case types.eventLogout:
      return {
        ...initialState,
      }

    default:
      return state;
  }
};
