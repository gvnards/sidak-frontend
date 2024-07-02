<template>
  <div class="export-data-wrapper">
    <div class="export-data-header">
      <i class="fa-solid fa-download export-data-icon"></i>
      <span>Export Data</span>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldTugasTambahan">Jenis Data</label>
          <select
            id="fieldTugasTambahan"
            class="custom-select"
            v-model="dataExport.nama"
          >
            <option disabled>-- Pilih Data --</option>
            <option
              value="null"
              :selected="dataExport.nama == null"
              disabled
              hidden
            >
              Belum memilih data
            </option>
            <option :value="item.nama" v-for="item in daftarExport" :key="item.id">{{ item.nama }}</option>
          </select>
        </div>
      </div>
      <div class="col-12">
        <ExportUsulan v-if="dataExport.nama === 'Data Usulan'" @onExport="exportData($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import ExportUsulan from "../components/ExportData/ExportUsulan.vue"
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    ExportUsulan
  },
  data() {
    return {
      daftarExport: [],
      dataExport: {
        nama: null,
        filter: [],
      }
    }
  },
  methods: {
    exportData(val) {
      if (this.dataExport === null) return
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let data = this.$store.getters.getEncrypt(JSON.stringify(val), u)
      let kriteria = this.dataExport.nama
      kriteria = kriteria.substr(5).toLowerCase()
      axios({
        url: `${env.VITE_BACKEND_URL}/export/${kriteria}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        params: {
          message: data
        }
      }).then(res => {
        let data = res.data
        let csvData = []
        if (data.message.length > 0) {
          let heads = Object.keys(data.message[0])

          csvData.push(heads.join(","))
          csvData[0] = `${csvData[0]}`


          for (let row of data.message) {
            // Get values from each row
            let rowValues = heads.map(headerData => {
              // Get value according to the header
              let final = ("" + row[headerData]).replace(/"/g, "\"")
              return `"${final}"`
            })
            // Push values in csvData
            let val = rowValues.join(",")
            val = `\n${val}`
            csvData.push(val)
          }
        }

        let anchor = document.createElement("a")
        anchor.href = "data:text/csv;charset=utf-8," + encodeURI(csvData)
        anchor.target = "_blank"
        anchor.download = `export_${kriteria}_${Date.now()}`
        anchor.click()
      })
    },
    getDaftarExport() {
      axios({
        url: `${env.VITE_BACKEND_URL}/export/created`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.daftarExport = res.data.message.daftarExport
      })
    }
  },
  created() {
    this.getDaftarExport()
  }
}
</script>

<style lang="less" scoped>
.export-data-wrapper {
  width: 100%;
  padding: 40px;
    overflow-y: auto;
  .export-data-header {
    padding: 20px;
    color: #477B79;
    border-bottom: 1px solid #869E9E;
    margin-bottom: 20px;
    padding-bottom: 10px;
    .export-data-icon {
      width: 40px;
      height: 40px;
    }
    span {
      font-weight: 600;
      margin-left: 10px;
      font-size: 32px;
    }
  }
}
</style>