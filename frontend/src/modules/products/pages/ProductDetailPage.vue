<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductDetail } from '../composables/useProductDetail';
import { onMounted } from 'vue';
import { formatCurrency, formatRating, formatSold } from '../composables/useFormat';
import type { Product, Comment } from '../types/product';
import { ref } from 'vue';

const route = useRoute()
const productId = route.params.id as string

// console.log(productId)

const product = ref<Product | null>(null)
const comments = ref<Comment[]> ([])

const {
  getDetailProduct,
  loading,
  error
} = useProductDetail()

onMounted(async () => {
  if(productId) {
    const detailProduct = await getDetailProduct(productId)
    product.value = detailProduct?.product || null
    comments.value = detailProduct?.comments || []
  }
})
</script>

<template>
  <main class="product-detail-page pb-24 relative" v-if="!error">

    <!-- Konten Utama -->
    <div class="p-4 bg-white flex flex-col gap-6">

      <!-- Bagian Atas: Gambar dan Info Utama -->
      <section class="product-overview flex flex-col md:flex-row gap-6">
        <figure class="product-gallery w-full md:w-1/2 rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <img
            :src="product?.image"
            alt="Sepatu Bagus warna merah tampak samping"
            class="w-full h-auto object-cover aspect-square"
          />
        </figure>

        <article class="product-core-info w-full md:w-1/2 flex flex-col gap-2 justify-center">
          <p class="text-3xl font-extrabold text-green-700">{{ formatCurrency(product?.price || 0) }}</p>
          <h1 class="text-xl md:text-2xl font-semibold text-gray-800">{{ product?.name }}</h1>

          <div class="stats flex items-center gap-4 text-sm text-gray-600 mt-1">
            <span class="rating flex items-center gap-1 font-medium">
              <span class="text-yellow-400">⭐</span> {{ formatRating(product?.rating || 0) }}
            </span>
            <span class="w-1 h-1 bg-gray-300 rounded-full"></span> <!-- Pemisah visual -->
            <span class="sold">{{ formatSold(product?.sold || 0) }}</span>
          </div>
        </article>
      </section>

      <hr class="border-gray-200" />

      <!-- Bagian Tengah: Deskripsi -->
      <section class="product-description">
        <h2 class="font-bold text-lg text-gray-800 mb-3">Deskripsi Produk</h2>
        <div class="text-gray-600 leading-relaxed text-sm md:text-base space-y-3">
          <p>
           {{ product?.description }}
          </p>
          <ul class="list-disc list-inside">
            <li>Material utama: Premium Kanvas & Mesh</li>
            <li>Sol: Karet fleksibel (Anti-slip)</li>
            <li>Bobot: 350 gram (Sangat ringan)</li>
          </ul>
        </div>
      </section>

      <hr class="border-gray-200" />

      <!-- Bagian Bawah: Ulasan -->
      <section class="product-reviews">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-lg text-gray-800">Ulasan Pembeli ({{ comments.length }})</h2>
          <button class="text-green-600 text-sm font-semibold hover:underline">Lihat Semua</button>
        </div>

        <article class="comment bg-gray-50 border border-gray-100 p-4 rounded-xl" v-for="comment in comments" :key="comment.personName">
          <header class="flex justify-between items-start mb-3">
            <div>
              <strong class="block text-sm text-gray-800">{{ comment.personName }}</strong>
              <span class="comment-rating text-yellow-400 text-xs tracking-widest">{{ '⭐'.repeat(comment.rate || 0) }}</span>
            </div>
            <time datetime="2026-08-25" class="text-xs text-gray-500">25 Agt 2026</time>
          </header>
          <p class="text-sm text-gray-700 italic">"{{ comment.content }}"</p>
        </article>
      </section>

    </div>

    <!-- CTA Tetap Fixed ke Viewport -->
    <div class="actions fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] z-50 flex gap-3 pb-safe">
      <button
        type="button"
        class="flex-1 border-2 border-green-600 text-green-700 px-4 py-3 rounded-xl font-bold active:bg-green-50 transition-colors"
      >
        + Keranjang
      </button>
      <button
        type="button"
        class="flex-1 bg-green-600 text-white px-4 py-3 rounded-xl font-bold active:bg-green-700 transition-colors shadow-md"
      >
        Beli Sekarang
      </button>
    </div>
  </main>
</template>
