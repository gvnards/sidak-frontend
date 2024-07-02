<template>
  <div class="rekap-sinkron-wrapper">
    <div class="rekap-sinkron-header">
      <i class="fa-solid fa-rotate rekap-sinkron-icon"></i>
      <span>Rekap Sinkron</span>
    </div>
    <div style="margin-bottom: 20px;" class="btn btn-sm my-btn-primary" @click="btn.syncAuto = !btn.syncAuto">{{ btn.syncAuto ? 'Cancel Auto Sinkron' : 'Mulai Auto Sinkron' }}</div>
    <table class="table">
      <thead class="thead-dark">
        <tr style="font-size: 1rem;">
          <th scope="col" class="text-primary text-center" style="background-color: #eff5f5; border-color: #eff5f5;">Rekap Data Belum Sinkron<br><span class="text-black" style="font-weight: 500; letter-spacing: 1px; font-size: 14px;">({{ listDataRekap.length }} Data)</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="row">
              <ListRekapSinkronItem class="item-pegawai" v-for="(item, idx) in listDataRekapFiltered" :key="item.id" @onSync="btn.syncActive ? onSync(item, idx) : () => {}" :btnSyncActive="btn.syncActive" :dataPegawai="item" />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <ul class="pagination-wrapper" style="margin-top: 24px;">
              <li class="pagination-item" :class="pagination.pageActive === 1 ? 'disabled' : ''" @click="pagination.pageActive=pagination.pageActive===1?pagination.pageActive:pagination.pageActive-1">Sebelumnya</li>
              <div style="width: 12px;"></div>
              <li class="pagination-item" :class="pagination.pageActive === totalPage ? 'disabled' : ''" @click="pagination.pageActive=pagination.pageActive===pagination.totalPage?pagination.pageActive:pagination.pageActive+1">Selanjutnya</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
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
</template>

<script>
import ListRekapSinkronItem from "../components/RekapSinkron/ListRekapSinkronItem.vue"
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    ListRekapSinkronItem
  },
  data() {
    return {
      listDataRekap: [],
      pagination: {
        pageActive: 0,
        totalPage: 0,
        dataPerPage: 50,
      },
      btn: {
        syncActive: true,
        syncAuto: false
      },
      sync: {
        idx: 0,
        failed: 0,
      }
    }
  },
  computed: {
    listDataRekapFiltered() {
      let start = (this.pagination.dataPerPage * this.pagination.pageActive) - this.pagination.dataPerPage
      let end = this.pagination.dataPerPage * this.pagination.pageActive
      return this.listDataRekap.slice(start, end)
    }
  },
  methods: {
    onSync(item, idx) {
      this.btn.syncActive = false
      axios({
        url: `${env.VITE_BACKEND_URL}/rekap-sinkron/sync/${item.id}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = res.data
        this.btn.syncActive = true
        this.listDataRekap.splice(idx, 1)
        this.$store.commit("onModalMethod", "UPDATE")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: parseInt(data.status) === 2 || data.status === true ? "Success" : "Failed",
          message: data.message
        })
        $("#showModal").trigger("click")
        if (this.btn.syncAuto) {
          setTimeout(() => {
            $("#btnTutupModal").trigger("click")
            this.onSync(this.listDataRekap[idx], idx)
          }, 500)
        }
      }).catch(() => {
        this.$store.commit("onModalMethod", "UPDATE")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: "Failed",
          message: "Terjadi kesalahan server, silahkan coba lagi."
        })
        $("#showModal").trigger("click")
        this.btn.syncActive = true
        if (this.btn.syncAuto) {
          this.sync.failed++
          if (this.sync.failed === 3) {
            this.sync.idx = idx+1
            this.sync.failed = 0
            setTimeout(() => {
              $("#btnTutupModal").trigger("click")
              this.onSync(this.listDataRekap[this.sync.idx], this.sync.idx)
            }, 500)
          } else {
            setTimeout(() => {
              $("#btnTutupModal").trigger("click")
              this.onSync(item, idx)
            }, 500)
          }
        }
      })
    },
    getRekapSinkron() {
      return axios({
        url: `${env.VITE_BACKEND_URL}/rekap-sinkron/created`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      })
    }
  },
  created() {
    this.getRekapSinkron().then(res => {
      this.listDataRekap = res.data.message
      this.pagination.totalPage = Math.ceil(this.listDataRekap.length / this.pagination.dataPerPage)
      this.pagination.pageActive = this.listDataRekap.length > 0 ? 1 : 0
    })
  }
}
</script>

<style lang="less" scoped>
.rekap-sinkron-wrapper {
  width: 100%;
  padding: 40px;
    overflow-y: auto;
  .rekap-sinkron-header {
    padding: 20px;
    color: #477B79;
    border-bottom: 1px solid #869E9E;
    margin-bottom: 20px;
    padding-bottom: 10px;
    .rekap-sinkron-icon {
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