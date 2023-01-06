<template>
  <div>
    <div id="list-pegawai-header">
      <h5 class="text-primary">
        Pegawai pada {{ namaUnitOrganisasi }}
      </h5>
      <h6 class="text-black">
        Total Pegawai: {{ totalPegawai }} Pegawai
      </h6>
      <div class="form-group search-wrapper">
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
    <div id="list-pegawai-wrapper" v-on:scroll="scrollEvent()">
      <div id="list-pegawai">
        <div @click="$emit('selectPegawai', item.id)" v-for="item in pegawai" :key="item.id" style="margin: 10px;" v-show="searchValue.length < 5 ? true : (item.nama.toLowerCase().includes(searchValue.toLowerCase()) || item.nip.toLowerCase().includes(searchValue.toLowerCase()))">
          <ListPegawaiItem :pegawai="item" />
        </div>
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
      searchValue: ""
    }
  },
  methods: {
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
        // if(data.status === 1) {
        //   this.pegawai = []
        //   this.tempPegawai = []
        //   this.tempPegawai = data.message
        //   this.fullPegawai = data.message
        //   this.pushDataPegawai()
        // }
        let pegawai = data.message
        if (pegawai.length > 80) {
          let tempPegawai = []
          for(let i=0; i<pegawai.length; i++) {
            tempPegawai.push(pegawai.splice(0,80))
          }
          for(let i=0; i<tempPegawai.length; i++) {
            setTimeout(() => {
              for(let j=0; j<tempPegawai[i].length; j++) {
                this.pegawai.push(tempPegawai[i][j])
              }
            }, 100)
          }
        } else {
          this.pegawai = pegawai
        }
        // else {
        //   localStorage.clear()
        //   this.$router.push({
        //     name: "login"
        //   })
        // }
      })
      // .catch(() => {
      //   console.log("error")
      // })
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
        if(data.status === 1) {
          this.totalPegawai = data.message
        }
        // else {
        //   localStorage.clear()
        //   this.$router.push({
        //     name: "login"
        //   })
        // }
      })
      // .catch(() => {
      //   console.log("error")
      // })
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
        if(data.status === 1) {
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
    },
    scrollEvent() {
      let div = document.getElementById("list-pegawai-wrapper")
      if ((div.clientHeight - div.scrollTop) < (div.clientHeight * 0.5)) {
        this.pushDataPegawai()
      }
    }
  },
  created() {
    this.getDataPegawai()
    this.getTotalPegawai()
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