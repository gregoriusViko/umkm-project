<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Skeleton from 'primevue/skeleton'
import ProductCard from '../components/ProductCard.vue'
import { useProducts } from '../composables/useProducts'
import type { Product } from '../types/product'

const route = useRoute()
const router = useRouter()
const query = ref(String(route.query.q ?? ''))
const products = ref<Product[]>([])
const { getProducts, loading, error } = useProducts()

const filteredProducts = computed(() => {
  const keyword = query.value.trim().toLocaleLowerCase('id-ID')
  if (!keyword) return products.value

  return products.value.filter((product) =>
    [product.name, product.shop, product.city].some((value) =>
      value.toLocaleLowerCase('id-ID').includes(keyword),
    ),
  )
})

watch(
  () => route.query.q,
  (value) => {
    query.value = String(value ?? '')
  },
)

async function submitSearch() {
  const keyword = query.value.trim()
  await router.replace({ name: 'search', query: keyword ? { q: keyword } : {} })
}

onMounted(async () => {
  const response = await getProducts({ limit: 20, after: null })
  products.value = response?.products ?? []
})
</script>

<template>
  <section class="search-page">
    <div class="search-page-heading">
      <span class="section-kicker">Temukan produk lokal</span>
      <h1>{{ query ? `Hasil untuk “${query}”` : 'Semua produk UMKM' }}</h1>
      <p>Cari berdasarkan nama produk, toko, atau kota asal.</p>
    </div>

    <form class="search-page-form" role="search" @submit.prevent="submitSearch">
      <InputText v-model="query" type="search" placeholder="Contoh: kopi, Bandung, anyaman" />
      <Button type="submit" label="Cari produk" />
    </form>

    <Message v-if="error" severity="warn">{{ error }}</Message>

    <div v-if="loading" class="product-grid" aria-label="Memuat hasil pencarian">
      <div v-for="item in 4" :key="item" class="product-card product-skeleton">
        <Skeleton width="100%" height="190px" />
        <div class="product-details">
          <Skeleton width="42%" height="0.65rem" />
          <Skeleton width="88%" height="1rem" />
          <Skeleton width="55%" height="1.2rem" />
        </div>
      </div>
    </div>

    <div v-else-if="filteredProducts.length" class="product-grid">
      <article v-for="product in filteredProducts" :key="product.name" class="product-card">
        <ProductCard v-bind="product" />
      </article>
    </div>

    <Message v-else severity="secondary" class="search-empty">
      Produk yang dicari belum ditemukan. Coba kata kunci yang lebih singkat.
    </Message>
  </section>
</template>
