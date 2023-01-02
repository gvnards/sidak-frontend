<template>
  <div id="login-wrapper">
    <LeftSide :mode="mode" />
    <RightSide :mode="mode" @changeMode="changeMode" />
  </div>
</template>

<script>
import LeftSide from "./Content/LeftSide.vue"
import RightSide from "./Content/RightSide.vue"
export default {
  components: {
    LeftSide,
    RightSide
  },
  data() {
    return {
      mode: "login"
    }
  },
  methods: {
    changeMode() {
      this.mode === "login" ? this.mode = "forgetPassword" : this.mode = "login"
    }
  }
}
</script>

<style lang="less" scoped>
#login-wrapper {
  display: flex;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background-color: rgba(239, 245, 245, 0.5);
}
</style>