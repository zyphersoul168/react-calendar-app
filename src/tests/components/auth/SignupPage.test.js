import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Swal from "sweetalert2";

import { startSignup } from "../../../actions/auth";
import { SignupPage } from "../../../components/auth/SignupPage";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

// mocks
store.dispatch = jest.fn();

jest.mock("../../../actions/auth", () => ({
  startSignup: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <SignupPage />
    </MemoryRouter>
  </Provider>
);

describe("Tests on Signup component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test("should not signup if passwords are different", () => {
    wrapper.find('input[name="password"]').simulate("change", {
      target: {
        name: "password",
        value: "123456",
      },
    });

    wrapper.find('input[name="password2"]').simulate("change", {
      target: {
        name: "password2",
        value: "1234567",
      },
    });

    wrapper.find("form").prop("onSubmit")({
      preventDefault() {},
    });

    expect(startSignup).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Password must match",
      "error"
    );
  });

  test('should dispatch signup', () => {
    wrapper.find('input[name="password"]').simulate("change", {
      target: {
        name: "password",
        value: "123456",
      },
    });

    wrapper.find('input[name="password2"]').simulate("change", {
      target: {
        name: "password2",
        value: "123456",
      },
    });

    wrapper.find("form").prop("onSubmit")({
      preventDefault() {},
    });

    expect(startSignup).toHaveBeenCalledWith("", "", "123456");
    expect(Swal.fire).not.toHaveBeenCalled();
  });
});
