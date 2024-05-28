<template>
  <ModalHeaderFooter :header-title="'Pendidikan'" :header-subtitle="'pendidikan'" :illustration="'IllustrationDataPendidikan'" @onUsulkan="onUsulkan()">
    <ShimmeringItem v-if="loading" :layouts="[12,6,6,12,6,6,6,6,6,6,12,12]" />
    <div v-else>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldJenisPendidikan">Jenis Pendidikan</label>
            <div class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ textJenisPendidikan }}</div>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-5">
          <div class="form-group text-left">
            <label for="fieldTingkatPendidikan">Tingkat Pendidikan</label>
            <div class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ textTingkatPendidikan }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-7">
          <div class="form-group my-form-group">
            <label>Pendidikan</label>
            <div class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ textPendidikan }}</div>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldNamaSekolah">Nama Sekolah</label>
            <input type="text" class="form-control" id="fieldNamaSekolah" :class="inputError.namaSekolah.status ? 'form-error' : ''" placeholder="Nama Sekolah Anda" v-model="dataPendidikan.namaSekolah">
            <small class="text-red" v-if="inputError.namaSekolah.status"><b>*{{ inputError.namaSekolah.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldGelarDepan">Gelar Depan</label>
            <div class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ dataPendidikan.gelarDepan === "" || dataPendidikan.gelarDepan === null ? "-" : dataPendidikan.gelarDepan }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldGelarBelakang">Gelar Belakang</label>
            <div class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ dataPendidikan.gelarBelakang === "" || dataPendidikan.gelarBelakang === null ? "-" : dataPendidikan.gelarBelakang }}</div>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldTanggalLulus">Tanggal Lulus</label>
            <div class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ dataPendidikan.tanggalLulus }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="fieldTahunLulus">Tahun Lulus</label>
            <div class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ dataPendidikan.tahunLulus }}</div>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldNomorDokumen">Nomor Dokumen Ijazah</label>
            <input
              :class="inputError.nomorDokumenIjazah.status ? 'form-error' : ''"
              type="text"
              class="form-control"
              id="fieldNomorDokumen"
              placeholder="Nomor Dokumen Ijazah Pendidikan"
              v-model="dataPendidikan.nomorDokumen"
            />
            <small class="text-red" v-if="inputError.nomorDokumenIjazah.status"><b>*{{ inputError.nomorDokumenIjazah.description }}</b></small>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldTanggalDokumenIjazah">Tanggal Dokumen Ijazah</label>
            <div class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ dataPendidikan.tanggalDokumen }}</div>
          </div>
        </div>
      </div>
      <div class="form-group text-left" style="margin-bottom: -4px;">
        <label for="fieldDokumenIjazah">Dokumen Ijazah</label>
      </div>
      <div class="row row-form" v-if="(getModalMethod === 'Ubah' && dataPendidikan.idDokumen !== null)">
        <div class="col-12">
          <div class="btn btn-sm btn-block btn-secondary" @click="btnGetStreamDokumen('ijazah')" style="font-weight: 500;">{{ dataPendidikan.idDokumen === null ? 'Belum Ada Dokumen' : 'Lihat Dokumen' }}</div>
          <iframe v-if="streamDokumen.ijazah.show" :src="streamDokumen.ijazah.dokumen" frameborder="0" style="width: 100%; height: 600px; margin-top: 6px;"></iframe>
        </div>
        <div class="col-12" v-if="!changeDokumen.ijazah">
          <p class="text-center" style="margin: 6px 0px;">atau</p>
          <div class="btn btn-sm btn-block btn-outline-secondary" @click="changeDokumen.ijazah = true" style="font-weight: 500;">Ganti Dokumen</div>
        </div>
      </div>
      <div class="row row-form" v-if="getModalMethod === 'Tambah' || changeDokumen.ijazah || (getModalMethod === 'Ubah' && dataPendidikan.idDokumen === null)">
        <div class="col-12">
          <div class="form-group text-left">
            <div class="custom-file">
              <input @click="documentType = 'ijazah'" type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenIjazah" @change="onChangeFile">
              <label class="custom-file-label" for="fieldDokumenIjazah" :class="inputError.dokumen.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumen.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumen.status ? inputError.dokumen.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
        <div class="col-12" v-if="dataPendidikan.dokumen !== '' && dataPendidikan.dokumen !== null">
          <iframe :src="dataPendidikan.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
        </div>
      </div>
      <!-- DASDASDASD -->
      <div class="form-group text-left" style="margin-bottom: -4px;">
        <label for="fieldDokumenTranskripNilai">Dokumen Transkrip Nilai</label>
      </div>
      <div class="row row-form" v-if="(getModalMethod === 'Ubah' && dataPendidikan.idDokumenTranskrip !== null)">
        <div class="col-12">
          <div class="btn btn-sm btn-block btn-secondary" @click="btnGetStreamDokumen('transkrip')" style="font-weight: 500;">{{ dataPendidikan.idDokumenTranskrip === null ? 'Belum Ada Dokumen' : 'Lihat Dokumen' }}</div>
          <iframe v-if="streamDokumen.transkrip.show" :src="streamDokumen.transkrip.dokumen" frameborder="0" style="width: 100%; height: 600px; margin-top: 6px;"></iframe>
        </div>
        <div class="col-12" v-if="!changeDokumen.transkrip">
          <p class="text-center" style="margin: 6px 0px;">atau</p>
          <div class="btn btn-sm btn-block btn-outline-secondary" @click="changeDokumen.transkrip = true" style="font-weight: 500;">Ganti Dokumen</div>
        </div>
      </div>
      <div class="row row-form" v-if="getModalMethod === 'Tambah' || changeDokumen.transkrip || (getModalMethod === 'Ubah' && dataPendidikan.idDokumenTranskrip === null)">
        <div class="col-12">
          <div class="form-group text-left">
            <div class="custom-file">
              <input @click="documentType = 'transkrip'" type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenTranskripNilai" @change="onChangeFile">
              <label class="custom-file-label" for="fieldDokumenTranskripNilai" :class="inputError.dokumenTranskrip.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumenTranskrip.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenTranskrip.status ? inputError.dokumenTranskrip.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
        <div class="col-12" id="dokumenTranskrip" v-if="dataPendidikan.dokumenTranskrip !== '' && dataPendidikan.dokumenTranskrip !== null">
          <iframe :src="dataPendidikan.dokumenTranskrip" frameborder="0" style="width: 100%; height: 600px;"></iframe>
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
      dataPendidikan: {
        idJenisPendidikan: 0,
        idTingkatPendidikan: 0,
        idDaftarPendidikan: 0,
        namaSekolah: "",
        gelarDepan: "",
        gelarBelakang: "",
        tanggalLulus: "",
        tahunLulus: "",
        nomorDokumen: "",
        tanggalDokumen: "",
        dokumen: "",
        dokumenTranskrip: ""
      },
      documentType: "",
      inputError: {
        jenisPendidikan: {
          status: false,
          description: ""
        },
        tingkatPendidikan: {
          status: false,
          description: ""
        },
        pendidikan: {
          status: false,
          description: ""
        },
        namaSekolah: {
          status: false,
          description: ""
        },
        gelarDepan: {
          status: false,
          description: ""
        },
        gelarBelakang: {
          status: false,
          description: ""
        },
        tanggalLulus: {
          status: false,
          description: ""
        },
        tahunLulus: {
          status: false,
          description: ""
        },
        nomorDokumenIjazah: {
          status: false,
          description: ""
        },
        tanggalDokumenIjazah: {
          status: false,
          description: ""
        },
        dokumen: {
          status: false,
          description: ""
        },
        dokumenTranskrip: {
          status: false,
          description: ""
        }
      },
      fileCategory: {},
      dataJenisPendidikan: [],
      dataTingkatPendidikan: [],
      pendidikan: [],
      pendidikanSelectedText: "-- Pilih Tingkat Pendidikan Dahulu --",
      searchValue: "",
      isShowDaftarPendidikan: false,
      afterCreated: true,
      changeDokumen: {
        ijazah: false,
        transkrip: false
      },
      streamDokumen: {
        ijazah: {
          show: false,
          dokumen: ""
        },
        transkrip: {
          show: false,
          dokumen: ""
        },
      },
    }
  },
  computed: {
    textJenisPendidikan() {
      let dt = this.dataJenisPendidikan.filter(el => parseInt(el.id) === parseInt(this.dataPendidikan.idJenisPendidikan))
      return dt.length > 0 ? dt[0].nama : "-"
    },
    textTingkatPendidikan() {
      let dt = this.dataTingkatPendidikan.filter(el => parseInt(el.id) === parseInt(this.dataPendidikan.idTingkatPendidikan))
      return dt.length > 0 ? dt[0].nama : "-"
    },
    textPendidikan() {
      let dt = this.pendidikan.filter(el => parseInt(el.id) === parseInt(this.dataPendidikan.idDaftarPendidikan))
      return dt.length > 0 ? dt[0].nama : "-"
    },
    daftarPendidikan() {
      return this.pendidikan.filter(el => parseInt(el.idTingkatPendidikan) === parseInt(this.dataPendidikan.idTingkatPendidikan))
    },
    getModalMethod() {
      let modalMethod = ""
      let getModalMethod = this.$store.getters.getModalMethod
      if (getModalMethod === "CREATE") modalMethod = "Tambah"
      else if (getModalMethod === "UPDATE") modalMethod = "Ubah"
      else if (getModalMethod === "DELETE") modalMethod = "Hapus"
      return modalMethod
    },
    isFulfilled() {
      let dok = {
        ijazah: true,
        transkrip: true
      }
      if (this.getModalMethod === "Tambah") {
        if (this.dataPendidikan.dokumen === "") dok.ijazah = false
        if (this.dataPendidikan.dokumenTranskrip === "")  dok.transkrip = false
      } else {
        if (this.dataPendidikan.idDokumen === null && this.dataPendidikan.dokumen === "") dok.ijazah = false
        else dok.ijazah = !(this.dataPendidikan.dokumen !== "" ^ this.changeDokumen.ijazah)
        if (this.dataPendidikan.idDokumenTranskrip === null && this.dataPendidikan.dokumenTranskrip === "") dok.transkrip = false
        else dok.transkrip = !(this.dataPendidikan.dokumenTranskrip !== "" ^ this.changeDokumen.transkrip)
      }
      return this.dataPendidikan.namaSekolah !== "" && this.dataPendidikan.nomorDokumen !== "" && dok.ijazah && dok.transkrip
    }
  },
  methods: {
    btnGetStreamDokumen(dokumenName) {
      this.streamDokumen[dokumenName].show = !this.streamDokumen[dokumenName].show
      if (this.streamDokumen[dokumenName].dokumen !== "") return
      this.getStreamDokumen(dokumenName).then(res => {
        this.streamDokumen[dokumenName].dokumen = res.data
      })
    },
    async getStreamDokumen(dokumenName) {
      let idDokumen = dokumenName === "transkrip" ? this.dataPendidikan.idDokumenTranskrip : this.dataPendidikan.idDokumen
      return axios({
        url: `${env.VITE_BACKEND_URL}/dokumen/${idDokumen}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    whereError() {
      this.inputError.namaSekolah.status = this.dataPendidikan.namaSekolah === ""
      this.inputError.namaSekolah.description = this.dataPendidikan.namaSekolah === "" ? "Nama sekolah harus diisi" : ""
      this.inputError.nomorDokumenIjazah.status = this.dataPendidikan.nomorDokumen === ""
      this.inputError.nomorDokumenIjazah.description = this.dataPendidikan.nomorDokumen === "" ? "Nomor dokumen harus diisi" : ""
      if (this.getModalMethod === "Tambah") {
        if (this.dataPendidikan.dokumen === "") {
          this.inputError.dokumen.status = true
          this.inputError.dokumen.description = this.inputError.dokumen.status ? "Dokumen Ijazah harus diisi" : ""
        }
      } else {
        if (this.dataPendidikan.idDokumen === null && this.dataPendidikan.dokumen === "") {
          this.inputError.dokumen.status = true
          this.inputError.dokumen.description = this.inputError.dokumen.status ? "Dokumen Ijazah harus diisi" : ""
        } else {
          this.inputError.dokumen.status = !!(this.dataPendidikan.dokumen !== "" ^ this.changeDokumen.ijazah)
          this.inputError.dokumen.description = this.inputError.dokumen.status ? "Dokumen Ijazah harus diisi" : ""
        }
      }
      if (this.getModalMethod === "Tambah") {
        if (this.dataPendidikan.dokumenTranskrip === "") {
          this.inputError.dokumenTranskrip.status = true
          this.inputError.dokumenTranskrip.description = this.inputError.dokumenTranskrip.status ? "Dokumen Transkrip harus diisi" : ""
        }
      } else {
        if (this.dataPendidikan.idDokumenTranskrip === null && this.dataPendidikan.dokumenTranskrip === "") {
          this.inputError.dokumenTranskrip.status = true
          this.inputError.dokumenTranskrip.description = this.inputError.dokumenTranskrip.status ? "Dokumen Transkrip harus diisi" : ""
        } else {
          this.inputError.dokumenTranskrip.status = !!(this.dataPendidikan.dokumenTranskrip !== "" ^ this.changeDokumen.transkrip)
          this.inputError.dokumenTranskrip.description = this.inputError.dokumenTranskrip.status ? "Dokumen Transkrip harus diisi" : ""
        }
      }
    },
    onPendidikanSelected(item) {
      this.pendidikanSelectedText = item.nama
      this.dataPendidikan.idDaftarPendidikan = item.id
      this.isShowDaftarPendidikan = false
    },
    async onUsulkan() {
      if (!this.isFulfilled) return this.whereError()
      if (!this.doesDataChange(this.oldData, this.dataPendidikan)) {
        this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: "Failed",
          message: "Data tidak ada perubahan."
        })
        return
      }
      if (!this.changeDokumen.ijazah) {
        if (this.streamDokumen.ijazah.dokumen !== "") this.dataPendidikan.dokumen = this.streamDokumen.ijazah.dokumen
        else await this.getStreamDokumen("ijazah").then(res => {
          this.dataPendidikan.dokumen = res.data
        })
      }
      if (!this.changeDokumen.transkrip) {
        if (this.streamDokumen.transkrip.dokumen !== "") this.dataPendidikan.dokumenTranskrip = this.streamDokumen.transkrip.dokumen
        else await this.getStreamDokumen("transkrip").then(res => {
          this.dataPendidikan.dokumenTranskrip = res.data
        })
      }
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataPendidikan.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-pendidikan" : `/data-pendidikan/${this.dataPendidikan.id}`
      this.dataPendidikan.date = Date.now()
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataPendidikan), u)
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
      // .catch(() => {
      //   this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
      //   this.$store.commit("onModalFolder", "StatusCallback")
      //   this.$store.commit("onModalContent", "StatusCallback")
      //   this.$store.commit("onModalStatusCallback", {
      //     status: "Failed",
      //     message: "Terjadi kesalahan server. Silahkan menghubungi penyedia layanan Sidak."
      //   })
      // })
    },
    getDataPendidikanDetail() {
      this.loading = true
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-pendidikan/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.dataPendidikan = data.message.dataPendidikan[0]
        this.fileCategory = data.message.dokumenKategori
        this.dataJenisPendidikan = data.message.jenisPendidikan
        this.dataTingkatPendidikan = data.message.tingkatPendidikan
        this.pendidikan = data.message.daftarPendidikan
        let pendidikanSelectedText_ = (this.pendidikan.filter(el => parseInt(el.idTingkatPendidikan) === parseInt(this.dataPendidikan.idTingkatPendidikan) && parseInt(el.id) === parseInt(this.dataPendidikan.idDaftarPendidikan)))
        if (pendidikanSelectedText_.length > 0) {
          this.pendidikanSelectedText = pendidikanSelectedText_[0].nama
        } else {
          this.pendidikanSelectedText = "-- Pendidikan Tidak Tersedia --"
        }
        $("#dokumenTranskrip").empty()
        if (this.dataPendidikan.dokumenTranskrip !== "") {
          $("#dokumenTranskrip").append(`<iframe src="${this.dataPendidikan.dokumenTranskrip}" frameborder="0" style="width: 100%; height: 600px;"></iframe>`)
        }
        this.oldData = {...this.dataPendidikan}
      })
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError[this.documentType === "ijazah" ? "dokumen" : "dokumenTranskrip"]["status"] = true
          this.inputError[this.documentType === "ijazah" ? "dokumen" : "dokumenTranskrip"]["description"] = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataPendidikan[this.documentType === "ijazah" ? "dokumen" : "dokumenTranskrip"] = ""
          if (this.documentType === "transkrip") {
            $("#dokumenTranskrip").empty()
          }
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError[this.documentType === "ijazah" ? "dokumen" : "dokumenTranskrip"]["status"] = true
          this.inputError[this.documentType === "ijazah" ? "dokumen" : "dokumenTranskrip"]["description"] = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataPendidikan[this.documentType === "ijazah" ? "dokumen" : "dokumenTranskrip"] = ""
          if (this.documentType === "transkrip") {
            $("#dokumenTranskrip").empty()
          }
        } else {
          this.inputError[this.documentType === "ijazah" ? "dokumen" : "dokumenTranskrip"]["status"] = false
          this.dataPendidikan[this.documentType === "ijazah" ? "dokumen" : "dokumenTranskrip"] = await this.getBase64(item.target.files[0])
          this.documentType === "transkrip" ? this.changeDokumen.transkrip = true : this.changeDokumen.ijazah = true
          if (this.documentType === "transkrip") {
            $("#dokumenTranskrip").empty()
            $("#dokumenTranskrip").append(`<iframe src="${this.dataPendidikan.dokumenTranskrip}" frameborder="0" style="width: 100%; height: 600px;"></iframe>`)
          }
        }
      }
    },
    getDataPendidikanCreated() {
      this.loading = true
      axios({
        url: `${env.VITE_BACKEND_URL}/data-pendidikan/created`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      }).then(res => {
        this.loading = false
        let data = res.data
        this.fileCategory = data.message.dokumenKategori
        this.dataJenisPendidikan = data.message.jenisPendidikan
        this.dataTingkatPendidikan = data.message.tingkatPendidikan
        this.pendidikan = data.message.daftarPendidikan
      })
    }
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataPendidikanDetail()
    } else {
      this.getDataPendidikanCreated()
    }
  },
  destroyed() {
    this.$destroy()
  }
}
</script>

<style lang="less" scoped>
.my-form-group {
  position: relative;
}
.my-custom-input-wrapper {
  font-weight: 600;
  font-size: 14px;
  color: #477b79;
  border: 1px solid #477b79;
  background-color: rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  overflow: hidden;
  cursor: default;
  box-sizing: border-box;
  text-overflow: ellipsis;
  &.my-custom-input {
    display: inline-block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    line-height: 1.5;
    vertical-align: middle;
    background: #fff url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right 0.75rem center;
    background-size: 8px 10px;
    border-radius: 0.25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
}
.my-custom-input-item-wrapper-outside {
  border-top: 1px solid #477b79;
  border-left: 1px solid #477b79;
  border-bottom: 1px solid #477b79;
  position: absolute;
  width: 100%;
  background-color: #fff;
  z-index: 2;
  width: 100%;
  .my-custom-input-item-wrapper-inside {
    max-height: 200px;
    overflow: auto;
  }
  .my-custom-input-item {
    white-space: nowrap;
    max-width: 100%;
    display: block;
    min-height: 1.2em;
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    font-weight: 600;
    font-size: 14px;
    color: #477b79;
    cursor: pointer;
    &:hover {
      background-color: #007bff;
      color: #fff;
    }
  }
}
</style>