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
  <div class="card flex justify-content-center">
    <!-- InputGroup menyatukan InputText dan Button -->
    <InputGroup>
      <InputText v-model="keyword" placeholder="Cari produk (mis. Sepatu)..." @keyup.enter="onSearch" />
      <Button icon="pi pi-search" label="Cari" @click="onSearch" />
    </InputGroup>
  </div>
</template>
