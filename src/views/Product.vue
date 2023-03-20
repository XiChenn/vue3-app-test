<template>
  <div class="page">
    <div class="breadcrumb">
      <div class="content">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item>All Products</el-breadcrumb-item>
          <el-breadcrumb-item>Categories</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="nav">
          <div class="title">Categories</div>
          <el-tabs v-model="activeName" class="tabs" tab-position="bottom" @tab-change="tabChange">
            <el-tab-pane :label="item.name" :name="item.id" v-for="(item, index) in categories" :key="item.id"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="products">
      <Item v-for="item in products" :key="item.id" :item="item"></Item>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" v-model:current-page="pageIndex"
                     :page-size="15"
                     :total="total"
                     @current-change="loadProducts"
      />
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue'
import {get_categories} from "../api/category";
import {product_search} from "../api/product";
import Item from "../components/Item.vue";

const activeName = ref(0)
const categories = ref([])
const pageIndex = ref(1)
const products = ref([])
const total = ref(0)

const loadCategories = async () => {
  categories.value = await get_categories()
  categories.value.unshift({
    id: 0, name: 'All'
  })
}

const loadProducts = async () => {
  let payload = {_page: pageIndex.value, _limit:15}
  if (activeName.value > 0) {
    const data = await get_categories({id: activeName.value})
    const categoryName = data[0]['name']
    payload['category'] = categoryName
  }
  let product_data = await product_search(
      payload
  )
  products.value = product_data
  total.value = 50 // TODO hardcoded
}

onMounted(() => {
  loadCategories()
  loadProducts()
})
const tabChange = () => {
  loadProducts()
}
</script>

<style scoped lang="scss">
.breadcrumb {
  background-color: white;
  .content {
    width: 1226px;
    margin: 0 auto;
    .el-breadcrumb {
      font-size: 16px;
    }
    .nav {
      margin-top: 15px;
      display: flex;
      align-items: flex-end;
      .title {
        font-weight: bold;
        font-size: 16px;
        margin-right: 20px;
        padding-bottom: 10px;
      }
      .tabs {
        flex: 1;
      }
    }
  }
}
.products {
  width: 1240px;
  overflow: hidden;
  margin: 14px auto 0;
  transform: translateX(-14px)
}
.pagination {
  width: 1226px;
  margin: 10px auto 0;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>
