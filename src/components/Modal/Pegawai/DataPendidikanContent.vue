<template>
  <ModalHeaderFooter :header-title="'Pendidikan'" :header-subtitle="'pendidikan'" :illustration="'IllustrationDataPendidikan'" @onUsulkan="onUsulkan()">
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldJenisPendidikan">Jenis Pendidikan</label>
            <select class="custom-select" id="fieldJenisPendidikan" :class="inputError.jenisPendidikan.status ? 'form-error' : ''" v-model="dataPendidikan.idJenisPendidikan">
              <option value="0" selected disabled>Pilih Jenis Pendidikan</option>
              <option :selected="item.id === dataPendidikan.idJenisPendidikan" v-for="item in dataJenisPendidikan" :key="item.id" :value="item.id">
                {{ item.nama }}
              </option>
            </select>
            <small class="text-red" v-if="inputError.jenisPendidikan.status"><b>*{{ inputError.jenisPendidikan.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-5">
          <div class="form-group text-left">
            <label for="fieldTingkatPendidikan">Tingkat Pendidikan</label>
            <select class="custom-select" id="fieldTingkatPendidikan" :class="inputError.tingkatPendidikan.status ? 'form-error' : ''" v-model="dataPendidikan.idTingkatPendidikan">
              <option value="0" selected disabled>Pilih Tingkat Pendidikan</option>
              <option :selected="item.id === dataPendidikan.idTingkatPendidikan" v-for="item in dataTingkatPendidikan" :key="item.id" :value="item.id">
                {{ item.nama }}
              </option>
            </select>
            <small class="text-red" v-if="inputError.tingkatPendidikan.status"><b>*{{ inputError.tingkatPendidikan.description }}</b></small>
          </div>
        </div>
        <div class="col-12 col-sm-7">
          <div class="form-group my-form-group">
            <label>Pendidikan</label>
            <div :title="pendidikanSelectedText" class="my-custom-input-wrapper my-custom-input" @click="pendidikanSelectedText === '-- Pilih Tingkat Pendidikan Dahulu --' || pendidikanSelectedText === '-- Sedang Diproses --' ? '' : isShowDaftarPendidikan = !isShowDaftarPendidikan" :style="pendidikanSelectedText === '-- Pilih Tingkat Pendidikan Dahulu --' || pendidikanSelectedText === '-- Sedang Diproses --' ? 'background-color:#e9ecef; cursor: not-allowed;' : ''">{{ pendidikanSelectedText }}</div>
            <div class="my-custom-input-item-wrapper-outside" v-show="isShowDaftarPendidikan">
              <input type="text" class="form-control" placeholder="Cari pendidikan (minimal 5 karakter)" v-model="searchValue">
              <div class="my-custom-input-item-wrapper-inside">
                <div @click="onPendidikanSelected(item)" class="my-custom-input-item" v-for="item in daftarPendidikan" :key="item.id" v-show="searchValue.length < 5 ? true : item.nama.toLowerCase().includes(searchValue.toLowerCase())">
                  {{ item.nama }}
                </div>
              </div>
            </div>
            <small class="text-red" v-if="inputError.pendidikan.status"><b>*{{ inputError.pendidikan.description }}</b></small>
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
            <input type="text" id="fieldGelarDepan" placeholder="Gelar Depan Anda" class="form-control" :class="inputError.gelarDepan.status ? 'form-error' : ''" v-model="dataPendidikan.gelarDepan">
            <small class="text-red" v-if="inputError.gelarDepan.status"><b>*{{ inputError.gelarDepan.description }}</b></small>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldGelarBelakang">Gelar Belakang</label>
            <input type="text" id="fieldGelarBelakang" placeholder="Gelar Belakang Anda" class="form-control" :class="inputError.gelarBelakang.status ? 'form-error' : ''" v-model="dataPendidikan.gelarBelakang">
            <small class="text-red" v-if="inputError.gelarBelakang.status"><b>*{{ inputError.gelarBelakang.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <div class="form-group text-left">
            <label for="fieldTanggalLulus">Tanggal Lulus</label>
            <input type="date" id="fieldTanggalLulus" placeholder="Tanggal Lulus Sekolah" class="form-control" :class="inputError.tanggalLulus.status ? 'form-error' : ''" v-model="dataPendidikan.tanggalLulus">
            <small class="text-red" v-if="inputError.tanggalLulus.status"><b>*{{ inputError.tanggalLulus.description }}</b></small>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="fieldTahunLulus">Tahun Lulus</label>
            <input type="number" id="fieldTahunLulus" class="form-control" :class="inputError.tahunLulus.status ? 'form-error' : ''" placeholder="1990" v-model="dataPendidikan.tahunLulus">
            <small class="text-red" v-if="inputError.tahunLulus.status"><b>*{{ inputError.tahunLulus.description }}</b></small>
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
            <input
              :class="inputError.tanggalDokumenIjazah.status ? 'form-error' : ''"
              type="date"
              class="form-control"
              id="fieldTanggalDokumenIjazah"
              placeholder="Tanggal Dokumen Ijazah"
              v-model="dataPendidikan.tanggalDokumen"
            />
            <small class="text-red" v-if="inputError.tanggalDokumenIjazah.status"><b>*{{ inputError.tanggalDokumenIjazah.description }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldDokumenIjazah">Dokumen Ijazah</label>
            <div class="custom-file">
              <input @click="documentType = 'ijazah'" type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenIjazah" @change="onChangeFile">
              <label class="custom-file-label" for="fieldDokumenIjazah" :class="inputError.dokumen.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumen.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumen.status ? inputError.dokumen.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <iframe v-if="dataPendidikan.dokumen !== '' && dataPendidikan.dokumen !== null" :src="dataPendidikan.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldDokumenTranskripNilai">Dokumen Transkrip Nilai</label>
            <div class="custom-file">
              <input @click="documentType = 'transkrip'" type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenTranskripNilai" @change="onChangeFile">
              <label class="custom-file-label" for="fieldDokumenTranskripNilai" :class="inputError.dokumenTranskrip.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumenTranskrip.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenTranskrip.status ? inputError.dokumenTranskrip.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12" id="dokumenTranskrip"></div>
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
      afterCreated: true
    }
  },
  computed: {
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
      return this.dataPendidikan.idJenisPendidikan !== 0 && this.dataPendidikan.idTingkatPendidikan !== 0 && this.dataPendidikan.idDaftarPendidikan !== 0 && (this.pendidikan.filter(el => parseInt(el.idTingkatPendidikan) === parseInt(this.dataPendidikan.idTingkatPendidikan) && parseInt(el.id) === parseInt(this.dataPendidikan.idDaftarPendidikan))).length > 0 && this.dataPendidikan.namaSekolah !== "" && this.dataPendidikan.tanggalLulus !== "" && this.dataPendidikan.tahunLulus !== "" && this.dataPendidikan.nomorDokumen !== "" && this.dataPendidikan.tanggalDokumen !== "" && this.dataPendidikan.dokumen !== "" && this.dataPendidikan.dokumenTranskrip !== ""
    }
  },
  methods: {
    whereError() {
      this.inputError.jenisPendidikan.status = this.dataPendidikan.idJenisPendidikan === 0
      this.inputError.jenisPendidikan.description = this.dataPendidikan.idJenisPendidikan === 0 ? "Jenis pendidikan harus dipilih" : ""
      this.inputError.tingkatPendidikan.status = this.dataPendidikan.idTingkatPendidikan === 0 || (this.pendidikan.filter(el => parseInt(el.idTingkatPendidikan) === parseInt(this.dataPendidikan.idTingkatPendidikan) && parseInt(el.id) === parseInt(this.dataPendidikan.idDaftarPendidikan))).length <= 0
      this.inputError.tingkatPendidikan.description = this.dataPendidikan.idTingkatPendidikan === 0 ? "Tingkat pendidikan harus dipilih" : (this.pendidikan.filter(el => parseInt(el.idTingkatPendidikan) === parseInt(this.dataPendidikan.idTingkatPendidikan) && parseInt(el.id) === parseInt(this.dataPendidikan.idDaftarPendidikan))).length <= 0 ? "Tingkat pendidikan atau pendidikan tidak valid" : ""
      this.inputError.pendidikan.status = this.dataPendidikan.idDaftarPendidikan === 0 || (this.pendidikan.filter(el => parseInt(el.idTingkatPendidikan) === parseInt(this.dataPendidikan.idTingkatPendidikan) && parseInt(el.id) === parseInt(this.dataPendidikan.idDaftarPendidikan))).length <= 0
      this.inputError.pendidikan.description = this.dataPendidikan.idDaftarPendidikan === 0 ? "Pendidikan harus dipilih" : (this.pendidikan.filter(el => parseInt(el.idTingkatPendidikan) === parseInt(this.dataPendidikan.idTingkatPendidikan) && parseInt(el.id) === parseInt(this.dataPendidikan.idDaftarPendidikan))).length <= 0 ? "Tingkat pendidikan atau pendidikan tidak valid" : ""
      this.inputError.namaSekolah.status = this.dataPendidikan.namaSekolah === ""
      this.inputError.namaSekolah.description = this.dataPendidikan.namaSekolah === "" ? "Nama sekolah harus diisi" : ""
      this.inputError.tanggalLulus.status = this.dataPendidikan.tanggalLulus === ""
      this.inputError.tanggalLulus.description = this.dataPendidikan.tanggalLulus === "" ? "Tanggal lulus harus diisi" : ""
      this.inputError.tahunLulus.status = this.dataPendidikan.tahunLulus === ""
      this.inputError.tahunLulus.description = this.dataPendidikan.tahunLulus === "" ? "Tahun lulus harus diisi" : ""
      this.inputError.nomorDokumenIjazah.status = this.dataPendidikan.nomorDokumen === ""
      this.inputError.nomorDokumenIjazah.description = this.dataPendidikan.nomorDokumen === "" ? "Nomor dokumen harus diisi" : ""
      this.inputError.tanggalDokumenIjazah.status = this.dataPendidikan.tanggalDokumen === ""
      this.inputError.tanggalDokumenIjazah.description = this.dataPendidikan.tanggalDokumen === "" ? "Tanggal dokumen harus diisi" : ""
      this.inputError.dokumen.status = this.dataPendidikan.dokumen === ""
      this.inputError.dokumen.description = this.dataPendidikan.dokumen === "" ? "Dokumen Ijazah harus diisi" : ""
      this.inputError.dokumenTranskrip.status = this.dataPendidikan.dokumenTranskrip === ""
      this.inputError.dokumenTranskrip.description = this.dataPendidikan.dokumenTranskrip === "" ? "Dokumen Transkrip harus diisi" : ""
    },
    onPendidikanSelected(item) {
      this.pendidikanSelectedText = item.nama
      this.dataPendidikan.idDaftarPendidikan = item.id
      this.isShowDaftarPendidikan = false
    },
    onUsulkan() {
      if (!this.isFulfilled) return this.whereError()
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
    getDataPendidikanDetail() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-pendidikan/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
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
          if (this.documentType === "transkrip") {
            $("#dokumenTranskrip").empty()
            $("#dokumenTranskrip").append(`<iframe src="${this.dataPendidikan.dokumenTranskrip}" frameborder="0" style="width: 100%; height: 600px;"></iframe>`)
          }
        }
      }
    },
    getDataPendidikanCreated() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/data-pendidikan/created`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
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