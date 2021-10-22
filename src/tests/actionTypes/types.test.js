import { types } from "../../actionTypes/types";

describe("Tests on action types", () => {
  test("should match types", () => {
    expect(types).toEqual({
      uiOpenModal: "[ui] open modal",
      uiCloseModal: "[ui] close modal",

      eventSetActive: "[event] set active",
      eventLogout: "[event] logout",
      eventStartAddNew: "[event] start add new",
      eventAddNew: "[event] add new",
      eventClearActive: "[event] clear active",
      eventUpdated: "[event] updated",
      eventDeleted: "[event] deleted",
      eventLoad: "[event] get events",

      // authChecking: "[auth] checking login state",
      authCheckingFinish: "[auth] finish checking login state",
      authStartLogin: "[auth] start login",
      authLogin: "[auth] login",
      authStartSignup: "[auth] start register",
      authStartTokenRevalidate: "[auth] start revalidate token",
      authLogout: "[auth] logout",
    });
  });
});
