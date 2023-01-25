<template>
  <div id="left-side">
    <h5 class="text-center text-primary">Ubah Password</h5>
    <p class="text-black text-center">Pastikan password baru Anda dapat Anda ingat.</p>
    <br>
    <IllustrationForgetPassword class="illustration" />
    <br>
    <br>
    <div class="btn my-btn-outline-primary btn-block not-show" @click="$emit('goToFormChangePassword')">Menuju ke formulir <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i></div>
  </div>
</template>

<script>
import IllustrationForgetPassword from "../icons/IllustrationForgetPassword.vue"
export default {
  components: {
    IllustrationForgetPassword
  }
}
</script>

<style lang="less" scoped>
#left-side {
  height: 100%;
  max-height: 100vh;
  width: 100%;
  min-width: 200px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
  .illustration {
    max-width: 90%;
    max-height: 60%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  h5 {
    font-weight: 600;
  }
  p {
    font-size: 14px;
  }
}
@media only screen and (min-width: 920px) {
  .not-show {
    display: none;
  }
}
</style>