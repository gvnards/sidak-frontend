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
      <p class="text-primary">
        <span style="font-weight: 500;">Total Usulan:</span> <span style="font-weight: 600;">{{ `${((page.active - 1) * page.maxDataPerPage) + 1}-${((page.active - 1) * page.maxDataPerPage) + dataUsulanVisible.length}` }}</span> dari <span style="font-weight: 600;">{{ dataUsulan.length }}</span>
      </p>
      <div class="form-group search-wrapper" style="margin-top: 8px;">
        <i
          class="fa-solid fa-magnifying-glass search-icon text-primary"
        ></i>
        <input
          type="text"
          v-model="searchValue"
          class="form-control search"
          placeholder="Cari berdasarkan Nama/Usulan"
        />
      </div>
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
      <div @click="onUsulanActive(item, index, $event)" v-for="(item, index) in dataUsulanVisible" :key="index" :title="`${item.usulan} ${item.usulanKriteria}`">
        <UsulanItem :isChecked="item.isChecked" :style="(usulanActive === index) ? 'background-color: #EFF5F5;' : ''" :statusUsulan="item.statusUsulan" :mainText="`${item.usulan} ${item.usulanKriteria}`" :subText="item.nama" :timeText="item.createdAt" :isSetujui="parseInt(item.idUsulanHasil) !== 2" :isDisabled="(userRole === 4) || ((userRole === 2 || userRole === 3) && !(item.usulanKriteria === 'Data Pasangan' || item.usulanKriteria === 'Data Anak')) || parseInt(item.idUsulan) === 2" />
      </div>
      <!-- Ini kurang pagging nya aja, mau dibikin "Sebelumnya - Selanjutnya" atau "Pagging Number" juga terserah -->
      <ul class="pagination-wrapper" style="margin-top: 24px;" v-if="page.total > 1">
        <li class="pagination-item" :class="page.active === 1 ? 'disabled' : ''" @click="page.active=page.active===1?page.active:page.active-1">Sebelumnya</li>
        <div style="width: 12px;"></div>
        <li class="pagination-item" :class="page.active >= page.total ? 'disabled' : ''" @click="page.active=page.active===page.total?page.active:page.active+1">Selanjutnya</li>
      </ul>
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
    },
    searchValue(val) {
      if (this.dataUsulan.length < 1) return
      if (val === "") {
        this.page.total = Math.ceil(this.dataUsulan.length / this.page.maxDataPerPage)
      } else {
        let data = this.dataUsulan.filter((el, idx) => el.nama.toLowerCase().includes(val.toLowerCase()) || el.usulanKriteria.toLowerCase().includes(this.searchValue.toLowerCase()))
        this.page.total = Math.ceil(data.length / this.page.maxDataPerPage)
        this.page.active = 1
      }
    }
  },
  data() {
    return {
      searchValue: "",
      usulanActive: -1,
      subMenuActive: 1,
      subMenu: [],
      dataUsulan: [],
      isLoading: false,
      isCheckedAll: false,
      page: {
        active: 1,
        total: 1,
        maxDataPerPage: 50,
      },
      dataMultipleVerification: [],
      userRole: 0
    }
  },
  computed: {
    dataUsulanVisible() {
      if (this.dataUsulan.length < 1) return []
      if (this.searchValue !== "") {
        let data = this.dataUsulan.filter((el, idx) => el.nama.toLowerCase().includes(this.searchValue.toLowerCase()) || el.usulanKriteria.toLowerCase().includes(this.searchValue.toLowerCase()))
        return data.filter((el, idx) => (idx) < (this.page.maxDataPerPage * this.page.active) && idx >= ((this.page.active - 1) * this.page.maxDataPerPage))
      }
      return this.dataUsulan.filter((el, idx) => (idx) < (this.page.maxDataPerPage * this.page.active) && idx >= ((this.page.active - 1) * this.page.maxDataPerPage))
    },
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
          if (parseInt(el.idUsulan) !== 2) {
            if ((this.userRole === 1) || ((this.userRole === 2 || this.userRole === 3) && (el.usulanKriteria === "Data Pasangan" || el.usulanKriteria === "Data Anak"))) {
              this.dataMultipleVerification.push({
                id: el.id,
                usulanKriteria: el.usulanKriteria
              })
            }
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
        this.dataUsulan = data.message
        this.page.total = Math.ceil(data.message.length / this.page.maxDataPerPage)
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
.search {
  border-radius: 40px;
  padding-left: 50px;
  letter-spacing: 1px;
  &-wrapper {
    position: relative;
    max-width: 100%;
    margin-top: 20px;
    .search-icon {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 50%;
      padding: 6px;
      padding-left: 16px;
      transform: translateY(-50%);
    }
  }
}
</style>