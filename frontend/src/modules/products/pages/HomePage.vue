<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Message, Skeleton } from 'primevue'
import { useProducts } from '../composables/useProducts.ts'
import type { Product, ProductsRequest } from '../types/product.ts'

import ProductList from '../components/ProductList.vue'

const { getProducts, loading, error } = useProducts()

const pages: ProductsRequest = {
  limit: 20,
  after: null,
}

const products = ref<Product[]>([])

onMounted(async () => {
  const response = await getProducts(pages)
  products.value = response?.products ?? []
})
</script>

<template>

  <section id="products" class="">

    <Message v-if="error" severity="warn" class="products-message">{{ error }}</Message>

    <div v-if="loading" class="product-grid" aria-label="Memuat produk">
      <div v-for="item in 4" :key="item" class="product-card product-skeleton">
        <Skeleton width="100%" height="190px" />
        <div class="product-details">
          <Skeleton width="42%" height="0.65rem" />
          <Skeleton width="88%" height="1rem" />
          <Skeleton width="55%" height="1.2rem" />
        </div>
      </div>
    </div>

    <div v-else>
      <ProductList :products="products" />
    </div>
  </section>
</template>
