<script setup lang="ts">
import type { Product } from '../types/product.ts';
import ProductCard from './ProductCard.vue';

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <section class="p-6">
    <div class="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols=5 2xl:grid-cols-6 gap-6">
      <ProductCard v-for="item in products" :key="item.name" :product="item" />
    </div>
  </section>
</template>
