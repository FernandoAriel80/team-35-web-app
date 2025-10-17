import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { PlaywrightWorld } from '../support/world'

Given(
  'el usuario se encuentra en la página de registro',
  async function (this: PlaywrightWorld) {
    await this.createUserPage.navigate(`${this.baseURL}/auth/register`)
  }
)

When(
  'el usuario ingresa {string} en el campo nombre completo',
  async function (this: PlaywrightWorld, name: string) {
    await this.createUserPage.fillName(name)
  }
)

When(
  'el usuario ingresa {string} en el campo email',
  async function (this: PlaywrightWorld, email: string) {
    if (email === '<email>') email = this.email
    await this.createUserPage.fillEmail(email)
  }
)

When(
  'el usuario ingresa {string} en el campo contraseña',
  async function (this: PlaywrightWorld, password: string) {
    if (password === '<password>') password = this.password
    await this.createUserPage.fillPassword(password)
  }
)

When(
  'el usuario confirma {string} en el campo confirmar contraseña',
  async function (this: PlaywrightWorld, password: string) {
    if (password === '<password>') password = this.password
    await this.createUserPage.fillConfirmedPassword(password)
  }
)

When(
  'hace click en el botón de registrarse',
  async function (this: PlaywrightWorld) {
    await this.createUserPage.submitForm()
  }
)

Then(
  'se debe mostrar un mensaje {string}',
  async function (this: PlaywrightWorld, expectedMessage: string) {
    const message = await this.createUserPage.getAnyMessage()
    expect(message?.trim()).toContain(expectedMessage)
  }
)

When(
  'el usuario no ingresa ningún dato',
  async function (this: PlaywrightWorld) {
    await this.createUserPage.submitForm()
  }
)

Then(
  'no permite enviar registro con campos vacíos',
  async function (this: PlaywrightWorld) {
    await expect(this.page).toHaveURL('auth/register')
  }
)
