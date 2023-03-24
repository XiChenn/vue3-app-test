<template>
  <div class="app">
    <Header />
    <Navigation />
    <div class="main">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import {onMounted, watch} from "vue"
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import {useMenuActive, useUser} from './store'
import {setToken} from "./utils/requests";
import {useRoute} from "vue-router";

const userStore = useUser()
const route = useRoute()
const menuActive = useMenuActive()

watch(() => route.path, (val) => {
  menuActive.setActiveIndex(val)
}, {
  immediate: true
})

onMounted(() => {
  const user = sessionStorage.getItem('user')
  if (user) {
    userStore.setUser(JSON.parse(user))
  }
  const token = sessionStorage.getItem('token')
  if (token) {
    setToken(token)
  }
})
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}
.app {
  font-size: 14px;
  width: 100vw;
  .main {
    margin: 20px 0;
  }
}
.page {
  background-color: #f5f5f5;
}
</style>
