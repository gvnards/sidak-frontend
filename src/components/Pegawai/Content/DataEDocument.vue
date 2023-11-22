<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12" v-for="item in listDocument" :key="item.id">
            <div class="row">
              <div class="col-10" style="border: 0.5px solid lightgrey;">
                <div class="form-group text-left">
                  <label :for="`fieldDokumen${item.kategori}`">Dokumen {{ item.nama }}</label>
                  <small class="text-danger" v-show="item.keterangan !== ''" style="font-weight: 600; display: block; margin-top: -10px;">({{ item.keterangan }})</small>
                </div>
              </div>
              <div class="col-2 text-left" style="border: 0.5px solid lightgrey;; padding: 0; padding-left: 4px; cursor: pointer;"
              data-toggle="modal"
              data-target="#modal"
              data-backdrop="static"
              data-keyboard="false" @click="onModalPopup(item.id, item.nama)">
                <small style="font-weight: 600;">Status: </small>
                <i v-if="hasDocument(item.id)" class="fa-solid fa-circle-check text-primary"></i>
                <i v-else class="fa-solid fa-circle-xmark text-danger"></i>
                <br>
                <small style="font-weight: 600;">Aksi: </small>
                <i class="fa-solid fa-pen-to-square text-info"></i>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
const env = import.meta.env
export default {
  watch: {
    resultCallbackReload(val) {
      if (val === "ReloadListDataEDocument") {
        this.listDocument = [],
        this.dataDocuments = [],
        this.fileCategory = {},
        this.getDataCreated().then(res => {
          let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
          let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
          this.listDocument = data.daftarDokumen
          this.dataDocuments = data.dataDokumen
          this.fileCategory = data.dokumenKategori
        })
        this.$store.commit("onResultCallbackReload", "")
      }
    }
  },
  data() {
    return {
      listDocument: [],
      dataDocuments: [],
      fileCategory: {},
    }
  },
  methods: {
    onModalPopup(id, namaDokumen) {
      let isUpdated = this.hasDocument(id)
      this.$store.commit("onModalMethod", isUpdated ? "UPDATE" : "CREATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataEDocument")
      let modalData = {
        namaDokumen: namaDokumen,
        fileCategory: this.fileCategory,
        idDaftarDokumen: id
      }
      this.$store.commit("onModalData", modalData)
      // if isUpdated, then this.dataDocuments.filter(el => parseInt(el.idDaftar) === parseInt(id))
      // this.$store.commit("onModalData", item)
    },
    hasDocument(id) {
      return this.dataDocuments.filter(el => parseInt(el.idDaftar) === parseInt(id)).length > 0
    },
    getDataCreated() {
      // this.isLoading = true
      let url = `/dokumen-elektronik/list/${this.$store.getters.getIdPegawai}`
      return axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
  },
  computed: {
    resultCallbackReload() {
      return this.$store.getters.getResultCallbackReload
    },
  },
  created() {
    this.getDataCreated().then(res => {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
      this.listDocument = data.daftarDokumen
      this.dataDocuments = data.dataDokumen
      this.fileCategory = data.dokumenKategori
    })
  }
}
</script>

<style lang="less" scoped>
.upload {
  small {
    font-weight: 500;
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
  }
  &:hover {
    small {
      // bottom: 0px !important;
      // transition: all 0.4s ease-in-out;
      animation-duration: 0.6s;
      animation-name: bouncing;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-fill-mode: both;
      animation-timing-function: ease-in-out;
    }
  }
}
@keyframes bouncing {
  from {
    bottom: -8px;
  }
  to {
    bottom: 0px;
  }
}
</style>