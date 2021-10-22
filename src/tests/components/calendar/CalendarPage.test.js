import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { act } from "@testing-library/react";

import { CalendarPage } from "../../../components/calendar/CalendarPage";
import { types } from "../../../actionTypes/types";
import { eventSetActive } from "../../../actions/events";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  calendar: {
    events: [],
  },
  auth: {
    uid: "1234",
    name: "aaron",
  },
  ui: {
    modalOpen: false,
  },
};
const store = mockStore(initialState);

// mocks
Storage.prototype.setItem = jest.fn();

store.dispatch = jest.fn();

jest.mock("../../../actions/events", () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <CalendarPage />
  </Provider>
);

describe("Tests on CalendarPage component", () => {
  test("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispatch calendar actions", () => {
    const calendar = wrapper.find("Calendar");

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.uiOpenModal,
    });

    calendar.prop("onSelectEvent")({ start: "Hola" });
    expect(eventSetActive).toHaveBeenCalledWith({ start: "Hola" });

    act(() => {
      calendar.prop("onView")("week");
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
    });
  });
});
