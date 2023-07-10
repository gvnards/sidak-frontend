<template>
  <div id="data-status-kepegawaian">
    <LoadingAnimation class="loading" v-if="isLoading" />
    <div v-else>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group my-form-group">
            <label>Atasan</label>
            <div :title="atasanSelectedText" class="my-custom-input-wrapper my-custom-input" @click="isShowDaftarAtasan = !isShowDaftarAtasan">{{ atasanSelectedText }}</div>
            <div class="my-custom-input-item-wrapper-outside" v-show="isShowDaftarAtasan">
              <input type="text" class="form-control" placeholder="Cari NIP Atasan" v-model="searchAtasanValue">
              <div class="my-custom-input-item-wrapper-inside">
                <div @click="onAtasanSelected(item)" class="my-custom-input-item" v-for="item in daftarAtasan" :key="item.id" v-show="searchAtasanValue === '' ? true : item.nip.includes(searchAtasanValue)">
                  {{ item.nip }} | {{ item.nama }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldStatusKepegawaian">Status Kepegawaian</label>
            <select :disabled="!isAdmin" class="custom-select" id="fieldStatusKepegawaian" v-model="dataStatusKepegawaian.idDaftarStatusKepegawaian">
              <option value="0" selected disabled>Pilih Status Kepegawaian</option>
              <option :selected="item.id === dataStatusKepegawaian.idDaftarStatusKepegawaian" v-for="item in daftarStatusKepegawaian" :key="item.id" :value="item.id">
                {{ item.nama }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldTmtStatusKepegawaian">TMT</label>
            <input :disabled="!isAdmin" type="date" id="fieldTmtStatusKepegawaian" class="form-control" v-model="dataStatusKepegawaian.tmt">
          </div>
        </div>
      </div>
    </div>

    <div style="z-index: 2; position: absolute; width: calc(100% - 30px); bottom: 0;">
      <div
        class="btn my-btn-primary btn-block text-center"
        @click="updateData()"
      >
        <span>Simpan Data Status Kepegawaian</span>
      </div>
    </div>
    <button
      type="button"
      hidden
      id="showModal"
      data-toggle="modal"
      data-target="#modal"
      data-backdrop="static"
      data-keyboard="false"
    ></button>
  </div>
</template>

<script>
import mixins from "@/mixins/index.js"
import axios from "axios"
const env = import.meta.env
export default {
  mixins: [mixins],
  computed: {
    isAdmin() {
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      return token.idAppRoleUser === 1 || token.idAppRoleUser === 2
    }
  },
  data() {
    return {
      idAtasan: 0,
      dataStatusKepegawaian: {
        idPegawai: this.$store.getters.getIdPegawai,
        idDaftarStatusKepegawaian: 0,
        tmt: ""
      },
      dataAtasan: {
        idPegawai: this.$store.getters.getIdPegawai,
        idAtasan: 0
      },
      isLoading: false,
      atasanSelectedText: "-- Pilih Atasan --",
      isShowDaftarAtasan: false,
      searchAtasanValue: "",
      daftarAtasan: [],
      daftarStatusKepegawaian: [],
    }
  },
  methods: {
    onAtasanSelected(item) {
      this.atasanSelectedText = `${item.nip} | ${item.nama}`
      this.dataAtasan.idAtasan = item.id
      this.isShowDaftarAtasan = false
    },
    getDaftarAtasan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/daftar-atasan`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarAtasan = data.message
        if (this.dataAtasan != 0) {
          let atasan = data.message.find(el => el.id == this.dataAtasan.idAtasan)
          this.atasanSelectedText = `${atasan.nip} | ${atasan.nama}`
        }
      })
    },
    getDaftarStatusKepegawaian() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/daftar-status-kepegawaian`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarStatusKepegawaian = data.message
      })
    },
    getDataStatusKepegawaian() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/data-status-kepegawaian/${this.$store.getters.getIdPegawai}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        if(data.message.length > 0) {
          this.dataStatusKepegawaian = data.message[0]
        }
      })
    },
    getDataAtasan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/data-atasan/${this.$store.getters.getIdPegawai}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        if(data.message.length > 0) {
          this.dataAtasan = data.message[0]
        }
      })
    },
    updateDataStatusKepegawaian() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/data-status-kepegawaian`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataStatusKepegawaian), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.$store.commit("onModalMethod", "UPDATE")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: data.status === 2 || data.status === true ? "Success" : "Failed",
          message: `Atasan berhasil disetting & ${data.message}`
        })
        $("#showModal").trigger("click")
      })
    },
    updateDataAtasan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/data-atasan`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataAtasan), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        if(!this.isAdmin) {
          this.$store.commit("onModalMethod", "UPDATE")
          this.$store.commit("onModalFolder", "StatusCallback")
          this.$store.commit("onModalContent", "StatusCallback")
          this.$store.commit("onModalStatusCallback", {
            status: data.status === 2 || data.status === true ? "Success" : "Failed",
            message: data.message
          })
          $("#showModal").trigger("click")
        }
      })
    },
    updateData() {
      this.updateDataAtasan()
      if(this.isAdmin) {
        this.updateDataStatusKepegawaian()
      }
    }
  },
  created() {
    this.getDataStatusKepegawaian()
    this.getDataAtasan()
    this.getDaftarAtasan()
    this.getDaftarStatusKepegawaian()
  },
  destroyed() {
    this.$destroy()
  }
}
</script>

<style lang="less" scoped>
.loading {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#data-status-kepegawaian {
  box-sizing: border-box;
  padding: 0px 10px;
  position: relative;
  height: 100%;
  max-height: 100%;
  box-sizing: border-box;
  padding: 0px 15px;
  text-align: left;
}
.my-btn-primary {
  position: sticky;
  bottom: 0;
  height: 40px;
  font-size: 14px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.my-form-group {
  position: relative;
}
.my-custom-input-wrapper {
  font-weight: 600;
  font-size: 14px;
  color: #477b79;
  border: 1px solid #477b79;
  background-color: rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  overflow: hidden;
  cursor: default;
  box-sizing: border-box;
  text-overflow: ellipsis;
  &.my-custom-input {
    display: inline-block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    line-height: 1.5;
    vertical-align: middle;
    background: #fff url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right 0.75rem center;
    background-size: 8px 10px;
    border-radius: 0.25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
}
.my-custom-input-item-wrapper-outside {
  border-top: 1px solid #477b79;
  border-left: 1px solid #477b79;
  border-bottom: 1px solid #477b79;
  position: absolute;
  width: 100%;
  background-color: #fff;
  z-index: 2;
  width: 100%;
  .my-custom-input-item-wrapper-inside {
    max-height: 200px;
    overflow: auto;
  }
  .my-custom-input-item {
    white-space: nowrap;
    max-width: 100%;
    display: block;
    min-height: 1.2em;
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    font-weight: 600;
    font-size: 14px;
    color: #477b79;
    cursor: pointer;
    &:hover {
      background-color: #007bff;
      color: #fff;
    }
  }
}
</style>