<script setup lang="ts">
import type { Product } from '../types/product'
import { formatCurrency, formatRating, formatSold } from '../composables/useFormat'

defineProps<{
  product: Product
}>()
</script>

<template>
  <router-link :to="`product/${product.id}`">
    <article
      class="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div class="h-48 w-full bg-gray-50 relative">
        <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
      </div>

      <div class="p-4 flex flex-col flex-1 gap-2">
        <div>
          <h3 class="font-bold text-gray-800 line-clamp-2">{{ product.name }}</h3>
          <span class="text-xs text-gray-500">{{ product.shop }}</span>
        </div>

        <div class="mt-auto pt-2">
          <span class="text-lg font-bold text-green-600">{{ formatCurrency(product.price) }}</span>
        </div>

        <div class="flex items-center justify-between text-xs text-gray-500 mt-2">
          <span class="flex items-center gap-1">
            ⭐ {{ formatRating(product.rating) }}
          </span>
          <span>{{ formatSold(product.sold) }}</span>
        </div>
      </div>
    </article>
  </router-link>
</template>
