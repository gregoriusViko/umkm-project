<script setup lang="ts">
import Button from 'primevue/button'
import Tag from 'primevue/tag'
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

defineProps<Product>()
</script>

<template>
  <div class="product-image-wrap">
    <img :src="image" :alt="name" />

    <Tag v-if="discount > 0" class="discount-badge" severity="danger" :value="`-${discount}%`" />

    <Button
      class="favorite-button"
      text
      rounded
      type="button"
      :aria-label="`Simpan ${name}`"
    >
      <span aria-hidden="true">♡</span>
    </Button>
  </div>

  <div class="product-details">
    <span class="shop-name">{{ shop }}</span>
    <h3>{{ name }}</h3>
    <strong class="product-price">{{ formatCurrency(price) }}</strong>

    <div v-if="oldPrices > 0" class="old-price-row">
      <del>{{ formatCurrency(oldPrices) }}</del>
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
