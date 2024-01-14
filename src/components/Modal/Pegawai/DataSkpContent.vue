<template>
  <ModalHeaderFooter :step="step !== 4 ? 'step' : 'stepEnd'" :header-title="'SKP'" :header-subtitle="'skp'" :illustration="'IllustrationDataSkp'" @onNext="onNext()" @onPrev="onPrev()" @onUsulkan="onUsulkan()" :primaryText="'Perbaharui'">
    <ShimmeringItem v-if="loading" :layouts="[6,6,12,3,3,3,6,6,6,6,6,6,12,6,6 ]" />
    <div v-else>
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
        <div class="text-red" style="padding: 0.375rem 1.75rem 0.375rem 0.75rem; border-radius: 0.25rem; border: 1px solid #EC392F; font-size: 14px; font-weight: 600; margin-bottom: 10px;">*Data SKP telah sesuai dengan yang ada di MySAPK.<br>*Silahkan loncat ke nomor 4 untuk mengunggah berkas dokumen SKP.</div>
        <div v-if="step === 1">
          <div class="row row-pegawai">
            <div class="col-6">
              <div class="form-group">
                <label for="fieldJenisJabatan">Jenis Jabatan</label>
                <select disabled style="cursor: not-allowed;" id="fieldJenisJabatan" v-model="dataSkp.idJenisJabatan" class="custom-select" :class="inputError.jenisJabatan.status ? 'form-error' : ''">
                  <option value="0" disabled selected>Pilih Jenis Jabatan</option>
                  <option v-for="item in daftarJenisJabatan" :key="item.id" :value="item.id">{{ item.nama }}</option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="fieldTahun">Tahun SKP</label>
                <input disabled style="cursor: not-allowed;" type="number" v-model="dataSkp.tahun" id="fieldTahun" class="form-control" :class="inputError.tahun.status ? 'form-error' : ''" placeholder="2010">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-12">
              <div class="form-group">
                <label for="fieldJenisPeraturanKinerja">Jenis Peraturan Kinerja</label>
                <select disabled style="cursor: not-allowed;" id="fieldJenisPeraturanKinerja" v-model="dataSkp.idJenisPeraturanKinerja" class="custom-select" :class="inputError.jenisPeraturanKinerja.status ? 'form-error' : ''">
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
                <input disabled style="cursor: not-allowed;" type="number" v-model="dataSkp.nilaiSkp" id="fieldNilaiSkp" class="form-control" step="0.01" min="0.00" :class="inputError.tahun.status ? 'form-error' : ''" placeholder="89.42">
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="fieldPersen" style="visibility: hidden;">.</label>
                <input disabled style="cursor: not-allowed;" type="text" id="fieldPersen" class="form-control" value="60%">
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="fieldHasilNilaiSkp" style="visibility: hidden;">.</label>
                <input disabled style="cursor: not-allowed;" type="text" id="fieldHasilNilaiSkp" class="form-control" :value="dataSkp.nilaiSkp * 0.6">
              </div>
            </div>
          </div>
          <p style="color: #477b79; border-bottom: 1px solid #477b79;"><strong><i>Perilaku Kerja</i></strong></p>
          <div class="row row-form">
            <div class="col-6">
              <div class="form-group">
                <label for="fieldOrientasiPelayanan">Orientasi Pelayanan</label>
                <input disabled style="cursor: not-allowed;" type="number" step="0.01" placeholder="89.42" id="fieldOrientasiPelayanan" min="0.00" class="form-control" v-model="dataSkp.orientasiPelayanan">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="fieldIntegritas">Integritas</label>
                <input disabled style="cursor: not-allowed;" type="number" id="fieldIntegritas" step="0.01" placeholder="89.42" min="0.00" class="form-control" v-model="dataSkp.integritas">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-6">
              <div class="form-group">
                <label for="fieldKomitmen">Komitmen</label>
                <input disabled style="cursor: not-allowed;" type="number" step="0.01" placeholder="89.42" id="fieldKomitmen" min="0.00" class="form-control" v-model="dataSkp.komitmen">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="fieldDisiplin">Disiplin</label>
                <input disabled style="cursor: not-allowed;" type="number" id="fieldDisiplin" step="0.01" placeholder="89.42" min="0.00" class="form-control" v-model="dataSkp.disiplin">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-6">
              <div class="form-group">
                <label for="fieldKerjaSama">Kerja Sama</label>
                <input disabled style="cursor: not-allowed;" type="number" step="0.01" placeholder="89.42" id="fieldKerjaSama" min="0.00" class="form-control" v-model="dataSkp.kerjaSama">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="fieldKepemimpinan">Kepemimpinan</label>
                <input disabled style="cursor: not-allowed;" type="number" id="fieldKepemimpinan" step="0.01" placeholder="89.42" min="0.00" class="form-control" v-model="dataSkp.kepemimpinan">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-12">
              <div class="form-group">
                <label for="fieldNilaiPrestasiKerja">Nilai Prestasi Kerja</label>
                <input disabled style="cursor: not-allowed;" type="number" id="fieldNilaiPrestasiKerja" placeholder="89.42" min="0.00" step="0.01" v-model="dataSkp.nilaiPrestasiKerja" class="form-control">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-6">
              <div class="form-group">
                <label for="fieldNilaiKonversi">Nilai Konversi</label>
                <input disabled style="cursor: not-allowed;" type="number" step="0.01" placeholder="89.42" id="fieldNilaiKonversi" min="0.00" class="form-control" v-model="dataSkp.nilaiKonversi">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="fieldNilaiIntegrasi">Nilai Integrasi</label>
                <input disabled style="cursor: not-allowed;" type="number" id="fieldNilaiIntegrasi" placeholder="89.42" step="0.01" min="0.00" class="form-control" v-model="dataSkp.nilaiIntegrasi">
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="step === 2">
          <div class="row row-form">
            <div class="col-12">
              <div class="form-group">
                <label for="fieldStatusPejabatPenilai">Status Pejabat Penilai</label>
                <select disabled style="cursor: not-allowed;" id="fieldStatusPejabatPenilai" class="custom-select" v-model="dataSkp.idStatusPejabatPenilai">
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
                <input disabled style="cursor: not-allowed;" v-model="dataSkp.nipNrpPejabatPenilai" type="text" placeholder="Masukkan NIP/NRP" class="form-control">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-12">
              <div class="form-group">
                <label for="fieldNamaPejabatPenilai">Nama</label>
                <input disabled style="cursor: not-allowed;" type="text" class="form-control" v-model="dataSkp.namaPejabatPenilai">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-12">
              <div class="form-group">
                <label for="fieldJabatanPejabatPenilai">Jabatan</label>
                <input disabled style="cursor: not-allowed;" type="text" class="form-control" v-model="dataSkp.jabatanPejabatPenilai">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-12">
              <div class="form-group">
                <label for="fieldUnitOrganisasiPejabatPenilai">Unit Organisasi</label>
                <input disabled style="cursor: not-allowed;" type="text" class="form-control" v-model="dataSkp.unitOrganisasiPejabatPenilai">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-6">
              <div class="form-group">
                <label for="fieldGolonganPejabatPenilai">Golongan</label>
                <input disabled style="cursor: not-allowed;" type="text" class="form-control" v-model="dataSkp.golonganPejabatPenilai">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="fieldTmtGolonganPejabatPenilai">TMT Golongan</label>
                <input disabled style="cursor: not-allowed;" type="date" class="form-control" v-model="dataSkp.tmtGolonganPejabatPenilai">
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="step === 3">
          <div class="row row-form">
            <div class="col-12">
              <div class="form-group">
                <label for="fieldStatusAtasanPejabatPenilai">Status Atasan Pejabat Penilai</label>
                <select disabled style="cursor: not-allowed;" id="fieldStatusAtasanPejabatPenilai" class="custom-select" v-model="dataSkp.idStatusAtasanPejabatPenilai">
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
                <input disabled style="cursor: not-allowed;" v-model="dataSkp.nipNrpAtasanPejabatPenilai" type="text" placeholder="Masukkan NIP/NRP" class="form-control">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-12">
              <div class="form-group">
                <label for="fieldNamaAtasanPejabatPenilai">Nama</label>
                <input disabled style="cursor: not-allowed;" type="text" class="form-control" v-model="dataSkp.namaAtasanPejabatPenilai">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-12">
              <div class="form-group">
                <label for="fieldJabatanAtasanPejabatPenilai">Jabatan</label>
                <input disabled style="cursor: not-allowed;" type="text" class="form-control" v-model="dataSkp.jabatanAtasanPejabatPenilai">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-12">
              <div class="form-group">
                <label for="fieldUnitOrganisasiAtasanPejabatPenilai">Unit Organisasi</label>
                <input disabled style="cursor: not-allowed;" type="text" class="form-control" v-model="dataSkp.unitOrganisasiAtasanPejabatPenilai">
              </div>
            </div>
          </div>
          <div class="row row-form">
            <div class="col-6">
              <div class="form-group">
                <label for="fieldGolonganAtasanPejabatPenilai">Golongan</label>
                <input disabled style="cursor: not-allowed;" type="text" class="form-control" v-model="dataSkp.golonganAtasanPejabatPenilai">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="fieldTmtGolonganAtasanPejabatPenilai">TMT Golongan</label>
                <input disabled style="cursor: not-allowed;" type="date" class="form-control" v-model="dataSkp.tmtGolonganAtasanPejabatPenilai">
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="step === 4">
          <div class="form-group text-left" style="margin-bottom: -4px;">
            <label for="fieldDokumenIjazah">Dokumen SKP</label>
          </div>
          <div class="row row-form" v-if="(getModalMethod === 'Ubah' && dataSkp.idDokumen !== null)">
            <div class="col-12">
              <div class="btn btn-sm btn-block btn-secondary" @click="btnGetStreamDokumen()" style="font-weight: 500;">{{ dataSkp.idDokumen === null ? 'Belum Ada Dokumen' : 'Lihat Dokumen' }}</div>
              <iframe v-if="streamDokumen.show" :src="streamDokumen.dokumen" frameborder="0" style="width: 100%; height: 600px; margin-top: 6px;"></iframe>
            </div>
            <div class="col-12" v-if="!changeDokumen">
              <p class="text-center" style="margin: 6px 0px;">atau</p>
              <div class="btn btn-sm btn-block btn-outline-secondary" @click="changeDokumen = true" style="font-weight: 500;">Ganti Dokumen</div>
            </div>
          </div>
          <div class="row row-form" v-if="getModalMethod === 'Tambah' || changeDokumen || (getModalMethod === 'Ubah' && dataSkp.idDokumen === null)">
            <div class="col-12">
              <div class="form-group text-left">
                <div class="custom-file">
                  <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenSkp" @change="onChangeFile">
                  <label class="custom-file-label" for="fieldDokumenSkp" :class="inputError.dokumenSkp.status ? 'form-error' : ''">Cari dokumen</label>
                </div>
                <small :class="inputError.dokumenSkp.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenSkp.status ? inputError.dokumenSkp.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
              </div>
            </div>
            <div class="col-12" v-if="dataSkp.dokumen !== '' && dataSkp.dokumen !== null">
              <iframe :src="dataSkp.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
            </div>
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
import ShimmeringItem from "@/components/ShimmeringItem.vue"
export default {
  components: {
    ShimmeringItem
  },
  mixins: [mixins],
  data() {
    return {
      loading: true,
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
      statusAtasanPejabatPenilai: [],
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
        url: `${env.VITE_BACKEND_URL}/dokumen/${this.dataSkp.idDokumen}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
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
          this.changeDokumen = true
        }
      }
    },
    async onUsulkan() {
      if (!this.changeDokumen) {
        if (this.streamDokumen.dokumen !== "") this.dataSkp.dokumen = this.streamDokumen.dokumen
        else {
          await this.getStreamDokumen().then(res => {
            this.dataSkp.dokumen = res.data
          })
        }
      }
      if ((this.dataSkp.dokumen === "" && this.changeDokumen) || this.dataSkp.dokumen === "") {
        this.inputError.dokumenSkp.status = true
        this.inputError.dokumenSkp.description = "Dokumen harus diisi"
        return
      }
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let dataSkp = {
        dokumen: this.dataSkp.dokumen,
        date: Date.now()
      }
      axios({
        url: `${env.VITE_BACKEND_URL}/data-skp/${this.dataSkp.tahun}/${this.dataSkp.id}`,
        method: "PUT",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(dataSkp), u)
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
    getDataSkp() {
      this.loading = true
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-skp/detail/${idPegawai}/${this.$store.getters.getModalData.tahun}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.dataSkp = data.message.dataSkp[0]
        this.daftarJenisJabatan = data.message.daftarJenisJabatan
        this.daftarJenisPeraturanKinerja = data.message.daftarJenisPeraturanKinerja
        this.statusPejabatPenilai = data.message.daftarStatus
        this.statusAtasanPejabatPenilai = data.message.daftarStatus
        this.fileCategory = data.message.dokumenKategori
      })
    },
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataSkp()
    }
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