import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { AppRouter } from "../../routers/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// mocks
// store.dispatch = jest.fn();

describe('Tests on AppRouter', () => {
  test('should render LoadingPage component', () => {
    const initialState = {
      auth: {
        checking: true,
      },
    };
    const store = mockStore(initialState);
    
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    // expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").exists()).toBe(true);
  });

  test('should render PublicRoute', () => {
    const initialState = {
      auth: {
        checking: false,
        uid: null,
      },
    };
    const store = mockStore(initialState);
    
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".flex").exists()).toBe(true);
  });

  test('should render private route', () => {
    const initialState = {
      auth: {
        checking: false,
        uid: "123456",
        name: "Pedro"
      },
      calendar: {
        events: [],
      },
      ui: {
        modalOpen: false,
      }
    };
    const store = mockStore(initialState);
    
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
