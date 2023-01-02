<template>
  <div class="left-side">
    <BlobShape1 class="blob" width="1000" height="1000" fill="#c6e3e3" />
    <IllustrationLogin v-if="mode === 'login'" class="illustration" />
    <IllustrationForgetPassword v-else class="illustration" />
  </div>
</template>

<script>
import BlobShape1 from "../../icons/BlobShape1.vue"
import IllustrationForgetPassword from "../../icons/IllustrationForgetPassword.vue"
import IllustrationLogin from "../../icons/IllustrationLogin.vue"
export default {
  props: {
    mode: {
      default: "login",
      type: String
    }
  },
  components: {
    IllustrationLogin,
    IllustrationForgetPassword,
    BlobShape1
  }
}
</script>

<style lang="less" scoped>
.left-side {
  width: 100%;
  max-width: 50%;
  position: relative;
  .illustration, .blob {
    max-width: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .blob {
    max-width: 70%;
  }
}
@media only screen and (max-width: 800px) {
  .left-side {
    display: none;
  }
}
</style>