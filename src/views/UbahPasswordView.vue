<template>
  <div class="change-password-wrapper">
    <LeftSide :class="goToForm ? 'not-show-mobile' : ''" @goToFormChangePassword="goToForm = true" />
    <RightSide :class="goToForm ? '' : 'not-show-mobile'" />
  </div>
</template>

<script>
import LeftSide from "../components/UbahPassword/LeftSide.vue"
import RightSide from "../components/UbahPassword/RightSide.vue"
export default {
  components: {
    LeftSide,
    RightSide
  },
  data() {
    return {
      goToForm: false
    }
  }
}
</script>

<style lang="less" scoped>
.change-password-wrapper {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 40px 20px;
}
@media only screen and (max-width: 920px) {
  .not-show-mobile {
    display: none;
  }
}
</style>