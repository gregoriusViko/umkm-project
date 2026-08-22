<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const activeNavigation = ref('Beranda')

const navigationItems = [
  { label: 'Beranda', icon: 'home' },
  { label: 'Kategori', icon: 'grid' },
  { label: 'Keranjang', icon: 'bag', badge: 2 },
  { label: 'Pesanan', icon: 'receipt' },
  { label: 'Akun', icon: 'user' },
]

async function handleLogout() {
  authStore.logout()
  await router.replace('/login')
}

</script>

<template>
  <div class="marketplace-shell">
    <header class="app-header">
      <div class="header-topline">
        <button class="location-button" type="button" aria-label="Pilih lokasi pengiriman">
          <span class="location-pin" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </span>
          <span>
            <small>Dikirim ke</small>
            <strong>Jakarta Selatan</strong>
          </span>
          <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 10 3 3 3-3" />
          </svg>
        </button>

        <button class="icon-button" type="button" aria-label="Notifikasi">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>
          <span class="notification-dot"></span>
        </button>
      </div>

      <label class="search-box">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
        <input type="search" placeholder="Cari produk UMKM..." />
        <button type="button" aria-label="Pindai produk">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M9 9h6v6H9z"
            />
          </svg>
        </button>
      </label>
    </header>

    <main class="page-content">
      <RouterView />
    </main>

    <nav class="bottom-navigation" aria-label="Navigasi utama">
      <button
        v-for="item in navigationItems"
        :key="item.label"
        class="nav-item"
        :class="{ active: activeNavigation === item.label }"
        type="button"
        @click="handleLogout"
      >
        <span class="nav-icon">
          <svg v-if="item.icon === 'home'" viewBox="0 0 24 24">
            <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />
          </svg>
          <svg v-else-if="item.icon === 'grid'" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="2" />
            <rect x="14" y="3" width="7" height="7" rx="2" />
            <rect x="3" y="14" width="7" height="7" rx="2" />
            <rect x="14" y="14" width="7" height="7" rx="2" />
          </svg>
          <svg v-else-if="item.icon === 'bag'" viewBox="0 0 24 24">
            <path d="M5 8h14l-1 13H6Z" />
            <path d="M9 9V6a3 3 0 0 1 6 0v3" />
          </svg>
          <svg v-else-if="item.icon === 'receipt'" viewBox="0 0 24 24">
            <path d="M6 3h12v19l-3-2-3 2-3-2-3 2Z" />
            <path d="M9 8h6M9 12h6M9 16h4" />
          </svg>
          <svg v-else viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
          <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </span>
        <span>{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>
