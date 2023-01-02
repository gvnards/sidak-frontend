<template>
  <div class="pegawai-wrapper">
    <div style="width: 100%; overflow: hidden; overflow-y: auto;" v-show="(this.isAdmin) && (!this.isPegawaiClicked)" v-if="this.isAdmin">
      <ListPegawai @selectPegawai="selectPegawai($event)" />
    </div>
    <div @click="isPegawaiClicked = false" style="height: fit-content; cursor: pointer; ">
      <div v-if="(this.isAdmin && this.isPegawaiClicked)" style="margin-right: 10px; height: fit-content;"><i class="fa-solid fa-chevron-left text-primary" style="font-size: 24px;"></i></div>
    </div>
    <short-brief-pegawai v-if="(!this.isAdmin) || (this.isAdmin && this.isPegawaiClicked)" id="short-brief-pegawai"></short-brief-pegawai>
    <menu-pegawai id="menu-pegawai" v-if="(!this.isAdmin) || (this.isAdmin && this.isPegawaiClicked)"></menu-pegawai>
  </div>
</template>

<style lang="less" scoped>
.pegawai-wrapper {
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  max-height: 100vh;
  overflow-y: auto;
}
@media screen and (max-width: 1200px) {
  .pegawai-wrapper {
    display: block;
    #menu-pegawai {
      margin-top: 20px;
    }
  }
}
</style>

<script>
import ListPegawai from "../components/Pegawai/ListPegawai.vue"
import ShortBriefPegawai from "../components/Pegawai/ShortBriefPegawai.vue"
import MenuPegawai from "../components/Pegawai/MenuPegawai.vue"
export default {
  components: {
    ShortBriefPegawai,
    MenuPegawai,
    ListPegawai
  },
  data() {
    return {
      isPegawaiClicked: false
    }
  },
  mounted() {
    this.heightShortBriefPegawai = this.calcHeightShortBriefPegawai
  },
  computed: {
    isAdmin() {
      let idAppRoleUser = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").idAppRoleUser
      return idAppRoleUser !== 4
    }
  },
  methods: {
    selectPegawai(val) {
      this.$store.commit("onIdPegawai", val)
      this.isPegawaiClicked = true
    },
    setIdPegawai() {
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      if (token.idAppRoleUser === 4) {
        this.$store.commit("onIdPegawai", token.id)
      }
    }
  },
  created() {
    this.setIdPegawai()
  },
  destroyed() {
    this.$destroy()
  }
}
</script>
