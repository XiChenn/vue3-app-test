<template>
  <div class="footer">
    <div class="top">
      <a class="icon1" href="javascript:;">Docs</a>
      <a class="icon2" href="javascript:;">API</a>
      <a class="icon3" href="javascript:;">Terms of Use</a>
      <a class="icon4" href="javascript:;">Cookies Policy</a>
    </div>
    <div class="bottom">
      <p>This site is based on PyBossa, which is licensed under the GNU Affero General Public License. The source code of this site's version of PyBossa is available in our GitHub repositories.</p>
    </div>
  </div>
</template>

<script setup>
import { ShoppingCartFull } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.footer {
  height: 334px;
  background-color: #2f2f2f;
  .top {
    width: 1226px;
    height: 145px;
    margin: 0 auto;
    border-bottom: 1px solid #3d3d3d;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: white;
      font-size: 20px;
      width: 250px;
      height: 40px;
      &.icon1 {

      }
      &.icon2 {

      }
      &.icon3 {

      }
      &.icon4 {

      }
    }
  }
  .bottom {
    width: 1226px;
    height: 100px;
    margin: 0 auto;
    p {
      color: white;
    }
  }
}
</style>
