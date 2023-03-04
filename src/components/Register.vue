<template>
  <el-dialog
      v-model="showRegister"
      title="Sign up"
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
      <el-form-item prop="passwordConfirm">
        <el-input :prefix-icon="View" placeholder="Confirm password" v-model="form.passwordConfirm" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">Sign up</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import {createUser, checkUsername} from "../api/user";
import {User, View} from '@element-plus/icons-vue'
import {ref, reactive} from 'vue'
import {ElMessage} from "element-plus";

let showRegister = ref(false)
let handleClose = (done) => {
  formRef.value.resetFields()
  done()
}

const formRef = ref(null)

const form = reactive({
  username: '',
  password: '',
  passwordConfirm: ''
})

const validateUsername = async (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the username'))
  } else {
    const regex = /^\w{3,18}$/
    if (regex.test(value)) {
      // check username is duplicate
      let userExisted = await checkUsername({username: value})
      if (!userExisted) {
        callback()
      } else {
        callback(new Error('Username existed'))
      }
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

const validatePasswordConfirm = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else if (value !== form.password) {
    callback(new Error('Password does not match!'))
  } else  {
    callback()
  }
}

const rules = reactive({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  passwordConfirm: [{ validator: validatePasswordConfirm, trigger: 'blur' }],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let {success, message, data} = await createUser({...form})
      if (success) {
        ElMessage({
          message,
          type: 'success',
        })
        formEl.resetFields()
      }
    } else {
      return false
    }
  })
}

defineExpose({
  showRegister
})
</script>

<style scoped lang="scss">
.el-button {
  width: 100%;
}
</style>
