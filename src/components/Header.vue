<template>
  <div class="header">
    <div class="content">
      <ul>
          <el-popconfirm
              v-if="userStore.user.id"
              confirm-button-text="Yes"
              cancel-button-text="No"
              title="Are you sure to sign out?"
              @confirm="logoutConfirm"
              @cancel="logoutCancel"
              width="200px"
          >
            <template #reference>
              <li>{{userStore.user.name}}</li>
            </template>
          </el-popconfirm>

        <template v-else>
          <li @click="login">Sign in</li>
          <li>|</li>
          <li @click="signup">Sign up</li>
        </template>
        <li>My</li>
        <li @click="openOrder">Order</li>
        <li @click="openFavorite">Favorite</li>
        <li @click="openCart" class="cart">
          <el-icon><ShoppingCartFull /></el-icon>
          <span>Cart(0)</span>
        </li>
      </ul>
    </div>
  </div>
  <Register ref="registerRef" />
  <Login ref="loginRef"/>
</template>

<script setup>
import Register from './Register.vue'
import Login from './Login.vue'
import { ShoppingCartFull } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import {useUser} from "../store"
import {setToken} from "../utils/requests";

let userStore = useUser()

let router = useRouter()

let registerRef = ref(null)
let loginRef = ref(null)

let signup = () => {
  registerRef.value.showRegister = true
}

let login = () => {
  loginRef.value.showLogin = true
}

const openOrder = () => {
  router.push('/order')
}

const openFavorite = () => {
  router.push('/favorite')
}

const openCart = () => {
  router.push('/cart')
}

const logoutConfirm = () => {
  localStorage.clear()
  sessionStorage.clear()
  setToken('')
  userStore.reset()
}
const logoutCancel = () => {
  console.log('cancel!')
}
</script>

<style scoped lang="scss">
.header {
  height: 40px;
  background-color: #3d3d3d;
  .content {
    width: 1226px;
    margin: 0 auto;
    color: #b0b0b0;
    display: flex;
    justify-content: flex-end;
    span {
      margin-left: 3px;
    }
    ul {
      display: flex;
      align-items: center;
      height: 40px;
      li {
        cursor: pointer;
        margin: 0 6px;
      }
      li:hover {
        color: #fff;
      }
      li.cart {
        width: 100px;
        height: 40px;
        margin-left: 15px;
        background-color: #424242;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      li.cart:hover {
        color: #ff6700;
        background-color: #fff;
      }
    }
  }
}
</style>
