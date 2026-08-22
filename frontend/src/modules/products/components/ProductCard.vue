<script setup lang="ts">
// import Card from 'primevue/card';
import type { Product } from '../types/product'

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

const ratingFormatter = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const soldFormatter = new Intl.NumberFormat('id-ID', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const formatCurrency = (value: number) => currencyFormatter.format(value)
const formatRating = (value: number) => ratingFormatter.format(value)
const formatSold = (value: number) => `${soldFormatter.format(value)} terjual`

defineProps<Product>();
</script>

<template>
  <!-- <div class="flex justify-center">
    <Card class="max-w-sm w-full">

      <template #title>Starter Plan</template>
      <template #subtitle>For personal projects</template>
      <template #content>
        <p class="m-0">Includes essential features, basic analytics and access to community support.</p>
      </template>
      <template #footer>
        <span class="text-sm text-surface-500 dark:text-surface-400">Cancel anytime. No credit card required.</span>
      </template>
    </Card>
  </div> -->

  <div class="product-image-wrap">
    <!-- Hapus kurung kurawal ganda pada binding atribut yang menggunakan titik dua (:) -->
    <img :src="image" :alt="name" />

    <span v-if="discount && discount > 0" class="discount-badge">-{{ discount }}%</span>

    <!-- String interpolation dengan backtick di atribut v-bind adalah cara yang benar -->
    <button type="button" class="favorite-button" :aria-label="`Simpan ${name}`">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
      </svg>
    </button>
  </div>

  <div class="product-details">
    <!-- Panggil props langsung, bukan melalui objek 'product.' -->
    <span class="shop-name">{{ shop }}</span>
    <h3>{{ name }}</h3>
    <strong class="product-price">{{ formatCurrency(price) }}</strong>

    <div v-if="oldPrices > 0" class="old-price-row">
      <del>{{ formatCurrency(oldPrices) }}</del>
      <!-- Gunakan kondisi jika discount tidak null -->
      <span v-if="discount">Hemat {{ discount }}%</span>
    </div>

    <div class="product-meta">
      <span class="rating">★ {{ formatRating(rating) }}</span>
      <span>·</span>
      <span>{{ formatSold(sold) }}</span>
    </div>

    <span class="product-city">{{ city }}</span>
  </div>
</template>
