import { Page } from 'playwright'

export class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  errorMessage = '[data-test="form-message"]'
  toastMessage = 'div[role="status"]'

  async navigate(url: string) {
    await this.page.goto(url)
  }

  async fillInput(selector: string, value: string) {
    await this.page.fill(selector, value)
  }

  async clickButton(selector: string) {
    await this.page.click(selector)
  }

  async checkCheckbox(selector: string) {
    await this.page.check(selector)
  }

  async uploadFile(selector: string, path: string) {
    await this.page.setInputFiles(selector, path)
  }

  async getFormMessage() {
    const errorLocator = this.page.locator(this.errorMessage)
    const toastLocator = this.page.locator(this.toastMessage)

    const firstVisible = await Promise.race([
      errorLocator
        .waitFor({ state: 'visible', timeout: 15000 })
        .then(() => errorLocator)
        .catch(() => null),
      toastLocator
        .waitFor({ state: 'visible', timeout: 15000 })
        .then(() => toastLocator)
        .catch(() => null),
    ])

    if (!firstVisible) {
      throw new Error('No se encontró mensaje de error ni toast en pantalla')
    }

    return firstVisible
  }
}
