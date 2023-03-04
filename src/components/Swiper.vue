<template>
  <el-carousel trigger="click" :height="props.height">
    <el-carousel-item v-for="item in props.list" :key="item.id">
      <img :style="{width: props.width}" :src="item.imgPath"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
const props = defineProps(['list', 'width', 'height'])
</script>

<style scoped lang="scss">

</style>
