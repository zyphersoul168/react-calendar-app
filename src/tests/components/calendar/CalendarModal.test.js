import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { act } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import moment from "moment";
import "@testing-library/jest-dom";

import { CalendarModal } from "../../../components/calendar/CalendarModal";
import { eventClearActive, eventStartAddNew, eventStartUpdate } from "../../../actions/events";

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  calendar: {
    events: [],
    activeEvent: {
      title: "hello world",
      notes: "notes",
      start: now.toDate(),
      end: nowPlusOne.toDate(),
    },
  },
  auth: {
    uid: "1234",
    name: "aaron",
  },
  ui: {
    modalOpen: true,
  },
};
const store = mockStore(initialState);

// mocks
store.dispatch = jest.fn();

jest.mock("../../../actions/events", () => ({
  eventStartUpdate: jest.fn(),
  eventClearActive: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe("Tests on CalendarModal component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should show modal", () => {
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("should dispatch update and close modal actions", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(
      initialState.calendar.activeEvent
    );
    expect(eventClearActive).toHaveBeenCalled();
  });

  test("should show error if there is no title", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(wrapper.find(".error-span").exists()).toBe(true);
  });

  test("should create a new event", () => {
    const initialState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: "1234",
        name: "aaron",
      },
      ui: {
        modalOpen: true,
      },
    };

    const store = mockStore(initialState);

    // mocks
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola crayola",
      }
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: "Hola crayola",
      notes: "",
    });

    expect(eventClearActive).toHaveBeenCalled();
  });

  test('should validate dates', () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola crayola",
      }
    });

    const today = new Date();

    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(today);
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(wrapper.find(".date-error").exists()).toBe(true);
  });
});
