<template>
  <ModalHeaderFooter :header-title="'Pangkat/Golongan'" :header-subtitle="'pangkat/golongan'" :illustration="'IllustrationDataPangkatGolongan'" @onUsulkan="onUsulkan()">
    <ShimmeringItem v-if="loading" :layouts="[12,4,8,6,6,12,6,6,6,6,12]" />
    <div v-else>
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
            <input type="text" id="fieldPangkat" class="form-control" disabled :value="textPangkat">
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
            <label for="fieldDokumenSk">Dokumen SK Pangkat/Golongan</label>
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
    </div>
  </ModalHeaderFooter>
</template>

<script>
import axios from "axios"
const env = import.meta.env
import mixins from "@/mixins/index.js"
import ShimmeringItem from "@/components/ShimmeringItem.vue"
export default {
  components: {
    ShimmeringItem
  },
  mixins: [mixins],
  data() {
    return {
      loading: true,
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
    },
    textPangkat() {
      if (this.daftarGolongan.length <= 0) return ""
      if (this.dataPangkatGolongan.idDaftarPangkat === undefined) return ""
      return (this.daftarGolongan.filter(el => parseInt(el.id) === parseInt(this.dataPangkatGolongan.idDaftarPangkat)))[0].pangkat
      // dataPangkatGolongan
    }
  },
  methods: {
    whereError() {
      this.inputError.jenisKepangkatan.status = this.dataPangkatGolongan.idJenisPangkat === 0
      this.inputError.jenisKepangkatan.description = this.dataPangkatGolongan.idJenisPangkat === 0 ? "Jenis kepangkatan harus dipilih" : ""
      this.inputError.daftarGolongan.status = this.dataPangkatGolongan.idDaftarPangkat === 0
      this.inputError.daftarGolongan.description = this.dataPangkatGolongan.idDaftarPangkat === 0 ? "Golongan harus dipilih" : ""
      this.inputError.nomorSk.status = this.dataPangkatGolongan.nomorDokumen === ""
      this.inputError.nomorSk.description = this.dataPangkatGolongan.nomorDokumen === "" ? "Nomor SK harus diisi" : ""
      this.inputError.tanggalSk.status = this.dataPangkatGolongan.tanggalDokumen === ""
      this.inputError.tanggalSk.description = this.dataPangkatGolongan.tanggalDokumen === "" ? "Tanggal SK harus diisi" : ""
      this.inputError.tmtGolongan.status = this.dataPangkatGolongan.tmt === ""
      this.inputError.tmtGolongan.description = this.dataPangkatGolongan.tmt === "" ? "TMT golongan harus diisi" : ""
      this.inputError.nomorBkn.status = this.dataPangkatGolongan.nomorBkn === ""
      this.inputError.nomorBkn.description = this.dataPangkatGolongan.nomorBkn === "" ? "Nomor BKN harus diisi" : ""
      this.inputError.tanggalBkn.status = this.dataPangkatGolongan.tanggalBkn === ""
      this.inputError.tanggalBkn.description = this.dataPangkatGolongan.tanggalBkn === "" ? "Tanggal BKN harus diisi" : ""
      this.inputError.dokumenSk.status = this.dataPangkatGolongan.dokumen === ""
      this.inputError.dokumenSk.description = this.dataPangkatGolongan.dokumen === "" ? "Dokumen SK harus diisi" : ""
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
    getDataPangkatGolonganDetail() {
      this.loading = true
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-golpang/detail/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.daftarGolongan = data.message.daftarGolonganPangkat
        this.jenisKepangkatan = data.message.jenisGolonganPangkat
        this.fileCategory = data.message.dokumenKategori
        this.dataPangkatGolongan = data.message.dataGolonganPangkat
      })
    },
    onUsulkan() {
      if (!this.isFulfilled) return this.whereError()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataPangkatGolongan.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-golpang" : `/data-golpang/${this.dataPangkatGolongan.id}`
      this.dataPangkatGolongan.date = Date.now()
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
    getDataPangkatGolonganCreated() {
      this.loading = true
      axios({
        url: `${env.VITE_BACKEND_URL}/data-golpang/created`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.daftarGolongan = data.message.daftarGolonganPangkat
        this.jenisKepangkatan = data.message.jenisGolonganPangkat
        this.fileCategory = data.message.dokumenKategori
      })
    }
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataPangkatGolonganDetail()
    } else {
      this.getDataPangkatGolonganCreated()
    }
  },
  destroyed() {
    this.$destroy()
  }
}
</script>