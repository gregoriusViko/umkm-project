<script setup lang="ts">
const categories = [
  { name: 'Makanan', icon: '🍜', color: '#fff2db' },
  { name: 'Fashion', icon: '👕', color: '#e8f4ff' },
  { name: 'Kerajinan', icon: '🧺', color: '#f4eaff' },
  { name: 'Kecantikan', icon: '🧴', color: '#ffe8ed' },
  { name: 'Kopi', icon: '☕', color: '#f4eadf' },
  { name: 'Lainnya', icon: '✨', color: '#e8f7ef' },
]

const products = [
  {
    name: 'Sepatu Sneakers Kanvas Lokal',
    price: 'Rp189.000',
    oldPrice: 'Rp235.000',
    discount: '20%',
    shop: 'Langkah Lokal',
    city: 'Bandung',
    rating: '4.9',
    sold: '1,2 rb terjual',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=640&q=82',
  },
  {
    name: 'Tas Anyaman Rotan Handmade',
    price: 'Rp145.000',
    oldPrice: '',
    discount: '',
    shop: 'Kriya Nusantara',
    city: 'Bantul',
    rating: '4.8',
    sold: '864 terjual',
    image:
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=640&q=82',
  },
  {
    name: 'Kopi Arabika Gayo 250 gram',
    price: 'Rp68.000',
    oldPrice: 'Rp80.000',
    discount: '15%',
    shop: 'Ruang Seduh',
    city: 'Aceh Tengah',
    rating: '4.9',
    sold: '2,4 rb terjual',
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=640&q=82',
  },
  {
    name: 'Jam Tangan Kayu Pria Wanita',
    price: 'Rp219.000',
    oldPrice: '',
    discount: '',
    shop: 'KayuKita Studio',
    city: 'Yogyakarta',
    rating: '4.7',
    sold: '532 terjual',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=640&q=82',
  },
]
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
            <span v-if="product.discount" class="discount-badge">-{{ product.discount }}</span>
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
            <strong class="product-price">{{ product.price }}</strong>
            <div v-if="product.oldPrice" class="old-price-row">
              <del>{{ product.oldPrice }}</del>
              <span>Hemat {{ product.discount }}</span>
            </div>
            <div class="product-meta">
              <span class="rating">★ {{ product.rating }}</span>
              <span>·</span>
              <span>{{ product.sold }}</span>
            </div>
            <span class="product-city">{{ product.city }}</span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
