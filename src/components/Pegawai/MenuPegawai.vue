<template>
  <div class="menu-pegawai-wrapper text-center">
    <span
      v-for="item in menuPegawaiItem.list"
      :key="item.id"
      @click="menuPegawaiItemClick(item.id)"
    >
      <menu-pegawai-item
        class="menu-pegawai-item"
        :class="
          item.id == menuPegawaiItem.active && menuPegawaiItem.active != ''
            ? 'clicked'
            : ''
        "
        v-if="item.id == menuPegawaiItem.active || menuPegawaiItem.active == ''"
        :dataMenuPegawaiItem="{ active: menuPegawaiItem.active, data: item }"
        @menuPegawaiItemBack="menuPegawaiItemBack()"
      >
      </menu-pegawai-item>
    </span>
  </div>
</template>

<script>
import axios from "axios"
import MenuPegawaiItem from "./MenuPegawaiItem.vue"
const env = import.meta.env
export default {
  components: {
    MenuPegawaiItem,
  },
  data() {
    return {
      menuPegawaiItem: {
        active: "",
        list: []
      },
    }
  },
  methods: {
    getMenuPegawai() {
      axios({
        url: `${env.VITE_BACKEND_URL}/pegawai-menu`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let p = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), p)
        if(data.status === 2) {
          this.menuPegawaiItem.list = data.message
        } else {
          localStorage.clear()
          this.$router.push({
            name: "login"
          })
        }
      }).catch(() => {
      })
    },
    menuPegawaiItemClick(id) {
      this.menuPegawaiItem.active = id
    },
    menuPegawaiItemBack() {
      setTimeout(() => { this.menuPegawaiItem.active = "" }, 100)
    }
  },
  created() {
    this.getMenuPegawai()
  }
}
</script>

<style lang="less" scoped>
.menu-pegawai-wrapper {
  min-height: 400px;
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  height: 100%;
  max-height: calc(100vh - 80px);
  box-sizing: border-box;
  .menu-pegawai-item {
    display: inline-block;
    &.clicked {
      width: 100%;
      max-width: 100%;
      min-height: 100%;
      height: 100%;
      max-height: 100%;
    }
    &.not-clicked {
      display: none;
    }
  }
}
@media screen and (max-width: 1200px) {
  .menu-pegawai-wrapper {
    max-height: 100vh !important;
    padding: 0px;
  }
}
</style>