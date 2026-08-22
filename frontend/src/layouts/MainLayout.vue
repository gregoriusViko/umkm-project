<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import { useAuthStore } from '@/modules/auth/stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const searchQuery = ref(String(route.query.q ?? ''))
const selectedNavigation = ref('Beranda')
const accountMenu = ref<InstanceType<typeof Menu> | null>(null)

const navigationItems = [
  { label: 'Beranda', symbol: '⌂', route: '/' },
  { label: 'Kategori', symbol: '▦', hash: '#categories' },
  { label: 'Keranjang', symbol: '♧', badge: 2 },
  { label: 'Pesanan', symbol: '▤' },
  { label: 'Akun', symbol: '○', account: true },
]

const desktopMenuItems = [
  { label: 'Beranda', command: () => navigateTo({ label: 'Beranda', route: '/' }) },
  { label: 'Kategori', command: () => navigateTo({ label: 'Kategori', hash: '#categories' }) },
  { label: 'Promo hari ini', command: () => navigateTo({ label: 'Promo', hash: '#promo' }) },
  { label: 'Produk pilihan', command: () => navigateTo({ label: 'Produk', hash: '#products' }) },
]

const accountItems = [
  { label: 'Profil saya', disabled: true },
  { separator: true },
  { label: 'Keluar', command: handleLogout },
]

const activeNavigation = computed(() => {
  if (route.name === 'search') return 'Kategori'
  return selectedNavigation.value
})

async function navigateTo(
  item: (typeof navigationItems)[number] | { label: string; route?: string; hash?: string },
  event?: Event,
) {
  selectedNavigation.value = item.label

  if ('account' in item && item.account && event) {
    accountMenu.value?.toggle(event)
    return
  }

  if (item.route) {
    await router.push(item.route)
    return
  }

  if (item.hash) {
    await router.push({ name: 'Home', hash: item.hash })
  }
}

async function submitSearch() {
  const query = searchQuery.value.trim()
  await router.push({ name: 'search', query: query ? { q: query } : {} })
}

function toggleAccountMenu(event: Event) {
  accountMenu.value?.toggle(event)
}

async function handleLogout() {
  authStore.logout()
  await router.replace('/login')
}
</script>

<template>
  <div class="marketplace-shell">
    <header class="app-header">
      <div class="header-primary">
        <RouterLink class="brand" to="/" aria-label="Beranda PasarKita">
          <span class="brand-mark">PK</span>
          <span><strong>PasarKita</strong><small>Bangga buatan Indonesia</small></span>
        </RouterLink>

        <Button class="location-button" text type="button" aria-label="Pilih lokasi pengiriman">
          <span class="location-pin" aria-hidden="true">⌖</span>
          <span class="location-copy"><small>Dikirim ke</small><strong>Jakarta Selatan</strong></span>
          <span class="location-chevron" aria-hidden="true">⌄</span>
        </Button>

        <form class="search-box" role="search" @submit.prevent="submitSearch">
          <span class="search-symbol" aria-hidden="true">⌕</span>
          <InputText
            v-model="searchQuery"
            type="search"
            placeholder="Cari produk atau toko UMKM..."
          />
          <Button class="search-submit" type="submit" label="Cari" />
        </form>

        <div class="header-actions">
          <Button class="header-icon-button" text rounded type="button" aria-label="Notifikasi">
            <span aria-hidden="true">♢</span>
            <i class="notification-dot"></i>
          </Button>
          <Button class="account-button" text type="button" @click="toggleAccountMenu">
            <Avatar label="V" shape="circle" />
            <span class="account-copy"><small>Selamat datang</small><strong>Akun saya</strong></span>
            <span aria-hidden="true">⌄</span>
          </Button>
        </div>
      </div>

      <div class="desktop-navigation">
        <Menubar :model="desktopMenuItems">
          <template #end>
            <span class="desktop-trust">Gratis ongkir untuk produk bertanda Lokal Pilihan</span>
          </template>
        </Menubar>
      </div>
    </header>

    <main class="page-content">
      <RouterView />
    </main>

    <nav class="bottom-navigation" aria-label="Navigasi utama">
      <Button
        v-for="item in navigationItems"
        :key="item.label"
        class="nav-item"
        :class="{ active: activeNavigation === item.label }"
        text
        type="button"
        @click="navigateTo(item, $event)"
      >
        <span class="nav-icon">
          <span aria-hidden="true">{{ item.symbol }}</span>
          <Badge v-if="item.badge" :value="item.badge" severity="danger" />
        </span>
        <span>{{ item.label }}</span>
      </Button>
    </nav>

    <Menu ref="accountMenu" :model="accountItems" popup />
  </div>
</template>
