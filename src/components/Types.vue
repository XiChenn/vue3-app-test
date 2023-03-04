<template>
  <div class="types" :types="props.types">
    <div class="top">
      <div class="title">{{props.types.title}}</div>
      <ul class="nav">
        <li :class="{active:activeIndex === index}" v-for="(item, index) in typesNav" :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="box">
      <div class="img">
        <slot></slot>
      </div>
      <div class="content">
        <Item v-for="item in currentList" :key="item.id" :item="item"></Item>
      </div>
    </div>
  </div>
</template>

<script setup>
import Item from './Item.vue'
import {computed, ref} from "vue";

const props = defineProps(['types'])
const activeIndex = ref(0)
const  typesNav = computed(() => {
  if (props.types.data) {
    return props.types.data.map(r=>r.title)
  } else {
    return []
  }
})

const currentList = computed(() => {
  console.log('**** types.data: ', props.types)
  if (props.types.data) {
    return props.types.data[activeIndex.value].data
  } else {
    return []
  }
})
</script>

<style scoped lang="scss">
.types {
  width: 1226px;
  height: 672px;
  margin: 0 auto;

  .top {
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 22px;
      color: #333;
      font-weight: 200;
    }
    .nav {
      display: flex;
      align-items: center;
      font-size: 16px;
      li {
        margin-left: 30px;
        cursor: pointer;

        &.active {
          color: #ff6700;
          border-bottom: 2px solid #ff6700;
        }
      }
    }
  }

  .box {
    height: 614px;
    display: flex;
    .img {
      width: 234px;
    }
    .content {
      flex: 1;
    }
  }
}
</style>
