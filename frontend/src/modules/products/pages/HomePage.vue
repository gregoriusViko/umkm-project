<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Skeleton from 'primevue/skeleton'
import { useProducts } from '../composables/useProducts'
import type { Product, ProductsRequest } from '../types/product'

import ProductCard from '../components/ProductCard.vue'

const categories = [
  { name: 'Makanan', icon: '🍜', color: '#fff2db' },
  { name: 'Fashion', icon: '👕', color: '#e8f4ff' },
  { name: 'Kerajinan', icon: '🧺', color: '#f4eaff' },
  { name: 'Kecantikan', icon: '🧴', color: '#ffe8ed' },
  { name: 'Kopi', icon: '☕', color: '#f4eadf' },
  { name: 'Lainnya', icon: '✨', color: '#e8f7ef' },
]

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
  <div class="home-page">
    <div class="home-feature-grid">
      <section class="hero-banner">
        <div class="hero-copy">
          <span class="eyebrow">Bangga buatan lokal</span>
          <h1>Belanja lokal,<br />dampaknya besar.</h1>
          <p>Temukan produk pilihan dari UMKM di seluruh Indonesia.</p>
          <Button label="Belanja sekarang" size="small">
            <template #icon><span aria-hidden="true">→</span></template>
          </Button>
        </div>
        <div class="hero-art" aria-hidden="true">
          <span class="sun"></span>
          <span class="leaf leaf-one"></span>
          <span class="leaf leaf-two"></span>
          <span class="parcel">📦</span>
        </div>
      </section>

      <aside class="desktop-promo-stack" aria-label="Keunggulan PasarKita">
        <div class="promo-card promo-card-delivery">
          <span class="promo-symbol" aria-hidden="true">✦</span>
          <div><small>Khusus minggu ini</small><strong>Gratis ongkir hingga Rp20 ribu</strong></div>
        </div>
        <div class="promo-card promo-card-maker">
          <span class="promo-symbol" aria-hidden="true">✺</span>
          <div><small>Langsung dari pembuatnya</small><strong>Produk unik, cerita autentik</strong></div>
        </div>
      </aside>
    </div>

    <section id="categories" class="content-section category-section">
      <div class="section-heading">
        <div>
          <span class="section-kicker">Jelajahi</span>
          <h2>Kategori pilihan</h2>
        </div>
        <Button label="Lihat semua" link />
      </div>

      <div class="category-list">
        <Button
          v-for="category in categories"
          :key="category.name"
          class="category-item"
          text
          type="button"
        >
          <span class="category-icon" :style="{ backgroundColor: category.color }">{{
            category.icon
          }}</span>
          <span>{{ category.name }}</span>
        </Button>
      </div>
    </section>

    <section id="promo" class="content-section flash-section">
      <div class="flash-copy">
        <span class="flash-icon">⚡</span>
        <div>
          <small>Penawaran hari ini</small>
          <strong>Promo UMKM Pilihan</strong>
        </div>
      </div>
      <div class="countdown" aria-label="Berakhir dalam 5 jam 32 menit">
        <span>05</span><b>:</b><span>32</span><b>:</b><span>18</span>
      </div>
    </section>

    <section id="products" class="content-section products-section">
      <div class="section-heading">
        <div>
          <span class="section-kicker">Untuk kamu</span>
          <h2>Produk rekomendasi</h2>
        </div>
        <Button label="Lihat semua" link />
      </div>

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

      <div v-else class="product-grid">
        <article v-for="product in products" :key="product.name" class="product-card">
          <ProductCard v-bind="product" />
        </article>
      </div>
    </section>
  </div>
</template>
