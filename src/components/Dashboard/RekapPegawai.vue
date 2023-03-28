<template>
  <!-- <div style="border: 1px solid #477b79; border-radius: 4px; min-height: 400px; padding: 20px; box-sizing: border-box;">
    <h6 style="font-weight: 600; z-index: 2; border-bottom: 1px solid #477b79; padding-bottom: 14px;" class="text-primary">Data Pegawai Berdasarkan Jabatan</h6>
    <div style="height: 10px;"></div>
    <div class="opd-wrapper">
      <RekapPegawaiItem :jabatan="filterDataJabatan(item.kodeKomponen)" :order="order(item.kodeKomponen)" v-for="item in opd" :key="item.id" :kodeKomponen="item.kodeKomponen" :namaOpd="item.nama" />
    </div>
  </div> -->
  <div style="height: 400px; overflow-y: auto; border: 1px solid #dee2e6;">
    <table class="table table-bordered" style="margin: 0; position: sticky; top: 0; z-index: 2;">
      <thead class="thead-dark">
        <tr>
          <th colspan="2" style="background-color: #477b79; border-color: #477b79;"><i class="fa-solid fa-briefcase" style="margin-right: 10px;"></i> Data Jabatan Pemerintah Kabupaten Situbondo</th>
        </tr>
      </thead>
      <tbody style="background-color: #fff;">
        <tr>
          <td style="padding: 0; margin: 0; padding-left: 12px; width: 100px; vertical-align: middle;" class="text-primary"><small style="font-weight: 600;">Filter</small></td>
          <td style="box-sizing: border-box; vertical-align: middle;">
            <small>
              <div class="form-group" style="margin: 0;">
                <select class="custom-select" v-model="filterOpdValue">
                  <option value="431" selected>Tampilkan Semua</option>
                  <option v-for="unor in filterOpd" :key="unor.id" :value="unor.kodeKomponen">{{ unor.nama }}</option>
                </select>
              </div>
            </small>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered" style="margin: 0;" v-for="unor in opd" :key="unor.id">
      <tbody v-if="unor.kodeKomponen.includes(filterOpdValue)">
          <tr>
            <th colspan="3" scope="row" style="position: sticky; top: -100px;" class="text-primary">{{ unor.nama }}</th>
          </tr>
          <tr v-for="jbtn in filterDataJabatan(unor.kodeKomponen)" :key="jbtn.id">
            <td style="padding: 0; margin: 0; padding-left: 12px; width: 100px; vertical-align: middle;"><small>Jabatan</small></td>
            <td style="padding: 0; margin: 0; padding-left: 12px; vertical-align: middle;"><small>{{ jbtn.jabatan }}</small></td>
            <td style="padding: 0; margin: 0; padding-left: 12px; width: 160px; vertical-align: middle;"><small>Terisi: {{ jbtn.jabatanTerisi }}<br>Kebutuhan: {{ jbtn.kebutuhan }}</small></td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios"
const env = import.meta.env
export default {
  data() {
    return {
      opd: [],
      jabatan: [],
      filterOpd: [],
      filterOpdValue: "431"
    }
  },
  methods: {
    getFilterOpd() {
      this.filterOpd = []
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      axios({
        url: `${env.VITE_BACKEND_URL}/filter-opd`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.filterOpd = data.message
      })
    },
    filterDataJabatan(val) {
      if (!val) return []
      return this.jabatan.filter(el => el.kodeKomponen == val)
    },
    order(val) {
      let order = 0
      if (val.split(".").length > 1) {
        for (let i = 0; i < (val.split(".").length) - 1; i++) {
          order = order + 10
        }
      }
      return order
    },
    getDataUnitOrganisasi() {
      this.opd = []
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      axios({
        url: `${env.VITE_BACKEND_URL}/unit-organisasi`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.opd = data.message
        // let tempData = data.message
        // let timer = setInterval(() => {
        //   this.opd.push(tempData.splice(0, 1000))
        //   this.opd = this.opd.flat(1)
        //   if(tempData.length === 0) {
        //     clearInterval(timer)
        //   }
        // }, 1000)
      })
    },
    getDataJabatan() {
      this.isLoading = true
      this.jabatan = []
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      axios({
        url: `${env.VITE_BACKEND_URL}/jabatan`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.jabatan = data.message
        // let tempData = data.message
        // let i = 0
        // let timer = setInterval(() => {
        //   this.jabatan.push(tempData.splice(0, 1000))
        //   this.jabatan = this.jabatan.flat(1)
        //   i++
        //   console.log(i)
        //   if(tempData.length === 0) {
        //     clearInterval(timer)
        //   }
        // }, 1000)
      })
    },
  },
  created() {
    this.getDataUnitOrganisasi()
    this.getDataJabatan()
    this.getFilterOpd()
  }
}
</script>

<style lang="less">
.opd-wrapper {
  max-height: 400px;
  overflow-y: auto;
}
</style>