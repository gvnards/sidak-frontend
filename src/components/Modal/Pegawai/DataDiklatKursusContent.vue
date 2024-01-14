<template>
  <ModalHeaderFooter :header-title="'Diklat/Kursus'" :header-subtitle="'diklat/kursus'" :illustration="'IllustrationDataDiklatKursus'" @onUsulkan="onUsulkan()">
    <ShimmeringItem v-if="loading" :layouts="[12,12,12,12,6,6,12,12,12,12]" />
    <div v-else>
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
            <select :disabled="dataDiklatKursus.idJenisDiklat == 0" class="custom-select" id="fieldDaftarDiklatKursus" :class="inputError.daftarDiklatKursus.status ? 'form-error' : ''" v-model="dataDiklatKursus.idDaftarDiklat">
              <option value="0" selected disabled>{{ dataDiklatKursus.idJenisDiklat == 0 ? '-- Jenis Diklat/Kursus Belum Dipilih --' : '-- Pilih Daftar Diklat/Kursus --' }}</option>
              <option v-show="dataDiklatKursus.idJenisDiklat > 2 ? item.idJenisDiklat > 2 : dataDiklatKursus.idJenisDiklat == item.idJenisDiklat" :selected="item.id === dataDiklatKursus.idDaftarDiklat" v-for="item in daftarDiklatKursus" :key="item.id" :value="item.id">
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
        <div class="col-12">
          <div class="form-group">
            <label for="fieldLamaJamDiklatKursus">Lama Diklat/Kursus(jam)</label>
            <input type="number" min="0" id="fieldLamaJamDiklatKursus" :class="inputError.lamaJamDiklatKursus.status ? 'form-error' : ''" class="form-control" v-model="dataDiklatKursus.lamaDiklat" placeholder="40">
            <small class="text-red" v-if="inputError.lamaJamDiklatKursus.status"><b>*{{ inputError.lamaJamDiklatKursus.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="fieldTanggalDiklatKursus">Tanggal Mulai Diklat/Kursus</label>
            <input type="date" id="fieldTanggalDiklatKursus" :class="inputError.tanggalDiklatKursus.status ? 'form-error' : ''" class="form-control" v-model="dataDiklatKursus.tanggalDiklat">
            <small class="text-red" v-if="inputError.tanggalDiklatKursus.status"><b>*{{ inputError.tanggalDiklatKursus.description }}</b></small>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="fieldTanggalSelesaiDiklatKursus">Tanggal Selesai Diklat/Kursus</label>
            <input type="date" id="fieldTanggalSelesaiDiklatKursus" :class="inputError.tanggalSelesaiDiklatKursus.status ? 'form-error' : ''" class="form-control" v-model="dataDiklatKursus.tanggalSelesaiDiklat">
            <small class="text-red" v-if="inputError.tanggalSelesaiDiklatKursus.status"><b>*{{ inputError.tanggalSelesaiDiklatKursus.description }}</b></small>
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
              <label for="fieldNomorDokumen">Nomor Dokumen Diklat/Kursus</label>
              <input
                :class="inputError.nomorDokumen.status ? 'form-error' : ''"
                type="text"
                class="form-control"
                id="fieldNomorDokumen"
                placeholder="Nomor Dokumen Diklat/Kursus"
                v-model="dataDiklatKursus.nomorDokumen"
              />
              <small class="text-red" v-if="inputError.nomorDokumen.status"><b>*{{ inputError.nomorDokumen.description }}</b></small>
            </div>
          </div>
      </div>
      <div class="form-group text-left" style="margin-bottom: -4px;">
        <label for="fieldDokumenDiklat">Dokumen Diklat</label>
      </div>
      <div class="row row-form" v-if="(getModalMethod === 'Ubah' && dataDiklatKursus.idDokumen !== null)">
        <div class="col-12">
          <div class="btn btn-sm btn-block btn-secondary" @click="btnGetStreamDokumen()" style="font-weight: 500;">{{ dataDiklatKursus.idDokumen === null ? 'Belum Ada Dokumen' : 'Lihat Dokumen' }}</div>
          <iframe v-if="streamDokumen.show" :src="streamDokumen.dokumen" frameborder="0" style="width: 100%; height: 600px; margin-top: 6px;"></iframe>
        </div>
        <div class="col-12" v-if="!changeDokumen">
          <p class="text-center" style="margin: 6px 0px;">atau</p>
          <div class="btn btn-sm btn-block btn-outline-secondary" @click="changeDokumen = true" style="font-weight: 500;">Ganti Dokumen</div>
        </div>
      </div>
      <div class="row row-form" v-if="getModalMethod === 'Tambah' || changeDokumen || (getModalMethod === 'Ubah' && dataDiklatKursus.idDokumen === null)">
        <div class="col-12">
          <div class="form-group text-left">
            <div class="custom-file">
              <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenDiklat" @change="onChangeFile">
              <label class="custom-file-label" for="fieldDokumenDiklat" :class="inputError.dokumenDiklat.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumenDiklat.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenDiklat.status ? inputError.dokumenDiklat.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
        <div class="col-12">
          <iframe v-if="dataDiklatKursus.dokumen !== '' && dataDiklatKursus.dokumen !== null" :src="dataDiklatKursus.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
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
      dataDiklatKursus: {
        idJenisDiklat: 0,
        idDaftarDiklat: 0,
        namaDiklat: "",
        lamaDiklat: 0,
        tanggalDiklat: "",
        tanggalSelesaiDiklat: "",
        idDaftarInstansiDiklat: 0,
        institusiPenyelenggara: "",
        nomorDokumen: "",
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
        tanggalSelesaiDiklatKursus: {
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
        nomorDokumen: {
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
      daftarInstansi: [],
      changeDokumen: false,
      streamDokumen: {
        show: false,
        dokumen: ""
      },
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
        url: `${env.VITE_BACKEND_URL}/dokumen/${this.dataDiklatKursus.idDokumen}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    whereError() {
      let jenisAndDaftarIsCorect = this.daftarDiklatKursus.filter(el => { return parseInt(el.idJenisDiklat > 2) ? parseInt(el.idJenisDiklat > 2) : parseInt(el.idJenisDiklat) === parseInt(this.dataDiklatKursus.idJenisDiklat) && parseInt(el.id) === parseInt(this.dataDiklatKursus.idDaftarDiklat) })
      this.inputError.jenisDiklatKursus.status = this.dataDiklatKursus.idJenisDiklat === 0 || jenisAndDaftarIsCorect.length <= 0
      this.inputError.jenisDiklatKursus.description = this.dataDiklatKursus.idJenisDiklat === 0 ? "Jenis diklat/kursus harus dipilih" : jenisAndDaftarIsCorect.length <= 0 ? "Jenis diklat/kursus atau daftar diklat tidak valid" : ""
      this.inputError.daftarDiklatKursus.status = this.dataDiklatKursus.idDaftarDiklat === 0 || jenisAndDaftarIsCorect.length <= 0
      this.inputError.daftarDiklatKursus.description = this.dataDiklatKursus.idDaftarDiklat === 0 ? "Daftar diklat/kursus harus dipilih" : jenisAndDaftarIsCorect.length <= 0 ? "Jenis diklat/kursus atau daftar diklat tidak valid" : ""
      this.inputError.namaDiklatKursus.status = this.dataDiklatKursus.namaDiklat === ""
      this.inputError.namaDiklatKursus.description = this.dataDiklatKursus.namaDiklat === "" ? "Nama diklat/kursus harus diisi" : ""
      this.inputError.lamaJamDiklatKursus.status = this.dataDiklatKursus.lamaDiklat === 0
      this.inputError.lamaJamDiklatKursus.description = this.dataDiklatKursus.lamaDiklat === 0 ? "Lama diklat/kursus harus diisi" : ""
      this.inputError.tanggalDiklatKursus.status = this.dataDiklatKursus.tanggalDiklat === ""
      this.inputError.tanggalDiklatKursus.description = this.dataDiklatKursus.tanggalDiklat === "" ? "Tanggal mulai diklat/kursus harus diisi" : ""
      this.inputError.tanggalSelesaiDiklatKursus.status = this.dataDiklatKursus.tanggalDiklat === ""
      this.inputError.tanggalSelesaiDiklatKursus.description = this.dataDiklatKursus.tanggalDiklat === "" ? "Tanggal selesai diklat/kursus harus diisi" : ""
      this.inputError.instansi.status = this.dataDiklatKursus.idDaftarInstansiDiklat === 0
      this.inputError.instansi.description = this.dataDiklatKursus.idDaftarInstansiDiklat === 0 ? "Instansi harus dipilih" : ""
      this.inputError.institusiPenyelenggara.status = this.dataDiklatKursus.institusiPenyelenggara === ""
      this.inputError.institusiPenyelenggara.description = this.dataDiklatKursus.institusiPenyelenggara === "" ? "Institusi penyelenggara harus diisi" : ""
      this.inputError.nomorDokumen.status = this.dataDiklatKursus.nomorDokumen === ""
      this.inputError.nomorDokumen.description = this.dataDiklatKursus.nomorDokumen === "" ? "Nomor dokumen diklat/kursus harus diisi" : ""
      if (this.getModalMethod === "Tambah") {
        if (this.dataDiklatKursus.dokumen === "") {
          this.inputError.dokumenDiklat.status = true
          this.inputError.dokumenDiklat.description = this.inputError.dokumenDiklat.status ? "Dokumen harus diisi" : ""
        }
      } else {
        if (this.dataDiklatKursus.idDokumen === null && this.dataDiklatKursus.dokumen === "") {
          this.inputError.dokumenDiklat.status = true
          this.inputError.dokumenDiklat.description = this.inputError.dokumenDiklat.status ? "Dokumen harus diisi" : ""
        } else {
          this.inputError.dokumenDiklat.status = !!(this.dataDiklatKursus.dokumen !== "" ^ this.changeDokumen)
          this.inputError.dokumenDiklat.description = this.inputError.dokumenDiklat.status ? "Dokumen diklat harus diunggah" : ""
        }
      }
    },
    async onUsulkan() {
      if (!this.isFulfilled) return this.whereError()
      if (!this.changeDokumen) {
        if (this.streamDokumen.dokumen !== "") this.dataDiklatKursus.dokumen = this.streamDokumen.dokumen
        else {
          await this.getStreamDokumen().then(res => {
            this.dataDiklatKursus.dokumen = res.data
          })
        }
      }
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataDiklatKursus.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-diklat" : `/data-diklat/${this.dataDiklatKursus.id}`
      this.dataDiklatKursus.date = Date.now()
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
        let data = res.data
        this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: parseInt(data.status) === 2 || data.status === true ? "Success" : "Failed",
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
    getDataDiklatKursusDetail() {
      this.loading = true
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-diklat/detail/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.dataDiklatKursus = data.message.dataDiklat[0]
        this.daftarDiklatKursus = data.message.daftarDiklat
        this.jenisDiklatKursus = data.message.jenisDiklat
        this.daftarInstansi = data.message.daftarInstansiDiklat
        this.fileCategory = data.message.dokumenKategori
      })
    },
    getDataDiklatCreated() {
      this.loading = true
      axios({
        url: `${env.VITE_BACKEND_URL}/data-diklat/created`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.daftarDiklatKursus = data.message.daftarDiklat
        this.jenisDiklatKursus = data.message.jenisDiklat
        this.daftarInstansi = data.message.daftarInstansiDiklat
        this.fileCategory = data.message.dokumenKategori
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
          this.changeDokumen = true
        }
      }
    },
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
      let dok = true
      if (this.getModalMethod === "Tambah") {
        if (this.dataDiklatKursus.dokumen === "") dok = false
      } else {
        if (this.dataDiklatKursus.idDokumen === null && this.dataDiklatKursus.dokumen === "") dok = false
        else dok = !(this.dataDiklatKursus.dokumen !== "" ^ this.changeDokumen)
      }
      let jenisAndDaftarIsCorect = this.daftarDiklatKursus.filter(el => { return parseInt(el.idJenisDiklat > 2) ? parseInt(el.idJenisDiklat > 2) : parseInt(el.idJenisDiklat) === parseInt(this.dataDiklatKursus.idJenisDiklat) && parseInt(el.id) === parseInt(this.dataDiklatKursus.idDaftarDiklat) })
      return this.dataDiklatKursus.idJenisDiklat !== 0 && this.dataDiklatKursus.idDaftarDiklat !== 0 && jenisAndDaftarIsCorect.length > 0 && this.dataDiklatKursus.namaDiklat !== "" && this.dataDiklatKursus.lamaDiklat !== 0 && this.dataDiklatKursus.tanggalDiklat !== 0 && this.dataDiklatKursus.idDaftarInstansiDiklat !== 0 && this.dataDiklatKursus.institusiPenyelenggara !== "" && dok
    }
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataDiklatKursusDetail()
    } else {
      this.getDataDiklatCreated()
    }
  }
}
</script>