<template>
  <div id="usulan-wrapper">
    <div class="usulan-header">
      <i class="fa-solid fa-envelope-open-text usulan-icon"></i>
      <span>Usulan</span>
    </div>
    <div style="position: relative;">
      <div class="sub-menu-wrapper" @wheel="scrollHorizontal($event)">
        <span :class="subMenuActive === item.id ? 'active' : ''" @click="subMenuActive = item.id" v-for="item in subMenu" :key="item.id">{{ item.nama }}</span>
      </div>
      <!-- <div class="btn my-btn-primary btn-circle">
        <i class="fa-solid fa-plus icon-plus"></i>
      </div> -->
    </div>
    <div class="data-usulan-found">
      <div @click="onUsulanActive(item, index)" v-for="(item, index) in dataUsulan" :key="index">
        <UsulanItem :style="(usulanActive === index) ? 'background-color: #EFF5F5;' : ''" :statusUsulan="item.statusUsulan" :mainText="`${item.usulan} ${item.usulanKriteria}`" :subText="item.nama" :timeText="item.createdAt" :isSetujui="item.idUsulanHasil !== 2" />
      </div>
    </div>
  </div>
</template>

<script>
import UsulanItem from "./Content/UsulanItem.vue"
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    UsulanItem
  },
  watch: {
    subMenuActive(val) {
      this.$store.commit("resetUsulanData")
      this.getDataUsulan(val)
      this.usulanActive = -1
    }
  },
  data() {
    return {
      usulanActive: -1,
      subMenuActive: 1,
      subMenu: [],
      dataUsulan: [],
      isLoading: false
    }
  },
  methods: {
    onUsulanActive(item, index) {
      this.usulanActive = index
      this.$store.commit("onUsulanData", item)
    },
    getDataUsulan(subMenuActive) {
      this.isLoading = true
      this.dataUsulan = []
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      let idPegawai = this.$store.getters.getIdPegawai
      let url = token.idAppRoleUser !== 4 ? `/usulan/${subMenuActive}` : `/usulan/${subMenuActive}/${idPegawai}`
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        method: "GET"
      }).then(res => {
        this.isLoading = false
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        let dataUsulan = data.message
        if (dataUsulan.length > 500) {
          let tempDataUsulan = []
          for (let i=0; i<dataUsulan.length; i++) {
            tempDataUsulan.push(dataUsulan.splice(0, 500))
          }
          for (let i=0; i<tempDataUsulan.length; i++) {
            setTimeout(() => {
              for (let j=0; j<tempDataUsulan[i].length; j++) {
                this.dataUsulan.push(tempDataUsulan[i][j])
              }
            }, 1)
          }
        } else {
          this.dataUsulan = dataUsulan
        }
      })
    },
    getSubMenu() {
      // axios({
      //   url: `${env.VITE_BACKEND_URL}/getSubMenuUsulan`,
      //   method: "GET"
      // }).then(res => {
      //   this.subMenu = res.data
      // })
      setTimeout(() => {
        this.subMenu = [
          {
            id: 1,
            nama: "Belum Diproses",
          },
          {
            id: 2,
            nama: "Sedang Diproses",
          },
          {
            id: 3,
            nama: "Sudah Diproses",
          },
        ]
      }, 1000)
    },
    scrollHorizontal(event) {
      event.target.scrollLeft += event.deltaY
    }
  },
  created() {
    this.getSubMenu()
    this.getDataUsulan(this.subMenuActive)
  }
}
</script>

<style lang="less" scoped>
.data-usulan-found {
  height: 100%;
  max-height: calc(100vh - 240px);
  overflow: hidden;
  overflow-y: auto;
}
#usulan-wrapper {
  height: 100%;
  width: 100%;
  min-width: 200px;
  box-sizing: border-box;
  overflow: hidden;
  .usulan-header {
    padding: 20px;
    color: #477B79;
    border-bottom: 1px solid #869E9E;
    padding-bottom: 10px;
    .usulan-icon {
      width: 40px;
      height: 40px;
    }
    span {
      font-weight: 600;
      margin-left: 10px;
      font-size: 32px;
    }
  }
  .sub-menu-wrapper {
    display: block;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0px;
    overflow: hidden;
    overflow-x: auto;
    scrollbar-width: thin;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      // width: 0px;
    }
    span {
      -webkit-user-select: none; /* Safari */
      -ms-user-select: none; /* IE 10 and IE 11 */
      user-select: none; /* Standard syntax */
      cursor: pointer;
      white-space: nowrap;
      margin: 0px 4px;
      font-weight: 600;
      color: #869E9E;
      padding: 0px 6px;
      transition: all 0.4s;
      &.active {
        font-weight: 700;
        color: #477B79;
      }
    }
  }
  .btn-circle {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    .icon-plus {
      font-size: 14px;
      position: relative;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>