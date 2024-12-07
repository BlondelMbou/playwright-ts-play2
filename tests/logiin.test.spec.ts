import test, { expect } from "@playwright/test";
import Login from "../pages/loginPage";

test.describe("login ", { tag: ['@smoke'] }, () => {
    let loginPage: Login;

    test.beforeEach(async ({ page }) => {
        loginPage = new Login(page);
        await page.goto("https://www.saucedemo.com/");
    })

    test("correct credential", async ({ page }) => {
        await loginPage.login("standard_user", "secret_sauce")
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })
    test("incorrect password", async () => {
        await loginPage.login("standard_user", "incorrect-secret_sauce")
        const errorMessage = await loginPage.elements.errorMessage().innerText();
        expect(errorMessage).toContain(
            "Epic sadface: Username and password do not match any user in this service");
    })
    test("incorrect username", async () => {
        await loginPage.login("incorrect-standard_user", "secret_sauce")
        const errorMessage = await loginPage.elements.errorMessage().innerText();
        expect(errorMessage).toContain(
            "Epic sadface: Username and password do not match any user in this service"
        );
    });
});