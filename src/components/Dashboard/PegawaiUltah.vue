<template>
  <div style="height: 400px; overflow-y: auto; border: 1px solid #dee2e6;">
    <table class="table table-bordered" style="margin: 0; position: sticky; top: 0; z-index: 2;">
      <thead class="thead-dark">
        <tr>
          <th colspan="2" style="background-color: #477b79; border-color: #477b79;"><i class="fa-solid fa-cake-candles" style="margin-right: 10px;"></i>Data Pegawai Berulang Tahun</th>
        </tr>
      </thead>
      <tbody style="background-color: #fff;">
        <tr>
          <td style="padding: 0; margin: 0; padding-left: 12px; width: 100px; vertical-align: middle; background-color: #fff;" class="text-primary"><small style="font-weight: 600;">Bulan</small></td>
          <td>
            <small class="text-primary" style="font-weight: 600;">{{ currentMonth }}</small>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <small>
              <div class="form-group" style="padding: 0; margin: 0;">
                <input type="text" class="form-control" placeholder="Cari NIP/Nama pegawai" v-model="searchValue">
              </div>
            </small>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered">
      <tbody v-for="item in pegawaiUltah" :key="item.id" v-show="searchValue == '' ? true : (item.nip.toLowerCase().includes(searchValue.toLowerCase()) || item.nama.toLowerCase().includes(searchValue.toLowerCase()))">
        <tr>
          <td class="text-primary" style="font-weight: 600; vertical-align: middle;">
            <span>{{ item.nama }}</span>
            <br>
            <small class="text-black">{{ item.nip }}</small>
          </td>
          <td class="text-primary text-center" style="font-weight: 600; vertical-align: middle; width: 120px;">
            <small><strong>{{ pegawaiUltah.length > 0 ? `${item.nip.substring(6,8)}-${item.nip.substring(4,6)}-${item.nip.substring(0,4)} (${(new Date()).getFullYear() - parseInt(item.nip.substring(0, 4))} tahun)` : '' }}</strong></small>
          </td>
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
      pegawaiUltah: [],
      searchValue: ""
    }
  },
  computed: {
    currentMonth() {
      let months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
      return months[(new Date()).getMonth()]
    }
  },
  filters: {
    birthDate(val) {
      if (!val) return ""
      return `${val.substring(6,8)}-${val.substring(4,6)}-${val.substring(0,4)}`
    }
  },
  methods: {
    getPegawaiUltah() {
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      let month = (new Date()).getMonth()+1 < 10 ? `0${(new Date()).getMonth()+1}` : (new Date()).getMonth()+1
      axios({
        url: `${env.VITE_BACKEND_URL}/pegawai-ultah/${month}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.pegawaiUltah = data.message
      })
    },
  },
  created() {
    this.getPegawaiUltah()
  }
}
</script>