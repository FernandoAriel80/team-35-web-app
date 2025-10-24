import { Before, After } from '@cucumber/cucumber'
import { PlaywrightWorld } from './world'

Before(async function (this: PlaywrightWorld) {
  await this.init()
})

After(async function (this: PlaywrightWorld) {
  // Reinicia la página en blanco para limpiar cualquier estado anterior
  if (this.page && !this.page.isClosed()) {
    await this.page.evaluate(() => {
      const form = document.querySelector('form')
      if (form) form.reset()
    })
    await this.page.reload({ waitUntil: 'domcontentloaded' })
  }
  await this.cleanup()
})
