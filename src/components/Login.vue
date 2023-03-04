<template>
  <el-dialog
      v-model="showLogin"
      title="Sign in"
      width="30%"
      :before-close="handleClose"
      center
      :close-on-click-modal="false"
  >
    <el-form
        ref="formRef"
        :model="form"
        status-icon
        :rules="rules"
    >
      <el-form-item prop="username">
        <el-input :prefix-icon="User" placeholder="Enter username" v-model.number="form.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input :prefix-icon="View" placeholder="Enter password" v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">Sign in</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import {login} from "../api/user";
import {User, View} from '@element-plus/icons-vue'
import {ref, reactive} from 'vue'
import {ElNotification} from "element-plus"
import {useUser} from "../store"

let userStore = useUser()

let showLogin = ref(false)
let handleClose = (done) => {
  formRef.value.resetFields()
  done()
}

const formRef = ref(null)

const form = reactive({
  username: '',
  password: '',
})

const validateUsername = async (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the username'))
  } else {
    const regex = /^\w{3,18}$/
    if (regex.test(value)) {
      callback()
    } else {
      callback(new Error('Username must be 6-18 characters long and only contain letters, digits, and underscores'))
    }
  }
}

const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    /*
    At least 8 characters long
    Contains at least one digit (\d)
    Contains at least one lowercase letter ([a-z])
    Contains at least one uppercase letter ([A-Z])
    Contains at least one special character ([^a-zA-Z\d])
     */
    // const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{8,}$/
    const regex = /^\w{3,18}$/
    if (regex.test(value)) {
      callback()
    } else {
      callback(new Error('Password must be at least 8 characters long and includes a digit, a lowercase letter, an uppercase letter, and a special character'))
    }
  }
}

const rules = reactive({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let {success, message, token, data} = await login({...form})
      if (success) {
        ElNotification({
          title: 'Success',
          message,
          type: 'success',
        })
        userStore.setUser(data)
        sessionStorage.setItem('user', JSON.stringify(data))
        formEl.resetFields()
        showLogin.value = false
      } else {
        ElNotification({
          title: 'Error',
          message,
          type: 'error',
        })
      }
    } else {
      return false
    }
  })
}

defineExpose({
  showLogin
})
</script>

<style scoped lang="scss">
.el-button {
  width: 100%;
}
</style>
