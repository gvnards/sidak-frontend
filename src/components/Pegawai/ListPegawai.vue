<template>
  <div>
    <div id="list-pegawai-header">
      <h5 class="text-primary">
        Pegawai pada {{ namaUnitOrganisasi }}
      </h5>
      <h6 class="text-black">
        Total Pegawai: {{ totalPegawai }} Pegawai
      </h6>
      <div v-if="getIdAppRoleUser == 1">
        <div class="btn my-btn-primary"
              data-toggle="modal"
              data-target="#modal"
              data-backdrop="static"
              data-keyboard="false"
              @click="addDataPegawai()">
              <i class="fa-solid fa-plus icon-plus" style="margin-right: 4px;"></i> Tambah Pegawai
        </div>
        <div class="btn" style="padding: 0px; margin: 0px; width: 10px; cursor: default;"></div>
        <div style="display: inline; min-height: 100%; position: relative;">
          <div class="btn my-btn-outline-primary"
                @click="onSyncAllASN()">
                <i class="fa-solid fa-arrows-rotate" style="margin-right: 4px;"></i> Sinkron Semua Pegawai Dengan MySAPK
          </div>
          <div v-if="accordionSync.visibility" style="z-index: 2; background-color: white; position: absolute; top: 26px; left: 0; border: 1px solid #477b79; width: 100%; max-width: 100%; padding: 12px; box-sizing: border-box; overflow: hidden;">
            <div class="row row-form" style="margin: 0;">
              <div class="col-6">
                <div class="form-group">
                  <label for="minPegawai">Mulai</label>
                  <input type="number" v-model="accordionSync.min" id="minPegawai" min="1" class="form-control">
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="maxPegawai">Sampai</label>
                  <input type="number" v-model="accordionSync.max" id="maxPegawai" min="1" class="form-control">
                </div>
              </div>
            </div>
            <small :class="totalPegawaiSync > 500 || totalPegawaiSync < 1 ? 'text-danger' : 'text-primary'" style="font-weight: 600;">total: {{ totalPegawaiSync }} pegawai</small>
            <button :disabled="totalPegawaiSync > 500 || totalPegawaiSync < 1 || accordionSync.disabledButton" class="btn my-btn-primary btn-block"
                  @click="syncAllASN()">
                  <i class="fa-solid fa-arrows-rotate" style="margin-right: 4px;"></i> Sinkron Pegawai
            </button>
            <small class="text-danger" style="font-weight: 600;">*Maksimal jumlah sinkron 500 pegawai</small>
          </div>
        </div>
      </div>
      <div class="form-group search-wrapper" style="margin-top: 8px;">
        <i
          class="fa-solid fa-magnifying-glass search-icon text-primary"
        ></i>
        <input
          type="text"
          v-model="searchValue"
          class="form-control search"
          placeholder="Cari berdasarkan NIP/Nama"
        />
      </div>
    </div>
    <div id="list-pegawai-wrapper">
      <div id="list-pegawai">
        <div @click="$emit('selectPegawai', item.id)" v-for="item in (filterPegawai.slice(100*(pageActive-1),pageActive*100))" :key="item.id" style="margin: 10px;">
          <ListPegawaiItem :pegawai="item" />
        </div>
        <ul class="pagination-wrapper" style="margin-top: 24px;">
          <!-- <li class="pagination-item" v-for="i in (totalPage==0?totalPage:pagination)" :key="i" :class="i == pageActive ? 'active' : ''" @click="pageActive=i">{{ i }}</li>
          <li style="list-style-type: none; padding: 4px 8px;" v-if="pageActive < totalPage-7">...</li>
          <li class="pagination-item" v-if="totalPage !== 0 && pageActive < totalPage-6" @click="pageActive=totalPage">{{ totalPage }}</li> -->
          <li class="pagination-item" :class="pageActive === 1 ? 'disabled' : ''" @click="pageActive=pageActive===1?pageActive:pageActive-1">Sebelumnya</li>
          <div style="width: 12px;"></div>
          <li class="pagination-item" :class="pageActive === totalPage ? 'disabled' : ''" @click="pageActive=pageActive===totalPage?pageActive:pageActive+1">Selanjutnya</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
const env = import.meta.env
import ListPegawaiItem from "./Content/ListPegawaiItem.vue"
export default {
  components: {
    ListPegawaiItem
  },
  data() {
    return {
      pegawai: [],
      tempPegawai: [],
      fullPegawai: [],
      totalPegawai: 0,
      namaUnitOrganisasi: "",
      searchValue: "",
      totalPegawaiLoaded: 0,
      dataPerPage: 100,
      pageActive: 1,
      accordionSync: {
        visibility: false,
        min: 1,
        max: 1,
        disabledButton: false
      }
    }
  },
  watch: {
    searchValue () {
      this.pageActive = 1
    }
  },
  computed: {
    totalPegawaiSync() {
      return this.accordionSync.max - this.accordionSync.min + 1
    },
    filterPegawai () {
      return this.searchValue === "" ? this.pegawai : this.pegawai.filter(el => el.nip.toLowerCase().includes(this.searchValue.toLowerCase()) || el.nama.toLowerCase().includes(this.searchValue.toLowerCase()))
    },
    totalPage() {
      return this.filterPegawai.length == 0 ? 0 : Math.ceil(this.filterPegawai.length / this.dataPerPage)
    },
    getIdAppRoleUser() {
      return this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").idAppRoleUser
    }
  },
  methods: {
    onSyncAllASN() {
      this.accordionSync.visibility = !this.accordionSync.visibility
    },
    syncAllASN() {
      if (this.totalPegawaiSync > 500 || this.totalPegawaiSync < 1 || this.accordionSync.disabledButton) return
      this.accordionSync.disabledButton = true
      axios({
        url: `${env.VITE_BACKEND_URL}/siasn/jabatan/riwayat/sync/all/${this.accordionSync.min}/${this.accordionSync.max}/${Date.now()}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.accordionSync.disabledButton = false
        let p = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), p)
        console.log(data)
      })
    },
    addDataPegawai() {
      this.$store.commit("onModalMethod", "CREATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataPegawai")
    },
    getDataPegawai() {
      axios({
        url: `${env.VITE_BACKEND_URL}/list-pegawai`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let p = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), p)
        this.pegawai = data.message
        // let pegawai = data.message
        // if (pegawai.length > 100) {
        //   let tempPegawai = []
        //   for(let i=0; i<pegawai.length; i++) {
        //     tempPegawai.push(pegawai.splice(0,100))
        //   }
        //   for(let i=0; i<tempPegawai.length; i++) {
        //     setTimeout(() => {
        //       for(let j=0; j<tempPegawai[i].length; j++) {
        //         this.pegawai.push(tempPegawai[i][j])
        //       }
        //       this.totalPegawaiLoaded += tempPegawai[i].length
        //     }, 200)
        //   }
        // } else {
        //   this.pegawai = pegawai
        // }
      })
    },
    getTotalPegawai() {
      axios({
        url: `${env.VITE_BACKEND_URL}/total-pegawai`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let p = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), p)
        if(data.status === 2) {
          this.totalPegawai = data.message
        }
      })
    },
    getNamaUnitOrganisasi() {
      axios({
        url: `${env.VITE_BACKEND_URL}/nama-unit-organisasi`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let p = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), p)
        if(data.status === 2) {
          this.namaUnitOrganisasi = data.message
        }
      })
    },
    pushDataPegawai() {
      if(this.tempPegawai.length !== 0) {
        for(let i=0; i<20; i++) {
          this.pegawai.push(this.tempPegawai[i])
        }
        this.tempPegawai.splice(0, 20)
      }
    }
  },
  created() {
    this.getTotalPegawai()
    this.getDataPegawai()
    this.getNamaUnitOrganisasi()
  }
}
</script>

<style lang="less" scoped>
#list-pegawai-header {
  margin-bottom: 20px;
  h5 {
    font-weight: 600;
  }
  h6 {
    font-weight: 400;
    width: fit-content;
  }
  .search {
    border-radius: 40px;
    padding-left: 50px;
    letter-spacing: 1px;
    &-wrapper {
      position: relative;
      max-width: 300px;
      margin-top: 20px;
      .search-icon {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        padding: 6px;
        padding-left: 16px;
        transform: translateY(-50%);
      }
    }
  }
}
#list-pegawai {
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  &-wrapper {
    height: 100%;
    max-height: calc(100vh - 220px);
    overflow-y: auto;
  }
}
</style>