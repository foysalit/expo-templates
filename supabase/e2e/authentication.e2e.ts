const { reloadApp } = require("detox-expo-helpers");

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Authentication", () => {
  beforeEach(async () => {
    await reloadApp();
    await sleep(4000);
  });

  test("Sign in with existing user credentials", async () => {
    await element(by.id("input-email")).typeText("foysal@bdgeeks.com");
    await element(by.id("input-password")).typeText("testPassword");
    await element(by.id("submit-button")).tap();
    await waitFor(element(by.id("show-users-list-button")))
      .toBeVisible()
      .withTimeout(2000);
    await element(by.id("show-users-list-button")).tap();
  });
});
