<template>
  <ModalHeaderFooter :header-title="'Pangkat/Golongan'" :header-subtitle="'pangkat/golongan'" :illustration="'IllustrationDataPangkatGolongan'" @onUsulkan="onUsulkan()">
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldJenisKepangkatan">Jenis Kepangkatan</label>
          <select id="fieldJenisKepangkatan" class="custom-select" :class="inputError.jenisKepangkatan.status ? 'form-error' : ''" v-model="dataPangkatGolongan.idJenisPangkat">
            <option value="0" selected disabled>Pilih Jenis Kepangkatan</option>
            <option :selected="item.id === dataPangkatGolongan.idJenisPangkat" :value="item.id" v-for="item in jenisKepangkatan" :key="item.id">
              {{ item.nama }}
            </option>
          </select>
          <small class="text-red" v-if="inputError.jenisKepangkatan.status"><b>*{{ inputError.jenisKepangkatan.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-4">
        <div class="form-group text-left">
          <label for="fieldGolongan">Golongan</label>
          <select class="custom-select" id="fieldGolongan" :class="inputError.daftarGolongan.status ? 'form-error' : ''"  v-model="dataPangkatGolongan.idDaftarPangkat">
            <option value="0" selected disabled>Pilih Golongan</option>
            <option :selected="item.id === dataPangkatGolongan.idDaftarPangkat" v-for="item in daftarGolongan" :value="item.id" :key="item.id">{{ item.golongan }}</option>
          </select>
          <small class="text-red" v-if="inputError.daftarGolongan.status"><b>*{{ inputError.daftarGolongan.description }}</b></small>
        </div>
      </div>
      <div class="col-8">
        <div class="form-group text-left">
          <label for="fieldPangkat">Pangkat</label>
          <input type="text" id="fieldPangkat" class="form-control" disabled :value="stringPangkat">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group text-left">
          <label for="fieldMasaKerjaTahun">Masa Kerja (Tahun)</label>
          <input type="number" min="0" id="fieldMasaKerjaTahun" class="form-control" v-model="dataPangkatGolongan.masaKerjaTahun" :class="inputError.masaKerjaTahun.status ? 'form-error' : ''" placeholder="0">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group text-left">
          <label for="fieldMasaKerjaBulan">Masa Kerja (Bulan)</label>
          <input type="number" min="0" id="fieldMasaKerjaBulan" class="form-control" v-model="dataPangkatGolongan.masaKerjaBulan" :class="inputError.masaKerjaBulan.status ? 'form-error' : ''" placeholder="0">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldNomorDokumen">Nomor SK</label>
          <input type="text" id="fieldNomorDokumen" class="form-control" v-model="dataPangkatGolongan.nomorDokumen" :class="inputError.nomorSk.status ? 'form-error' : ''" placeholder="Nomor SK">
          <small class="text-red" v-if="inputError.nomorSk.status"><b>*{{ inputError.nomorSk.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group text-left">
          <label for="fieldTanggalSk">Tanggal SK</label>
          <input type="date" id="fieldTanggalSk" class="form-control asd" v-model="dataPangkatGolongan.tanggalDokumen" :class="inputError.tanggalSk.status ? 'form-error' : ''">
          <small class="text-red" v-if="inputError.tanggalSk.status"><b>*{{ inputError.tanggalSk.description }}</b></small>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group text-left">
          <label for="fieldTmtGolongan">TMT Golongan</label>
          <input type="date" id="fieldTmtGolongan" class="form-control" v-model="dataPangkatGolongan.tmt" :class="inputError.tmtGolongan.status ? 'form-error' : ''">
          <small class="text-red" v-if="inputError.tmtGolongan.status"><b>*{{ inputError.tmtGolongan.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group text-left">
          <label for="fieldNomorBkn">Nomor BKN</label>
          <input type="text" id="fieldNomorBkn" class="form-control" v-model="dataPangkatGolongan.nomorBkn" :class="inputError.nomorBkn.status ? 'form-error' : ''" placeholder="Nomor BKN SK Golongan">
          <small class="text-red" v-if="inputError.nomorBkn.status"><b>*{{ inputError.nomorBkn.description }}</b></small>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group text-left">
          <label for="fieldTanggalBkn">Tanggal BKN</label>
          <input type="date" id="fieldTanggalBkn" class="form-control" v-model="dataPangkatGolongan.tanggalBkn" :class="inputError.tanggalBkn.status ? 'form-error' : ''">
          <small class="text-red" v-if="inputError.tanggalBkn.status"><b>*{{ inputError.tanggalBkn.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldDokumenSk">Dokumen SK</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenSk" @change="onChangeFile">
            <label class="custom-file-label" for="fieldDokumenSk" :class="inputError.dokumenSk.status ? 'form-error' : ''">Cari dokumen</label>
          </div>
          <small :class="inputError.dokumenSk.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenSk.status ? inputError.dokumenSk.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <iframe v-if="dataPangkatGolongan.dokumen !== '' && dataPangkatGolongan.dokumen !== null" :src="dataPangkatGolongan.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
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
  watch: {
    "dataPangkatGolongan.idDaftarPangkat"(val) {
      this.dataPangkatGolongan.idDaftarPangkat = val
      this.textPangkat(val)
    }
  },
  data() {
    return {
      fileCategory: {},
      dataPangkatGolongan: {
        idJenisPangkat: 0,
        idDaftarPangkat: 0,
        masaKerjaTahun: 0,
        masaKerjaBulan: 0,
        nomorDokumen: "",
        tanggalDokumen: "",
        tmt: "",
        nomorBkn: "",
        tanggalBkn: "",
        dokumen: ""
      },
      stringPangkat: "",
      inputError: {
        jenisKepangkatan: {
          status: false,
          description: ""
        },
        daftarGolongan: {
          status: false,
          description: ""
        },
        masaKerjaTahun: {
          status: false,
          description: ""
        },
        masaKerjaBulan: {
          status: false,
          description: ""
        },
        nomorSk: {
          status: false,
          description: ""
        },
        tanggalSk: {
          status: false,
          description: ""
        },
        tmtGolongan: {
          status: false,
          description: ""
        },
        nomorBkn: {
          status: false,
          description: ""
        },
        tanggalBkn: {
          status: false,
          description: ""
        },
        dokumenSk: {
          status: false,
          description: ""
        }
      },
      jenisKepangkatan: [],
      daftarGolongan: []
    }
  },
  computed: {
    isFulfilled() {
      return this.dataPangkatGolongan.idJenisPangkat !== 0 && this.dataPangkatGolongan.idDaftarPangkat !== 0 && this.dataPangkatGolongan.nomorDokumen !== "" && this.dataPangkatGolongan.tanggalDokumen !== "" && this.dataPangkatGolongan.tmt !== "" && this.dataPangkatGolongan.nomorBkn !== "" && this.dataPangkatGolongan.tanggalBkn !== "" && this.dataPangkatGolongan.dokumen !== ""
    }
  },
  methods: {
    whereError() {
      if (this.dataPangkatGolongan.idJenisPangkat === 0) {
        this.inputError.jenisKepangkatan.status = true
        this.inputError.jenisKepangkatan.description = "Jenis kepangkatan harus dipilih"
      } else {
        this.inputError.jenisKepangkatan.status = false
        this.inputError.jenisKepangkatan.description = ""
      }
      if (this.dataPangkatGolongan.idDaftarPangkat === 0) {
        this.inputError.daftarGolongan.status = true
        this.inputError.daftarGolongan.description = "Golongan harus dipilih"
      } else {
        this.inputError.daftarGolongan.status = false
        this.inputError.daftarGolongan.description = ""
      }
      if (this.dataPangkatGolongan.nomorDokumen === "") {
        this.inputError.nomorSk.status = true
        this.inputError.nomorSk.description = "Nomor SK harus diisi"
      } else {
        this.inputError.nomorSk.status = false
        this.inputError.nomorSk.description = ""
      }
      if (this.dataPangkatGolongan.tanggalDokumen === "") {
        this.inputError.tanggalSk.status = true
        this.inputError.tanggalSk.description = "Tanggal SK harus diisi"
      } else {
        this.inputError.tanggalSk.status = false
        this.inputError.tanggalSk.description = ""
      }
      if (this.dataPangkatGolongan.tmt === "") {
        this.inputError.tmtGolongan.status = true
        this.inputError.tmtGolongan.description = "TMT golongan harus diisi"
      } else {
        this.inputError.tmtGolongan.status = false
        this.inputError.tmtGolongan.description = ""
      }
      if (this.dataPangkatGolongan.nomorBkn === "") {
        this.inputError.nomorBkn.status = true
        this.inputError.nomorBkn.description = "Nomor BKN harus diisi"
      } else {
        this.inputError.nomorBkn.status = false
        this.inputError.nomorBkn.description = ""
      }
      if (this.dataPangkatGolongan.tanggalBkn === "") {
        this.inputError.tanggalBkn.status = true
        this.inputError.tanggalBkn.description = "Tanggal BKN harus diisi"
      } else {
        this.inputError.tanggalBkn.status = false
        this.inputError.tanggalBkn.description = ""
      }
      if (this.dataPangkatGolongan.dokumen === "") {
        this.inputError.dokumenSk.status = true
        this.inputError.dokumenSk.description = "Dokumen SK harus diisi"
      } else {
        this.inputError.dokumenSk.status = false
        this.inputError.dokumenSk.description = ""
      }
    },
    getMaxFileSize() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/dokumen-kategori/pangkat`,
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
          this.inputError.dokumenSk.status = true
          this.inputError.dokumenSk.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataPangkatGolongan.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumenSk.status = true
          this.inputError.dokumenSk.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataPangkatGolongan.dokumen = ""
        } else {
          this.inputError.dokumenSk.status = false
          this.dataPangkatGolongan.dokumen = await this.getBase64(item.target.files[0])
        }
      }
    },
    textPangkat(val) {
      this.stringPangkat = this.daftarGolongan.filter(item => item.id === val)[0].pangkat
    },
    getDataPangkatGolongan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-golpang/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataPangkatGolongan = data.message[0]
      })
    },
    onUsulkan() {
      if (!this.isFulfilled) return this.whereError()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataPangkatGolongan.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-golpang" : `/data-golpang/${this.dataPangkatGolongan.id}`
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataPangkatGolongan), u)
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
    getDaftarGolongan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/daftar-golpang`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarGolongan = data.message
      })
    },
    getJenisKepangkatan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/jenis-golpang`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.jenisKepangkatan = data.message
      })
    }
  },
  created() {
    this.getDaftarGolongan()
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataPangkatGolongan()
    }
    this.getJenisKepangkatan()
    this.getMaxFileSize()
  },
  destroyed() {
    this.$destroy()
  }
}
</script>