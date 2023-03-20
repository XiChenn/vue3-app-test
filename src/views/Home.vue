<template>
  <div class="page">
    <div class="swiper">
      <div class="content">
        <Swiper :list="carousel_list" width="1226px" height="460px"></Swiper>
      </div>
    </div>
    <Types :types="types1">
      <img class="image" src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d91bb6cf7da0947e8a6e50e03f4daf06.jpg"/>
    </Types>
    <Types :types="types2">
      <img class="image" src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/06d75467973ea188caa56e18a67647b4.png"/>
    </Types>
    <Types :types="types3">
      <img class="image" src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c9550c95ee33a22dc8db677dada00f09.jpg"/>
    </Types>
  </div>
</template>

<script setup>
import Swiper from '../components/Swiper.vue'
import {get_carousel_list} from "../api/carousel"
import {onMounted, ref} from 'vue'
import {product_search} from "../api/product"
import Types from "../components/Types.vue"

const carousel_list = ref([])

// TODO - for testing
const types1 = ref({})
const types2 = ref({})
const types3 = ref({})

const loadCarousel_list = async () => {
  carousel_list.value = await get_carousel_list()
}

const loadProducts = async () => {
  let phones = await product_search({category: 'smartphones', _page: 1, _limit:7})
  let laptops = await product_search({category: 'laptops', _page: 1, _limit:7})
  let fragrances = await product_search({category: 'fragrances', _page: 1, _limit:7})
  let skincare = await product_search({category: 'skincare', _page: 1, _limit:7})

  // TODO - test data
  types1.value = {
    title: "Phone",
    data: [
      {
        title: 'iPhone',
        data: phones
      },
      {
        title: 'Skincare',
        data: skincare
      }
    ]
  }

  types2.value = {
    title: "Laptops",
    data: [
      {
        title: 'laptop',
        data: laptops
      }
    ]
  }

  types3.value = {
    title: "Fragrance",
    data: [
      {
        title: 'fragrances',
        data: fragrances
      }
    ]
  }
}

onMounted(() => {
  loadCarousel_list()
  loadProducts()
})
</script>

<style scoped lang="scss">
.swiper {
  background-color: white;
  .content {
    width: 1226px;
    margin: 0 auto;
  }
}
.image {
  width: 100%;
}
</style>
