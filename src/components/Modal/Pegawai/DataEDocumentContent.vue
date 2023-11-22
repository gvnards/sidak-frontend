<template>
  <ModalHeaderFooter :header-title="namaDokumen" :header-subtitle="namaDokumen" :illustration="'IllustrationDataEDocument'" @onUsulkan="uploadDokumen()" :primaryText="$store.getters.getModalMethod === 'CREATE' ? 'Simpan' : 'Ubah'">
    <div class="row row-form">
      <div class="col-12 col-sm-6">
        <div class="form-group text-left">
          <label for="fieldNomorDokumen">Nomor Dokumen {{ namaDokumen }}</label>
          <input
            :class="inputError.nomorDokumen.status ? 'form-error' : ''"
            type="text"
            class="form-control"
            id="fieldNomorDokumen"
            :placeholder="`Nomor Dokumen ${namaDokumen}`"
            v-model="dataEdokumen.nomorDokumen"
          />
          <small class="text-red" v-if="inputError.nomorDokumen.status"><b>*{{ inputError.nomorDokumen.description }}</b></small>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group text-left">
          <label for="fieldTanggalDokumen">Tanggal Dokumen {{ namaDokumen }}</label>
          <input
            :class="inputError.tanggalDokumen.status ? 'form-error' : ''"
            type="date"
            class="form-control"
            id="fieldTanggalDokumen"
            :placeholder="`Nomor Dokumen ${namaDokumen}`"
            v-model="dataEdokumen.tanggalDokumen"
          />
          <small class="text-red" v-if="inputError.tanggalDokumen.status"><b>*{{ inputError.tanggalDokumen.description }}</b></small>
        </div>
      </div>
      <!-- Dokumen -->
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldDokumen">Dokumen {{ namaDokumen }}</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumen" @change="onChangeFile">
            <label class="custom-file-label" for="fieldDokumen" :class="inputError.dokumen.status ? 'form-error' : ''">Cari dokumen</label>
          </div>
          <small :class="inputError.dokumen.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumen.status ? inputError.dokumen.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
        </div>
      </div>
      <!-- Show Dokumen -->
      <div class="col-12">
        <iframe v-if="dataEdokumen.dokumen !== '' && dataEdokumen.dokumen !== null" :src="dataEdokumen.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
      </div>
    </div>
  </ModalHeaderFooter>
</template>

<script>
import axios from "axios"
const env = import.meta.env
import mixins from "@/mixins/index.js"
export default {
  mixins: [mixins],
  data() {
    return {
      dataEdokumen: {
        nomorDokumen: "",
        tanggalDokumen: "",
        dokumen: ""
      },
      inputError: {
        nomorDokumen: {
          status: false,
          description: ""
        },
        tanggalDokumen: {
          status: false,
          description: ""
        },
        dokumen: {
          status: false,
          description: ""
        }
      },
      fileCategory: {}
    }
  },
  computed: {
    isFulfilled() {
      return this.dataEdokumen.nomorDokumen !== "" && this.dataEdokumen.tanggalDokumen !== "" && this.dataEdokumen.dokumen !== ""
    },
    namaDokumen() {
      return this.$store.getters.getModalData.namaDokumen
    }
  },
  methods: {
    whereError() {
      this.inputError.nomorDokumen.status = this.dataEdokumen.nomorDokumen === ""
      this.inputError.nomorDokumen.description = this.dataEdokumen.nomorDokumen === "" ? `Nomor dokumen ${this.namaDokumen.toLowerCase()} harus diisi` : ""
      this.inputError.tanggalDokumen.status = this.dataEdokumen.tanggalDokumen === ""
      this.inputError.tanggalDokumen.description = this.dataEdokumen.tanggalDokumen === "" ? `Tanggal dokumen ${this.namaDokumen.toLowerCase()} diisi` : ""
      this.inputError.dokumen.status = this.dataEdokumen.dokumen === ""
      this.inputError.dokumen.description = this.dataEdokumen.dokumen === "" ? `Dokumen ${this.namaDokumen.toLowerCase()} harus diunggah` : ""
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumen.status = true
          this.inputError.dokumen.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataEdokumen.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumen.status = true
          this.inputError.dokumen.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataEdokumen.dokumen = ""
        } else {
          this.inputError.dokumen.status = false
          this.dataEdokumen.dokumen = await this.getBase64(item.target.files[0])
        }
      }
    },
    uploadDokumen() {
      if (!this.isFulfilled) return this.whereError()
      let idDaftarDokumen = parseInt(this.$store.getters.getModalData.idDaftarDokumen)
      let idPegawai = parseInt(this.$store.getters.getIdPegawai)
      let date = Date.now()
      let dataUpload = {...this.dataEdokumen}
      dataUpload.idDaftarDokumen = idDaftarDokumen
      dataUpload.idPegawai = idPegawai
      dataUpload.date = date

      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/dokumen-elektronik`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(dataUpload), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: data.status === 2 || data.status === true ? "Success" : "Failed",
          message: data.message
        })
        this.$store.commit("onResultCallbackReload", "ReloadListDataEDocument")
      })
    },
    getDataDokumenDetail() {
      return axios({
        url: `${env.VITE_BACKEND_URL}/dokumen-elektronik/detail/${this.$store.getters.getIdPegawai}/${this.$store.getters.getModalData.idDaftarDokumen}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      })
    }
  },
  created() {
    this.fileCategory = this.$store.getters.getModalData.fileCategory
    if (this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataDokumenDetail().then(res => {
        let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataEdokumen = data.message
      })
    }
  }
}
</script>