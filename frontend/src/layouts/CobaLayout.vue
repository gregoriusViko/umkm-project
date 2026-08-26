<script setup lang="ts">
import { AutoComplete, Button, InputGroup, Badge } from 'primevue'
import { Icon } from '@iconify/vue'

</script>

<template>
  <div class="w-full h-screen flex flex-col bg-white overflow-hidden">
    <header class="z-50 flex items-center justify-between gap-6 px-4 py-3 bg-white shadow-sm shrink-0">
      <img
        src="https://img.magnific.com/premium-vector/eqh-logo-design-initial-letter-eqh-monogram-logo-using-hexagon-shape_1101554-16445.jpg"
        alt="Logo Dummy" class="h-10 w-auto object-contain rounded-md">
      <InputGroup>
        <AutoComplete />
        <Button>
          <Icon icon="material-symbols:search" width="24" height="24" />
        </Button>
      </InputGroup>
      <div class="relative">
        <Icon icon="material-symbols:shopping-cart" width="32" height="32" />
        <Badge value="4" severity="danger" class="absolute -top-2 -right-2 text-[9px] min-w-4 h-4 leading-none" />
      </div>
    </header>

    <!-- 2. KONTEN UTAMA (Satu-satunya area yang bisa di-scroll) -->
    <main class="flex-1 overflow-y-auto p-4 relative">
      <!-- <div
        class="h-300 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 bg-white shadow-sm">
        (Area Konten - Coba scroll ke bawah)
      </div> -->
      <RouterView />
    </main>
    <nav class="bg-white border-t border-gray-100 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] pb-safe">
      <div class="flex justify-between items-center h-16 px-1">
        <router-link to="/" v-ripple exact-active-class="!text-blue-500"
          class="p-ripple relative flex flex-col items-center justify-center w-full h-full rounded-xl text-gray-400 transition-colors">
          <Icon icon="material-symbols:home" width="24" height="24" />
          <span class="text-[10px] mt-1 font-medium">Beranda</span>
        </router-link>

        <router-link to="/kategori" v-ripple exact-active-class="!text-blue-500"
          class="p-ripple relative flex flex-col items-center justify-center w-full h-full rounded-xl text-gray-400 transition-colors">
          <Icon icon="material-symbols:category" width="24" height="24" />
          <span class="text-[10px] mt-1 font-medium">Kategori</span>
        </router-link>

        <router-link to="/notifikasi" v-ripple exact-active-class="!text-blue-500"
          class="p-ripple relative flex flex-col items-center justify-center w-full h-full rounded-xl text-gray-400 transition-colors">
          <div class="relative">
            <Icon icon="material-symbols:notifications" width="24" height="24" />
            <Badge value="3" severity="danger" class="absolute -top-2 -right-2 text-[9px] min-w-4 h-4 leading-none" />
          </div>
          <span class="text-[10px] mt-1 font-medium">Notifikasi</span>
        </router-link>

        <router-link to="/profil" v-ripple exact-active-class="!text-blue-500"
          class="p-ripple relative flex flex-col items-center justify-center w-full h-full rounded-xl text-gray-400 transition-colors">
          <Icon icon="material-symbols:person" width="24" height="24" />
          <span class="text-[10px] mt-1 font-medium">Profil</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>
