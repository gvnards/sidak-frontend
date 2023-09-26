<template>
  <div id="usulan-wrapper">
    <div class="usulan-header">
      <i class="fa-solid fa-envelope-open-text usulan-icon"></i>
      <span>Usulan</span>
    </div>
    <div style="position: relative;">
      <div class="sub-menu-wrapper" @wheel="scrollHorizontal($event)">
        <span :class="subMenuActive === item.id ? 'active' : ''" @click="subMenuActive = item.id; isCheckedAll = false; dataMultipleVerification = []" v-for="item in subMenu" :key="item.id">{{ item.nama }}</span>
      </div>
    </div>
    <div class="data-usulan-found">
      <div class="row row-form" style="border-bottom: 0.5px solid lightgray;">
        <div class="col-2">
          <input type="checkbox" class="form-control checked-box" style="width: 16px; height: 16px; transform: translateY(-50%); top: 50%; left: 55%; position: relative;" :checked="isCheckedAll" @click="onCheckedAll()" :disabled="userRole === 4">
        </div>
        <div class="col-10">
          <div class="row row-form">
            <div :class="dataMultipleVerification.length > 0 && userRole !== 4 ? 'col-5' : 'col-12'">
              <h6 class="text-primary" style="margin: 0; padding: 0; font-weight: 600; position: relative; transform: translateY(-50%); top: 50%;">Daftar Usulan</h6>
            </div>
            <div class="col-7" v-if="dataMultipleVerification.length > 0 && userRole !== 4 && subMenuActive !== 3">
              <div class="btn btn-sm my-btn-primary" style="font-size: 12px; top: 50%; transform: translateY(-50%); position: relative;" @click="onMultipleVerification()"
              data-toggle="modal"
              data-target="#modal"
              data-backdrop="static"
              data-keyboard="false">Verifikasi ({{ dataMultipleVerification.length }}) data</div>
            </div>
          </div>
        </div>
      </div>
      <div @click="onUsulanActive(item, index, $event)" v-for="(item, index) in (dataUsulan.length > 0 ? dataUsulan[page.active-1] : [])" :key="index" :title="`${item.usulan} ${item.usulanKriteria}`">
        <UsulanItem :isChecked="item.isChecked" :style="(usulanActive === index) ? 'background-color: #EFF5F5;' : ''" :statusUsulan="item.statusUsulan" :mainText="`${item.usulan} ${item.usulanKriteria}`" :subText="item.nama" :timeText="item.createdAt" :isSetujui="parseInt(item.idUsulanHasil) !== 2" :isDisabled="(userRole === 4) || ((userRole === 2 || userRole === 3) && !(item.usulanKriteria === 'Data Pasangan' || item.usulanKriteria === 'Data Anak'))" />
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
    },
    dataMultipleVerification(val) {
      if (val.length < 1) this.isCheckedAll = false
    }
  },
  data() {
    return {
      usulanActive: -1,
      subMenuActive: 1,
      subMenu: [],
      dataUsulan: [],
      isLoading: false,
      isCheckedAll: false,
      page: {
        active: 1,
        total: 1
      },
      dataMultipleVerification: [],
      userRole: 0
    }
  },
  methods: {
    onMultipleVerification() {
      this.$store.commit("onModalFolder", "Usulan")
      this.$store.commit("onModalContent", "UsulanMultipleVerification")
      this.$store.commit("onModalData", this.dataMultipleVerification)
    },
    onCheckedAll() {
      this.dataMultipleVerification = []
      this.isCheckedAll = !this.isCheckedAll
      this.dataUsulan[this.page.active-1].forEach(el => {
        el.isChecked = this.isCheckedAll
        if (this.isCheckedAll) {
          if ((this.userRole === 1) || ((this.userRole === 2 || this.userRole === 3) && (el.usulanKriteria === "Data Pasangan" || el.usulanKriteria === "Data Anak"))) {
            this.dataMultipleVerification.push({
              id: el.id,
              usulanKriteria: el.usulanKriteria
            })
          }
        }
      })
    },
    onUsulanActive(item, index, ev) {
      if (ev.target.classList.contains("checked-box")) {
        if ((this.userRole === 1) || ((this.userRole === 2 || this.userRole === 3) && (item.usulanKriteria === "Data Pasangan" || item.usulanKriteria === "Data Anak"))) {
          this.dataUsulan[this.page.active-1][index].isChecked = !this.dataUsulan[this.page.active-1][index].isChecked
          if (!this.dataUsulan[this.page.active-1][index].isChecked) {
            this.dataMultipleVerification = this.dataMultipleVerification.filter(el => !(parseInt(el.id) === parseInt(item.id) && parseInt(el.idUsulan) === parseInt(item.idUsulan) && el.usulanKriteria === item.usulanKriteria))
          } else {
            this.dataMultipleVerification.push({
              id: item.id,
              idUsulan: item.idUsulan,
              usulanKriteria: item.usulanKriteria
            })
          }
        }
      } else {
        this.usulanActive = index
        this.$store.commit("onUsulanData", item)
      }
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
        // let dataUsulan = data.message
        let dataUsulan = []
        data.message.forEach(el => {
          el.isChecked = false
          dataUsulan.push(el)
        })
        // for (let i = 0; i < 100; i++) {
        //   data.message.forEach(element => {
        //     element.isChecked = false
        //     dataUsulan.push({...element})
        //   })
        // }
        let tempDataUsulan = []
        for (let i=0; i<dataUsulan.length; i++) {
          tempDataUsulan.push(dataUsulan.splice(0, 50))
        }
        this.dataUsulan = tempDataUsulan
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
    let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
    this.userRole = parseInt(token.idAppRoleUser)
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