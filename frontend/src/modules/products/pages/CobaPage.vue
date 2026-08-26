<script setup lang="ts">
import { ref } from 'vue';
import InputGroup from 'primevue/inputgroup'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const keyword = ref('');

const onSearch = () => {
  if (keyword.value.trim()) {
    alert(`Mencari produk: ${keyword.value}`);
    // Lakukan pemanggilan API atau navigasi ke halaman hasil pencarian di sini
  }
};
</script>

<template>
  <header class="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow-sm">

    <!-- Bagian Kiri: Logo atau Tombol Menu -->
    <div class="flex items-center gap-3">
      <button class="text-gray-600">☰</button> <!-- Ikon Menu Hamburger -->
      <div class="font-bold text-lg">LogoApp</div>
    </div>

    <!-- Bagian Kanan: Aksi (Search & Profil) -->
    <div class="flex items-center gap-4">
      <button class="text-gray-600">🔍</button> <!-- Ikon Search -->
      <div class="h-8 w-8 rounded-full bg-gray-300"></div> <!-- Avatar Profil -->
    </div>

  </header>
</template>
