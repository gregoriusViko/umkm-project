import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import './assets/styles/main.css'

import App from './App.vue'
import router from './router'

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')

    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
// hapus
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })

  app.mount('#app')
}

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)
// app.use(PrimeVue, {
//   theme: {
//     preset: Aura,
//   },
// })

// app.mount('#app')

void bootstrap()
