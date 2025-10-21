import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { PlaywrightWorld } from '../support/world'

Given(
  'el usuario esta previamente registrado y en la página de login',
  async function (this: PlaywrightWorld) {
    await this.loginPage.navigate(`${this.baseURL}/auth/login`)
  }
)

When(
  'el usuario ingresa {string} en el campo email del login',
  async function (this: PlaywrightWorld, email: string) {
    if (email === '<email>') email = this.email
    await this.loginPage.fillEmail(email)
  }
)

When(
  'el usuario ingresa {string} en el campo contraseña del login',
  async function (this: PlaywrightWorld, password: string) {
    if (password === '<password>') password = this.password
    await this.loginPage.fillPassword(password)
  }
)

When(
  'hace click en el boton de iniciar sesión',
  async function (this: PlaywrightWorld) {
    await this.loginPage.submitForm()
  }
)

Then(
  'se debe mostrar una notificación {string}',
  async function (this: PlaywrightWorld, expectedMessage: string) {
    const messageLocator = await this.createUserPage.getFormMessage()
    await messageLocator.waitFor({ state: 'visible', timeout: 15000 })
    await expect(messageLocator).toHaveText(new RegExp(expectedMessage, 'i'))
  }
)

When(
  'el usuario no ingresa ningún dato en el login',
  async function (this: PlaywrightWorld) {
    await this.loginPage.submitForm()
  }
)

Then(
  'algún campo vacio debe ser inválido',
  async function (this: PlaywrightWorld) {
    const emailInput = this.page.locator(this.loginPage.emailInput)
    const passwordInput = this.page.locator(this.loginPage.passwordInput)

    const emailValid = await emailInput.evaluate((el) =>
      (el as HTMLInputElement).checkValidity()
    )
    const passwordValid = await passwordInput.evaluate((el) =>
      (el as HTMLInputElement).checkValidity()
    )

    expect(
      !emailValid || !passwordValid,
      'Se esperaba que al menos un campo fuera inválido'
    ).toBeTruthy()
  }
)

Then(
  'se mantiene en la página de login',
  async function (this: PlaywrightWorld) {
    await expect(this.page).toHaveURL(/.*\/auth\/login/)
  }
)
