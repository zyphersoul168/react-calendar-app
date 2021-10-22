import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import Swal from "sweetalert2";

import { startChecking, startLogin, startLogout, startSignup } from "../../actions/auth";
import { types } from "../../actionTypes/types";
import * as fetchHelper from "../../helpers/fetch";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);

// mocks
Storage.prototype.setItem = jest.fn();
Storage.prototype.clear = jest.fn();

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Tests on auth actions", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test("should start login", async () => {
    await store.dispatch(startLogin("aaron@gmail.com", "123456"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    // token = localStorage.setItem.mock.calls[0][1];
  });

  test("should not startLogin", async () => {
    // incorrect login with incorrect password
    await store.dispatch(startLogin("aaron@gmail.com", "12345678"));
    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith("Error", "wrong password", "error");

    // incorrect login with incorrect email
    await store.dispatch(startLogin("aaron@hotmail.com", "123456"));
    actions = store.getActions();

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "There is no user with that email",
      "error"
    );
  });

  test('should start logout', async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(localStorage.clear).toHaveBeenCalled();

    expect(actions[0]).toEqual({
      type: types.eventLogout,
    });

    expect(actions[1]).toEqual({
      type: types.authLogout,
    });
  });

  test("should start register", async () => {
    fetchHelper.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "1234",
          name: "Testname",
          token: "abc1234def",
        };
      },
    }));

    await store.dispatch(startSignup("test@testing.com", "123456", "Test"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "1234",
        name: "Testname",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "abc1234def");

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("should start checking", async () => {
    fetchHelper.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "1234",
          name: "Testname",
          token: "abc1234def",
        };
      },
    }));

    await store.dispatch(startChecking());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "1234",
        name: "Testname",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "abc1234def");
  });
});
