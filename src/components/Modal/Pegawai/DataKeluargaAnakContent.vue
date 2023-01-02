<template>
  <ModalHeaderFooter :header-title="'Anak'" :header-subtitle="'anak'" :illustration="'IllustrationDataKeluarga'" @onUsulkan="onUsulkan()">
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldNama">Nama</label>
          <input
            :class="inputError.nama.status ? 'form-error' : ''"
            type="text"
            class="form-control"
            id="fieldNama"
            placeholder="Nama Anak Anda"
            v-model="dataAnak.nama"
          />
          <small class="text-red" v-if="inputError.nama.status"><b>*{{ inputError.nama.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12 col-sm-6">
        <div class="form-group text-left">
          <label for="fieldTempatLahir">Tempat Lahir</label>
          <input
            :class="inputError.tempatLahir.status ? 'form-error' : ''"
            type="text"
            class="form-control"
            id="fieldTempatLahir"
            placeholder="Tempat Lahir Anak Anda"
            v-model="dataAnak.tempatLahir"
          />
          <small class="text-red" v-if="inputError.tempatLahir.status"><b>*{{ inputError.tempatLahir.description }}</b></small>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group text-left">
          <label for="fieldTanggalLahir">Tanggal Lahir</label>
          <input
            :class="inputError.tanggalLahir.status ? 'form-error' : ''"
            type="date"
            class="form-control"
            id="fieldTanggalLahir"
            placeholder="Tanggal Lahir Anak Anda"
            v-model="dataAnak.tanggalLahir"
          />
          <small class="text-red" v-if="inputError.tanggalLahir.status"><b>*{{ inputError.tanggalLahir.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12 col-sm-6">
        <div class="form-group text-left">
          <label for="fieldDataOrangTua">Nama Ayah/Ibu</label>
          <select class="custom-select" id="fieldDataOrangTua" :class="inputError.dataOrangTua.status ? 'form-error' : ''" v-model="dataAnak.idOrangTua">
            <option value="0" selected disabled>Pilih Nama Ayah/Ibu</option>
            <option :selected="item.id === dataAnak.idOrangTua" v-for="item in dataOrangTua" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
          <small class="text-red" v-if="inputError.dataOrangTua.status"><b>*{{ inputError.dataOrangTua.description }}</b></small>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group text-left">
          <label for="fieldStatusAnak">Status Anak</label>
          <select class="custom-select" id="fieldStatusAnak" :class="inputError.statusAnak.status ? 'form-error' : ''" v-model="dataAnak.idStatusAnak">
            <option value="0" selected disabled>Pilih Status</option>
            <option :selected="item.id === dataAnak.idStatusAnak" v-for="item in statusAnak" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
          <small class="text-red" v-if="inputError.statusAnak.status"><b>*{{ inputError.statusAnak.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12 col-sm-6">
        <div class="form-group text-left">
          <label for="fieldNomorDokumen">Nomor Dokumen Akta Kelahiran</label>
          <input
            :class="inputError.nomorDokumenAkta.status ? 'form-error' : ''"
            type="text"
            class="form-control"
            id="fieldNomorDokumen"
            placeholder="Nomor Dokumen Akta Kelahiran Anak Anda"
            v-model="dataAnak.nomorDokumen"
          />
          <small class="text-red" v-if="inputError.nomorDokumenAkta.status"><b>*{{ inputError.nomorDokumenAkta.description }}</b></small>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group text-left">
          <label for="fieldTanggalDokumenAkta">Tanggal Dokumen Akta Kelahiran</label>
          <input
            :class="inputError.tanggalDokumenAkta.status ? 'form-error' : ''"
            type="date"
            class="form-control"
            id="fieldTanggalDokumenAkta"
            placeholder="Tanggal Dokumen Akta Kelahiran"
            v-model="dataAnak.tanggalDokumen"
          />
          <small class="text-red" v-if="inputError.dokumenAkta.status"><b>*{{ inputError.dokumenAkta.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldDokumenStatusAnak">Dokumen Akta Kelahiran</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenStatusAnak" @change="onChangeFile">
            <label class="custom-file-label" for="fieldDokumenStatusAnak" :class="inputError.dokumenAkta.status ? 'form-error' : ''">Cari dokumen</label>
          </div>
          <small :class="inputError.dokumenAkta.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenAkta.status ? inputError.dokumenAkta.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <iframe v-if="dataAnak.dokumen !== '' && dataAnak.dokumen !== null" :src="dataAnak.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
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
      dataAnak: {
        nama: "",
        tempatLahir: "",
        tanggalLahir: "",
        idOrangTua: 0,
        idStatusAnak: 0,
        nomorDokumen: "",
        tanggalDokumen: "",
        dokumen: ""
      },
      inputError: {
        nama: {
          status: false,
          description: ""
        },
        tempatLahir: {
          status: false,
          description: ""
        },
        tanggalLahir: {
          status: false,
          description: ""
        },
        dataOrangTua: {
          status: false,
          description: ""
        },
        statusAnak: {
          status: false,
          description: ""
        },
        nomorDokumenAkta: {
          status: false,
          description: ""
        },
        tanggalDokumenAkta: {
          status: false,
          description: ""
        },
        dokumenAkta: {
          status: false,
          description: ""
        }
      },
      statusAnak: [],
      fileCategory: {},
      dataOrangTua: []
    }
  },
  computed: {
    getModalMethod() {
      let modalMethod = ""
      let getModalMethod = this.$store.getters.getModalMethod
      if (getModalMethod === "CREATE") modalMethod = "Tambah"
      else if (getModalMethod === "UPDATE") modalMethod = "Ubah"
      else if (getModalMethod === "DELETE") modalMethod = "Hapus"
      return modalMethod
    },
    isFulfilled() {
      return this.dataAnak.nama !== "" && this.dataAnak.tempatLahir !== "" && this.dataAnak.tanggalLahir !== "" && this.dataAnak.idOrangTua !== 0 && this.dataAnak.idStatusAnak !== 0 && this.dataAnak.nomorDokumen !== "" && this.dataAnak.tanggalDokumen !== "" && this.dataAnak.tanggalDokumen !== "" && this.dataAnak.dokumen !== ""
    }
  },
  methods: {
    whereError() {
      if (this.dataAnak.nama === "") {
        this.inputError.nama.status = true
        this.inputError.nama.description = "Nama harus diisi"
      } else {
        this.inputError.nama.status = false
        this.inputError.nama.description = ""
      }
      if (this.dataAnak.tempatLahir === "") {
        this.inputError.tempatLahir.status = true
        this.inputError.tempatLahir.description = "Tempat lahir harus diisi"
      } else {
        this.inputError.tempatLahir.status = false
        this.inputError.tempatLahir.description = ""
      }
      if (this.dataAnak.tanggalLahir === "") {
        this.inputError.tanggalLahir.status = true
        this.inputError.tanggalLahir.description = "Tanggal lahir harus diisi"
      } else {
        this.inputError.tanggalLahir.status = false
        this.inputError.tanggalLahir.description = ""
      }
      if (this.dataAnak.idOrangTua === 0) {
        this.inputError.dataOrangTua.status = true
        this.inputError.dataOrangTua.description = "Orang tua harus diisi"
      } else {
        this.inputError.dataOrangTua.status = false
        this.inputError.dataOrangTua.description = ""
      }
      if (this.dataAnak.idStatusAnak === 0) {
        this.inputError.statusAnak.status = true
        this.inputError.statusAnak.description = "Status anak harus diisi"
      } else {
        this.inputError.statusAnak.status = false
        this.inputError.statusAnak.description = ""
      }
      if (this.dataAnak.nomorDokumen === "") {
        this.inputError.nomorDokumenAkta.status = true
        this.inputError.nomorDokumenAkta.description = "Nomor dokumen akta kelahiran harus diisi"
      } else {
        this.inputError.nomorDokumenAkta.status = false
        this.inputError.nomorDokumenAkta.description = ""
      }
      if (this.dataAnak.tanggalDokumen === "") {
        this.inputError.tanggalDokumenAkta.status = true
        this.inputError.tanggalDokumenAkta.description = "Tanggal dokumen akta kelahiran harus diisi"
      } else {
        this.inputError.tanggalDokumenAkta.status = false
        this.inputError.tanggalDokumenAkta.description = ""
      }
      if (this.dataAnak.dokumen === "") {
        this.inputError.dokumenAkta.status = true
        this.inputError.dokumenAkta.description = "Dokumen akta kelahiran harus diisi"
      } else {
        this.inputError.dokumenAkta.status = false
        this.inputError.dokumenAkta.description = ""
      }
    },
    onUsulkan() {
      if (!this.isFulfilled) return this.whereError()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataAnak.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-anak" : `/data-anak/${this.dataAnak.id}`
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataAnak), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.$store.commit("onModalMethod", "UPDATE")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", data.status === 1 || data.status === true ? "Success" : "Failed")
      }).catch(() => {
        this.$store.commit("onModalMethod", "UPDATE")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", "Failed")
      })
    },
    getDataOrangTua() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/orang-tua/${idPegawai}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataOrangTua = data.message
      })
    },
    getDataAnak() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-anak/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataAnak = data.message[0]
      })
    },
    getMaxFileSize() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/dokumen-kategori/anak`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.fileCategory = data.message[0]
      })
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumenAkta.status = true
          this.inputError.dokumenAkta.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataAnak.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumenAkta.status = true
          this.inputError.dokumenAkta.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataAnak.dokumen = ""
        } else {
          this.inputError.dokumenAkta.status = false
          this.dataAnak.dokumen = await this.getBase64(item.target.files[0])
        }
      }
    },
    getStatusAnak() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/status-anak`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.statusAnak = data.message
      })
    }
  },
  created() {
    this.getMaxFileSize()
    this.getStatusAnak()
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataAnak()
    }
    this.getDataOrangTua()
  },
  destroyed() {
    this.$destroy()
  }
}
</script>