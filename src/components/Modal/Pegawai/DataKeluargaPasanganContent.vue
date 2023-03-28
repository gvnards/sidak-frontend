<template>
  <ModalHeaderFooter :header-title="'Pasangan'" :header-subtitle="'pasangan'" :illustration="'IllustrationDataKeluarga'" @onUsulkan="onUsulkan()">
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldNama">Nama</label>
            <input
              :class="inputError.nama.status ? 'form-error' : ''"
              type="text"
              class="form-control"
              id="fieldNama"
              placeholder="Nama Pasangan Anda"
              v-model="dataPasangan.nama"
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
              placeholder="Tempat Lahir Pasangan Anda"
              v-model="dataPasangan.tempatLahir"
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
              placeholder="Tanggal Lahir Pasangan Anda"
              v-model="dataPasangan.tanggalLahir"
            />
            <small class="text-red" v-if="inputError.tanggalLahir.status"><b>*{{ inputError.tanggalLahir.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldStatusPerkawinan">Status Perkawinan</label>
            <select class="custom-select" id="fieldStatusPerkawinan" :class="inputError.statusPerkawinan.status ? 'form-error' : ''" v-model="dataPasangan.idStatusPerkawinan">
              <option value="0" selected disabled>Pilih Status</option>
              <option :selected="item.id === dataPasangan.idStatusPerkawinan" v-for="item in statusPerkawinan" :key="item.id" :value="item.id">
                {{ item.nama }}
              </option>
            </select>
            <small class="text-red" v-if="inputError.statusPerkawinan.status"><b>*{{ inputError.statusPerkawinan.description }}</b></small>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldTanggalStatusPerkawinan">Tanggal Status Perkawinan</label>
            <input
              :class="inputError.tanggalStatusPerkawinan.status ? 'form-error' : ''"
              type="date"
              class="form-control"
              id="fieldTanggalStatusPerkawinan"
              placeholder="Tanggal Status Perkawinan"
              v-model="dataPasangan.tanggalStatusPerkawinan"
            />
            <small class="text-red" v-if="inputError.tanggalStatusPerkawinan.status"><b>*{{ inputError.tanggalStatusPerkawinan.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldNomorDokumen">Nomor Dokumen</label>
            <input
              :class="inputError.nomorDokumenAkta.status ? 'form-error' : ''"
              type="text"
              class="form-control"
              id="fieldNomorDokumen"
              placeholder="Nomor Dokumen Akta Nikah/Cerai/Meninggal"
              v-model="dataPasangan.nomorDokumen"
            />
            <small class="text-red" v-if="inputError.nomorDokumenAkta.status"><b>*{{ inputError.nomorDokumenAkta.description }}</b></small>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldTanggalDokumenAkta">Tanggal Dokumen</label>
            <input
              :class="inputError.tanggalDokumenAkta.status ? 'form-error' : ''"
              type="date"
              class="form-control"
              id="fieldTanggalDokumenAkta"
              placeholder="Tanggal Dokumen Akta Nikah/Cerai/Meninggal"
              v-model="dataPasangan.tanggalDokumen"
            />
            <small class="text-red" v-if="inputError.tanggalDokumenAkta.status"><b>*{{ inputError.tanggalDokumenAkta.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldDokumenStatusPerkawinan">Dokumen Akta Nikah/Cerai/Meninggal</label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenStatusPerkawinan" @change="onChangeFile">
              <label class="custom-file-label" for="fieldDokumenStatusPerkawinan" :class="inputError.dokumenAkta.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumenAkta.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenAkta.status ? inputError.dokumenAkta.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <iframe v-if="dataPasangan.dokumen !== '' && dataPasangan.dokumen !== null" :src="dataPasangan.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
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
        statusPerkawinan: {
          status: false,
          description: ""
        },
        tanggalStatusPerkawinan: {
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
      dataPasangan: {
        nama: "",
        tempatLahir: "",
        tanggalLahir: "",
        idStatusPerkawinan: 0,
        tanggalStatusPerkawinan: "",
        nomorDokumen: "",
        tanggalDokumen: "",
        dokumen: "",
      },
      statusPerkawinan: [],
      fileCategory: {},
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
      return this.dataPasangan.nama !== "" && this.dataPasangan.tempatLahir !== "" && this.dataPasangan.tanggalLahir !== "" && this.dataPasangan.idStatusPerkawinan !== 0 && this.dataPasangan.tanggalStatusPerkawinan !== "" && this.dataPasangan.nomorDokumen !== "" && this.dataPasangan.tanggalDokumen !== "" && this.dataPasangan.dokumen !== ""
    }
  },
  methods: {
    whereError() {
      this.inputError.nama.status = this.dataPasangan.nama === ""
      this.inputError.nama.description = this.dataPasangan.nama === "" ? "Nama harus diisi" : ""
      this.inputError.tempatLahir.status = this.dataPasangan.tempatLahir === ""
      this.inputError.tempatLahir.description = this.dataPasangan.tempatLahir === "" ? "Tempat lahir harus diisi" : ""
      this.inputError.tanggalLahir.status = this.dataPasangan.tanggalLahir === ""
      this.inputError.tanggalLahir.description = this.dataPasangan.tanggalLahir === "" ? "Tanggal lahir harus diisi" : ""
      this.inputError.statusPerkawinan.status = this.dataPasangan.idStatusPerkawinan === 0
      this.inputError.statusPerkawinan.description = this.dataPasangan.idStatusPerkawinan === 0 ? "Status perkawinan harus dipilih" : ""
      this.inputError.tanggalStatusPerkawinan.status = this.dataPasangan.tanggalStatusPerkawinan === ""
      this.inputError.tanggalStatusPerkawinan.description = this.dataPasangan.tanggalStatusPerkawinan === "" ? "Tanggal status perkawinan harus diisi" : ""
      this.inputError.nomorDokumenAkta.status = this.dataPasangan.nomorDokumen === ""
      this.inputError.nomorDokumenAkta.description = this.dataPasangan.nomorDokumen === "" ? "Nomor dokumen harus diisi" : ""
      this.inputError.tanggalDokumenAkta.status = this.dataPasangan.tanggalDokumen === ""
      this.inputError.tanggalDokumenAkta.description = this.dataPasangan.tanggalDokumen === "" ? "Tanggal dokumen harus diisi" : ""
      this.inputError.dokumenAkta.status = this.dataPasangan.dokumen === ""
      this.inputError.dokumenAkta.description = this.dataPasangan.dokumen === "" ? "Dokumen akta nikah/cerai/meninggal harus diisi" : ""
    },
    onUsulkan() {
      if (!this.isFulfilled) return this.whereError()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataPasangan.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-pasangan" : `/data-pasangan/${this.dataPasangan.id}`
      this.dataPasangan.date = Date.now()
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataPasangan), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: data.status === 1 || data.status === true ? "Success" : "Failed",
          message: data.message
        })
      }).catch(() => {
        this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: "Failed",
          message: "Terjadi kesalahan server. Silahkan menghubungi penyedia layanan Sidak."
        })
      })
    },
    getDataPasangan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-pasangan/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataPasangan = data.message[0]
      })
    },
    getMaxFileSize() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/dokumen-kategori/perkawinan`,
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
          this.dataPasangan.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumenAkta.status = true
          this.inputError.dokumenAkta.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataPasangan.dokumen = ""
        } else {
          this.inputError.dokumenAkta.status = false
          this.dataPasangan.dokumen = await this.getBase64(item.target.files[0])
        }
      }
    },
    getStatusPerkawinan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/status-perkawinan`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.statusPerkawinan = data.message
      })
    }
  },
  created() {
    this.getMaxFileSize()
    this.getStatusPerkawinan()
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataPasangan()
    }
  },
  destroyed() {
    this.$destroy()
  }
}
</script>