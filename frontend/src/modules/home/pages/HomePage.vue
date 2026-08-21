<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProducts } from '../composables/useProducts'
import type { Product, ProductsRequest } from '../types/product'

const categories = [
  { name: 'Makanan', icon: '🍜', color: '#fff2db' },
  { name: 'Fashion', icon: '👕', color: '#e8f4ff' },
  { name: 'Kerajinan', icon: '🧺', color: '#f4eaff' },
  { name: 'Kecantikan', icon: '🧴', color: '#ffe8ed' },
  { name: 'Kopi', icon: '☕', color: '#f4eadf' },
  { name: 'Lainnya', icon: '✨', color: '#e8f7ef' },
]

const {getProducts, loading, error } = useProducts()

const pages: ProductsRequest = {
  limit: 20,
  after: null,
}

const products = ref<Product[]>([])

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

onMounted(async () => {
  loading.value = true
  try {
    const response = await getProducts(pages) // Ganti dengan fungsi API Anda
    products.value = response?.products || []
  } catch (error) {
    console.error("Gagal mengambil data", error)
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <div class="home-page">
    <section class="hero-banner">
      <div class="hero-copy">
        <span class="eyebrow">Bangga buatan lokal</span>
        <h1>Belanja lokal,<br />dampaknya besar.</h1>
        <p>Temukan produk pilihan dari UMKM di seluruh Indonesia.</p>
        <button type="button">Belanja sekarang <span aria-hidden="true">→</span></button>
      </div>
      <div class="hero-art" aria-hidden="true">
        <span class="sun"></span>
        <span class="leaf leaf-one"></span>
        <span class="leaf leaf-two"></span>
        <span class="parcel">📦</span>
      </div>
    </section>

    <section class="content-section category-section">
      <div class="section-heading">
        <div>
          <span class="section-kicker">Jelajahi</span>
          <h2>Kategori pilihan</h2>
        </div>
        <button type="button">Lihat semua</button>
      </div>

      <div class="category-list">
        <button
          v-for="category in categories"
          :key="category.name"
          class="category-item"
          type="button"
        >
          <span class="category-icon" :style="{ backgroundColor: category.color }">{{
            category.icon
          }}</span>
          <span>{{ category.name }}</span>
        </button>
      </div>
    </section>

    <section class="content-section flash-section">
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

    <section class="content-section products-section">
      <div class="section-heading">
        <div>
          <span class="section-kicker">Untuk kamu</span>
          <h2>Produk rekomendasi</h2>
        </div>
        <button type="button">Lihat semua</button>
      </div>

      <div class="product-grid">
        <article v-for="product in products" :key="product.name" class="product-card">
          <div class="product-image-wrap">
            <img :src="product.image" :alt="product.name" />
            <span v-if="product.discount > 0" class="discount-badge"
              >-{{ product.discount }}%</span
            >
            <button type="button" class="favorite-button" :aria-label="`Simpan ${product.name}`">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                />
              </svg>
            </button>
          </div>
          <div class="product-details">
            <span class="shop-name">{{ product.shop }}</span>
            <h3>{{ product.name }}</h3>
            <strong class="product-price">{{ formatCurrency(product.price) }}</strong>
            <div v-if="product.oldPrices > 0" class="old-price-row">
              <del>{{ formatCurrency(product.oldPrices) }}</del>
              <span>Hemat {{ product.discount }}%</span>
            </div>
            <div class="product-meta">
              <span class="rating">★ {{ formatRating(product.rating) }}</span>
              <span>·</span>
              <span>{{ formatSold(product.sold) }}</span>
            </div>
            <span class="product-city">{{ product.city }}</span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
