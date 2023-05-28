<template>
  <div id="data-cpns-pns">
    <LoadingAnimation class="loading" v-if="isLoading" />
    <div v-else>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldTmtCpns">TMT CPNS</label>
            <input type="date" id="fieldTmtCpns" class="form-control" v-model="dataCpnsPns.tmtCpns">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-6">
          <div class="form-group text-left">
            <label for="fieldNomorSkCpns">Nomor SK CPNS</label>
            <input type="text" id="fieldNomorSkCpns" placeholder="Nomor SK CPNS Anda" class="form-control" v-model="dataCpnsPns.nomorSkCpns">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group text-left">
            <label for="fieldTanggalSkCpns">Tanggal SK CPNS</label>
            <input type="date" id="fieldTanggalSkCpns" class="form-control" v-model="dataCpnsPns.tglSkCpns">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-6">
          <div class="form-group text-left">
            <label for="fieldNomorSpmt">Nomor SPMT</label>
            <input type="text" id="fieldNomorSpmt" placeholder="Nomor SPMT Anda" class="form-control" v-model="dataCpnsPns.nomorSpmt">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group text-left">
            <label for="fieldTanggalSpmt">Tanggal SPMT</label>
            <input type="date" id="fieldTanggalSpmt" class="form-control" v-model="dataCpnsPns.tglSpmt">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldDokumenSkCpns">Dokumen SK CPNS</label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" accept=".PDF" id="fieldDokumenSkCpns" @change="onChangeFile($event, 'cpns')">
              <label class="custom-file-label" for="fieldDokumenSkCpns" :class="inputError.dokumenSkCpns.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumenSkCpns.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenSkCpns.status ? inputError.dokumenSkCpns.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <iframe v-if="dataCpnsPns.dokumenSkCpns !== '' && dataCpnsPns.dokumenSkCpns !== null" :src="dataCpnsPns.dokumenSkCpns" frameborder="0" style="width: 100%; height: 400px;"></iframe>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldTmtPns">TMT PNS</label>
            <input type="date" id="fieldTmtPns" class="form-control" v-model="dataCpnsPns.tmtPns">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-6">
          <div class="form-group text-left">
            <label for="fieldNomorSkPns">Nomor SK PNS</label>
            <input type="text" id="fieldNomorSkPns" placeholder="Nomor SK CPNS Anda" class="form-control" v-model="dataCpnsPns.nomorSkPns">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group text-left">
            <label for="fieldTanggalSkPns">Tanggal SK PNS</label>
            <input type="date" id="fieldTanggalSkPns" class="form-control" v-model="dataCpnsPns.tglSkPns">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-6">
          <div class="form-group text-left">
            <label for="fieldNomorSttpl">Nomor STTPL</label>
            <input type="text" id="fieldNomorSttpl" placeholder="Nomor SK CPNS Anda" class="form-control" v-model="dataCpnsPns.nomorSttpl">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group text-left">
            <label for="fieldTanggalSttpl">Tanggal STTPL</label>
            <input type="date" id="fieldTanggalSttpl" class="form-control" v-model="dataCpnsPns.tglSttpl">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-6">
          <div class="form-group text-left">
            <label for="fieldNomorSuratDokter">Nomor Surat Dokter</label>
            <input type="text" id="fieldNomorSuratDokter" placeholder="Nomor SK CPNS Anda" class="form-control" v-model="dataCpnsPns.nomorSuratDokter">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group text-left">
            <label for="fieldTanggalSuratDokter">Tanggal Surat Dokter</label>
            <input type="date" id="fieldTanggalSuratDokter" class="form-control" v-model="dataCpnsPns.tglSuratDokter">
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldDokumenSkPns">Dokumen SK PNS</label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" accept=".PDF" id="fieldDokumenSkPns" @change="onChangeFile($event, 'pns')">
              <label class="custom-file-label" for="fieldDokumenSkPns" :class="inputError.dokumenSkPns.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumenSkPns.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenSkPns.status ? inputError.dokumenSkPns.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <iframe v-if="dataCpnsPns.dokumenSkPns !== '' && dataCpnsPns.dokumenSkPns !== null" :src="dataCpnsPns.dokumenSkPns" frameborder="0" style="width: 100%; height: 400px;"></iframe>
        </div>
      </div>

      <div
        class="btn my-btn-primary btn-block text-center"
        @click="updateDataCpnsPns()"
        style="z-index: 2;"
      >
        <span>Simpan Data CPNS/PNS</span>
      </div>
      <button
        type="button"
        hidden
        id="showModal"
        data-toggle="modal"
        data-target="#modal"
        data-backdrop="static"
        data-keyboard="false"
      ></button>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/index.js"
import axios from "axios"
const env = import.meta.env
export default {
  mixins: [mixins],
  data() {
    return {
      inputError: {
        dokumenSkCpns: {
          status: false,
          description: ""
        },
        dokumenSkPns: {
          status: false,
          description: ""
        }
      },
      dataCpnsPns: {
        tmtCpns: "",
        nomorSkCpns: "",
        tglSkCpns: "",
        nomorSpmt: "",
        tglSpmt: "",
        idPejabatPengangkatan: 0,
        dokumenSkCpns: "",
        tmtPns: "",
        nomorSkPns: "",
        tglSkPns: "",
        nomorSttpl: "",
        tglSttpl: "",
        nomorSuratDokter: "",
        tglSuratDokter: "",
        nomorKarpeg: "",
        nomorKarisKarsu: "",
        dokumenSkPns: "",
      },
      dataJenisKelamin: {},
      isLoading: false,
      fileCategory: {}
    }
  },
  methods: {
    getData() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let url = `/data-cpns-pns/${this.$store.getters.getIdPegawai}`
      axios({
        baseURL: `${env.VITE_BACKEND_URL}${url}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then((res) => {
        this.isLoading = false
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        if (data.status === 2) {
          this.dataCpnsPns = data.message[0]
        } else {
          localStorage.clear()
          this.$router.push({
            name: "login"
          })
        }
      }).catch(() => {
        localStorage.clear()
        this.$router.push({
          name: "login"
        })
      })
    },
    updateDataCpnsPns() {
      let p = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        baseURL: `${env.VITE_BACKEND_URL}/data-cpns-pns/${this.dataCpnsPns.id}`,
        method: "PUT",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataCpnsPns), p)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), p)
        this.$store.commit("onModalMethod", "UPDATE")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: data.status === 2 || data.status === true ? "Success" : "Failed",
          message: data.message
        })
        $("#showModal").trigger("click")
        this.getData()
      }).catch(() => {
        this.$store.commit("onModalMethod", "UPDATE")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: "Failed",
          message: "Terjadi kesalahan server. Silahkan menghubungi penyedia layanan Sidak."
        })
        $("#showModal").trigger("click")
      })
    },
    getMaxFileSize() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/dokumen-kategori/cpns`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.fileCategory = data.message[0]
      })
    },
    async onChangeFile(item, mode) {
      if (item.target.files.length !== 0) {
        if (mode === "cpns") {
          if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
            this.inputError.dokumenSkCpns.status = true
            this.inputError.dokumenSkCpns.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
            item.target.value = null
            this.dataCpnsPns.dokumenSkCpns = ""
          } else if (item.target.files[0].type !== "application/pdf") {
            this.inputError.dokumenSkCpns.status = true
            this.inputError.dokumenSkCpns.description = "Dokumen harus berjenis PDF."
            item.target.value = null
            this.dataCpnsPns.dokumenSkCpns = ""
          } else {
            this.inputError.dokumenSkCpns.status = false
            this.dataCpnsPns.dokumenSkCpns = await this.getBase64(item.target.files[0])
          }
        } else {
          if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
            this.inputError.dokumenSkPns.status = true
            this.inputError.dokumenSkPns.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
            item.target.value = null
            this.dataCpnsPns.dokumenSkPns = ""
          } else if (item.target.files[0].type !== "application/pdf") {
            this.inputError.dokumenSkPns.status = true
            this.inputError.dokumenSkPns.description = "Dokumen harus berjenis PDF."
            item.target.value = null
            this.dataCpnsPns.dokumenSkPns = ""
          } else {
            this.inputError.dokumenSkPns.status = false
            this.dataCpnsPns.dokumenSkPns = await this.getBase64(item.target.files[0])
          }
        }
      }
    },
  },
  created() {
    this.getData()
    this.getMaxFileSize()
  },
  destroyed() {
    this.$destroy()
  }
}
</script>

<style lang="less" scoped>
.loading {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#data-cpns-pns {
  box-sizing: border-box;
  padding: 0px 10px;
  position: relative;
  height: 100%;
  max-height: 100%;
  box-sizing: border-box;
  padding: 0px 15px;
}
.my-btn-primary {
  position: sticky;
  bottom: 0;
  height: 40px;
  font-size: 14px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>