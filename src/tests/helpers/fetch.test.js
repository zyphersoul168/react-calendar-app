import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";

describe("Test on fetch helper", () => {
  let token = "";
  
  test("should fetch without token", async () => {
    const resp = await fetchWithoutToken(
      "auth/login",
      {
        email: "aaron@gmail.com",
        password: "123456",
      },
      "POST"
    );

    const body = await resp.json();

    expect(resp instanceof Response).toBe(true);
    expect(body.ok).toBe(true);
    
    token = body.token;
  });

  test("should fetch with token", async () => {
    localStorage.setItem("token", token);

    const resp = await fetchWithToken("events", {}, "GET");
    const body = await resp.json();

    expect(body.ok).toBe(true);
  });
});
