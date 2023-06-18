<template>
  <div id="unit-organisasi-wrapper">
    <UnitOrganisasiHeader />
    <div id="unit-organisasi" class="text-left">
      <div class="btn-wrapper">
        <div class="btn-unor text-center active">
          <span>Unit Organisasi</span>
        </div>
      </div>
      <IllustrationDataUnitOrganisasi class="illustration-bg" />
      <div class="unit-organisasi-content">
        <LoadingAnimation class="loading" v-if="isLoading" />
        <div v-if="!isLoading" style="height: 100%; max-height: 100%;">
          <div
            class="data-not-found-wrapper text-center"
            v-if="!isLoading && dataUnitOrganisasi.length == 0"
          >
            <DataEmpty @addData="addDataUnitOrganisasi" />
          </div>
          <div v-else style="height: 100%; max-height: 100%;">
            <div class="form-group search-wrapper">
              <i
                class="fa-solid fa-magnifying-glass search-icon text-primary"
              ></i>
              <input
                type="text"
                v-model="searchValue"
                class="form-control search"
                placeholder="Cari data... (isikan minimal 5 karakter)"
              />
            </div>
            <div class="unor-item-wrapper">
              <UnitOrganisasiItem
                @onDelete="deleteDataUnitKerja(item)"
                @onUpdate="updateDataUnitKerja(item)"
                v-for="item in (findDataUnitOrganisasi.length === 0 ? dataUnitOrganisasi : findDataUnitOrganisasi)"
                :key="item.id"
                :orderUnitKerja="orderUnitOrganisasi(item.kodeKomponen)"
                :namaUnitKerja="`${item.nama}`"
              />
            </div>
            <div
              class="btn btn-block my-btn-primary tambah-unor"
              data-toggle="modal"
              data-target="#modal"
              data-backdrop="static"
              data-keyboard="false"
              @click="addDataUnitOrganisasi()"
            >
              Tambah Data Unit Organisasi
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UnitOrganisasiHeader from "./Content/UnitOrganisasiHeader.vue"
import UnitOrganisasiItem from "./Content/UnitOrganisasiItem.vue"
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    UnitOrganisasiHeader,
    UnitOrganisasiItem,
  },
  data() {
    return {
      isLoading: false,
      dataUnitOrganisasi: [],
      findDataUnitOrganisasi: [],
      searchValue: ""
    }
  },
  watch: {
    searchValue(val) {
      if(val.length > 4) {
        this.keySearch()
      } else if (val.length === 0) {
        this.findDataUnitOrganisasi = []
        this.getDataUnitOrganisasi()
      }
    }
  },
  methods: {
    keySearch() {
      this.findDataUnitOrganisasi = []
      let findFirst = this.dataUnitOrganisasi.filter(el => el.nama.toLowerCase().includes(this.searchValue.toLowerCase()))
      let findElement = []
      for (let i = 0; i < findFirst.length; i++) {
        if (findFirst[i].kodeKomponen.split(".").length > 1) {
          let kodeKomponen = findFirst[i].kodeKomponen.split(".")
          kodeKomponen.splice(kodeKomponen.length - 1)
          kodeKomponen = kodeKomponen.join(".")
          if(kodeKomponen !== "431.") {
            let findAnother = this.dataUnitOrganisasi.filter(ele => ele.kodeKomponen === kodeKomponen)
            findAnother.forEach(ele => {
              if ((findElement.filter(ele_ => ele_.id === ele.id)).length === 0 && findFirst.filter(ele_ => ele_.id === ele.id).length === 0) {
                findFirst.push(ele)
              }
            })
          }
        }
        // let kodeKomponen = findFirst[i].kodeKomponen.concat(".")
        // if(kodeKomponen !== "431.") {
        //   let findAnother = this.dataUnitOrganisasi.filter(el => el.kodeKomponen.includes(kodeKomponen))
        //   findAnother.forEach(ele => {
        //     if ((findElement.filter(ele_ => ele_.id === ele.id)).length === 0 && findFirst.filter(ele_ => ele_.id === ele.id).length === 0) {
        //       findFirst.push(ele)
        //     }
        //   })
        // }
        if ((findElement.filter(ele => ele.id === findFirst[i].id)).length === 0) findElement.push(findFirst[i])
      }
      let findSecond = this.sortUnitOrganisasi(findElement)
      this.findDataUnitOrganisasi = this.sortUnitOrganisasi(findElement)
    },
    addDataUnitOrganisasi() {
      this.$store.commit("onModalMethod", "CREATE")
      this.$store.commit("onModalFolder", "UnitOrganisasi")
      this.$store.commit("onModalContent", "DataUnitOrganisasi")
    },
    orderUnitOrganisasi(val) {
      let order = 0
      if (val.split(".").length > 1) {
        for (let i = 0; i < (val.split(".").length) - 1; i++) {
          order = order + 10
        }
      }
      return order
    },
    deleteDataUnitKerja(item) {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/unit-organisasi/${item.id}`,
        method: "DELETE",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.getDataUnitOrganisasi()
      })
    },
    updateDataUnitKerja(item) {
      this.$store.commit("onModalMethod", "UPDATE")
      this.$store.commit("onModalFolder", "UnitOrganisasi")
      this.$store.commit("onModalContent", "DataUnitOrganisasi")
      this.$store.commit("onModalData", item)
    },
    getDataUnitOrganisasi() {
      this.isLoading = true
      this.dataUnitOrganisasi = []
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      axios({
        url: `${env.VITE_BACKEND_URL}/unit-organisasi`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.isLoading = false
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataUnitOrganisasi = data.message
      })
    },
    sortUnitOrganisasi(val) {
      let unor = []
      val.forEach(el => {
        unor.push(el.kodeKomponen)
      })
      unor = unor.sort()
      let unor_ = []
      unor.forEach(el => {
        let findEl = val.find(ele => ele.kodeKomponen === el)
        unor_.push(findEl)
      })
      return unor_
    }
  },
  created() {
    this.getDataUnitOrganisasi()
  }
}
</script>

<style lang="less" scoped>
.illustration-bg {
  position: absolute;
  width: 90%;
  height: 90%;
  opacity: 0.05;
  z-index: 0;
}
.unor-item-wrapper {
  height: 100%;
  max-height: calc(100% - 120px);
  box-sizing: border-box;
  margin: 20px 0px;
  overflow: auto;
  min-height: 400px;
}
.search {
  border-radius: 40px;
  padding-left: 50px;
  letter-spacing: 1px;
  &-wrapper {
    position: relative;
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
.loading {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.data-not-found-wrapper {
  box-sizing: border-box;
  padding-top: 40px;
  padding-bottom: 40px;
  .illustration-not-found {
    margin-bottom: 6px;
  }
  p {
    color: #0b0a0f;
    font-weight: 500;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
}
#unit-organisasi-wrapper {
  background-color: #ffffff;
  box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.1);
  min-width: 200px;
  margin: 0px 20px;
  padding: 40px;
  height: 100%;
  max-height: 100%;
  box-sizing: border-box;
  position: relative;
}
#unit-organisasi {
  margin-top: 20px;
  height: 100%;
  max-height: calc(100% - 80px);
  display: block;
  position: relative;
  .btn-wrapper {
    .btn-unor {
      display: inline-block;
      padding: 6px 16px;
      box-sizing: border-box;
      height: 40px;
      border: 1px solid transparent;
      position: relative;
      z-index: 2;
      top: 1px;
      min-width: 100px;
      font-weight: 600;
      font-size: 14px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      color: #869e9e;
      cursor: pointer;
      transition: all 0.4s;
      &.active {
        color: #477b79;
        border-color: #477b79;
        border-bottom-color: white;
        border-bottom-width: 2px;
        margin-top: 1px;
        &:hover {
          color: #477b79 !important;
          border-color: #477b79 !important;
          border-bottom-color: white !important;
        }
      }
      &:hover {
        color: #477b79;
        border-color: #477b79;
      }
    }
  }
  .unit-organisasi-content {
    position: relative;
    border: 1px solid #477b79;
    border-radius: 0px 6px 6px 6px;
    height: 100%;
    max-height: calc(100% - 40px);
    overflow-y: auto;
    scrollbar-width: thin;
    padding: 20px;
    box-sizing: border-box;
    .data-not-found-wrapper {
      box-sizing: border-box;
      padding-top: 40px;
      padding-bottom: 40px;
      .illustration-not-found {
        margin-bottom: 6px;
      }
      p {
        color: #0b0a0f;
        font-weight: 500;
        font-size: 14px;
        margin: 0;
        padding: 0;
      }
    }
    .data-found-wrapper {
      box-sizing: border-box;
      padding: 20px 10px;
      .data-found {
        cursor: pointer;
        border: 1px solid #477b79;
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 0.8);
        font-weight: 700;
        box-sizing: border-box;
        padding: 6px;
        color: #477b79;
        transition: all 0.4s;
        margin: 6px 0px;
        &:hover {
          background-color: rgba(71, 123, 121, 0.8);
          color: white;
        }
      }
    }
  }
}
@media only screen and (max-width: 780px) {
  #unit-organisasi-wrapper {
    // background-color: #ffffff;
    // box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.1);
    // min-width: 200px;
    margin: 0px 0px;
    margin-bottom: 40px;;
    padding: 20px;
    padding-bottom: 40px;
    // height: 100%;
    // max-height: 100%;
    // box-sizing: border-box;
    // position: relative;
  }
}
</style>