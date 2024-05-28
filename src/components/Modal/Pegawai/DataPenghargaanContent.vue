<template>
  <ModalHeaderFooter :header-title="'Penghargaan'" :header-subtitle="'penghargaan'" :illustration="'IllustrationDataPenghargaan'" @onUsulkan="onUsulkan()">
    <ShimmeringItem v-if="loading" :layouts="[6,6,6,6,12]" />
    <div v-else>
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldJenisPenghargaan">Jenis Penghargaan</label>
            <select class="custom-select" id="fieldJenisPenghargaan" :class="inputError.jenisPenghargaan.status ? 'form-error' : ''" v-model="dataPenghargaan.idDaftarJenisPenghargaan">
              <option value="0" selected disabled>Pilih Jenis Penghargaan</option>
              <option :selected="item.id === dataPenghargaan.idDaftarJenisPenghargaan" v-for="item in daftarJenisPenghargaan" :key="item.id" :value="item.id">
                {{ item.jenisPenghargaan }}
              </option>
            </select>
            <small class="text-red" v-if="inputError.jenisPenghargaan.status"><b>*{{ inputError.jenisPenghargaan.description }}</b></small>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldTahunPenghargaan">Tahun Perolehan</label>
            <input  :class="inputError.tahunPenghargaan.status ? 'form-error' : ''" id="fieldTahunPenghargaan" type="number" min="0" class="form-control" placeholder="2000" v-model="dataPenghargaan.tahunPenghargaan">
            <small class="text-red" v-if="inputError.tahunPenghargaan.status"><b>*{{ inputError.tahunPenghargaan.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="fieldNomorSk">Nomor Dokumen</label>
            <input  :class="inputError.nomorDokumen.status ? 'form-error' : ''" type="text" id="fieldNomorSk" class="form-control" placeholder="XXXX/XXXX/XXXX" v-model="dataPenghargaan.nomorDokumen">
            <small class="text-red" v-if="inputError.nomorDokumen.status"><b>*{{ inputError.nomorDokumen.description }}</b></small>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="fieldTanggalSk">Tanggal Dokumen</label>
            <input  :class="inputError.tanggalDokumen.status ? 'form-error' : ''" type="date" id="fieldTanggalSk" class="form-control" v-model="dataPenghargaan.tanggalDokumen">
            <small class="text-red" v-if="inputError.tanggalDokumen.status"><b>*{{ inputError.tanggalDokumen.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="form-group text-left" style="margin-bottom: -4px;">
        <label for="fieldDokumenSk">Dokumen Penghargaan</label>
      </div>
      <div class="row row-form" v-if="(getModalMethod === 'Ubah' && dataPenghargaan.idDokumen !== null)">
        <div class="col-12">
          <div class="btn btn-sm btn-block btn-secondary" @click="btnGetStreamDokumen()" style="font-weight: 500;">{{ dataPenghargaan.idDokumen === null ? 'Belum Ada Dokumen' : 'Lihat Dokumen' }}</div>
          <iframe v-if="streamDokumen.show" :src="streamDokumen.dokumen" frameborder="0" style="width: 100%; height: 600px; margin-top: 6px;"></iframe>
        </div>
        <div class="col-12" v-if="!changeDokumen">
          <p class="text-center" style="margin: 6px 0px;">atau</p>
          <div class="btn btn-sm btn-block btn-outline-secondary" @click="changeDokumen = true" style="font-weight: 500;">Ganti Dokumen</div>
        </div>
      </div>
      <div class="row row-form" v-if="getModalMethod === 'Tambah' || changeDokumen || (getModalMethod === 'Ubah' && dataPenghargaan.idDokumen === null)">
        <div class="col-12">
          <div class="form-group text-left">
            <div class="custom-file">
              <input  :class="inputError.dokumen.status ? 'form-error' : ''" type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenSk" @change="onChangeFile">
              <label class="custom-file-label" for="fieldDokumenSk" :class="inputError.dokumen.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumen.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumen.status ? inputError.dokumen.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
        <div class="col-12">
          <iframe v-if="dataPenghargaan.dokumen !== '' && dataPenghargaan.dokumen !== null" :src="dataPenghargaan.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
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
      oldData: {},
      loading: true,
      dataPenghargaan: {
        idDaftarJenisPenghargaan: 0,
        tahunPenghargaan: 0,
        nomorDokumen: "",
        tanggalDokumen: "",
        dokumen: ""
      },
      inputError: {
        jenisPenghargaan: {
          status: false,
          description: "Jenis penghargaan harus dipilih"
        },
        tahunPenghargaan: {
          status: false,
          description: "Tahun perolehan penghargaan harus diisi"
        },
        nomorDokumen: {
          status: false,
          description: "Nomor dokumen harus diisi"
        },
        tanggalDokumen: {
          status: false,
          description: "Tanggal dokumen harus diisi"
        },
        dokumen: {
          status: false,
          description: "Dokumen harus diisi"
        },
      },
      fileCategory: {},
      daftarJenisPenghargaan: [],
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
    isFullfiled() {
      let dok = true
      if (this.getModalMethod === "Tambah") {
        if (this.dataPenghargaan.dokumen === "") dok = false
      } else {
        if (this.dataPenghargaan.idDokumen === null && this.dataPenghargaan.dokumen === "") dok = false
        else dok = !(this.dataPenghargaan.dokumen !== "" ^ this.changeDokumen)
      }
      return this.dataPenghargaan.idDaftarJenisPenghargaan !== 0 && this.dataPenghargaan.tahunPenghargaan !== 0 && this.dataPenghargaan.nomorDokumen !== "" && this.dataPenghargaan.tanggalDokumen !== "" && dok
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
        url: `${env.VITE_BACKEND_URL}/dokumen/${this.dataPenghargaan.idDokumen}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    whereError() {
      this.inputError.jenisPenghargaan.status = this.dataPenghargaan.idDaftarJenisPenghargaan === 0
      this.inputError.tahunPenghargaan.status = this.dataPenghargaan.tahunPenghargaan === 0
      this.inputError.nomorDokumen.status = this.dataPenghargaan.nomorDokumen === ""
      this.inputError.tanggalDokumen.status = this.dataPenghargaan.tanggalDokumen === ""
      if (this.getModalMethod === "Tambah") {
        if (this.dataPenghargaan.dokumen === "") {
          this.inputError.dokumen.status = true
          this.inputError.dokumen.description = this.inputError.dokumen.status ? "Dokumen harus diisi" : ""
        }
      } else {
        if (this.dataPenghargaan.idDokumen === null && this.dataPenghargaan.dokumen === "") {
          this.inputError.dokumen.status = true
          this.inputError.dokumen.description = this.inputError.dokumen.status ? "Dokumen harus diisi" : ""
        } else {
          this.inputError.dokumen.status = !!(this.dataPenghargaan.dokumen !== "" ^ this.changeDokumen)
          this.inputError.dokumen.description = this.inputError.dokumen.status ? "Dokumen harus diisi" : ""
        }
      }
    },
    async onUsulkan() {
      if (!this.isFullfiled) return this.whereError()
      if (!this.doesDataChange(this.oldData, this.dataPenghargaan)) {
        this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: "Failed",
          message: "Data tidak ada perubahan."
        })
        return
      }
      if (!this.changeDokumen) {
        if (this.streamDokumen.dokumen !== "") this.dataPenghargaan.dokumen = this.streamDokumen.dokumen
        else {
          await this.getStreamDokumen().then(res => {
            this.dataPenghargaan.dokumen = res.data
          })
        }
      }
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataPenghargaan.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-penghargaan" : `/data-penghargaan/${this.dataPenghargaan.id}`
      this.dataPenghargaan.date = Date.now()
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataPenghargaan), u)
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
    },
    getDataPenghargaanCreated() {
      this.loading = true
      axios({
        url: `${env.VITE_BACKEND_URL}/data-penghargaan/created`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.daftarJenisPenghargaan = data.message.jenisPenghargaan
        this.fileCategory = data.message.dokumenKategori
      })
    },
    getDataPenghargaanDetail() {
      this.loading = true
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-penghargaan/detail/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.daftarJenisPenghargaan = data.message.jenisPenghargaan
        this.fileCategory = data.message.dokumenKategori
        this.dataPenghargaan = data.message.dataPenghargaan[0]
        this.oldData = {...this.dataPenghargaan}
      })
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumen.status = true
          this.inputError.dokumen.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB`
          item.target.value = null
          this.dataPenghargaan.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumen.status = true
          this.inputError.dokumen.description = "Dokumen harus berjenis PDF"
          item.target.value = null
          this.dataPenghargaan.dokumen = ""
        } else {
          this.inputError.dokumen.status = false
          this.dataPenghargaan.dokumen = await this.getBase64(item.target.files[0])
          this.changeDokumen = true
        }
      }
    },
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataPenghargaanDetail()
    } else {
      this.getDataPenghargaanCreated()
    }
  }
}
</script>