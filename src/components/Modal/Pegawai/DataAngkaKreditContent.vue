<template>
  <ModalHeaderFooter :header-title="'Angka Kredit'" :header-subtitle="'angka kredit'" :illustration="'IllustrationDataAngkaKredit'" @onUsulkan="onUsulkan()">
    <ShimmeringItem v-if="loading" :layouts="[12,12,6,6,12,6,6,12]" />
    <div v-else>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldJenisAngkaKredit">Jenis Angka Kredit</label>
            <select class="custom-select" id="fieldJenisAngkaKredit" :class="inputError.jenisAngkaKredit.status ? 'form-error' : ''" v-model="dataAngkaKredit.idDaftarJenisAngkaKredit">
              <option value="0" selected disabled>{{ '-- Pilih Daftar Jenis Angka Kredit --' }}</option>
              <option :selected="item.id === dataAngkaKredit.idDaftarJenisAngkaKredit" v-for="item in jenisAngkaKredit" :key="item.id" :value="item.id">
                {{ item.jenisAngkaKredit }}
              </option>
            </select>
            <small class="text-red" v-if="inputError.jenisAngkaKredit.status"><b>*{{ inputError.jenisAngkaKredit.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldJabatan">Jabatan pada Angka Kredit</label>
            <select class="custom-select" id="fieldJabatan" :class="inputError.jabatan.status ? 'form-error' : ''" v-model="dataAngkaKredit.idDataJabatan">
              <option value="0" selected disabled>{{ '-- Pilih Daftar Jabatan --' }}</option>
              <option :selected="item.id === dataAngkaKredit.idDataJabatan" v-for="item in jabatan" :key="item.id" :value="item.idDataJabatan">
                {{ item.jabatan }}
              </option>
            </select>
            <small class="text-red" v-if="inputError.jabatan.status"><b>*{{ inputError.jabatan.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form" v-if="parseInt(dataAngkaKredit.idDaftarJenisAngkaKredit) === 3">
        <div class="col-12">
          <div class="form-group">
            <label for="fieldTahun">Tahun Penilaian Angka Kredit</label>
            <input type="number" min="1900" placeholder="2010" id="fieldTahun" v-model="dataAngkaKredit.tahun" class="form-control">
            <small class="text-red" v-if="inputError.tahun.status"><b>*{{ inputError.tahun.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary" style="margin: 0; padding: 0; font-weight: 600;">Periode Penilaian</p>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldperiodePenilaianMulai">Mulai</label>
            <input type="date" id="fieldperiodePenilaianMulai" v-model="dataAngkaKredit.periodePenilaianMulai" class="form-control">
            <small class="text-red" v-if="inputError.periodePenilaianMulai.status"><b>*{{ inputError.periodePenilaianMulai.description }}</b></small>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldperiodePenilaianSelesai">Selesai</label>
            <input type="date" id="fieldperiodePenilaianSelesai" v-model="dataAngkaKredit.periodePenilaianSelesai" class="form-control">
            <small class="text-red" v-if="inputError.periodePenilaianSelesai.status"><b>*{{ inputError.periodePenilaianSelesai.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary" style="margin: 0; padding: 0; font-weight: 600;">Penilaian Angka Kredit</p>
        </div>
        <div class="col-6" v-if="parseInt(dataAngkaKredit.idDaftarJenisAngkaKredit) === 1 || parseInt(dataAngkaKredit.idDaftarJenisAngkaKredit) === 4">
          <div class="form-group">
            <label for="fieldKreditUtama">Utama</label>
            <input type="number" min="0" step="0.001" id="fieldKreditUtama" v-model="dataAngkaKredit.angkaKreditUtama" class="form-control">
            <small class="text-red" v-if="inputError.angkaKreditUtama.status"><b>*{{ inputError.angkaKreditUtama.description }}</b></small>
          </div>
        </div>
        <div class="col-6" v-if="parseInt(dataAngkaKredit.idDaftarJenisAngkaKredit) === 1 || parseInt(dataAngkaKredit.idDaftarJenisAngkaKredit) === 4">
          <div class="form-group">
            <label for="fieldKreditPenunjang">Penunjang</label>
            <input type="number" min="0" step="0.001" id="fieldKreditPenunjang" v-model="dataAngkaKredit.angkaKreditPenunjang" class="form-control">
            <small class="text-red" v-if="inputError.angkaKreditPenunjang.status"><b>*{{ inputError.angkaKreditPenunjang.description }}</b></small>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="fieldKreditTotal">Nilai</label>
            <input type="number" min="0" step="0.001" id="fieldKreditTotal" v-model="dataAngkaKredit.angkaKreditTotal" class="form-control">
            <small class="text-red" v-if="inputError.angkaKreditTotal.status"><b>*{{ inputError.angkaKreditTotal.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="fieldNomorDokumen">Nomor Dokumen</label>
            <input type="text" placeholder="XXX/XXX/XXX" id="fieldNomorDokumen" v-model="dataAngkaKredit.nomorDokumen" class="form-control">
            <small class="text-red" v-if="inputError.nomorDokumen.status"><b>*{{ inputError.nomorDokumen.description }}</b></small>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="fieldTanggalDokumen">Tanggal Dokumen</label>
            <div v-if="getModalMethod === 'Ubah'" class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ dataAngkaKredit.tanggalDokumen }}</div>
            <input v-else type="date" id="fieldTanggalDokumen" v-model="dataAngkaKredit.tanggalDokumen" class="form-control">
            <small class="text-red" v-if="inputError.tanggalDokumen.status"><b>*{{ inputError.tanggalDokumen.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="form-group text-left" style="margin-bottom: -4px;">
        <label for="fieldDokumenAngkaKredit">Dokumen Angka Kredit</label>
      </div>
      <div class="row row-form" v-if="(getModalMethod === 'Ubah' && dataAngkaKredit.idDokumen !== null)">
        <div class="col-12">
          <div class="btn btn-sm btn-block btn-secondary" @click="btnGetStreamDokumen()" style="font-weight: 500;">{{ dataAngkaKredit.idDokumen === null ? 'Belum Ada Dokumen' : 'Lihat Dokumen' }}</div>
          <iframe v-if="streamDokumen.show" :src="streamDokumen.dokumen" frameborder="0" style="width: 100%; height: 600px; margin-top: 6px;"></iframe>
        </div>
        <div class="col-12" v-if="!changeDokumen">
          <p class="text-center" style="margin: 6px 0px;">atau</p>
          <div class="btn btn-sm btn-block btn-outline-secondary" @click="changeDokumen = true" style="font-weight: 500;">Ganti Dokumen</div>
        </div>
      </div>
      <div class="row row-form" v-if="getModalMethod === 'Tambah' || changeDokumen || (getModalMethod === 'Ubah' && dataAngkaKredit.idDokumen === null)">
        <div class="col-12">
          <div class="form-group text-left">
            <div class="custom-file">
              <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenAngkaKredit" @change="onChangeFile">
              <label class="custom-file-label" for="fieldDokumenAngkaKredit" :class="inputError.dokumenAngkaKredit.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumenAngkaKredit.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenAngkaKredit.status ? inputError.dokumenAngkaKredit.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
        <div class="col-12">
          <iframe v-if="dataAngkaKredit.dokumen !== '' && dataAngkaKredit.dokumen !== null" :src="dataAngkaKredit.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
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
      dataAngkaKredit: {
        idDaftarJenisAngkaKredit: 0,
        idDataJabatan: 0,
        tahun: "",
        nomorDokumen: "",
        tanggalDokumen: "",
        periodePenilaianMulai: "",
        periodePenilaianSelesai: "",
        angkaKreditUtama: 0.001,
        angkaKreditPenunjang: 0.001,
        angkaKreditTotal: 0.001,
        dokumen: ""
      },
      jenisAngkaKredit: [],
      jabatan: [],
      inputError: {
        jenisAngkaKredit: {
          description: "",
          status: false
        },
        jabatan: {
          description: "",
          status: false
        },
        tahun: {
          description: "",
          status: false
        },
        nomorDokumen: {
          description: "",
          status: false
        },
        tanggalDokumen: {
          description: "",
          status: false
        },
        periodePenilaianMulai: {
          description: "",
          status: false
        },
        periodePenilaianSelesai: {
          description: "",
          status: false
        },
        angkaKreditUtama: {
          description: "",
          status: false
        },
        angkaKreditPenunjang: {
          description: "",
          status: false
        },
        angkaKreditTotal: {
          description: "",
          status: false
        },
        dokumenAngkaKredit: {
          description: "",
          status: false
        }
      },
      fileCategory: {},
      changeDokumen: false,
      streamDokumen: {
        show: false,
        dokumen: ""
      },
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
      return !(this.inputError.jenisAngkaKredit.status || this.inputError.jabatan.status || this.inputError.tahun.status || this.inputError.nomorDokumen.status || this.inputError.tanggalDokumen.status || this.inputError.periodePenilaianMulai.status || this.inputError.periodePenilaianSelesai.status || this.inputError.angkaKreditTotal.status || this.inputError.dokumenAngkaKredit.status)
      // return this.dataAngkaKredit.idDaftarJenisAngkaKredit === 0 && this.dataAngkaKredit.idDataJabatan === 0 && (parseInt(this.dataAngkaKredit.idDaftarJenisAngkaKredit) === 3 && this.dataAngkaKredit.tahun === "") && this.dataAngkaKredit.nomorDokumen === "" && this.dataAngkaKredit.tanggalDokumen === "" && this.dataAngkaKredit.periodePenilaianMulai === "" && this.dataAngkaKredit.periodePenilaianSelesai === "" && this.dataAngkaKredit.angkaKreditTotal === 0.00 && this.dataAngkaKredit.dokumen === ""
    }
  },
  methods: {
    btnGetStreamDokumen() {
      this.streamDokumen.show = !this.streamDokumen.show
      if (this.streamDokumen.dokumen !== "") return
      this.getStreamDokumen().then(res => {
        this.streamDokumen.dokumen = res.data
      })
    },
    async getStreamDokumen() {
      return axios({
        url: `${env.VITE_BACKEND_URL}/dokumen/${this.dataAngkaKredit.idDokumen}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    whereError() {
      this.inputError.jenisAngkaKredit.description = this.dataAngkaKredit.idDaftarJenisAngkaKredit === 0 ? "Jenis angka kredit harus dipilih" : ""
      this.inputError.jenisAngkaKredit.status = this.dataAngkaKredit.idDaftarJenisAngkaKredit === 0
      this.inputError.jabatan.description = this.dataAngkaKredit.idDataJabatan === 0 ? "Jabatan harus dipilih" : ""
      this.inputError.jabatan.status = this.dataAngkaKredit.idDataJabatan === 0
      this.inputError.tahun.description = parseInt(this.dataAngkaKredit.idDaftarJenisAngkaKredit) === 3 && this.dataAngkaKredit.tahun === "" ? "Tahun harus diisi" : ""
      this.inputError.tahun.status = parseInt(this.dataAngkaKredit.idDaftarJenisAngkaKredit) === 3 && this.dataAngkaKredit.tahun === ""
      this.inputError.nomorDokumen.description = this.dataAngkaKredit.nomorDokumen === "" ? "Nomor dokumen harus diisi" : ""
      this.inputError.nomorDokumen.status = this.dataAngkaKredit.nomorDokumen === ""
      this.inputError.tanggalDokumen.description = this.dataAngkaKredit.tanggalDokumen === "" ? "Tanggal dokumen harus diisi" : ""
      this.inputError.tanggalDokumen.status = this.dataAngkaKredit.tanggalDokumen === ""
      this.inputError.periodePenilaianMulai.description = this.dataAngkaKredit.periodePenilaianMulai === "" ? "Periode mulai penilaian harus diisi" : ""
      this.inputError.periodePenilaianMulai.status = this.dataAngkaKredit.periodePenilaianMulai === ""
      this.inputError.periodePenilaianSelesai.description = this.dataAngkaKredit.periodePenilaianSelesai === "" ? "Periode selesai penilaian harus diisi" : ""
      this.inputError.periodePenilaianSelesai.status = this.dataAngkaKredit.periodePenilaianSelesai === ""
      this.inputError.angkaKreditTotal.description = this.dataAngkaKredit.angkaKreditTotal === 0.00 ? "Total penilaian angka kredit harus diisi" : ""
      this.inputError.angkaKreditTotal.status = this.dataAngkaKredit.angkaKreditTotal === 0.00
      this.inputError.dokumenAngkaKredit.description = this.dataAngkaKredit.dokumen === "" ? "Dokumen harus diisi" : ""
      if (this.getModalMethod === "Tambah") {
        if (this.dataAngkaKredit.dokumen === "") {
          this.inputError.dokumenAngkaKredit.status = true
          this.inputError.dokumenAngkaKredit.description = this.inputError.dokumenAngkaKredit.status ? "Dokumen harus diisi" : ""
        }
      } else {
        if (this.dataAngkaKredit.idDokumen === null && this.dataAngkaKredit.dokumen === "") {
          this.inputError.dokumenAngkaKredit.status = true
          this.inputError.dokumenAngkaKredit.description = this.inputError.dokumenAngkaKredit.status ? "Dokumen harus diisi" : ""
        } else {
          this.inputError.dokumenAngkaKredit.status = !!(this.dataAngkaKredit.dokumen !== "" ^ this.changeDokumen)
          this.inputError.dokumenAngkaKredit.description = this.inputError.dokumenAngkaKredit.status ? "Dokumen diklat harus diunggah" : ""
        }
      }
    },
    getDataCreated() {
      this.loading = true
      let url = `/angka-kredit/created/${this.$store.getters.getIdPegawai}`
      return axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    getDataDetail() {
      this.loading = true
      let url = `/angka-kredit/updated/${this.$store.getters.getIdPegawai}/${this.$store.getters.getModalData.id}`
      return axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumenAngkaKredit.status = true
          this.inputError.dokumenAngkaKredit.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataAngkaKredit.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumenAngkaKredit.status = true
          this.inputError.dokumenAngkaKredit.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataAngkaKredit.dokumen = ""
        } else {
          this.inputError.dokumenAngkaKredit.status = false
          this.dataAngkaKredit.dokumen = await this.getBase64(item.target.files[0])
          this.changeDokumen = true
        }
      }
    },
    async onUsulkan() {
      this.whereError()
      if (!this.isFulfilled) return
      if (!this.changeDokumen) {
        if (this.streamDokumen.dokumen !== "") this.dataAngkaKredit.dokumen = this.streamDokumen.dokumen
        else {
          await this.getStreamDokumen().then(res => {
            this.dataAngkaKredit.dokumen = res.data
          })
        }
      }
      this.dataAngkaKredit.idPegawai = this.$store.getters.getIdPegawai
      this.dataAngkaKredit.date = Date.now()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/angka-kredit" : `/angka-kredit/${this.dataAngkaKredit.id}`
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataAngkaKredit), u)
        }
      }).then(res => {
        let data = res.data
        this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: parseInt(data.status) === 2 || data.status === true ? "Success" : "Failed",
          message: data.message
        })
      })
    }
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataDetail().then(res => {
        this.loading = false
        let data = res.data
        this.jabatan = data.message.jabatan
        this.jenisAngkaKredit = data.message.jenisAngkaKredit
        this.fileCategory = data.message.dokumenKategori
        this.dataAngkaKredit = data.message.dataAngkaKredit[0]
      })
    } else {
      this.getDataCreated().then(res => {
        this.loading = false
        let data = res.data
        this.jabatan = data.message.jabatan
        this.jenisAngkaKredit = data.message.jenisAngkaKredit
        this.fileCategory = data.message.dokumenKategori
      })
    }
  }
}
</script>