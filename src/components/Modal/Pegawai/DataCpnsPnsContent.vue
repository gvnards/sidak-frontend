<template>
  <ModalHeaderFooter :header-title="'CPNS/PNS'" :header-subtitle="'CPNS/PNS'" :illustration="'IllustrationDataCpnsPns'" @onUsulkan="onUsulkan()">
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldJenisCpnsPns">Jenis Status Kepegawaian</label>
          <select class="custom-select" id="fieldJenisCpnsPns" v-model="dataCpnsPns.idJenisCpnsPns">
            <option value="0" selected disabled>Pilih Jenis Status Kepegawaian</option>
            <option :selected="item.id === dataCpnsPns.idJenisCpnsPns" v-for="item in daftarJenisCpnsPns" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="dataCpnsPns.idJenisCpnsPns === 1">
      <div class="row row-form">
        <div class="col-6">
          <div class="form-group">
            <label for="fieldJenisCpnsPns">Jenis Pengadaan</label>
            <select class="custom-select" id="fieldJenisCpnsPns" v-model="dataCpnsPns.idJenisPengadaan">
              <option value="0" selected disabled>Pilih Jenis Pengadaan</option>
              <option :selected="item.id === dataCpnsPns.idJenisPengadaan" v-for="item in daftarJenisPengadaan" :key="item.id" :value="item.id">
                {{ item.nama }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldTmtCpns">TMT</label>
            <input type="date" id="fieldTmtCpns" class="form-control" v-model="dataCpnsPns.tmt">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-6">
          <div class="form-group">
            <label for="fieldNomorSk">Nomor SK</label>
            <input type="text" id="fieldNomorSk" class="form-control" v-model="dataCpnsPns.nomorDokumenSk">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldTglSk">Tanggal SK</label>
            <input type="date" id="fieldTglSk" class="form-control" v-model="dataCpnsPns.tglDokumenSk">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-6">
          <div class="form-group">
            <label for="fieldNomorSpmt">Nomor SPMT</label>
            <input type="text" id="fieldNomorSpmt" class="form-control" v-model="dataCpnsPns.nomorDokumenSpmt">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldTglSpmt">Tanggal SPMT</label>
            <input type="date" id="fieldTglSpmt" class="form-control" v-model="dataCpnsPns.tglDokumenSpmt">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group">
            <label for="fieldNamaJabatanPengangkatCpns">Nama Jabatan yang Mengangkat CPNS</label>
            <select class="custom-select" id="fieldNamaJabatanPengangkatCpns" v-model="dataCpnsPns.idJabatanPengangkat">
              <option value="0" selected disabled>Pilih Nama Jabatan yang Mengangkat CPNS</option>
              <option :selected="item.id === dataCpnsPns.idJabatanPengangkat" v-for="item in daftarJabatanPengangkat" :key="item.id" :value="item.id">
                {{ item.nama }}
              </option>
            </select>
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
          <iframe v-if="dataCpnsPns.dokumen !== '' && dataCpnsPns.dokumen !== null" :src="dataCpnsPns.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
        </div>
      </div>
    </div>
    <div v-else-if="dataCpnsPns.idJenisCpnsPns === 2">
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group">
            <label for="fieldTmtPns">TMT</label>
            <input type="date" id="fieldTmtPns" class="form-control" v-model="dataCpnsPns.tmt">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-6">
          <div class="form-group">
            <label for="fieldNomorSk">Nomor SK</label>
            <input type="text" id="fieldNomorSk" class="form-control" v-model="dataCpnsPns.nomorDokumenSk">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldTglSk">Tanggal SK</label>
            <input type="date" id="fieldTglSk" class="form-control" v-model="dataCpnsPns.tglDokumenSk">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-6">
          <div class="form-group">
            <label for="fieldNomorSttpl">Nomor STTPL</label>
            <input type="text" id="fieldNomorSttpl" class="form-control" v-model="dataCpnsPns.nomorDokumenSttpl">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldTglSttpl">Tanggal STTPL</label>
            <input type="date" id="fieldTglSttpl" class="form-control" v-model="dataCpnsPns.tglDokumenSttpl">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-6">
          <div class="form-group">
            <label for="fieldNomorSuratDokter">Nomor Surat Dokter</label>
            <input type="text" id="fieldNomorSuratDokter" class="form-control" v-model="dataCpnsPns.nomorSuratDokter">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldTglSuratDokter">Tanggal Surat Dokter</label>
            <input type="date" id="fieldTglSuratDokter" class="form-control" v-model="dataCpnsPns.tglSuratDokter">
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
          <iframe v-if="dataCpnsPns.dokumen !== '' && dataCpnsPns.dokumen !== null" :src="dataCpnsPns.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
        </div>
      </div>
    </div>
  </ModalHeaderFooter>
</template>

<script>
// import axios from "axios"
// const env = import.meta.env
import mixins from "@/mixins/index.js"
export default {
  mixins: [mixins],
  data() {
    return {
      inputError: {
        dokumenSk: {
          status: false,
          description: ""
        }
      },
      dataCpnsPns: {
        tmt: "",
        idJenisCpnsPns: 0,
        idJenisPengadaan: 0,
        tglDokumenSk: "",
        nomorDokumenSk: "",
        tglDokumenSpmt: "",
        nomorDokumenSpmt: "",
        idJabatanPengangkat: 0,
        dokumen: "",
        nomorDokumenSttpl: "",
        tglDokumenSttpl: "",
        nomorSuratDokter: "",
        tglSuratDokter: "",
      },
      daftarJenisCpnsPns: [],
      daftarJenisPengadaan: [],
      daftarJabatanPengangkat: [],
      fileCategory: {}
    }
  },
  methods: {
    onUsulkan() {},
    getJenisStatusCpnsPns() {
      setTimeout(() => {
        this.daftarJenisCpnsPns = [
          {
            id: 1,
            nama: "CPNS"
          },
          {
            id: 2,
            nama: "PNS"
          }
        ]
      }, 1000)
    },
    getJenisPengadaan() {
      setTimeout(() => {
        this.daftarJenisPengadaan = [
          {
            id: 1,
            nama: "Umum"
          },
          {
            id: 2,
            nama: "dst 1"
          },
          {
            id: 3,
            nama: "dst 2"
          }
        ]
      }, 1000)
    },
    getJabatanPengangkat() {
      setTimeout(() => {
        this.daftarJabatanPengangkat = [
          {
            id: 1,
            nama: "Bupati"
          },
          {
            id: 2,
            nama: "Kepala Badan Kepegawaian dan Sumber Daya Manusia"
          }
        ]
      }, 1000)
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumenSk.status = true
          this.inputError.dokumenSk.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataCpnsPns.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumenAkta.status = true
          this.inputError.dokumenAkta.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataCpnsPns.dokumen = ""
        } else {
          this.inputError.dokumenSk.status = false
          this.dataCpnsPns.dokumen = await this.getBase64(item.target.files[0])
        }
      }
    },
    getMaxFileSize() {
      // let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      // axios({
      //   url: `${env.VITE_BACKEND_URL}/dokumen-kategori/diklat`,
      //   method: "GET",
      //   headers: {
      //     "Authorization": localStorage.getItem("token")
      //   },
      // }).then(res => {
      //   let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
      //   this.fileCategory = data.message[0]
      // })
      setTimeout(() => {
        this.fileCategory = {
          ukuran: 0.5
        }
      }, 1000)
    },
  },
  created() {
    this.getJenisStatusCpnsPns()
    this.getJenisPengadaan()
    this.getJabatanPengangkat()
    this.getMaxFileSize()
  }
}
</script>