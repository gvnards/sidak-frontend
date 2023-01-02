<template>
  <ModalHeaderFooter :header-title="'Diklat/Kursus'" :header-subtitle="'diklat/kursus'" :illustration="'IllustrationDataDiklatKursus'" @onUsulkan="onUsulkan()">
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldJenisDiklatKursus">Jenis Diklat/Kursus</label>
          <select class="custom-select" id="fieldJenisDiklatKursus" :class="inputError.jenisDiklatKursus.status ? 'form-error' : ''" v-model="dataDiklatKursus.idJenisDiklat">
            <option value="0" selected disabled>Pilih Jenis Diklat/Kursus</option>
            <option :selected="item.id === dataDiklatKursus.idJenisDiklat" v-for="item in jenisDiklatKursus" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
          <small class="text-red" v-if="inputError.jenisDiklatKursus.status"><b>*{{ inputError.jenisDiklatKursus.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldDaftarDiklatKursus">Daftar Diklat/Kursus</label>
          <select class="custom-select" id="fieldDaftarDiklatKursus" :class="inputError.daftarDiklatKursus.status ? 'form-error' : ''" v-model="dataDiklatKursus.idDaftarDiklat">
            <option value="0" selected disabled>Pilih Daftar Diklat/Kursus</option>
            <option :selected="item.id === dataDiklatKursus.idDaftarDiklat" v-for="item in daftarDiklatKursus" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
          <small class="text-red" v-if="inputError.daftarDiklatKursus.status"><b>*{{ inputError.daftarDiklatKursus.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldNamaDiklatKursus">Nama Diklat/Kursus</label>
          <input type="text" class="form-control" :class="inputError.namaDiklatKursus.status ? 'form-error' : ''" v-model="dataDiklatKursus.namaDiklat" placeholder="Nama Diklat/Kursus Anda">
          <small class="text-red" v-if="inputError.namaDiklatKursus.status"><b>*{{ inputError.namaDiklatKursus.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldLamaJamDiklatKursus">Lama Diklat/Kursus(jam)</label>
          <input type="number" min="0" id="fieldLamaJamDiklatKursus" :class="inputError.lamaJamDiklatKursus.status ? 'form-error' : ''" class="form-control" v-model="dataDiklatKursus.lamaDiklat" placeholder="40">
          <small class="text-red" v-if="inputError.lamaJamDiklatKursus.status"><b>*{{ inputError.lamaJamDiklatKursus.description }}</b></small>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldTanggalDiklatKursus">Tanggal Diklat/Kursus</label>
          <input type="date" id="fieldTanggalDiklatKursus" :class="inputError.tanggalDiklatKursus.status ? 'form-error' : ''" class="form-control" v-model="dataDiklatKursus.tanggalDiklat">
          <small class="text-red" v-if="inputError.tanggalDiklatKursus.status"><b>*{{ inputError.tanggalDiklatKursus.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldInstansi">Instansi</label>
          <select class="custom-select" id="fieldInstansi" :class="inputError.instansi.status ? 'form-error' : ''" v-model="dataDiklatKursus.idDaftarInstansiDiklat">
            <option value="0" selected disabled>Pilih Instansi</option>
            <option :selected="item.id === dataDiklatKursus.idDaftarInstansiDiklat" v-for="item in daftarInstansi" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
          <small class="text-red" v-if="inputError.instansi.status"><b>*{{ inputError.instansi.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldInstitusiPenyelenggara">Institusi Penyelenggara</label>
          <input type="text" id="fieldInstitusiPenyelenggara" :class="inputError.institusiPenyelenggara.status ? 'form-error' : ''" v-model="dataDiklatKursus.institusiPenyelenggara" class="form-control">
          <small class="text-red" v-if="inputError.institusiPenyelenggara.status"><b>*{{ inputError.institusiPenyelenggara.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldDokumenDiklat">Dokumen Diklat</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenDiklat" @change="onChangeFile">
            <label class="custom-file-label" for="fieldDokumenDiklat" :class="inputError.dokumenDiklat.status ? 'form-error' : ''">Cari dokumen</label>
          </div>
          <small :class="inputError.dokumenDiklat.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenDiklat.status ? inputError.dokumenDiklat.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <iframe v-if="dataDiklatKursus.dokumen !== '' && dataDiklatKursus.dokumen !== null" :src="dataDiklatKursus.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
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
      dataDiklatKursus: {
        idJenisDiklat: 0,
        idDaftarDiklat: 0,
        namaDiklat: "",
        lamaDiklat: 0,
        tanggalDiklat: "",
        idDaftarInstansiDiklat: 0,
        institusiPenyelenggara: "",
        dokumen: ""
      },
      inputError: {
        jenisDiklatKursus: {
          status: false,
          description: ""
        },
        daftarDiklatKursus: {
          status: false,
          description: ""
        },
        namaDiklatKursus: {
          status: false,
          description: ""
        },
        lamaJamDiklatKursus: {
          status: false,
          description: ""
        },
        tanggalDiklatKursus: {
          status: false,
          description: ""
        },
        instansi: {
          status: false,
          description: ""
        },
        institusiPenyelenggara: {
          status: false,
          description: ""
        },
        dokumenDiklat: {
          status: false,
          description: ""
        }
      },
      fileCategory: {},
      jenisDiklatKursus: [],
      daftarDiklatKursus: [],
      daftarInstansi: []
    }
  },
  methods: {
    whereError() {
      if (this.dataDiklatKursus.idJenisDiklat === 0) {
        this.inputError.jenisDiklatKursus.status = true
        this.inputError.jenisDiklatKursus.description = "Jenis diklat/kursus harus dipilih"
      } else {
        this.inputError.jenisDiklatKursus.status = false
        this.inputError.jenisDiklatKursus.description = ""
      }
      if (this.dataDiklatKursus.idDaftarDiklat === 0) {
        this.inputError.daftarDiklatKursus.status = true
        this.inputError.daftarDiklatKursus.description = "Daftar diklat/kursus harus dipilih"
      } else {
        this.inputError.daftarDiklatKursus.status = false
        this.inputError.daftarDiklatKursus.description = ""
      }
      if (this.dataDiklatKursus.namaDiklat === "") {
        this.inputError.namaDiklatKursus.status = true
        this.inputError.namaDiklatKursus.description = "Nama diklat/kursus harus diisi"
      } else {
        this.inputError.namaDiklatKursus.status = false
        this.inputError.namaDiklatKursus.description = ""
      }
      if (this.dataDiklatKursus.lamaDiklat === 0) {
        this.inputError.lamaJamDiklatKursus.status = true
        this.inputError.lamaJamDiklatKursus.description = "Lama diklat/kursus harus diisi"
      } else {
        this.inputError.lamaJamDiklatKursus.status = false
        this.inputError.lamaJamDiklatKursus.description = ""
      }
      if (this.dataDiklatKursus.tanggalDiklat === "") {
        this.inputError.tanggalDiklatKursus.status = true
        this.inputError.tanggalDiklatKursus.description = "Tanggal diklat/kursus harus diisi"
      } else {
        this.inputError.tanggalDiklatKursus.status = false
        this.inputError.tanggalDiklatKursus.description = ""
      }
      if (this.dataDiklatKursus.idDaftarInstansiDiklat === 0) {
        this.inputError.instansi.status = true
        this.inputError.instansi.description = "Instansi harus dipilih"
      } else {
        this.inputError.instansi.status = false
        this.inputError.instansi.description = ""
      }
      if (this.dataDiklatKursus.institusiPenyelenggara === "") {
        this.inputError.institusiPenyelenggara.status = true
        this.inputError.institusiPenyelenggara.description = "Institusi penyelenggara harus diisi"
      } else {
        this.inputError.institusiPenyelenggara.status = false
        this.inputError.institusiPenyelenggara.description = ""
      }
      if (this.dataDiklatKursus.dokumen === "") {
        this.inputError.dokumenDiklat.status = true
        this.inputError.dokumenDiklat.description = "Dokumen diklat harus diunggah"
      } else {
        this.inputError.dokumenDiklat.status = false
        this.inputError.dokumenDiklat.description = ""
      }
    },
    onUsulkan() {
      if (!this.isFulfilled) return this.whereError()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataDiklatKursus.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-diklat" : `/data-diklat/${this.dataDiklatKursus.id}`
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataDiklatKursus), u)
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
    getDataDiklatKursus() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-diklat/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataDiklatKursus = data.message[0]
      })
    },
    getJenisDiklatKursus() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/jenis-diklat`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.jenisDiklatKursus = data.message
      })
    },
    getDaftarDiklatKursus() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/daftar-diklat`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarDiklatKursus = data.message
      })
    },
    getDaftarInstansi() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/daftar-instansi-diklat`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarInstansi = data.message
      })
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumenDiklat.status = true
          this.inputError.dokumenDiklat.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataDiklatKursus.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumenDiklat.status = true
          this.inputError.dokumenDiklat.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataDiklatKursus.dokumen = ""
        } else {
          this.inputError.dokumenDiklat.status = false
          this.dataDiklatKursus.dokumen = await this.getBase64(item.target.files[0])
        }
      }
    },
    getMaxFileSize() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/dokumen-kategori/diklat`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.fileCategory = data.message[0]
      })
    },
  },
  computed: {
    isFulfilled() {
      return this.dataDiklatKursus.idJenisDiklat !== 0 && this.dataDiklatKursus.idDaftarDiklat !== 0 && this.dataDiklatKursus.namaDiklat !== "" && this.dataDiklatKursus.lamaDiklat !== 0 && this.dataDiklatKursus.tanggalDiklat !== 0 && this.dataDiklatKursus.idDaftarInstansiDiklat !== 0 && this.dataDiklatKursus.institusiPenyelenggara !== "" && this.dataDiklatKursus.dokumen !== ""
    }
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataDiklatKursus()
    }
    this.getJenisDiklatKursus()
    this.getDaftarDiklatKursus()
    this.getDaftarInstansi()
    this.getMaxFileSize()
  }
}
</script>