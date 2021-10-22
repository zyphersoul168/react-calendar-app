import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import { DeleteEventBtn } from "../../../components/ui/DeleteEventBtn";
import { eventStartDelete } from "../../../actions/events";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

// mocks
store.dispatch = jest.fn();
jest.mock("../../../actions/events", () => ({
  eventStartDelete: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventBtn />
  </Provider>
);

describe("Tests on delete event button", () => {
  test("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispatch eventStartDelete action on click", () => {
    wrapper.find("button").prop("onClick")();

    expect(eventStartDelete).toHaveBeenCalled();
  });
});
