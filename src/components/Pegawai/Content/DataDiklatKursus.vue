<template>
  <div id="data-diklat-kursus" class="text-left">
    <div class="btn-wrapper">
      <div
        class="btn-diklat-kursus text-center active"
      >
        <span>Diklat/Kursus</span>
      </div>
    </div>
    <div class="data-diklat-kursus-content text-center">
      <LoadingAnimation class="loading" v-if="isLoading" />
        <div
          class="data-not-found-wrapper"
          v-if="!isLoading && dataDiklatKursus.length == 0"
        >
          <DataEmpty @addData="() => {}" :addData="false" />
          <a class="btn my-btn-primary btn-sm" href="https://sibangsitur.situbondokab.go.id/" target="_blank">Tambah data melalui aplikasi SIBANGSITUR</a>
          <p style="margin-top: 12px; margin-bottom: 12px; font-weight: 500;">atau</p>
          <button :disabled="btnDisabled.sync" class="btn my-btn-outline-primary btn-sm" @click="btnSinkronDiklatSiasn()">Sinkron Diklat/Kursus dari MySAPK</button>
        </div>
        <div v-else-if="!isLoading && dataDiklatKursus.length > 0">
          <div style="padding-left: 20px; padding-right: 20px; padding-top: 16px;">
            <!-- <button :disabled="btnDisabled.sync" class="btn my-btn-primary btn-sm"
            data-toggle="modal"
            data-target="#modal"
            data-backdrop="static"
            data-keyboard="false" @click="beforeAdd()">Tambah Diklat/Kursus</button> -->
            <a class="btn my-btn-primary btn-sm" href="https://sibangsitur.situbondokab.go.id/" target="_blank">Tambah data melalui aplikasi SIBANGSITUR</a>
            <span style="margin: 0 10px; font-weight: 600;">atau</span>
            <button :disabled="btnDisabled.sync" class="btn my-btn-outline-primary btn-sm" @click="btnSinkronDiklatSiasn()">Sinkron Diklat/Kursus dari MySAPK</button>
          </div>
          <data-found v-for="item in dataDiklatKursus" :key="item.id" @click.native="editDataDiklatKursus(item)" :icon="'fa-solid fa-book'" :primaryBrief="item.jenisDiklat" :secondaryBrief="item.daftarDiklat === 'DIKLAT/KURSUS TIDAK ADA DALAM DAFTAR' ? item.namaDiklat : item.daftarDiklat" />
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
    getModalBeforeAddUpdateDataStatus (val) {
      if (val === "sync") {
        this.btnSinkronDiklatSiasn()
      } else if (val === "next") {
        this.addDataDiklatKursus()
      }
    }
  },
  data() {
    return {
      isLoading: false,
      dataDiklatKursus: [],
      btnDisabled: {
        sync: false
      }
    }
  },
  computed: {
    getModalBeforeAddUpdateDataStatus() {
      return this.$store.getters.getModalBeforeAddUpdateDataStatus
    }
  },
  methods: {
    beforeAdd() {
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "BeforeAddData")
    },
    sinkronDiklatSiasn() {
      return axios({
        url: `${env.VITE_BACKEND_URL}/siasn/diklat/riwayat/sync/${this.$store.getters.getIdPegawai}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    async btnSinkronDiklatSiasn() {
      this.isLoading = true
      this.btnDisabled.sync = true
      await this.sinkronDiklatSiasn().then(res => {
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
        this.dataDiklatKursus = data.data
      })
    },
    addDataDiklatKursus() {
      this.$store.commit("onModalMethod", "CREATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataDiklatKursus")
    },
    editDataDiklatKursus(item) {
      this.$store.commit("onModalMethod", "UPDATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataDiklatKursus")
      this.$store.commit("onModalData", item)
    },
    getDataDiklatKursus() {
      this.isLoading = true
      let url = `/data-diklat/${this.$store.getters.getIdPegawai}`
      return axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    }
  },
  async created() {
    this.getDataDiklatKursus().then(res => {
      let data = res.data
      this.isLoading = false
      if (parseInt(data.status) === 2) {
        this.dataDiklatKursus = data.message
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
a {
  color: #ffffff;
}
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
#data-diklat-kursus {
  height: 100%;
  .btn-wrapper {
    .btn-diklat-kursus {
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
  .data-diklat-kursus-content {
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