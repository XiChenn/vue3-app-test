<template>
  <div class="nav">
    <div class="content">
      <div class="logo">
        <img src="../assets/logo.png" />
      </div>
      <div class="menu">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            router
        >
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/product">All Products</el-menu-item>
          <el-menu-item index="/about">About</el-menu-item>
        </el-menu>
      </div>
      <div class="search">
        <el-input
            v-model="searchText"
            placeholder="Search"
            class="input-with-select"
        >
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import { Search } from '@element-plus/icons-vue'
import {useMenuActive} from "../store";

const menuActive = useMenuActive()

const searchText = ref('')

const activeIndex = computed(() => {
  return menuActive.activeIndex
})

</script>

<style scoped lang="scss">
.nav {
  margin-top: 10px;
  .content {
    width: 1226px;
    margin: 0 auto;
    border-bottom: 1px solid #b0b0b0;
    display: flex;
    align-items: center;
    .menu {
      flex: 1;
      margin-left: 100px;
      .el-menu--horizontal {
        border-bottom: None;
      }
    }
    .search {
      width: 300px;
    }
  }
}
</style>
