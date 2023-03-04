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
import {onMounted} from "vue"
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import {useUser} from './store'
import {setToken} from "./utils/requests";

const userStore = useUser()

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
  font-size: 14px;
}
.app {
  width: 100vw;
  .main {
    margin: 20px 0;
  }
}
.page {
  background-color: #f5f5f5;
}
</style>
