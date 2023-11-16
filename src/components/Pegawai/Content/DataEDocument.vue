<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-" v-for="item in listDocument" :key="item.id">
          <div class="form-group text-left">
            <label for="fieldDokumenAngkaKredit">Dokumen {{ item.nama }}</label>
            <small class="text-danger" v-if="item.keterangan !== ''" style="font-weight: 600; display: block; margin-top: -10px;">({{ item.keterangan }})</small>
            <div class="container" v-if="hasDocument(item.id).length > 0">
              <div class="row">
                <div class="col-6 btn btn-sm btn-block my-btn-primary">
                  Lihat Dokumen<!--{{ hasDocument(item.id)[0].nama }} -->
                </div>
                <div class="col-6">
                  <div class="btn btn-sm btn-block my-btn-outline-danger">Hapus Dokumen</div>
                </div>
              </div>
            </div>
            <div v-else class="row">
              <div :class="findIndexDocumentWillUpload(item.id) > -1 ? 'col-10' : 'col-12'">
                <div class="custom-file">
                  <input @click="documentCategory = item.kategori; dokumenAkanUpload.id = item.id" type="file" class="custom-file-input" accept="application/pdf" :id="`field${item.kategori}`" @change="onChangeFile">
                  <label class="custom-file-label" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" for="fieldDokumenAngkaKredit">{{ findIndexDocumentWillUpload(item.id) > -1 ? dokumenAkanUpload.dokumen[findIndexDocumentWillUpload(item.id)].nama : 'Cari dokumen' }}</label>
                </div>
              </div>
              <div @click="uploadDocument(item.id)" v-if="findIndexDocumentWillUpload(item.id) > -1" class="col-2">
                <div class="upload" style="position: relative; height: 100%; text-align: center; cursor: pointer;">
                  <i class="fa-solid fa-cloud-arrow-up text-primary" style="width: 28px; height: 28px;"></i>
                  <small class="text-primary">Upload</small>
                </div>
              </div>
            </div>
            <!-- <small :class="inputError.dokumenAngkaKredit.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenAngkaKredit.status ? inputError.dokumenAngkaKredit.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
const env = import.meta.env
import mixins from "@/mixins/index.js"
export default {
  mixins: [mixins],
  data() {
    return {
      documentCategory: "",
      listDocument: [],
      dataDocuments: [],
      fileCategory: {},
      dokumenAkanUpload: {
        id: -1,
        dokumen: []
      },
    }
  },
  methods: {
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          if (this.findIndexDocumentWillUpload(parseInt(this.dokumenAkanUpload.id)) > -1) this.dokumenAkanUpload.dokumen.splice(this.findIndexDocumentWillUpload(parseInt(this.dokumenAkanUpload.id)),1)
          item.target.value = null
        } else {
          let dataDokumen = {
            idDaftar: parseInt(this.dokumenAkanUpload.id),
            nama: item.target.files[0].name,
            dokumen: await this.getBase64(item.target.files[0])
          }
          if (this.findIndexDocumentWillUpload(parseInt(this.dokumenAkanUpload.id)) > -1) this.dokumenAkanUpload.dokumen[this.findIndexDocumentWillUpload(parseInt(this.dokumenAkanUpload.id))] = dataDokumen
          else this.dokumenAkanUpload.dokumen.push(dataDokumen)
        }
        this.dokumenAkanUpload.id = -1
        // else if (item.target.files[0].type !== "application/pdf") {
        //   this.inputError.dokumen.status = true
        //   this.inputError.dokumen.description = "Dokumen harus berjenis PDF"
        //   item.target.value = null
        //   this.dataPenghargaan.dokumen = ""
        // } else {
        //   this.inputError.dokumen.status = false
        //   // this.dataPenghargaan.dokumen = await this.getBase64(item.target.files[0])
        //   console.log(item.target)
        // }
        console.log(this.dokumenAkanUpload.dokumen)
      }
    },
    hasDocument(id) {
      return this.dataDocuments.filter(el => parseInt(el.idDaftar) === parseInt(id))
    },
    findIndexDocumentWillUpload(id) {
      return this.dokumenAkanUpload.dokumen.findIndex(el => parseInt(el.idDaftar) === parseInt(id))
    },
    getDataCreated() {
      // this.isLoading = true
      let url = `/dokumen-elektronik/created/${this.$store.getters.getIdPegawai}`
      return axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    uploadDocument(id) {
      let dok = {...this.dokumenAkanUpload.dokumen[this.findIndexDocumentWillUpload(id)]}
      dok["idPegawai"] = parseInt(this.$store.getters.getIdPegawai)
      dok["date"] = Date.now()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let url = "/dokumen-elektronik"
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(dok), u)
        }
      }).then(res => {
        console.log(res)
      })
    }
  },
  created() {
    this.getDataCreated().then(res => {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
      this.listDocument = data.daftarDokumen
      this.dataDocuments = data.dataDokumen
      this.fileCategory = data.dokumenKategori
    })
  }
}
</script>

<style lang="less" scoped>
.upload {
  small {
    font-weight: 500;
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
  }
  &:hover {
    small {
      // bottom: 0px !important;
      // transition: all 0.4s ease-in-out;
      animation-duration: 0.6s;
      animation-name: bouncing;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-fill-mode: both;
      animation-timing-function: ease-in-out;
    }
  }
}
@keyframes bouncing {
  from {
    bottom: -8px;
  }
  to {
    bottom: 0px;
  }
}
</style>