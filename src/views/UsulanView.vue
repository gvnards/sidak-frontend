<template>
  <div class="usulan-wrapper">
    <UsulanWrapperList v-show="(!getIsUsulanMobile) || (getIsUsulanMobile && !isUsulanOpen)" />
    <UsulanOpenList v-show="(!getIsUsulanMobile) || (getIsUsulanMobile && isUsulanOpen)" />
  </div>
</template>

<script>
import UsulanWrapperList from "./../components/Usulan/UsulanWrapperList.vue"
import UsulanOpenList from "../components/Usulan/UsulanOpenList.vue"
export default {
  components: {
    UsulanWrapperList,
    UsulanOpenList
  },
  watch: {
    "getWindowWidth"(val) {
      this.$store.commit("onIsUsulanMobile", val <= 920)
    },
    "getUsulanData"(val) {
      this.isUsulanOpen = val.id !== undefined
    }
  },
  data() {
    return {
      isUsulanOpen: false
    }
  },
  created() {
    this.$store.commit("resetUsulanData")
    this.setIdPegawai()
    this.$store.commit("onIsUsulanMobile", this.getWindowWidth <= 920)
  },
  computed: {
    getIsUsulanMobile() {
      return this.$store.getters.getIsUsulanMobile
    },
    getUsulanData() {
      return this.$store.getters.getUsulanData
    },
    getWindowWidth() {
      return this.$store.getters.getWindowWidth
    }
  },
  methods: {
    setIdPegawai() {
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      if (token.idAppRoleUser === 4) {
        this.$store.commit("onIdPegawai", token.id)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.usulan-wrapper {
  min-height: 400px;
  width: 100%;
  display: flex;
  max-height: 100vh !important;
  box-sizing: border-box;
  padding: 40px 20px;
}
</style>