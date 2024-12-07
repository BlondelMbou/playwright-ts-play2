import { Page } from '@playwright/test';
class Login {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    elements = {
        usernameSelector: () => this.page.getByRole('textbox', { name: 'Username' }),
        passwordSelector: () => this.page.getByPlaceholder('Password'),
        loginBtnSelector: () => this.page.getByRole("button", { name: 'Login' }),
        errorMessage: () => this.page.locator('[data-test="error"]')
    }

    async login(username: string, password: string) {
        await this.elements.usernameSelector().fill(username);
        await this.elements.passwordSelector().fill(password)
        await this.elements.loginBtnSelector().click();
    }

}
export default Login;
