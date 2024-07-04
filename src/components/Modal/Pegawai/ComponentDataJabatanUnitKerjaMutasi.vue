<template>
  <!--  -->
    <!--  -->
  <!--  -->
    <!--  -->
  <!--  -->
    <!--  -->
  <!--  -->
  <!-- CEK LAGI BAGIAN ONCHANGEFILE -->
  <div class="row row-form">
    <div class="col-12">
      <h6 style="padding: 0; margin: 0; font-size: 14px; font-weight: 700;" class="text-center text-black">Data Mutasi Unor ke-{{ urutanArray }}</h6>
      <div v-if="!isLocked" class="icon-delete" @click="deleteMutasiUnor(index)">
        <i class="fa-solid fa-trash-can text-red"></i>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group text-left">
        <label :for="`fieldUnor-${String(dataMutasiUnor.id)}`">Unit Organisasi</label>
        <div v-if="isLocked" class="form-control text-primary locked-text">{{ unor.text }}</div>
        <div v-else>
          <div class="my-custom-input-wrapper my-custom-input" @click="unor.show = !unor.show; unor.search = '';" style="">{{ unor.text }}</div>
          <div class="my-custom-input-item-wrapper-outside" v-show="unor.show">
            <input type="text" class="form-control" placeholder="Cari Unit Organisasi (minimal 5 karakter)" v-model="unor.search">
            <div class="my-custom-input-item-wrapper-inside">
              <div class="my-custom-input-item" @click="unorSelected(item)" v-for="(item, idx) in listAllUnor" :key="parseInt(idx)" v-show="unor.search.length < 5 ? true : item.nama.toLowerCase().includes(unor.search.toLowerCase())">
                {{ item.nama }}
              </div>
            </div>
          </div>
        </div>
        <small class="text-red" v-if="dataMutasiUnor.idUnor === null && isUsulkan"><b>*Unit organisasi harus diisi</b></small>
      </div>
    </div>
    <div class="col-6">
      <div class="form-group">
        <label :for="`fieldTmtMutasiUnor-${dataMutasiUnor.id}`">TMT</label>
        <div v-if="isLocked" class="form-control text-primary locked-text">{{ dataMutasiUnor.tmt }}</div>
        <input v-else
          :class="dataMutasiUnor.tmt === '' && isUsulkan ? 'form-error' : ''"
          type="date"
          v-model="dataMutasiUnorTemp.tmt"
          :id="`fieldTmtMutasiUnor-${dataMutasiUnor.id}`"
          class="form-control"
        />
        <small class="text-red" v-if="dataMutasiUnor.tmt === '' && isUsulkan"><b>*TMT harus diisi</b></small>
      </div>
    </div>
    <div class="col-6">
      <div class="form-group">
        <label :for="`fieldSpmtMutasiUnor-${dataMutasiUnor.id}`">SPMT</label>
        <div v-if="isLocked" class="form-control text-primary locked-text">{{ dataMutasiUnor.tmt }}</div>
        <input v-else
          :class="dataMutasiUnor.tmt === '' && isUsulkan ? 'form-error' : ''"
          type="date"
          v-model="dataMutasiUnorTemp.spmt"
          :id="`fieldSpmtMutasiUnor-${dataMutasiUnor.id}`"
          class="form-control"
        />
        <small class="text-red" v-if="dataMutasiUnor.spmt === '' && isUsulkan"><b>*SPMT harus diisi</b></small>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group text-left" style="margin-bottom: -4px;">
        <label :for="`fieldDokumenMutasiUnor-${dataMutasiUnor.id}`">Dokumen SK Mutasi</label>
      </div>
    </div>
    <div class="col-12" v-if="dataMutasiUnor.idDokumen !== null" style="margin-bottom: 8px;">
      <div>
        <div class="btn btn-sm btn-block btn-secondary" @click="dataMutasiUnor.idDokumen === null ? () => {} : btnGetStreamDokumen()" style="font-weight: 500;">{{ dataMutasiUnor.idDokumen === null ? 'Belum Ada Dokumen' : 'Lihat Dokumen' }}</div>
        <iframe v-if="streamDokumen.show" :src="streamDokumen.dokumen" frameborder="0" style="width: 100%; height: 600px; margin-top: 6px;"></iframe>
      </div>
      <!-- <div v-if="!changeDokumen"> -->
      <div v-if="false">
        <p class="text-center" style="margin: 6px 0px;">atau</p>
        <div class="btn btn-sm btn-block btn-outline-secondary" @click="changeDokumen = true" style="font-weight: 500;">Ganti Dokumen</div>
      </div>
    </div>
    <div class="col-12" v-if="dataMutasiUnor.idDokumen === null || changeDokumen">
      <div class="form-group text-left">
        <div class="custom-file">
          <input type="file" class="custom-file-input" accept="application/pdf" :id="`fieldDokumenMutasiUnor-${dataMutasiUnor.id}`" @change="onChangeFile">
          <label class="custom-file-label" :for="`fieldDokumenMutasiUnor-${dataMutasiUnor.id}`" :class="dataMutasiUnor.dokumen === '' && isUsulkan ? 'form-error' : ''">Cari dokumen</label>
        </div>
        <small :class="dataMutasiUnor.dokumen === '' && isUsulkan ? 'text-red' : 'text-primary'"><b>*{{ dataMutasiUnor.dokumen === '' && isUsulkan ? 'Dokumen mutasi harus diisi.' : inputError.dokumen.description }}</b></small>
      </div>
      <iframe v-if="dataMutasiUnor.dokumen !== '' && dataMutasiUnor.dokumen !== null" :src="dataMutasiUnor.dokumen" frameborder="0" style="width: 100%; height: 600px"
      ></iframe>
    </div>
  </div>
</template>

<script>
import axios from "axios"
const env = import.meta.env
import mixins from "@/mixins/index.js"
export default {
  mixins: [mixins],
  props: {
    isUsulkan: {
      type: Boolean,
      default: false
    },
    urutanArray: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    dataMutasiUnor: {
      type: Object,
      required: true
    },
    listAllUnor: {
      default: new Array,
      type: Array,
      required: true
    },
  },
  watch: {
    "dataMutasiUnorTemp.tmt" (val) {
      if (val !== "") this.emitValue("tmt", val)
    },
    "dataMutasiUnorTemp.spmt" (val) {
      if (val !== "") this.emitValue("spmt", val)
    },
    "dataMutasiUnorTemp.nomorDokumen" (val) {
      if (val !== "") this.emitValue("nomorDokumen", val)
    },
    "dataMutasiUnorTemp.tanggalDokumen" (val) {
      if (val !== "") this.emitValue("tanggalDokumen", val)
    },
  },
  data() {
    return {
      dataMutasiUnorTemp: {
        tmt: "",
        spmt: "",
        nomorDokumen: "",
        tanggalDokumen: "",
        dokumen: {
          dokumen: "",
          show: false,
          change: false,
        }
      },
      unor: {
        show: false,
        search: "",
        text: "-- Pilih Unit Organisasi Dahulu --"
      },
      inputError: {
        dokumen: {
          description: `Ukuran dokumen maksimal 0.5MB(${0.5 * 1024}KB).`,
        }
      },
      streamDokumen: {
        dokumen: "",
        show: false
      },
      changeDokumen: false
    }
  },
  computed: {
    isLocked() {
      return !(String(this.dataMutasiUnor.id).includes("new-"))
    },
    namaUnor() {
      let unor = this.listAllUnor.filter(el => parseInt(el.id) === parseInt(this.dataMutasiUnor.idUnor))
      return unor.length > 0 ? unor[0]["nama"] : "-- Unor Tidak Valid, Silahkan Hubungi BKPSDM --"
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
        url: `${env.VITE_BACKEND_URL}/dokumen/${this.dataMutasiUnor.idDokumen}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * 0.5)) {
          this.inputError.dokumen.description = `Ukuran file melebihi ${0.5 * 1024}KB.`
          item.target.value = null
          // this.dataMutasiUnorTemp.dokumen.dokumen = ""
          this.emitValue("dokumen", "")
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumen.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          // this.dataMutasiUnorTemp.dokumen.dokumen = ""
          this.emitValue("dokumen", "")
        } else {
          // this.dataMutasiUnorTemp.dokumen.dokumen = await this.getBase64(item.target.files[0])
          // this.dataMutasiUnorTemp.dokumen.change = true
          this.inputError.dokumen.description = `Ukuran dokumen maksimal 0.5MB(${0.5 * 1024}KB).`
          this.emitValue("dokumen", await this.getBase64(item.target.files[0]))
        }
      }
    },
    emitValue(component, value) {
      this.$emit("valueChangeMutasiUnor", {
        idx: this.index,
        component: component,
        value: value
      })
    },
    unorSelected(item) {
      this.emitValue("idUnor", parseInt(item.id))
      this.unor.show = false
      this.unor.text = item.nama
    },
    deleteMutasiUnor(idx) {
      this.$emit("deleteMutasiUnor", idx)
    }
  },
  created() {
    if (this.isLocked) this.unor.text = this.namaUnor
  }
}
</script>

<style lang="less" scoped>
.icon-delete {
  width: fit-content;
  position: absolute;
  right: 20px;
  top: 0;
  cursor: pointer;
  padding: 0px 6px;
  box-sizing: border-box;
  z-index: 2;
}
.locked-text {
  font-weight: 700;
  font-size: 12px;
  background-color: rgba(188, 188, 188, 0.5);
  cursor: not-allowed;
}
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
  z-index: 4;
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