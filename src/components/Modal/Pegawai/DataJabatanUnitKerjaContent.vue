<template>
  <ModalHeaderFooter
    :header-title="'Jabatan/Unit Kerja'"
    :header-subtitle="'jabatan/unit kerja'"
    :illustration="'IllustrationDataJabatanUnitKerja'"
    @onUsulkan="onUsulkan()"
  >
    <div style="margin-bottom: 8px;" v-if="dataJabatanUnitKerja.kodeKomponen.includes('-')">
      <div class="text-red" style="padding: 0.375rem 1.75rem 0.375rem 0.75rem; border-radius: 0.25rem; border: 1px solid #EC392F; font-size: 14px; font-weight: 600;">*Data Unit Organisasi dan Data Jabatan TIDAK SESUAI dengan Daftar Data di MySAPK/MyASN.</div>
    </div>
    <div class="form-group text-left" style="margin: 0">
      <label for="fieldUnitOrganisasi">Unit Organisasi</label>
      <div style="margin-bottom: 8px;" v-if="dataJabatanUnitKerja.kodeKomponen.includes('-')">
        <div class="text-red" style="padding: 0.375rem 1.75rem 0.375rem 0.75rem; border-radius: 0.25rem; border: 1px solid #EC392F; font-size: 14px; font-weight: 600;">{{ dataJabatanUnitKerja.jabatan }}</div>
        <small class="text-red" style="font-weight: 600;">*Silahkan sesuaikan data unit organisasi.</small>
      </div>
    </div>
    <div v-for="(unor, idx) in unitOrganisasi" :key="idx">
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left" style="margin-bottom: 8px">
            <select
              class="custom-select"
              @change="onSelectedUnitOrganisasi(idx, $event)"
            >
              <option
                value="0"
                :selected="selectedUnitOrganisasi[idx] === undefined"
                disabled
              >
                Pilih {{ idx !== 0 ? "Sub" : "" }} Unit Organisasi
              </option>
              <option
                :selected="
                  selectedUnitOrganisasi[idx] !== undefined &&
                  selectedUnitOrganisasi[idx].kodeKomponen === item.kodeKomponen
                "
                v-for="item in unor"
                :key="item.id"
                :value="JSON.stringify(item)"
              >
                {{ item.nama }}
              </option>
            </select>
          </div>
          <div
            class="btn btn-sm my-btn-primary btn-block"
            v-if="isSubOrganisasi[idx] === true"
            @click="addSubOrganisasi(idx)"
          >
            Tambah Sub Organisasi
          </div>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <!-- <div class="form-group" style="padding-bottom: 0; margin-bottom: 0">
          <label for="fieldDaftarJabatan">Jabatan</label>
          <select
            class="custom-select"
            :class="inputError.jabatan.status ? 'form-error' : ''"
            :disabled="daftarJabatan.length === 0"
            id="fieldDaftarJabatan"
            v-model="dataJabatanUnitKerja.idJabatan"
          >
            <option
              value="0"
              :selected="dataJabatanUnitKerja.idJabatan === 0"
              disabled
            >
              {{
                daftarJabatan.length === 0
                  ? "Tidak Ada Jabatan"
                  : "-- Pilih Jabatan --"
              }}
            </option>
            <option
              :selected="dataJabatanUnitKerja.idJabatan === item.id"
              v-for="item in daftarJabatan"
              :key="item.id"
              :value="item.id"
              :style="selectedUnitOrganisasi[selectedUnitOrganisasi.length-1].kodeKomponen !== item.kodeKomponen ? 'color: red;' : ''"
            >
              {{
                `${item.jabatan} | terisi: ${item.jabatanTerisi} | kebutuhan: ${item.kebutuhan}`
              }}
            </option>
          </select>
          <small class="text-red"
            ><b
              >*Jika jabatan tidak ada, silahkan ubah unit organisasi sesuai
              hirarki</b
            ></small
          >
          <br />
          <small class="text-red" v-if="inputError.jabatan.status"
            ><b>*{{ inputError.jabatan.description }}</b></small
          >
        </div> -->
        <div class="form-group my-form-group">
            <label>Jabatan</label>
            <div style="margin-bottom: 8px;" v-if="dataJabatanUnitKerja.kodeKomponen.includes('-')">
              <div class="text-red" style="padding: 0.375rem 1.75rem 0.375rem 0.75rem; border-radius: 0.25rem; border: 1px solid #EC392F; font-size: 14px; font-weight: 600;">{{ dataJabatanUnitKerja.jabatan }}</div>
              <small class="text-red" style="font-weight: 600;">*Silahkan sesuaikan data jabatan.</small>
            </div>
            <div :title="jabatanSelectedText" class="my-custom-input-wrapper my-custom-input" @click="jabatanSelectedText === '-- Pilih Unit Organisasi Dahulu --' || jabatanSelectedText === '-- Sedang Diproses --' ? '' : isShowDaftarJabatan = !isShowDaftarJabatan" :style="jabatanSelectedText === '-- Pilih Unit Organisasi Dahulu --' || jabatanSelectedText === '-- Sedang Diproses --' ? 'background-color:#e9ecef; cursor: not-allowed;' : ''">{{ jabatanSelectedText }}</div>
            <div class="my-custom-input-item-wrapper-outside" v-show="isShowDaftarJabatan">
              <input type="text" class="form-control" placeholder="Cari jabatan (minimal 5 karakter)" v-model="searchValue">
              <div class="my-custom-input-item-wrapper-inside">
                <div @click="onJabatanSelected(item)" class="my-custom-input-item" v-for="item in daftarJabatan" :key="item.id" v-show="searchValue.length < 5 ? true : item.jabatan.toLowerCase().includes(searchValue.toLowerCase())"
              :style="selectedUnitOrganisasi[selectedUnitOrganisasi.length-1].kodeKomponen !== item.kodeKomponen ? 'color: red;' : ''">
                  {{ `${item.jabatan} | terisi: ${item.jabatanTerisi} | kebutuhan: ${item.kebutuhan}` }}
                </div>
              </div>
            </div>
            <small class="text-red" v-if="inputError.jabatan.status"><b>*{{ inputError.jabatan.description }}</b></small>
          </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              v-model="dataJabatanUnitKerja.isPltPlh"
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
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldTugasTambahan">Tugas Tambahan</label>
          <select
            id="fieldTugasTambahan"
            class="custom-select"
            v-model="dataJabatanUnitKerja.idJabatanTugasTambahan"
          >
            <option disabled>-- Pilih Tugas Tambahan --</option>
            <option
              value="null"
              :selected="dataJabatanUnitKerja.idJabatanTugasTambahan == null"
            >
              Tidak memiliki tugas tambahan
            </option>
            <option :value="item.id" v-for="item in daftarTugasTambahan" :key="item.id">{{ item.nama }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldTmt">TMT</label>
          <input
            :class="inputError.tmt.status ? 'form-error' : ''"
            type="date"
            v-model="dataJabatanUnitKerja.tmt"
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
          <input
            :class="inputError.spmt.status ? 'form-error' : ''"
            type="date"
            v-model="dataJabatanUnitKerja.spmt"
            id="fieldSpmt"
            class="form-control"
          />
          <small class="text-red" v-if="inputError.spmt.status"
            ><b>*{{ inputError.spmt.description }}</b></small
          >
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldNomorDokumen">Nomor SK</label>
          <input
            :class="inputError.nomorDokumen.status ? 'form-error' : ''"
            type="text"
            placeholder="Nomor SK Jabatan Anda"
            v-model="dataJabatanUnitKerja.nomorDokumen"
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
          <input
            :class="inputError.tanggalDokumen.status ? 'form-error' : ''"
            type="date"
            v-model="dataJabatanUnitKerja.tanggalDokumen"
            id="fieldTglDokumen"
            class="form-control"
          />
          <small class="text-red" v-if="inputError.tanggalDokumen.status"
            ><b>*{{ inputError.tanggalDokumen.description }}</b></small
          >
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldDokumenSk">Dokumen SK Jabatan</label>
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
    </div>
    <div class="row row-form">
      <div class="col-12">
        <iframe
          v-if="
            dataJabatanUnitKerja.dokumen !== '' &&
            dataJabatanUnitKerja.dokumen !== null
          "
          :src="dataJabatanUnitKerja.dokumen"
          frameborder="0"
          style="width: 100%; height: 600px"
        ></iframe>
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
      searchValue: "",
      jabatanSelectedText: "-- Pilih Unit Organisasi Dahulu --",
      isShowDaftarJabatan: false,
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
      unitOrganisasi: [],
      selectedUnitOrganisasi: [],
      isSubOrganisasi: [],
      dataJabatanUnitKerja: {
        idJabatan: 0,
        isPltPlh: false,
        idJabatanTugasTambahan: null,
        tmt: "",
        spmt: "",
        nomorDokumen: "",
        tanggalDokumen: "",
        dokumen: "",
        kodeKomponen: ""
      },
      daftarJabatan: [],
      daftarTugasTambahan: []
    }
  },
  computed: {
    isFullfilled() {
      return this.dataJabatanUnitKerja.idJabatan !== 0 && this.dataJabatanUnitKerja.tmt !== "" && this.dataJabatanUnitKerja.spmt !== "" && this.dataJabatanUnitKerja.nomorDokumen !== "" && this.dataJabatanUnitKerja.tanggalDokumen !== "" && this.dataJabatanUnitKerja.dokumen !== ""
    }
  },
  methods: {
    whereError() {
      this.inputError.jabatan.status = this.dataJabatanUnitKerja.idJabatan === 0
      this.inputError.jabatan.description = this.dataJabatanUnitKerja.idJabatan === 0 ? "Jabatan harus pilih" : ""
      this.inputError.tmt.status = this.dataJabatanUnitKerja.tmt === ""
      this.inputError.tmt.description = this.dataJabatanUnitKerja.tmt === "" ? "TMT harus diisi" : ""
      this.inputError.spmt.status = this.dataJabatanUnitKerja.spmt === ""
      this.inputError.spmt.description = this.dataJabatanUnitKerja.spmt === "" ? "SPMT harus diisi" : ""
      this.inputError.nomorDokumen.status = this.dataJabatanUnitKerja.nomorDokumen === ""
      this.inputError.nomorDokumen.description = this.dataJabatanUnitKerja.nomorDokumen === "" ? "Nomor SK harus diisi" : ""
      this.inputError.tanggalDokumen.status = this.dataJabatanUnitKerja.tanggalDokumen === ""
      this.inputError.tanggalDokumen.description = this.dataJabatanUnitKerja.tanggalDokumen === "" ? "Tanggal SK harus diisi" : ""
      this.inputError.dokumenSk.status = this.dataJabatanUnitKerja.dokumen === ""
      this.inputError.dokumenSk.description = this.dataJabatanUnitKerja.dokumen === "" ? "Dokumen harus diisi" : ""
    },
    onJabatanSelected(item) {
      this.jabatanSelectedText = item.jabatan
      this.dataJabatanUnitKerja.idJabatan = item.id
      this.isShowDaftarJabatan = false
    },
    onUsulkan() {
      if (!this.isFullfilled) return this.whereError()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataJabatanUnitKerja.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-jabatan" : `/data-jabatan/${this.dataJabatanUnitKerja.id}`
      this.dataJabatanUnitKerja.date = Date.now()
      this.dataJabatanUnitKerja.kodeKomponen = this.selectedUnitOrganisasi[this.selectedUnitOrganisasi.length-1].kodeKomponen
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataJabatanUnitKerja), u)
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
    onSelectedUnitOrganisasi(idx, event) {
      let tempSelectedUnitOrganisasi = [...this.selectedUnitOrganisasi]
      this.selectedUnitOrganisasi[idx] = JSON.parse(event.target.value)
      let isDifferent = false
      for (let i = 0; i < tempSelectedUnitOrganisasi.length; i++) {
        if (tempSelectedUnitOrganisasi[i].id !== this.selectedUnitOrganisasi[i].id) {
          this.unitOrganisasi = this.unitOrganisasi.slice(0, i + 1)
          this.selectedUnitOrganisasi = this.selectedUnitOrganisasi.slice(0, i + 1)
          this.isSubOrganisasi = this.isSubOrganisasi.slice(0, i + 1)
          this.isSubOrganisasi.pop()
          this.getJabatan(this.selectedUnitOrganisasi[i].kodeKomponen)
          isDifferent = true
          break
        }
      }
      this.dataJabatanUnitKerja.idJabatan = 0
      this.hasSubOrganisasi(idx, JSON.parse(event.target.value))
      if (!isDifferent) {
        this.getJabatan(JSON.parse(event.target.value).kodeKomponen)
      }
    },
    async getUnitOrganisasi(kodeKomponen = null) {
      let url = kodeKomponen === null ? "/unit-organisasi" : `/unit-organisasi/${kodeKomponen}.`
      return axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    addSubOrganisasi(idx) {
      this.isSubOrganisasi[idx] = false
      let kodeKomponen = this.selectedUnitOrganisasi[idx].kodeKomponen
      this.getUnitOrganisasi(kodeKomponen).then(res => {
        let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
        let u = token.username
        this.isLoading = false
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        if (data.message.length > 0) {
          this.unitOrganisasi.push(data.message)
        }
      })
    },
    hasSubOrganisasi(idx, item) {
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      axios({
        url: `${env.VITE_BACKEND_URL}/has-sub-organisasi/${item.kodeKomponen}.`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.isSubOrganisasi.push(data.message)
      })
    },
    getJabatan(kodeKomponen) {
      this.daftarJabatan = []
      this.jabatanSelectedText = "-- Sedang Diproses --"
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      // let url = `${env.VITE_BACKEND_URL}/jabatan/${kodeKomponen}` // sama dengan peta jabatan
      let url = `${env.VITE_BACKEND_URL}/jabatan-all-group/${kodeKomponen}` // tidak sama dengan peta jabatan (semua jabatan tampil)
      return axios({
        url: url,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        if (data.message.length > 0) {
          this.jabatanSelectedText = "-- Pilih Jabatan --"
          this.daftarJabatan = data.message
        } else {
          this.jabatanSelectedText = "-- Pilih Unit Organisasi Dahulu --"
        }
      })
    },
    getTugasTambahan() {
      this.daftarTugasTambahan = []
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      axios({
        url: `${env.VITE_BACKEND_URL}/tugas-tambahan`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        if (data.status == 2) {
          this.daftarTugasTambahan = data.message
        }
      })
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumenSk.status = true
          this.inputError.dokumenSk.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataJabatanUnitKerja.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumenSk.status = true
          this.inputError.dokumenSk.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataPasangan.dokumen = ""
        } else {
          this.inputError.dokumenSk.status = false
          this.dataJabatanUnitKerja.dokumen = await this.getBase64(item.target.files[0])
        }
      }
    },
    getMaxFileSize() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/dokumen-kategori/jabatan`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.fileCategory = data.message[0]
      })
    },
    getDataJabatanUnitKerja() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-jabatan/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(async (res) => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataJabatanUnitKerja = data.message[0]
        this.dataJabatanUnitKerja.isPltPlh = this.dataJabatanUnitKerja.isPltPlh == 1
        /// check dulu kalo kode komponennya ada "-", yang mengartikan bahwa di SIASN Unor itu TIDAK ADA, maka lgsg munculkan seperti nambah baru
        if (this.dataJabatanUnitKerja.kodeKomponen.includes("-")) {
          this.getUnitOrganisasi("431").then(res => {
            let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
            let u = token.username
            this.isLoading = false
            let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
            if (data.message.length > 0) {
              this.unitOrganisasi.push(data.message)
            }
          })
        } else {
          let kodeKomponen = this.dataJabatanUnitKerja.kodeKomponen.split(".")
          let selectedUnitOrganisasi = []
          for (let i = 0; i < kodeKomponen.length; i++) {
            let kodeKomponenTemp = ""
            for (let j = 0; j <= i; j++) {
              kodeKomponenTemp = `${kodeKomponenTemp}.${kodeKomponen[j]}`
            }
            kodeKomponenTemp = `${kodeKomponenTemp}.`
            kodeKomponenTemp = kodeKomponenTemp[0] === "." ? kodeKomponenTemp.slice(1) : kodeKomponenTemp
            kodeKomponenTemp = kodeKomponenTemp[kodeKomponenTemp.length - 1] === "." ? kodeKomponenTemp.slice(0, kodeKomponenTemp.length - 1) : kodeKomponenTemp
            selectedUnitOrganisasi.push(kodeKomponenTemp)
          }
          for (let i = 0; i < selectedUnitOrganisasi.length; i++) {
            if (i !== 0) {
              if (i + 1 === selectedUnitOrganisasi.length) {
                await this.hasSubOrganisasi(i, { kodeKomponen: `${selectedUnitOrganisasi[i]}` })
              } else {
                this.isSubOrganisasi.push(false)
              }
            }
            await this.getUnitOrganisasi(selectedUnitOrganisasi[i]).then(res => {
              let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
              let u = token.username
              this.isLoading = false
              let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
              if (data.message.length > 0) {
                this.unitOrganisasi.push(data.message)
              }
            })
            if (i !== 0) {
              this.selectedUnitOrganisasi.push(this.unitOrganisasi[i-1].find(el => el.kodeKomponen === selectedUnitOrganisasi[i]))
            }
          }
          await this.getJabatan(this.dataJabatanUnitKerja.kodeKomponen)
          this.jabatanSelectedText = this.daftarJabatan.find(el => el.id == this.dataJabatanUnitKerja.idJabatan).jabatan
          for (let i = 0; i < this.unitOrganisasi.length - this.selectedUnitOrganisasi.length; i++) {
            this.unitOrganisasi.pop()
          }
        }
      })
    }
  },
  async created() {
    if (this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataJabatanUnitKerja()
    } else {
      this.getUnitOrganisasi("431").then(res => {
        let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
        let u = token.username
        this.isLoading = false
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        if (data.message.length > 0) {
          this.unitOrganisasi.push(data.message)
        }
      })
    }
    this.getTugasTambahan()
    this.getMaxFileSize()
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