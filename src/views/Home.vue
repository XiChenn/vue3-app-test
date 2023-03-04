<template>
  <div class="page">
    <div class="swiper">
      <div class="content">
        <Swiper :list="carousel_list" width="1226px" height="460px"></Swiper>
      </div>
    </div>
    <Types :types="types1">
      <img clase="image" src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d91bb6cf7da0947e8a6e50e03f4daf06.jpg"/>
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

const loadCarousel_list = async () => {
  carousel_list.value = await get_carousel_list()
}

const loadProducts = async () => {
  const params = {
    category: 'smartphones'
  }
  let ret = await product_search(params)

  // TODO - test data
  types1.value = {
    title: "Phone",
    data: [
      {
        title: 'iPhone',
        data: ret
      },
      {
        title: 'Android',
        data: ret
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
  width: 10%;
}
</style>
