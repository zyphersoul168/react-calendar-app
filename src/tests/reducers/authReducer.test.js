import { login, logout, setCheckingFinish } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer"

const initialState = {
  checking: false,
}

describe('Tests on auth reducer', () => {
  test('should return default state', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });
  
  test('should login', () => {
    const state = authReducer(initialState, login({ name: "Aaron", uid: "123456"}));
    expect(state).toEqual({
      checking: false,
      name: 'Aaron',
      uid: '123456'
    });
  });
  
  test('should logout', () => {
    const state = authReducer(initialState, logout());
    expect(state).toEqual({
      checking: false,
    });
  });
  
  test('should finish checking', () => {
    const state = authReducer(initialState, setCheckingFinish);
    expect(state).toEqual({
      ...initialState,
      checking: false,
    });
  })
  
})
