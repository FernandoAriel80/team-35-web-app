import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { PlaywrightWorld } from '../support/world'

Given(
  'el usuario se encuentra en la página de registro',
  async function (this: PlaywrightWorld) {
    await this.createUserPage.navigate(`${this.baseURL}/register`)
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
  async function (this: PlaywrightWorld, message: string) {
    const successAlert = this.page.locator('.toast', { hasText: message })
    await expect(successAlert).toBeVisible({ timeout: 5000 })
    await expect(successAlert).toContainText(message)
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

/* 

  Scenario: Intento de registro con email inválido
    When el usuario ingresa "Juán Perez" en el campo nombre completo
    And el usuario ingresa "correo-invalido" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "<password>" en el campo confirmar contraseña
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje de error "Formato de email inválido"

  Scenario: Intento de registro con contraseñas no coincidentes
    When el usuario ingresa "Juán Perez" en el campo nombre completo
    And  el usuario ingresa "correo@correo.com" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "Password456!" en el campo confirmar contraseña
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje de error "Las contraseñas no coinciden"

  Scenario: Intento de registro con email ya registrado
    When el usuario ingresa "Juán Pere" en el campo nombre completo
    And el usuario ingresa "<email>" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "<password>" en el campo confirmar contraseña
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje de error "El email ya está registrado"

*/

Then(
  'se debe mostrar un mensaje de error {string}',
  async function (this: PlaywrightWorld, message: string) {
    const errorAlert = this.page.locator(
      '.error, .alert-danger, .notification-error'
    )
    await expect(errorAlert).toBeVisible()
    await expect(errorAlert).toContainText(message)
  }
)
