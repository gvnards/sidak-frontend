<template>
  <ModalHeaderFooter :header-title="'Anak'" :header-subtitle="'anak'" :illustration="'IllustrationDataKeluarga'" @onUsulkan="onUsulkan()">
    <ShimmeringItem v-if="loading" :layouts="[12,6,6,6,6,6,6,12]" />
    <div v-else>
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
            <small class="text-red" v-if="inputError.tanggalDokumenAkta.status"><b>*{{ inputError.tanggalDokumenAkta.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="form-group text-left" style="margin-bottom: -4px;">
        <label for="fieldDokumenStatusAnak">Dokumen Akta Kelahiran</label>
      </div>
      <div class="row row-form" v-if="(getModalMethod === 'Ubah' && dataAnak.idDokumen !== null)">
        <div class="col-12">
          <div class="btn btn-sm btn-block btn-secondary" @click="btnGetStreamDokumen()" style="font-weight: 500;">{{ dataAnak.idDokumen === null ? 'Belum Ada Dokumen' : 'Lihat Dokumen' }}</div>
          <iframe v-if="streamDokumen.show" :src="streamDokumen.dokumen" frameborder="0" style="width: 100%; height: 600px; margin-top: 6px;"></iframe>
        </div>
        <div class="col-12" v-if="!changeDokumen">
          <p class="text-center" style="margin: 6px 0px;">atau</p>
          <div class="btn btn-sm btn-block btn-outline-secondary" @click="changeDokumen = true" style="font-weight: 500;">Ganti Dokumen</div>
        </div>
      </div>
      <div class="row row-form" v-if="getModalMethod === 'Tambah' || changeDokumen || (getModalMethod === 'Ubah' && dataAnak.idDokumen === null)">
        <div class="col-12">
          <div class="form-group text-left">
            <div class="custom-file">
              <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenStatusAnak" @change="onChangeFile">
              <label class="custom-file-label" for="fieldDokumenStatusAnak" :class="inputError.dokumenAkta.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumenAkta.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenAkta.status ? inputError.dokumenAkta.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
        <div class="col-12" v-if="dataAnak.dokumen !== '' && dataAnak.dokumen !== null">
          <iframe :src="dataAnak.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
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
      dataOrangTua: [],
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
      let dok = true
      if (this.getModalMethod === "Tambah") {
        if (this.dataAnak.dokumen === "") dok = false
      } else {
        if (this.dataAnak.idDokumen === null && this.dataAnak.dokumen === "") dok = false
        else dok = !(this.dataAnak.dokumen !== "" ^ this.changeDokumen)
      }
      return this.dataAnak.nama !== "" && this.dataAnak.tempatLahir !== "" && this.dataAnak.tanggalLahir !== "" && this.dataAnak.idOrangTua !== 0 && this.dataAnak.idStatusAnak !== 0 && this.dataAnak.nomorDokumen !== "" && this.dataAnak.tanggalDokumen !== "" && this.dataAnak.tanggalDokumen !== "" && dok
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
        url: `${env.VITE_BACKEND_URL}/dokumen/${this.dataAnak.idDokumen}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    whereError() {
      this.inputError.nama.status = this.dataAnak.nama === ""
      this.inputError.nama.description = this.dataAnak.nama === "" ? "Nama harus diisi" : ""
      this.inputError.tempatLahir.status = this.dataAnak.tempatLahir === ""
      this.inputError.tempatLahir.description = this.dataAnak.tempatLahir === "" ? "Tempat lahir harus diisi" : ""
      this.inputError.tanggalLahir.status = this.dataAnak.tanggalLahir === ""
      this.inputError.tanggalLahir.description = this.dataAnak.tanggalLahir === "" ? "Tanggal lahir harus diisi" : ""
      this.inputError.dataOrangTua.status = this.dataAnak.idOrangTua === 0
      this.inputError.dataOrangTua.description = this.dataAnak.idOrangTua === 0 ? "Orang tua harus diisi" : ""
      this.inputError.statusAnak.status = this.dataAnak.idStatusAnak === 0
      this.inputError.statusAnak.description = this.dataAnak.idStatusAnak === 0 ? "Status anak harus diisi" : ""
      this.inputError.nomorDokumenAkta.status = this.dataAnak.nomorDokumen === ""
      this.inputError.nomorDokumenAkta.description = this.dataAnak.nomorDokumen === "" ? "Nomor dokumen akta kelahiran harus diisi" : ""
      this.inputError.tanggalDokumenAkta.status = this.dataAnak.tanggalDokumen === ""
      this.inputError.tanggalDokumenAkta.description = this.dataAnak.tanggalDokumen === "" ? "Tanggal dokumen akta kelahiran harus diisi" : ""
      if (this.getModalMethod === "Tambah") {
        if (this.dataAnak.dokumen === "") {
          this.inputError.dokumenAkta.status = true
          this.inputError.dokumenAkta.description = this.inputError.dokumenAkta.status ? "Dokumen akta kelahiran harus diisi" : ""
        }
      } else {
        if (this.dataAnak.idDokumen === null && this.dataAnak.dokumen === "") {
          this.inputError.dokumenAkta.status = true
          this.inputError.dokumenAkta.description = this.inputError.dokumenAkta.status ? "Dokumen akta kelahiran harus diisi" : ""
        } else {
          this.inputError.dokumenAkta.status = !!(this.dataAnak.dokumen !== "" ^ this.changeDokumen)
          this.inputError.dokumenAkta.description = this.inputError.dokumenAkta.status ? "Dokumen akta kelahiran harus diisi" : ""
        }
      }
    },
    async onUsulkan() {
      if (!this.isFulfilled) return this.whereError()
      if (!this.changeDokumen) {
        if (this.streamDokumen.dokumen !== "") this.dataAnak.dokumen = this.streamDokumen.dokumen
        else {
          await this.getStreamDokumen().then(res => {
            this.dataAnak.dokumen = res.data
          })
        }
      }
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataAnak.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-anak" : `/data-anak/${this.dataAnak.id}`
      this.dataAnak.date = Date.now()
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
    getDataAnakDetail() {
      this.loading = true
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-anak/detail/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.dataAnak = data.message.dataAnak[0]
        this.fileCategory = data.message.dokumenKategori
        this.statusAnak = data.message.dataStatusAnak
        this.dataOrangTua = data.message.dataOrangTua
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
          this.changeDokumen = true
        }
      }
    },
    getDataCreated() {
      this.loading = true
      axios({
        url: `${env.VITE_BACKEND_URL}/data-anak/created/${this.$store.getters.getIdPegawai}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.fileCategory = data.message.dokumenKategori
        this.statusAnak = data.message.dataStatusAnak
        this.dataOrangTua = data.message.dataOrangTua
      })
    }
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataAnakDetail()
    } else {
      this.getDataCreated()
    }
  },
  destroyed() {
    this.$destroy()
  }
}
</script>