<template>
  <div id="data-pendidikan" class="text-left">
    <div class="btn-wrapper">
      <div
        class="btn-pendidikan text-center active"
      >
        <span>Pendidikan</span>
      </div>
    </div>
    <div class="data-pendidikan-content text-center">
      <LoadingAnimation class="loading" v-if="isLoading" />
        <div
          class="data-not-found-wrapper"
          v-if="!isLoading && dataPendidikan.length == 0"
        >
          <DataEmpty @addData="() => {}" :addData="false" />
          <!-- <p style="margin-top: 12px; margin-bottom: 12px; font-weight: 500;">atau</p> -->
          <p style="margin-top: 12px; margin-bottom: 12px; font-weight: 500;"></p>
          <button :disabled="btnDisabled.sync" class="btn my-btn-outline-primary btn-sm" @click="btnSinkronPendidikanSiasn()">Sinkron Pendidikan dari MySAPK</button>
        </div>
        <div v-else-if="!isLoading && dataPendidikan.length > 0">
          <div style="padding-left: 20px; padding-right: 20px; padding-top: 16px;">
            <!-- <button :disabled="btnDisabled.sync" class="btn my-btn-primary btn-sm"
            data-toggle="modal"
            data-target="#modal"
            data-backdrop="static"
            data-keyboard="false" @click="addDataPendidikan()">Tambah Pendidikan</button>
            <span style="margin: 0 10px; font-weight: 600;">atau</span> -->
            <span style="margin: 0 10px; font-weight: 600;"></span>
            <button :disabled="btnDisabled.sync" class="btn my-btn-outline-primary btn-sm" @click="btnSinkronPendidikanSiasn()">Sinkron Pendidikan dari MySAPK</button>
          </div>
          <data-found v-for="item in dataPendidikan" :key="item.id" @click.native="editDataPendidikan(item)" :icon="'fa-solid fa-graduation-cap'" :primaryBrief="item.tingkatPendidikan" :secondaryBrief="item.namaSekolah" />
        </div>
    </div>
    <button hidden id="modal-sync" data-toggle="modal" data-target="#modal" data-backdrop="static" data-keyboard="false"></button>
  </div>
</template>

<script>
import axios from "axios"
const env = import.meta.env
export default {
  data() {
    return {
      isLoading: false,
      dataPendidikan: [],
      btnDisabled: {
        sync: false
      }
    }
  },
  methods: {
    sinkronPendidikanSiasn() {
      return axios({
        url: `${env.VITE_BACKEND_URL}/siasn/pendidikan/riwayat/sync/${this.$store.getters.getIdPegawai}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    async btnSinkronPendidikanSiasn() {
      this.isLoading = true
      this.btnDisabled.sync = true
      await this.sinkronPendidikanSiasn().then(res => {
        this.btnDisabled.sync = false
        let data = res.data
        $("#modal-sync").click()
        this.$store.commit("onModalMethod", "SYNC")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: parseInt(data.status) || data.status === true ? "Success" : "Failed",
          message: data.message
        })
        this.isLoading = false
        this.dataPendidikan = data.data
      })
    },
    addDataPendidikan() {
      this.$store.commit("onModalMethod", "CREATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataPendidikan")
    },
    editDataPendidikan(item) {
      this.$store.commit("onModalMethod", "UPDATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataPendidikan")
      this.$store.commit("onModalData", item)
    },
    async getDataPendidikan() {
      this.isLoading = true
      let url = `/data-pendidikan/${this.$store.getters.getIdPegawai}`
      return axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    }
  },
  async created() {
    this.getDataPendidikan().then(res => {
      let data = res.data
      this.isLoading = false
      if (parseInt(data.status) === 2) {
        this.dataPendidikan = data.message
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
#data-pendidikan {
  height: 100%;
  .btn-wrapper {
    .btn-pendidikan {
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
  .data-pendidikan-content {
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