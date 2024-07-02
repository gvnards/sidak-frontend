<template>
  <ModalHeaderFooter
    :header-title="'Jabatan/Unit Kerja'"
    :header-subtitle="'jabatan/unit kerja'"
    :illustration="'IllustrationDataJabatanUnitKerja'"
    @onUsulkan="onUsulkan()"
  >
    <ShimmeringItem v-if="loading" :layouts="[12,12,12,6,6,6,6,12]" />
    <div v-else>
      <div style="margin-bottom: 8px;" v-if="dataInvalid">
        <div class="text-red" style="padding: 0.375rem 1.75rem 0.375rem 0.75rem; border-radius: 0.25rem; border: 1px solid #EC392F; font-size: 14px; font-weight: 600;">*Data Unit Organisasi dan Data Jabatan TIDAK SESUAI dengan Daftar Data di MySAPK/MyASN.</div>
      </div>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldUnor">Unit Organisasi</label>
            <div style="margin-bottom: 8px;" v-if="dataInvalid">
              <div class="text-red" style="padding: 0.375rem 1.75rem 0.375rem 0.75rem; border-radius: 0.25rem; border: 1px solid #EC392F; font-size: 14px; font-weight: 600;">{{ dataJabatanUnitOrganisasi.unitOrganisasi }}</div>
              <small class="text-red" style="font-weight: 600;">*Silahkan sesuaikan data unit organisasi.</small>
            </div>
            <!-- <div v-if="dataInvalid" class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ dataJabatanUnitOrganisasi.unitOrganisasi }}</div> -->
            <div class="my-custom-input-wrapper my-custom-input" @click="daftarUnor.showUnor = !daftarUnor.showUnor; daftarUnor.search = '';" style="">{{ unorText }}</div>
            <div class="my-custom-input-item-wrapper-outside" v-show="daftarUnor.showUnor">
              <input type="text" class="form-control" placeholder="Cari Unit Organisasi (minimal 5 karakter)" v-model="daftarUnor.search">
              <div class="my-custom-input-item-wrapper-inside">
                <div class="my-custom-input-item" @click="unorSelected(item)" v-for="(item, idx) in daftarUnor.listAllUnor" :key="parseInt(idx)" v-show="daftarUnor.search.length < 5 ? true : item.nama.toLowerCase().includes(daftarUnor.search.toLowerCase())">
                  {{ item.nama }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group my-form-group">
            <label>Jabatan</label>
            <div style="margin-bottom: 8px;" v-if="dataInvalid">
              <div class="text-red" style="padding: 0.375rem 1.75rem 0.375rem 0.75rem; border-radius: 0.25rem; border: 1px solid #EC392F; font-size: 14px; font-weight: 600;">{{ dataJabatanUnitOrganisasi.jabatan }}</div>
              <small class="text-red" style="font-weight: 600;">*Silahkan sesuaikan data jabatan.</small>
            </div>
            <!-- <div v-if="dataInvalid" class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ dataJabatanUnitOrganisasi.jabatan }}</div> -->
            <div class="my-custom-input-wrapper my-custom-input" @click="daftarJabatan.showJabatan = !daftarJabatan.showJabatan; daftarJabatan.search = '';">{{ jabatanText }}</div>
            <div class="my-custom-input-item-wrapper-outside" v-show="daftarJabatan.showJabatan">
              <input type="text" class="form-control" placeholder="Cari jabatan (minimal 5 karakter)" v-model="daftarJabatan.search">
              <div class="my-custom-input-item-wrapper-inside">
                <div class="my-custom-input-item" @click="jabatanSelected(item)" v-for="(item, idx) in daftarJabatan.listJabatanActive" :key="parseInt(idx)" v-show="daftarJabatan.search.length < 5 ? true : item.nama.toLowerCase().includes(daftarJabatan.search.toLowerCase())" :style="item.kodeKomponen === dataJabatanUnitOrganisasi.kodeKomponen ? '' : 'color: #EC392F;'">
                  {{ `${item.nama} | terisi: ${item.jabatanTerisi} | kebutuhan: ${item.kebutuhan}` }}
                </div>
              </div>
            </div>
            <small class="text-red" v-if="inputError.jabatan.status"><b>*{{ inputError.jabatan.description }}</b></small>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="jenisJabatan">Jenis Jabatan</label>
            <div class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ jenisJabatanText }}</div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                v-model="dataJabatanUnitOrganisasi.isPltPlh"
                class="custom-control-input"
                id="fieldIsPltPlh"
              />
              <label class="custom-control-label" for="fieldIsPltPlh"
                >Centang jika jabatan yang akan diusulkan adalah jabatan
                Plt./Plh.</label
              >
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="fieldTugasTambahan">Tugas Tambahan</label>
            <select
              id="fieldTugasTambahan"
              class="custom-select"
              v-model="dataJabatanUnitOrganisasi.idJabatanTugasTambahan"
            >
              <option disabled>-- Pilih Tugas Tambahan --</option>
              <option
                value="null"
                :selected="dataJabatanUnitOrganisasi.idJabatanTugasTambahan == null"
              >
                Tidak memiliki tugas tambahan
              </option>
              <option :value="item.id" v-for="item in daftarTugasTambahan" :key="item.id">{{ item.nama }}</option>
            </select>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldTmt">TMT</label>
            <div v-if="isMethodUpdate" class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ dataJabatanUnitOrganisasi.tmt }}</div>
            <input v-else
              :class="inputError.tmt.status ? 'form-error' : ''"
              type="date"
              v-model="dataJabatanUnitOrganisasi.tmt"
              id="fieldTmt"
              class="form-control"
            />
            <small class="text-red" v-if="inputError.tmt.status"
              ><b>*{{ inputError.tmt.description }}</b></small
            >
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldSpmt">SPMT</label>
            <div v-if="isMethodUpdate" class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ dataJabatanUnitOrganisasi.spmt }}</div>
            <input v-else
              :class="inputError.spmt.status ? 'form-error' : ''"
              type="date"
              v-model="dataJabatanUnitOrganisasi.spmt"
              id="fieldSpmt"
              class="form-control"
            />
            <small class="text-red" v-if="inputError.spmt.status"
              ><b>*{{ inputError.spmt.description }}</b></small
            >
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldNomorDokumen">Nomor SK</label>
            <input
              :class="inputError.nomorDokumen.status ? 'form-error' : ''"
              type="text"
              placeholder="Nomor SK Jabatan Anda"
              v-model="dataJabatanUnitOrganisasi.nomorDokumen"
              id="fieldNomorDokumen"
              class="form-control"
            />
            <small class="text-red" v-if="inputError.nomorDokumen.status"
              ><b>*{{ inputError.nomorDokumen.description }}</b></small
            >
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="fieldTglDokumen">Tanggal SK</label>
            <div v-if="isMethodUpdate" class="form-control text-primary" style="font-weight: 600; background-color: rgba(188, 188, 188, 0.5); cursor: not-allowed;">{{ dataJabatanUnitOrganisasi.tanggalDokumen }}</div>
            <input v-else
              :class="inputError.tanggalDokumen.status ? 'form-error' : ''"
              type="date"
              v-model="dataJabatanUnitOrganisasi.tanggalDokumen"
              id="fieldTglDokumen"
              class="form-control"
            />
            <small class="text-red" v-if="inputError.tanggalDokumen.status"
              ><b>*{{ inputError.tanggalDokumen.description }}</b></small
            >
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left" style="margin-bottom: -4px;">
            <label for="fieldDokumenSk">Dokumen SK Jabatan</label>
            <small class="text-red"><b> *Jika JFT, maka yang diupload SK Jabfung</b></small>
          </div>
        </div>
      </div>
      <div class="row row-form" v-if="(getModalMethod === 'Ubah' && dataJabatanUnitOrganisasi.idDokumen !== null)">
        <div class="col-12">
          <div class="btn btn-sm btn-block btn-secondary" @click="btnGetStreamDokumen()" style="font-weight: 500;">{{ dataJabatanUnitOrganisasi.idDokumen === null ? 'Belum Ada Dokumen' : 'Lihat Dokumen' }}</div>
          <iframe v-if="streamDokumen.show" :src="streamDokumen.dokumen" frameborder="0" style="width: 100%; height: 600px; margin-top: 6px;"></iframe>
        </div>
        <div class="col-12" v-if="!changeDokumen">
          <p class="text-center" style="margin: 6px 0px;">atau</p>
          <div class="btn btn-sm btn-block btn-outline-secondary" @click="changeDokumen = true" style="font-weight: 500;">Ganti Dokumen</div>
        </div>
      </div>
      <div class="row row-form">
        <div class="col-12" v-if="getModalMethod === 'Tambah' || changeDokumen || (getModalMethod === 'Ubah' && dataJabatanUnitOrganisasi.idDokumen === null)">
          <div class="form-group text-left">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                accept="application/pdf"
                id="fieldDokumenSk"
                @change="onChangeFile"
              />
              <label
                class="custom-file-label"
                for="fieldDokumenSk"
                :class="inputError.dokumenSk.status ? 'form-error' : ''"
                >Cari dokumen</label
              >
            </div>
            <small
              :class="inputError.dokumenSk.status ? 'text-red' : 'text-primary'"
              ><b
                >*{{
                  inputError.dokumenSk.status
                    ? inputError.dokumenSk.description
                    : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${
                        fileCategory.ukuran * 1024
                      }KB).`
                }}</b
              ></small
            >
          </div>
        </div>
        <div class="col-12" v-if="dataJabatanUnitOrganisasi.dokumen !== '' && dataJabatanUnitOrganisasi.dokumen !== null">
          <iframe :src="dataJabatanUnitOrganisasi.dokumen" frameborder="0" style="width: 100%; height: 600px"
          ></iframe>
        </div>
      </div>
      <div class="row row-form" style="border-top: 2px dashed #477b79; border-bottom: 2px dashed #477b79; padding-top: 8px; padding-bottom: 8px;">
        <div class="col-12">
          <div class="btn my-btn-outline-primary btn-block btn-sm" @click="addMutasiUnor">Tambah Mutasi Unor</div>
        </div>
        <div class="col-12" v-for="(item, idx) in listMutasiUnor.data" :key="item.id" style="margin-top: 16px; padding-top: 8px; border-top: 1px solid #acb7c2;">
          <ComponentDataJabatanUnitKerjaMutasi :isUsulkan="listMutasiUnor.isUsulkan" @deleteMutasiUnor="deleteMutasiUnor($event)" :index="idx" :urutanArray="listMutasiUnor.data.length - idx" @valueChangeMutasiUnor="valueChangeMutasiUnor($event)" :dataMutasiUnor="item" :listAllUnor="daftarUnor.listAllUnor" />
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
import ComponentDataJabatanUnitKerjaMutasi from "./ComponentDataJabatanUnitKerjaMutasi.vue"
export default {
  components: {
    ShimmeringItem,
    ComponentDataJabatanUnitKerjaMutasi
  },
  mixins: [mixins],
  data() {
    return {
      listMutasiUnor: {
        data: [],
        isUsulkan: false,
      },
      oldData: {},
      loading: true,
      dataInvalid: false,
      jabatanText: "-- Pilih Unit Organisasi Dahulu --",
      jenisJabatanText: "-",
      unorText: "-- Unit Organisasi Belum Dipilih --",
      dataJabatanUnitOrganisasi: {
        kodeKomponen: "",
        idJabatan: 0,
        isPltPlh: false,
        idJabatanTugasTambahan: null,
        tmt: "",
        spmt: "",
        nomorDokumen: "",
        tanggalDokumen: "",
        dokumen: "",
      },
      daftarUnor: {
        listAllUnor: [],
        listUnorActive: [],
        listUnorSelected: [],
        showUnor: false,
        search: ""
      },
      daftarJabatan: {
        listAllJabatan: [],
        listGroupJabatan: [],
        listJabatanActive: [],
        showJabatan: false,
        search: ""
      },
      daftarTugasTambahan: [],
      fileCategory: {},
      inputError: {
        dokumenSk: {
          status: false,
          description: ""
        },
        jabatan: {
          status: false,
          description: ""
        },
        tmt: {
          status: false,
          description: ""
        },
        spmt: {
          status: false,
          description: ""
        },
        nomorDokumen: {
          status: false,
          description: ""
        },
        tanggalDokumen: {
          status: false,
          description: ""
        },
      },
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
    isMethodUpdate() {
      return this.getModalMethod === "Ubah"
    },
    isFulFilled() {
      let dok = true
      if (this.getModalMethod === "Tambah") {
        if (this.dataJabatanUnitOrganisasi.dokumen === "") dok = false
      } else {
        if (this.dataJabatanUnitOrganisasi.idDokumen === null && this.dataJabatanUnitOrganisasi.dokumen === "") dok = false
        else dok = !(this.dataJabatanUnitOrganisasi.dokumen !== "" ^ this.changeDokumen)
      }
      return this.dataJabatanUnitOrganisasi.idJabatan !== 0 && this.dataJabatanUnitOrganisasi.tmt !== "" && this.dataJabatanUnitOrganisasi.spmt !== "" && this.dataJabatanUnitOrganisasi.nomorDokumen !== "" && this.dataJabatanUnitOrganisasi.tanggalDokumen !== "" && dok
    },
  },
  methods: {
    valueChangeMutasiUnor(value) {
      // let dt = this.listMutasiUnor.data.filter(el => String(el.id) === String(value.id))
      this.listMutasiUnor.data[parseInt(value.idx)][value.component] = value.value
    },
    deleteMutasiUnor(idx) {
      this.listMutasiUnor.data.splice(idx,1)
    },
    addMutasiUnor() {
      let newDate = (new Date()).getTime()
      let newData = {
        id: `new-${newDate}`,
        idUnor: null,
        tmt: "",
        spmt: "",
        nomorDokumen: "",
        tanggalDokumen: "",
        dokumen: ""
      }
      this.listMutasiUnor.data.unshift(newData)
    },
    btnGetStreamDokumen() {
      this.streamDokumen.show = !this.streamDokumen.show
      if (this.streamDokumen.dokumen !== "") return
      this.getStreamDokumen().then(res => {
        this.streamDokumen.dokumen = res.data
      })
    },
    async getStreamDokumen() {
      return axios({
        url: `${env.VITE_BACKEND_URL}/dokumen/${this.dataJabatanUnitOrganisasi.idDokumen}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    whereError() {
      this.inputError.jabatan.status = this.dataJabatanUnitOrganisasi.idJabatan === 0
      this.inputError.jabatan.description = this.dataJabatanUnitOrganisasi.idJabatan === 0 ? "Jabatan harus pilih" : ""
      this.inputError.tmt.status = this.dataJabatanUnitOrganisasi.tmt === ""
      this.inputError.tmt.description = this.dataJabatanUnitOrganisasi.tmt === "" ? "TMT harus diisi" : ""
      this.inputError.spmt.status = this.dataJabatanUnitOrganisasi.spmt === ""
      this.inputError.spmt.description = this.dataJabatanUnitOrganisasi.spmt === "" ? "SPMT harus diisi" : ""
      this.inputError.nomorDokumen.status = this.dataJabatanUnitOrganisasi.nomorDokumen === ""
      this.inputError.nomorDokumen.description = this.dataJabatanUnitOrganisasi.nomorDokumen === "" ? "Nomor SK harus diisi" : ""
      this.inputError.tanggalDokumen.status = this.dataJabatanUnitOrganisasi.tanggalDokumen === ""
      this.inputError.tanggalDokumen.description = this.dataJabatanUnitOrganisasi.tanggalDokumen === "" ? "Tanggal SK harus diisi" : ""
      if (this.getModalMethod === "Tambah") {
        if (this.dataJabatanUnitOrganisasi.dokumen === "") {
          this.inputError.dokumenSk.status = true
          this.inputError.dokumenSk.description = this.inputError.dokumenSk.status ? "Dokumen harus diisi" : ""
        }
      } else {
        if (this.dataJabatanUnitOrganisasi.idDokumen === null && this.dataJabatanUnitOrganisasi.dokumen === "") {
          this.inputError.dokumenSk.status = true
          this.inputError.dokumenSk.description = this.inputError.dokumenSk.status ? "Dokumen harus diisi" : ""
        } else {
          this.inputError.dokumenSk.status = !!(this.dataJabatanUnitOrganisasi.dokumen !== "" ^ this.changeDokumen)
          this.inputError.dokumenSk.description = this.inputError.dokumenSk.status ? "Dokumen harus diisi" : ""
        }
      }
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumenSk.status = true
          this.inputError.dokumenSk.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataJabatanUnitOrganisasi.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumenSk.status = true
          this.inputError.dokumenSk.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataJabatanUnitOrganisasi.dokumen = ""
        } else {
          this.inputError.dokumenSk.status = false
          this.dataJabatanUnitOrganisasi.dokumen = await this.getBase64(item.target.files[0])
          this.changeDokumen = true
        }
      }
    },
    jabatanSelected(item) {
      this.dataJabatanUnitOrganisasi.idJabatan = parseInt(item.id)
      this.dataJabatanUnitOrganisasi.kodeKomponenJabatan = item.kodeKomponen
      this.jabatanText = item.nama
      this.daftarJabatan.showJabatan = false
      this.jenisJabatanText = item.jenisJabatan
    },
    listJabatanActive(kodeKomponen, isUpdated=false) {
      this.daftarJabatan.showJabatan = false
      this.jabatanText = "-- Sedang Diproses --"
      this.daftarJabatan.listJabatanActive = []
      let jabatanSesuaiKodeKomponen = this.daftarJabatan.listAllJabatan.filter(el => el.kodeKomponen === kodeKomponen)
      if (jabatanSesuaiKodeKomponen.length > 0) {
        let jabatanTidakSesuaiKodeKomponen = this.daftarJabatan.listGroupJabatan.filter(el => el.kodeKomponen !== kodeKomponen)
        jabatanSesuaiKodeKomponen = jabatanSesuaiKodeKomponen.concat(jabatanTidakSesuaiKodeKomponen)
        this.daftarJabatan.listJabatanActive = jabatanSesuaiKodeKomponen
        this.jabatanText = "-- Pilih Jabatan --"
        this.jenisJabatanText = "-"
      } else {
        this.jabatanText = "-- Pilih Unit Organisasi Dahulu --"
        this.jenisJabatanText = "-"
      }
      if (!isUpdated) this.dataJabatanUnitOrganisasi.idJabatan = 0
    },
    unorSelected(item) {
      this.dataJabatanUnitOrganisasi.kodeKomponen = item.kodeKomponen
      this.listJabatanActive(item.kodeKomponen)
      this.daftarUnor.showUnor = false
      this.unorText = item.nama
    },
    async onUsulkan() {
      this.listMutasiUnor.isUsulkan = true
      return
      if (!this.isFulFilled) return this.whereError()
      if(this.$store.getters.getModalMethod === "UPDATE") {
        if (!this.doesDataChange(this.oldData, this.dataJabatanUnitOrganisasi)) {
          this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
          this.$store.commit("onModalFolder", "StatusCallback")
          this.$store.commit("onModalContent", "StatusCallback")
          this.$store.commit("onModalStatusCallback", {
            status: "Failed",
            message: "Data tidak ada perubahan."
          })
          return
        }
      }
      if (!this.changeDokumen) {
        if (this.streamDokumen.dokumen !== "") this.dataJabatanUnitOrganisasi.dokumen = this.streamDokumen.dokumen
        else {
          await this.getStreamDokumen().then(res => {
            this.dataJabatanUnitOrganisasi.dokumen = res.data
          })
        }
      }
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataJabatanUnitOrganisasi.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-jabatan" : `/data-jabatan/${this.dataJabatanUnitOrganisasi.id}`
      this.dataJabatanUnitOrganisasi.date = Date.now()
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataJabatanUnitOrganisasi), u)
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
    getDataJabatanCreated() {
      this.loading = true
      axios({
        url: `${env.VITE_BACKEND_URL}/data-jabatan/created`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.fileCategory = data.message.dokumenKategori
        this.daftarTugasTambahan = data.message.tugasTambahan
        this.daftarUnor.listAllUnor = data.message.unitOrganisasi
        this.daftarJabatan.listAllJabatan = data.message.jabatan.jabatan
        // this.daftarJabatan.listGroupJabatan = data.message.jabatan.jabatanGroup
        let jbtnGrp = []
        data.message.jabatan.jabatan.forEach(el => {
          if (parseInt(el.terisi) > 0 || parseInt(el.kebutuhan) > -1) {
            if (jbtnGrp.length === 0) {
              jbtnGrp.push(el)
            } else {
              if (jbtnGrp[jbtnGrp.length - 1].nama !== el.nama) jbtnGrp.push(el)
            }
          }
        })
        this.daftarJabatan.listGroupJabatan = jbtnGrp
      })
    },
    getDataJabatanDetail() {
      this.loading = true
      axios({
        url: `${env.VITE_BACKEND_URL}/data-jabatan/detail/${this.$store.getters.getIdPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.fileCategory = data.message.dokumenKategori
        this.daftarTugasTambahan = data.message.tugasTambahan
        this.daftarUnor.listAllUnor = data.message.unitOrganisasi
        this.daftarJabatan.listAllJabatan = data.message.jabatan.jabatan
        // this.daftarJabatan.listGroupJabatan = data.message.jabatan.jabatanGroup
        let jbtnGrp = []
        data.message.jabatan.jabatan.forEach(el => {
          if (parseInt(el.terisi) > 0 || parseInt(el.kebutuhan) > -1) {
            if (jbtnGrp.length === 0) {
              jbtnGrp.push(el)
            } else {
              if (jbtnGrp[jbtnGrp.length - 1].nama !== el.nama) jbtnGrp.push(el)
            }
          }
        })
        this.daftarJabatan.listGroupJabatan = jbtnGrp
        this.dataJabatanUnitOrganisasi = data.message.dataJabatanUnitOrganisasi[0]
        this.dataJabatanUnitOrganisasi.isPltPlh = parseInt(this.dataJabatanUnitOrganisasi.isPltPlh) === 1
        if (this.dataJabatanUnitOrganisasi.kodeKomponen.includes("-")) {
          // this.dataJabatanUnitOrganisasi.idJabatan = 0
          // this.dataJabatanUnitOrganisasi.kodeKomponen = ""
          this.dataInvalid = true
          this.jenisJabatanText = "-"
        } else {
          let unor = this.daftarUnor.listAllUnor.filter(el => el.kodeKomponen === this.dataJabatanUnitOrganisasi.kodeKomponen)
          this.unorText = unor.length > 0 ? unor[0].nama : "-- Unit Organisasi Belum Dipilih --"
          let jbtn = this.daftarJabatan.listAllJabatan.filter(el => parseInt(el.id) === parseInt(this.dataJabatanUnitOrganisasi.idJabatan))
          this.dataJabatanUnitOrganisasi.kodeKomponenJabatan = jbtn.length > 0 ? jbtn[0].kodeKomponen : ""
          this.listJabatanActive(this.dataJabatanUnitOrganisasi.kodeKomponen, true)
          this.jabatanText = jbtn.length > 0 ? jbtn[0].nama : "-- Unit Organisasi Belum Dipilih --"
          this.jenisJabatanText = jbtn.length > 0 ? jbtn[0].jenisJabatan : "-"
        }
        this.oldData = {...this.dataJabatanUnitOrganisasi}
      })
    }
  },
  created() {
    if (this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataJabatanDetail()
    } else {
      this.getDataJabatanCreated()
    }
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
  // overflow: hidden;
  overflow: hidden;
  overflow-x: auto;
  cursor: default;
  box-sizing: border-box;
  // text-overflow: ellipsis;
  &.my-custom-input {
    display: inline-block;
    width: 100%;
    // height: calc(2.25rem + 2px);
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
  .my-custom-input-item-wrapper-inside {
    max-height: 200px;
    overflow: auto;
  }
  .my-custom-input-item {
    border-bottom: 2px solid lightgray;
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