<template>
  <ModalHeaderFooter :header-title="'Hukuman Disiplin'" :header-subtitle="'hukuman disiplin'" :illustration="'IllustrationDataHukumanDisiplin'" @onUsulkan="onUsulkan()">
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldJenisHukuman">Jenis Hukuman Disiplin</label>
          <select class="custom-select" id="fieldJenisHukuman" :class="inputError.jenisHukumanDisiplin.status ? 'form-error' : ''" v-model="dataHukumanDisiplin.idJenisHukumanDisiplin">
            <option value="0" selected disabled>Pilih Jenis Hukuman Disiplin</option>
            <option :selected="item.id === dataHukumanDisiplin.idJenisHukumanDisiplin" v-for="item in daftarJenisHukumanDisiplin" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
          <small class="text-red" v-if="inputError.jenisHukumanDisiplin.status"><b>*{{ inputError.jenisHukumanDisiplin.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldHukumanDisiplin">Hukuman Disiplin</label>
          <select class="custom-select" id="fieldHukumanDisiplin" :class="inputError.hukumanDisiplin.status ? 'form-error' : ''" v-model="dataHukumanDisiplin.idDaftarHukumanDisiplin">
            <option value="0" selected disabled>Pilih Hukuman Disiplin</option>
            <option :selected="item.id === dataHukumanDisiplin.idDaftarHukumanDisiplin" v-for="item in daftarHukumanDisiplin" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
          <small class="text-red" v-if="inputError.hukumanDisiplin.status"><b>*{{ inputError.hukumanDisiplin.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldNomorSkHukumanDisiplin">Nomor SK</label>
          <input type="text" id="fieldNomorSkHukumanDisiplin" class="form-control" :class="inputError.nomorSk.status ? 'form-error' : ''" v-model="dataHukumanDisiplin.nomorDokumen" placeholder="Nomor SK Hukuman Disiplin Anda">
          <small class="text-red" v-if="inputError.nomorSk.status"><b>*{{ inputError.nomorSk.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldTanggalSkHukumanDisiplin">Tanggal SK</label>
          <input type="date" id="fieldTanggalSkHukumanDisiplin" class="form-control" :class="inputError.tanggalSk.status ? 'form-error' : ''" v-model="dataHukumanDisiplin.tanggalDokumen">
        </div>
        <small class="text-red" v-if="inputError.tanggalSk.status"><b>*{{ inputError.tanggalSk.description }}</b></small>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldTmtHukumanDisiplin">TMT</label>
          <input type="date" id="fieldTmtHukumanDisiplin" class="form-control" :class="inputError.tmt.status ? 'form-error' : ''" v-model="dataHukumanDisiplin.tmtAwal">
          <small class="text-red" v-if="inputError.tmt.status"><b>*{{ inputError.tmt.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldMasaHukuman">Masa Hukuman (Bulan)</label>
          <input type="number" step="1" min="0" id="fieldMasaHukuman" class="form-control" v-model="dataHukumanDisiplin.masaHukuman" placeholder="0" :class="inputError.masaHukuman.status ? 'form-error' : ''">
          <small class="text-red" v-if="inputError.masaHukuman.status"><b>*{{ inputError.masaHukuman.description }}</b></small>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldAkhirHukuman">Akhir Hukuman</label>
          <input type="date" id="fieldAkhirHukuman" class="form-control" v-model="dataHukumanDisiplin.tmtAkhir" :class="inputError.akhirHukuman.status ? 'form-error' : ''">
          <small class="text-red" v-if="inputError.akhirHukuman.status"><b>*{{ inputError.akhirHukuman.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldNomorPp">Dasar Hukum</label>
          <select class="custom-select" id="fieldNomorPp" :class="inputError.dasarHukum.status ? 'form-error' : ''" v-model="dataHukumanDisiplin.idDaftarDasarHukumHukdis">
            <option value="0" selected disabled>Pilih Dasar Hukum</option>
            <option :selected="item.id === dataHukumanDisiplin.idDaftarDasarHukumHukdis" v-for="item in daftarDasarHukum" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
          <small class="text-red" v-if="inputError.dasarHukum.status"><b>*{{ inputError.dasarHukum.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldAlasanHukuman">Alasan Hukuman</label>
          <select class="custom-select" id="fieldAlasanHukuman" :class="inputError.alasanHukuman.status ? 'form-error' : ''" v-model="dataHukumanDisiplin.idDaftarAlasanHukdis">
            <option value="0" selected disabled>Pilih Alasan Hukuman</option>
            <option :selected="item.id === dataHukumanDisiplin.idDaftarAlasanHukdis" v-for="item in daftarAlasanHukuman" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
          <small class="text-red" v-if="inputError.alasanHukuman.status"><b>*{{ inputError.alasanHukuman.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col 12">
        <div class="form-group">
          <label for="fieldKeterangan">Keterangan Alasan Hukuman</label>
          <input type="text" :value="dataHukumanDisiplin.keteranganAlasanHukdis" class="form-control">
          <small class="text-red" v-if="inputError.keteranganAlasanHukuman.status"><b>*{{ inputError.keteranganAlasanHukuman.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldDokumenHukumanDisiplin">Dokumen Hukuman Disiplin</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenHukumanDisiplin" @change="onChangeFile">
            <label class="custom-file-label" for="fieldDokumenHukumanDisiplin" :class="inputError.dokumenHukumanDisiplin.status ? 'form-error' : ''">Cari dokumen</label>
          </div>
          <small :class="inputError.dokumenHukumanDisiplin.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenHukumanDisiplin.status ? inputError.dokumenHukumanDisiplin.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <iframe v-if="dataHukumanDisiplin.dokumen !== '' && dataHukumanDisiplin.dokumen !== null" :src="dataHukumanDisiplin.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
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
        jenisHukumanDisiplin: {
          status: false,
          description: ""
        },
        hukumanDisiplin: {
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
        tmt: {
          status: false,
          description: ""
        },
        masaHukuman: {
          status: false,
          description: ""
        },
        akhirHukuman: {
          status: false,
          description: ""
        },
        dasarHukum: {
          status: false,
          description: ""
        },
        alasanHukuman: {
          status: false,
          description: ""
        },
        keteranganAlasanHukuman: {
          status: false,
          description: ""
        },
        dokumenHukumanDisiplin: {
          status: false,
          description: ""
        }
      },
      dataHukumanDisiplin: {
        idJenisHukumanDisiplin: 0,
        idDaftarHukumanDisiplin: 0,
        nomorDokumen: "",
        tanggalDokumen: "",
        tmtAwal: "",
        masaHukuman: 0,
        tmtAkhir: "",
        idDaftarDasarHukumHukdis: 0,
        idDaftarAlasanHukdis: 0,
        keteranganAlasanHukdis: "",
        dokumen: ""
      },
      daftarJenisHukumanDisiplin: [],
      daftarHukumanDisiplin: [],
      daftarDasarHukum: [],
      daftarAlasanHukuman: [],
      fileCategory: {}
    }
  },
  methods: {
    whereError() {
      this.inputError.jenisHukumanDisiplin.status = this.dataHukumanDisiplin.idJenisHukumanDisiplin === 0
      this.inputError.jenisHukumanDisiplin.description = this.dataHukumanDisiplin.idJenisHukumanDisiplin === 0 ? "Jenis hukuman disiplin harus dipilih" : ""
      this.inputError.hukumanDisiplin.status = this.dataHukumanDisiplin.idDaftarHukumanDisiplin === 0
      this.inputError.hukumanDisiplin.description = this.dataHukumanDisiplin.idDaftarHukumanDisiplin === 0 ? "Hukuman disiplin harus dipilih" : ""
      this.inputError.nomorSk.status = this.dataHukumanDisiplin.nomorDokumen === ""
      this.inputError.nomorSk.description = this.dataHukumanDisiplin.nomorDokumen === "" ? "Nomor SK harus diisi" : ""
      this.inputError.tanggalSk.status = this.dataHukumanDisiplin.tanggalDokumen === ""
      this.inputError.tanggalSk.description = this.dataHukumanDisiplin.tanggalDokumen === "" ? "Tanggal SK harus diisi" : ""
      this.inputError.tmt.status = this.dataHukumanDisiplin.tmtAwal === ""
      this.inputError.tmt.description = this.dataHukumanDisiplin.tmtAwal === "" ? "TMT harus diisi" : ""
      this.inputError.masaHukuman.status = this.dataHukumanDisiplin.masaHukuman === 0
      this.inputError.masaHukuman.description = this.dataHukumanDisiplin.masaHukuman === 0 ? "Masa hukuman harus diisi" : ""
      this.inputError.akhirHukuman.status = this.dataHukumanDisiplin.tmtAkhir === ""
      this.inputError.akhirHukuman.description = this.dataHukumanDisiplin.tmtAkhir === "" ? "Akhir hukuman harus diisi" : ""
      this.inputError.dasarHukum.status = this.dataHukumanDisiplin.idDaftarDasarHukumHukdis === 0
      this.inputError.dasarHukum.description = this.dataHukumanDisiplin.idDaftarDasarHukumHukdis === 0 ? "Dasar hukum harus dipilih" : ""
      this.inputError.alasanHukuman.status = this.dataHukumanDisiplin.idDaftarAlasanHukdis === 0
      this.inputError.alasanHukuman.description = this.dataHukumanDisiplin.idDaftarAlasanHukdis === 0 ? "Alasan hukuman harus dipilih" : ""
      this.inputError.keteranganAlasanHukuman.status = this.dataHukumanDisiplin.keteranganAlasanHukdis === ""
      this.inputError.keteranganAlasanHukuman.description = this.dataHukumanDisiplin.keteranganAlasanHukdis === "" ? "Keterangan alasan hukuman harus diisi" : ""
      this.inputError.dokumenHukumanDisiplin.status = this.dataHukumanDisiplin.dokumen === ""
      this.inputError.dokumenHukumanDisiplin.description = this.dataHukumanDisiplin.dokumen === "" ? "Dokumen hukuman disiplin harus diunggah" : ""
    },
    getDataHukumanDisiplin() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-hukdis/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataHukumanDisiplin = data.message[0]
      })
    },
    onUsulkan() {
      if (!this.isFulfilled) return this.whereError()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataHukumanDisiplin.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-hukdis" : `/data-hukdis/${this.dataHukumanDisiplin.id}`
      this.dataHukumanDisiplin.date = Date.now()
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataHukumanDisiplin), u)
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
    getDaftarJenisHukumanDisiplin() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/jenis-hukdis`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarJenisHukumanDisiplin = data.message
      })
    },
    getDaftarHukumanDisiplin() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/daftar-hukdis`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarHukumanDisiplin = data.message
      })
    },
    getDaftarDasarHukum() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/dasar-hukum-hukdis`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarDasarHukum = data.message
      })
    },
    getDaftarAlasanHukuman() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/alasan-hukdis`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarAlasanHukuman = data.message
      })
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumenHukumanDisiplin.status = true
          this.inputError.dokumenHukumanDisiplin.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataHukumanDisiplin.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumenHukumanDisiplin.status = true
          this.inputError.dokumenHukumanDisiplin.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataHukumanDisiplin.dokumen = ""
        } else {
          this.inputError.dokumenHukumanDisiplin.status = false
          this.dataHukumanDisiplin.dokumen = await this.getBase64(item.target.files[0])
        }
      }
    },
    getMaxFileSize() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/dokumen-kategori/hukuman`,
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
      return this.dataHukumanDisiplin.idJenisHukumanDisiplin !== 0 && this.dataHukumanDisiplin.idDaftarHukumanDisiplin !== 0 && this.dataHukumanDisiplin.nomorDokumen !== "" && this.dataHukumanDisiplin.tanggalDokumen !== "" && this.dataHukumanDisiplin.tmtAwal !== "" && this.dataHukumanDisiplin.masaHukuman !== 0 && this.dataHukumanDisiplin.tmtAkhir !== "" && this.dataHukumanDisiplin.idDaftarDasarHukumHukdis !== 0 && this.dataHukumanDisiplin.idDaftarAlasanHukdis !== 0 && this.dataHukumanDisiplin.keteranganAlasanHukdis !== "" && this.dataHukumanDisiplin.dokumen !== ""
    }
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataHukumanDisiplin()
    }
    this.getDaftarJenisHukumanDisiplin()
    this.getDaftarHukumanDisiplin()
    this.getDaftarDasarHukum()
    this.getDaftarAlasanHukuman()
    this.getMaxFileSize()
  }
}
</script>