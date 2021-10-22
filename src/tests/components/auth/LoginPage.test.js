import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../components/auth/LoginPage";
import { startLogin } from "../../../actions/auth";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

// mocks
store.dispatch = jest.fn();
jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
  </Provider>
);

describe("Tests on LoginPage component", () => {
  test("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch login action', () => {
    wrapper.find('input[name="email"]').simulate("change", {
      target: {
        name: "email",
        value: "aaron@gmail.com",
      },
    });

    wrapper.find('input[name="password"]').simulate("change", {
      target: {
        name: "password",
        value: "123456",
      },
    });

    wrapper.find("form").prop("onSubmit")({
      preventDefault(){},
    });
    
    expect(startLogin).toHaveBeenCalledWith("aaron@gmail.com", "123456");
  });
  
});
