<template>
  <div class="change-password-wrapper">
    <LeftSide :isAppRolePegawai="idAppRoleUser === 4" :class="goToForm ? 'not-show-mobile' : ''" @goToFormChangePassword="goToForm = true" />
    <RightSide v-if="idAppRoleUser !== 4" :class="goToForm ? '' : 'not-show-mobile'" />
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
  },
  computed: {
    idAppRoleUser() {
      return parseInt(this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").idAppRoleUser)
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