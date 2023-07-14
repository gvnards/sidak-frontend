<template>
  <div id="left-side">
    <h5 class="text-center text-primary">Ubah Password</h5>
    <p class="text-black text-center">Pastikan password baru Anda dapat Anda ingat.</p>
    <br>
    <IllustrationForgetPassword class="illustration" />
    <br>
    <br>
    <div v-if="!isAppRolePegawai" class="btn my-btn-outline-primary btn-block not-show" @click="$emit('goToFormChangePassword')">Menuju ke formulir <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i></div>
    <div v-else style="width: 100%; position: relative;">
      <h6 class="text-center text-black" style="font-weight: 400;">Silahkan menggunakan aplikasi MySAPK untuk merubah password Anda.</h6>
      <h6 class="text-center text-black">
        <a href="https://mysapk.bkn.go.id/reset-password" target="_blank">Klik disini untuk menuju ke Aplikasi MySAPK</a>
      </h6>
    </div>
  </div>
</template>

<script>
import IllustrationForgetPassword from "../icons/IllustrationForgetPassword.vue"
export default {
  props: {
    isAppRolePegawai: {
      required: true,
      type: Boolean,
      default: false
    }
  },
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