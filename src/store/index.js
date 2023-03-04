import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => {
    return {
      user: {
        id: '',
        username: '',
        name: '',
      }
    }
  },
  actions: {
    setUser(val) {
      this.user = val
    },
    reset() {
      this.user = {
        user: {
          id: '',
          username: '',
          name: '',
        }
      }
    }
  }
})
