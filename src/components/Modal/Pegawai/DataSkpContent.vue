<template>
  <ModalHeaderFooter :step="step !== 4 ? 'step' : 'stepEnd'" :header-title="'SKP'" :header-subtitle="'skp'" :illustration="'IllustrationDataSkp'" @onNext="onNext()" @onPrev="onPrev()" @onUsulkan="/*onUsulkan()*/() => {}">
    <div class="row row-form">
      <div class="col-3 step-wrapper" v-for="item in 4" :key="item">
        <div class="step">
          <div style="position: relative; height: 30px;">
            <div class="circle" :class="item === step ? 'active' : ''" @click="step = item">
              <span>{{ item }}</span>
            </div>
          <div class="block" v-if="item !== 4"></div>
        </div>
        </div>
      </div>
    </div>
    <div style="border-top: 1px solid #477b79; box-sizing: border-box; padding-top: 20px;">
      <div v-if="step === 1">
        <div class="row row-pegawai">
          <div class="col-6">
            <div class="form-group">
              <label for="fieldJenisJabatan">Jenis Jabatan</label>
              <select id="fieldJenisJabatan" v-model="dataSkp.idJenisJabatan" class="custom-select" :class="inputError.jenisJabatan.status ? 'form-error' : ''">
                <option value="0" disabled selected>Pilih Jenis Jabatan</option>
                <option v-for="item in daftarJenisJabatan" :key="item.id" :value="item.id">{{ item.nama }}</option>
              </select>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="fieldTahun">Tahun SKP</label>
              <input type="number" v-model="dataSkp.tahun" id="fieldTahun" class="form-control" :class="inputError.tahun.status ? 'form-error' : ''" placeholder="2010">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldJenisPeraturanKinerja">Jenis Peraturan Kinerja</label>
              <select id="fieldJenisPeraturanKinerja" v-model="dataSkp.idJenisPeraturanKinerja" class="custom-select" :class="inputError.jenisPeraturanKinerja.status ? 'form-error' : ''">
                <option value="0" disabled selected>Pilih Jenis Peraturan Kinerja</option>
                <option v-for="item in daftarJenisPeraturanKinerja" :key="item.id" :value="item.id">{{ item.nama }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-4">
            <div class="form-group">
              <label for="fieldNilaiSkp">Nilai SKP</label>
              <input type="number" v-model="dataSkp.nilaiSkp" id="fieldNilaiSkp" class="form-control" step="0.01" min="0.00" :class="inputError.tahun.status ? 'form-error' : ''" placeholder="89.42">
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label for="fieldPersen" style="visibility: hidden;">.</label>
              <input type="text" id="fieldPersen" class="form-control" disabled value="60%">
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label for="fieldHasilNilaiSkp" style="visibility: hidden;">.</label>
              <input type="text" id="fieldHasilNilaiSkp" class="form-control" disabled :value="dataSkp.nilaiSkp * 0.6">
            </div>
          </div>
        </div>
        <p style="color: #477b79; border-bottom: 1px solid #477b79;"><strong><i>Perilaku Kerja</i></strong></p>
        <div class="row row-form">
          <div class="col-6">
            <div class="form-group">
              <label for="fieldOrientasiPelayanan">Orientasi Pelayanan</label>
              <input type="number" step="0.01" placeholder="89.42" id="fieldOrientasiPelayanan" min="0.00" class="form-control" v-model="dataSkp.orientasiPelayanan">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="fieldIntegritas">Integritas</label>
              <input type="number" id="fieldIntegritas" step="0.01" placeholder="89.42" min="0.00" class="form-control" v-model="dataSkp.integritas">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-6">
            <div class="form-group">
              <label for="fieldKomitmen">Komitmen</label>
              <input type="number" step="0.01" placeholder="89.42" id="fieldKomitmen" min="0.00" class="form-control" v-model="dataSkp.komitmen">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="fieldDisiplin">Disiplin</label>
              <input type="number" id="fieldDisiplin" step="0.01" placeholder="89.42" min="0.00" class="form-control" v-model="dataSkp.disiplin">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-6">
            <div class="form-group">
              <label for="fieldKerjaSama">Kerja Sama</label>
              <input type="number" step="0.01" placeholder="89.42" id="fieldKerjaSama" min="0.00" class="form-control" v-model="dataSkp.kerjaSama">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="fieldKepemimpinan">Kepemimpinan</label>
              <input type="number" id="fieldKepemimpinan" step="0.01" placeholder="89.42" min="0.00" class="form-control" v-model="dataSkp.kepemimpinan">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldNilaiPrestasiKerja">Nilai Prestasi Kerja</label>
              <input type="number" id="fieldNilaiPrestasiKerja" placeholder="89.42" min="0.00" step="0.01" v-model="dataSkp.nilaiPrestasiKerja" class="form-control">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-6">
            <div class="form-group">
              <label for="fieldNilaiKonversi">Nilai Konversi</label>
              <input type="number" step="0.01" placeholder="89.42" id="fieldNilaiKonversi" min="0.00" class="form-control" v-model="dataSkp.nilaiKonversi">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="fieldNilaiIntegrasi">Nilai Integrasi</label>
              <input type="number" id="fieldNilaiIntegrasi" placeholder="89.42" step="0.01" min="0.00" class="form-control" v-model="dataSkp.nilaiIntegrasi">
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="step === 2">
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldStatusPejabatPenilai">Status Pejabat Penilai</label>
              <select id="fieldStatusPejabatPenilai" class="custom-select" v-model="dataSkp.idStatusPejabatPenilai">
                <option value="0" disabled selected>Pilih Status Pejabat Penilai</option>
                <option :value="item.id" v-for="item in statusPejabatPenilai" :key="item.id">{{ item.nama }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldNipNrp">NIP/NRP</label>
              <input v-model="dataSkp.nipNrpPejabatPenilai" type="text" placeholder="Masukkan NIP/NRP" class="form-control">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldNamaPejabatPenilai">Nama</label>
              <input type="text" class="form-control" v-model="dataSkp.namaPejabatPenilai">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldJabatanPejabatPenilai">Jabatan</label>
              <input type="text" class="form-control" v-model="dataSkp.jabatanPejabatPenilai">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldUnitOrganisasiPejabatPenilai">Unit Organisasi</label>
              <input type="text" class="form-control" v-model="dataSkp.unitOrganisasiPejabatPenilai">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-6">
            <div class="form-group">
              <label for="fieldGolonganPejabatPenilai">Golongan</label>
              <input type="text" class="form-control" v-model="dataSkp.golonganPejabatPenilai">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="fieldTmtGolonganPejabatPenilai">TMT Golongan</label>
              <input type="date" class="form-control" v-model="dataSkp.tmtGolonganPejabatPenilai">
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="step === 3">
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldStatusAtasanPejabatPenilai">Status Atasan Pejabat Penilai</label>
              <select id="fieldStatusAtasanPejabatPenilai" class="custom-select" v-model="dataSkp.idStatusAtasanPejabatPenilai">
                <option value="0" disabled selected>Pilih Status Atasan Pejabat Penilai</option>
                <option :value="item.id" v-for="item in statusAtasanPejabatPenilai" :key="item.id">{{ item.nama }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldNipNrp">NIP/NRP</label>
              <input v-model="dataSkp.nipNrpAtasanPejabatPenilai" type="text" placeholder="Masukkan NIP/NRP" class="form-control">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldNamaAtasanPejabatPenilai">Nama</label>
              <input type="text" class="form-control" v-model="dataSkp.namaAtasanPejabatPenilai">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldJabatanAtasanPejabatPenilai">Jabatan</label>
              <input type="text" class="form-control" v-model="dataSkp.jabatanAtasanPejabatPenilai">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-12">
            <div class="form-group">
              <label for="fieldUnitOrganisasiAtasanPejabatPenilai">Unit Organisasi</label>
              <input type="text" class="form-control" v-model="dataSkp.unitOrganisasiAtasanPejabatPenilai">
            </div>
          </div>
        </div>
        <div class="row row-form">
          <div class="col-6">
            <div class="form-group">
              <label for="fieldGolonganAtasanPejabatPenilai">Golongan</label>
              <input type="text" class="form-control" v-model="dataSkp.golonganAtasanPejabatPenilai">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="fieldTmtGolonganAtasanPejabatPenilai">TMT Golongan</label>
              <input type="date" class="form-control" v-model="dataSkp.tmtGolonganAtasanPejabatPenilai">
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="step === 4">
        <div class="form-group text-left">
          <label for="fieldDokumenIjazah">Dokumen SKP</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenSkp" @change="onChangeFile">
            <label class="custom-file-label" for="fieldDokumenSkp" :class="inputError.dokumenSkp.status ? 'form-error' : ''">Cari dokumen</label>
          </div>
          <small :class="inputError.dokumenSkp.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenSkp.status ? inputError.dokumenSkp.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
        </div>
        <div class="row row-form">
          <div class="col-12">
            <iframe v-if="dataSkp.dokumen !== '' && dataSkp.dokumen !== null" :src="dataSkp.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
          </div>
        </div>
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
      step: 1,
      dataSkp: {
        idJenisJabatan: 0,
        tahun: "",
        idJenisPeraturanKinerja: 0,
        nilaiSkp: "",
        orientasiPelayanan: "",
        integritas: "",
        komitmen: "",
        disiplin: "",
        kerjaSama: "",
        kepemimpinan: "",
        nilaiPrestasiKerja: "",
        nilaiKonversi: "",
        nilaiIntegrasi: "",
        idStatusPejabatPenilai: "",
        nipNrpPejabatPenilai: "",
        namaPejabatPenilai: "",
        unitOrganisasiPejabatPenilai: "",
        golonganPejabatPenilai: "",
        tmtGolonganPejabatPenilai: "",
        idStatusAtasanPejabatPenilai: "",
        nipNrpAtasanPejabatPenilai: "",
        namaAtasanPejabatPenilai: "",
        unitOrganisasiAtasanPejabatPenilai: "",
        golonganAtasanPejabatPenilai: "",
        tmtGolonganAtasanPejabatPenilai: "",
        dokumen: ""
      },
      inputError: {
        jenisJabatan: {
          status: false,
          description: ""
        },
        tahun: {
          status: false,
          description: ""
        },
        jenisPeraturanKinerja: {
          status: false,
          description: ""
        },
        dokumenSkp: {
          status: false,
          description: ""
        }
      },
      daftarJenisPeraturanKinerja: [],
      daftarJenisJabatan: [],
      fileCategory: {},
      statusPejabatPenilai: [],
      statusAtasanPejabatPenilai: []
    }
  },
  methods: {
    onNext() {
      if(this.step !== 4) this.step++
    },
    onPrev() {
      if(this.step !== 1) this.step--
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumenSkp.status = true
          this.inputError.dokumenSkp.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataSkp.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumenSkp.status = true
          this.inputError.dokumenSkp.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataSkp.dokumen = ""
        } else {
          this.inputError.dokumenSkp.status = false
          this.dataSkp.dokumen = await this.getBase64(item.target.files[0])
        }
      }
    },
    getMaxFileSize() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/dokumen-kategori/skp`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.fileCategory = data.message[0]
      })
    },
    onUsulkan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataSkp.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-skp" : `/data-skp/${this.dataSkp.id}`
      this.dataSkp.date = Date.now()
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataSkp), u)
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
    getDataSkp() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-skp/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataSkp = data.message[0]
      })
    },
    getJenisJabatan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/jenis-jabatan`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarJenisJabatan = data.message
      })
    },
    getJenisPeraturanKinerja() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/jenis-peraturan-kinerja`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarJenisPeraturanKinerja = data.message
      })
    },
    getJenisStatusPejabatAtasanPenilai() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/status-pejabat-atasan-penilai`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.statusPejabatPenilai = data.message
        this.statusAtasanPejabatPenilai = data.message
      })
    }
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataSkp()
    }
    this.getMaxFileSize()
    this.getJenisJabatan()
    this.getJenisPeraturanKinerja()
    this.getJenisStatusPejabatAtasanPenilai()
  },
  destroyed() {
    this.$destroy()
  }
}
</script>

<style lang="less" scoped>
.step-wrapper {
  margin-bottom: 10px;
  .step {
    .circle {
      background-color: #a8c0c0;
      border-radius: 100%;
      width: 30px;
      height: 30px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      cursor: pointer;
      span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-weight: 700;
        color: #eeeeee;
      }
      transition: all 0.4s;
      &.active {
        background-color: #477b79;
      }
    }
    .block {
      background-color: #a8c0c0;
      background-color: #477b79;
      height: 2px;
      max-width: calc(100% - 10px);
      position: relative;
      left: calc(60% + 10px);
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>