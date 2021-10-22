import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initialState = {
  modalOpen: false,
};

describe("Tests on uiReducer", () => {
  test("should return default state", () => {
    const state = uiReducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test('should open and close modal', () => {
    const openModal = uiOpenModal();
    const openedState = uiReducer(initialState, openModal);
    
    expect(openedState).toEqual({ modalOpen: true });
    
    const closeModal = uiCloseModal();
    const closedState = uiReducer(initialState, closeModal);

    expect(closedState).toEqual({ modalOpen: false });
  });
  
});
