<template>
  <div id="data-angka-kredit" class="text-left">
    <div class="btn-wrapper">
      <div
        class="btn-angka-kredit text-center active"
      >
        <span>Angka Kredit</span>
      </div>
    </div>
    <div class="data-angka-kredit-content text-center">
      <LoadingAnimation class="loading" v-if="isLoading" />
        <div
          class="data-not-found-wrapper"
          v-if="!isLoading && dataAngkaKredit.length == 0"
        >
          <DataEmpty @addData="beforeAdd()" />
          <p style="margin-top: 12px; margin-bottom: 12px; font-weight: 500;">atau</p>
          <button :disabled="btnDisabled.sync" class="btn my-btn-outline-primary btn-sm" @click="btnSinkronAngkaKreditSiasn()">Sinkron Angka Kredit dari MySAPK</button>
        </div>
        <div v-else-if="!isLoading && dataAngkaKredit.length > 0">
          <div style="padding-left: 20px; padding-right: 20px; padding-top: 16px;">
            <button :disabled="btnDisabled.sync" class="btn my-btn-primary btn-sm"
            data-toggle="modal"
            data-target="#modal"
            data-backdrop="static"
            data-keyboard="false" @click="beforeAdd()">Tambah Angka Kredit</button>
            <span style="margin: 0 10px; font-weight: 600;">atau</span>
            <button :disabled="btnDisabled.sync" class="btn my-btn-outline-primary btn-sm" @click="btnSinkronAngkaKreditSiasn()">Sinkron Angka Kredit dari MySAPK</button>
          </div>
          <div v-for="item in dataAngkaKredit" :key="item.id" style="display: flex;">
            <data-found style="width: 100%;" @click.native="editDataAngkaKredit(item)" :icon="'fa-solid fa-graduation-cap'" :primaryBrief="`${item.jabatan}`" :secondaryBrief="`Total AK: ${item.totalAngkaKredit} | Periode: ${item.periodeMulai} s/d ${item.periodeSelesai}`" />
            <data-found-delete v-if="parseInt(roleUser.idAppRoleUser) === 1" @click.native="deleteData(item)" />
          </div>
        </div>
    </div>
    <button hidden id="modal-sync" data-toggle="modal" data-target="#modal" data-backdrop="static" data-keyboard="false"></button>
  </div>
</template>

<script>
import axios from "axios"
const env = import.meta.env
export default {
  watch: {
    getModalDeleteDataStatus (val) {
      console.log("masuk sini")
      if (val === "delete") {
        let tempDataDelete = {...this.dataDeleteReady}
        this.deleteDataAngkaKredit(tempDataDelete)
      }
      this.dataDeleteReady = null
    },
    getModalBeforeAddUpdateDataStatus (val) {
      if (val === "sync") {
        this.btnSinkronAngkaKreditSiasn()
      } else if (val === "next") {
        this.addDataAngkaKredit()
      }
    }
  },
  data() {
    return {
      isLoading: false,
      dataAngkaKredit: [],
      btnDisabled: {
        sync: false
      }
    }
  },
  computed: {
    getModalDeleteDataStatus() {
      return this.$store.getters.getModalDeleteDataStatus
    },
    roleUser() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      return {
        idAppRoleUser: u.idAppRoleUser,
        appRoleUser: u.appRoleUser
      }
    },
    getModalBeforeAddUpdateDataStatus() {
      return this.$store.getters.getModalBeforeAddUpdateDataStatus
    }
  },
  methods: {
    deleteData(item) {
      this.$store.commit("onModalMethod", "DELETE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DeleteData")
      this.dataDeleteReady = item
    },
    beforeAdd() {
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "BeforeAddData")
    },
    sinkronAngkaKreditSiasn() {
      return axios({
        url: `${env.VITE_BACKEND_URL}/siasn/angka-kredit/riwayat/sync/${this.$store.getters.getIdPegawai}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    async btnSinkronAngkaKreditSiasn() {
      this.isLoading = true
      this.btnDisabled.sync = true
      await this.sinkronAngkaKreditSiasn().then(res => {
        this.btnDisabled.sync = false
        let data = res.data
        $("#modal-sync").click()
        this.$store.commit("onModalMethod", "SYNC")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: parseInt(data.status) === 2 || data.status === true ? "Success" : "Failed",
          message: data.message
        })
        this.isLoading = false
        this.dataAngkaKredit = data.data
      })
    },
    deleteDataAngkaKredit(item) {
      let url = `/angka-kredit/delete/${item.id}`
      return axios({
        method: "DELETE",
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(async res1 => {
        let data1 = res1.data
        this.btnDisabled.sync = true
        await this.sinkronAngkaKreditSiasn().then(res2 => {
          this.btnDisabled.sync = false
          $("#modal-sync").click()
          this.$store.commit("onModalMethod", "DELETE")
          this.$store.commit("onModalFolder", "StatusCallback")
          this.$store.commit("onModalContent", "StatusCallback")
          this.$store.commit("onModalStatusCallback", {
            status: parseInt(data1.status) === 2 || data1.status === true ? "Success" : "Failed",
            message: data1.message
          })
          let data2 = res2.data
          this.isLoading = false
          this.dataAngkaKredit = data2.data
        })
      })
    },
    addDataAngkaKredit() {
      this.$store.commit("onModalMethod", "CREATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataAngkaKredit")
    },
    editDataAngkaKredit(item) {
      this.$store.commit("onModalMethod", "UPDATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataAngkaKredit")
      this.$store.commit("onModalData", item)
    },
    async getDataAngkaKredit() {
      this.isLoading = true
      let url = `/angka-kredit/list/${this.$store.getters.getIdPegawai}`
      return axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    }
  },
  async created() {
    this.getDataAngkaKredit().then(res => {
      let data = res.data
      this.isLoading = false
      if (parseInt(data.status) === 2) {
        this.dataAngkaKredit = data.message.dataAngkaKredit
      } else {
        localStorage.clear()
        this.$router.push({
          name: "login"
        })
      }
    }).catch(() => {
      localStorage.clear()
      this.$router.push({
        name: "login"
      })
    })
  }
}
</script>

<style lang="less" scoped>
.icon-plus {
  font-size: 18px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.btn-circle {
  width: 32px;
  height: 32px;
}
.loading {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#data-angka-kredit {
  height: 100%;
  .btn-wrapper {
    .btn-angka-kredit {
      display: inline-block;
      padding: 6px 16px;
      box-sizing: border-box;
      height: 40px;
      border: 1px solid transparent;
      position: relative;
      z-index: 2;
      top: 1px;
      min-width: 100px;
      font-weight: 600;
      font-size: 14px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      color: #869e9e;
      cursor: pointer;
      transition: all 0.4s;
      &.active {
        color: #477b79;
        border-color: #477b79;
        border-bottom-color: white;
        border-bottom-width: 2px;
        &:hover {
          color: #477b79 !important;
          border-color: #477b79 !important;
          border-bottom-color: white !important;
        }
      }
      &:hover {
        color: #477b79;
        border-color: #477b79;
      }
    }
  }
  .data-angka-kredit-content {
    position: relative;
    border: 1px solid #477b79;
    border-radius: 0px 6px 6px 6px;
    height: 100%;
    max-height: calc(100% - 40px);
    overflow-y: auto;
    scrollbar-width: thin;
    box-sizing: border-box;
    .data-not-found-wrapper {
      box-sizing: border-box;
      padding-top: 40px;
      padding-bottom: 40px;
      .illustration-not-found {
        margin-bottom: 6px;
      }
      p {
        color: #0b0a0f;
        font-weight: 500;
        font-size: 14px;
        margin: 0;
        padding: 0;
      }
    }
    .data-found-wrapper {
      box-sizing: border-box;
      padding: 20px 10px;
      .data-found {
        cursor: pointer;
        border: 1px solid #477b79;
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 0.8);
        font-weight: 700;
        box-sizing: border-box;
        padding: 6px;
        color: #477b79;
        transition: all 0.4s;
        margin: 6px 0px;
        &:hover {
          background-color: rgba(71, 123, 121, 0.8);
          color: white;
        }
      }
    }
  }
}
</style>