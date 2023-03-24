<template>
  <div class="item" :item="props.item" @click="gotoDetail(props.item.id)" >
    <img :src="props.item.thumbnail" />
    <div class="title">{{props.item.title}}</div>
    <div class="description">{{props.item.description}}</div>
    <div>
      <span class="selling_price">${{(props.item.price * 0.9).toFixed(2)}}</span>
      <span class="price">${{props.item.price}}</span>
    </div>
    <el-popconfirm title="are you sure?" confirm-button-text="OK" cancel-button-text="Cancel" @confirm="confirmDel(props.item.id)"
                   v-if="props.close">
      <template #reference>
        <div class="close">
          <el-icon><Close /></el-icon>
        </div>
      </template>
    </el-popconfirm>
  </div>
</template>

<script setup>
import {Close} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const props = defineProps({
  item: {
    type: Object
  },
  close: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['delete'])

const gotoDetail = (id) => {
  router.push('/detail?id=' + id)
}
const confirmDel = (id) => {
  emit('delete', id)
}
</script>

<style scoped lang="scss">
.item {
  cursor: pointer;
  width: 234px;
  height: 300px;
  background: white;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all .2s linear;
  float: left;
  margin: 0 0 14px 14px;
  position: relative;
  &:hover {
    transform: translate3d(0, -2px, 0);
    box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
  }
  img {
    width: 160px;
    height: 160px;
  }

  .title {
    font-size: 14px;
    color: #333;
  }

  .description {
    font-size: 12px;
    color: #b0b0b0;
    margin: 10px 0;
  }

  .selling_price {
    font-size: 14px;
    color: #ff6700;
  }

  .price {
    font-size: 14px;
    color: #b0b0b0;
    text-decoration: line-through;
    margin-left: 6px;
  }

  .close {
    position: absolute;
    z-index: -1;
    right: 10px;
    top: 10px;
    &:hover {
      color: #ff6700;
    }
  }
}
</style>
