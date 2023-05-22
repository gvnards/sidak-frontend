<template>
  <div id="data-keluarga" class="text-left">
    <div class="btn-wrapper">
      <div
        class="btn-pasangan text-center"
        :class="btnActive === 'Pasangan' ? 'active' : ''"
        @click="onBtnActive('Pasangan')"
      >
        <span>Pasangan</span>
      </div>
      <div
        class="btn-anak text-center"
        :class="btnActive === 'Anak' ? 'active' : ''"
        @click="onBtnActive('Anak')"
      >
        <span>Anak</span>
      </div>
    </div>
    <div class="data-keluarga-content text-center">
      <LoadingAnimation class="loading" v-if="isLoading" />
      <!-- DATA PASANGAN -->
      <div class="data-pasangan" v-if="btnActive == 'Pasangan' && !isLoading">
        <div
          class="data-not-found-wrapper"
          v-if="!isLoading && dataKeluarga.dataPasangan.length == 0"
        >
          <DataEmpty @addData="addDataPasangan" />
        </div>
        <div v-else-if="!isLoading && dataKeluarga.dataPasangan.length > 0">
          <div v-for="item in dataKeluarga.dataPasangan" :key="item.id" data-toggle="modal" data-target="#modal" data-backdrop="static" data-keyboard="false" @click="editDataPasangan(item)">
            <data-found :icon="'fa-solid fa-person'" :primaryBrief="item.nama" :secondaryBrief="item.statusPerkawinan"></data-found>
          </div>
          <div
            class="btn my-btn-primary btn-circle"
            data-toggle="modal"
            data-target="#modal"
            data-backdrop="static"
            data-keyboard="false"
            @click="addDataPasangan()"
          >
            <i class="fa-solid fa-plus icon-plus"></i>
          </div>
        </div>
      </div>
      <!-- END DATA PASANGAN -->
      <!-- DATA ANAK -->
      <div class="data-anak" v-else-if="btnActive == 'Anak' && !isLoading">
        <div
          class="data-not-found-wrapper"
          v-if="!isLoading && dataKeluarga.dataAnak.length == 0"
        >
          <DataEmpty @addData="addDataAnak" />
        </div>
        <div
          class="data-found-wrapper"
          v-else-if="!isLoading && dataKeluarga.dataAnak.length > 0"
        >
          <div v-for="item in dataKeluarga.dataAnak" :key="item.id" data-toggle="modal" data-target="#modal" data-backdrop="static" data-keyboard="false" @click="editDataAnak(item)">
            <data-found :icon="'fa-solid fa-person'" :primaryBrief="item.nama" :secondaryBrief="item.statusAnak"></data-found>
          </div>
          <div
            class="btn my-btn-primary btn-circle"
            data-toggle="modal"
            data-target="#modal"
            data-backdrop="static"
            data-keyboard="false"
            @click="addDataAnak()"
          >
            <i class="fa-solid fa-plus icon-plus"></i>
          </div>
        </div>
      </div>
      <!-- END DATA ANAK -->
    </div>
  </div>
</template>

<script>
import axios from "axios"
const env = import.meta.env
export default {
  data() {
    return {
      btnActive: "Pasangan",
      dataKeluarga: {
        dataPasangan: [],
        dataAnak: []
      },
      isLoading: false
    }
  },
  methods: {
    onBtnActive(btnActive) {
      this.btnActive = btnActive
      if (btnActive == "Pasangan") {
        this.dataKeluarga.dataPasangan = []
        this.getDataKeluargaPasangan()
      } else {
        this.dataKeluarga.dataAnak = []
        this.getDataKeluargaAnak()
      }
    },
    addDataPasangan() {
      this.$store.commit("onModalMethod", "CREATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataKeluargaPasangan")
    },
    addDataAnak() {
      this.$store.commit("onModalMethod", "CREATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataKeluargaAnak")
    },
    editDataPasangan(item) {
      this.$store.commit("onModalMethod", "UPDATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataKeluargaPasangan")
      this.$store.commit("onModalData", item)
    },
    editDataAnak(item) {
      this.$store.commit("onModalMethod", "UPDATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataKeluargaAnak")
      this.$store.commit("onModalData", item)
    },
    getDataKeluargaPasangan() {
      this.isLoading = true
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let url = `/data-pasangan/${this.$store.getters.getIdPegawai}`
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.isLoading = false
        if (data.status === 1) {
          this.dataKeluarga.dataPasangan = data.message
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
    },
    getDataKeluargaAnak() {
      this.isLoading = true
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let url = `/data-anak/${this.$store.getters.getIdPegawai}`
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.isLoading = false
        if (data.status === 1) {
          this.dataKeluarga.dataAnak = data.message
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
  },
  created() {
    this.getDataKeluargaPasangan()
  },
  destroyed() {
    this.$destroy()
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
#data-keluarga {
  height: 100%;
  .btn-wrapper {
    .btn-pasangan,
    .btn-anak {
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
  .data-keluarga-content {
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