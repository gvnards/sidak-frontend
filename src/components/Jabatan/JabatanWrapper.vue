<template>
  <div id="unit-organisasi-wrapper">
    <JabatanHeader />
    <div id="unit-organisasi" class="text-left">
      <div class="btn-wrapper">
        <div class="btn-unor text-center active">
          <span>Jabatan</span>
        </div>
      </div>
      <IllustrationDataJabatan class="illustration-bg" />
      <div class="unit-organisasi-content">
        <LoadingAnimation class="loading" v-if="isLoading" />
        <div style="height: 100%; max-height: 100%;">
          <div
            class="data-not-found-wrapper text-center"
            v-if="!isLoading && dataUnor.unor === undefined"
          >
            <DataEmpty @addData="addDataJabatan" />
          </div>
          <div v-else-if="!isLoading && dataUnor.unor !== undefined" style="height: 100%; max-height: 100%; position: relative;">
            <table class="table table-bordered">
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
            <!-- End Dropdown Filter -->
            <UnorJabatanItem :unor="filterUnor" />
            <div
              class="btn btn-block my-btn-primary tambah-unor"
              data-toggle="modal"
              data-target="#modal"
              data-backdrop="static"
              data-keyboard="false"
              @click="addDataJabatan()"
            >
              Tambah Data Jabatan
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JabatanHeader from "./Content/JabatanHeader.vue"
import UnorJabatanItem from "./Content/UnorJabatanItem.vue"
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    JabatanHeader,
    UnorJabatanItem
  },
  data() {
    return {
      isLoading: false,
      dataJabatan: [],
      searchValue: "",
      dataUnor: {},
      filterOpd: [],
      filterOpdValue: "431"
    }
  },
  computed: {
    filterUnor() {
      if (this.filterOpdValue === "431") return this.dataUnor
      let divideKodeKomponenTemp = this.filterOpdValue.split(".")
      let divideKodeKomponen = [this.filterOpdValue]
      for (let i = divideKodeKomponenTemp.length - 1; i > 0; i--) {
        divideKodeKomponenTemp.pop()
        divideKodeKomponen.push(divideKodeKomponenTemp.join("."))
      }
      divideKodeKomponen.reverse()
      let dataUnor = JSON.parse(JSON.stringify(this.dataUnor))
      return this.unorSearchRecursive(divideKodeKomponen, dataUnor)
    },
    findDataJabatan() {
      if (this.searchValue.length > 4) {
        return this.keySearch
      }
      return this.dataJabatan
    },
    keySearch() {
      let findFirst = this.dataJabatan.filter(el => el.nama.toLowerCase().includes(this.searchValue.toLowerCase()))
      let findElement = []
      for (let i = 0; i < findFirst.length; i++) {
        if (findFirst[i].kodeKomponen.split(".").length > 1) {
          let kodeKomponen = findFirst[i].kodeKomponen.split(".")
          kodeKomponen.splice(kodeKomponen.length - 1)
          kodeKomponen = kodeKomponen.join(".")
          if(kodeKomponen !== "431.") {
            let findAnother = this.dataJabatan.filter(ele => ele.kodeKomponen === kodeKomponen)
            findAnother.forEach(ele => {
              if ((findElement.filter(ele_ => ele_.id === ele.id)).length === 0 && findFirst.filter(ele_ => ele_.id === ele.id).length === 0) {
                findFirst.push(ele)
              }
            })
          }
        }
        let kodeKomponen = findFirst[i].kodeKomponen.concat(".")
        if(kodeKomponen !== "431.") {
          let findAnother = this.dataJabatan.filter(el => el.kodeKomponen.includes(kodeKomponen))
          findAnother.forEach(ele => {
            if ((findElement.filter(ele_ => ele_.id === ele.id)).length === 0 && findFirst.filter(ele_ => ele_.id === ele.id).length === 0) {
              findFirst.push(ele)
            }
          })
        }
        if ((findElement.filter(ele => ele.id === findFirst[i].id)).length === 0) findElement.push(findFirst[i])
      }
      return this.sortUnitOrganisasi(findElement)
    },
  },
  methods: {
    unorSearchRecursive(splitKodeKomponen, unor) {
      if (splitKodeKomponen.length === 1) return unor
      if (splitKodeKomponen[0] === "431") return {
        id: unor.id,
        nama: unor.nama,
        kodeKomponen: unor.kodeKomponen,
        jabatan: [],
        unor: this.unorSearchRecursive(splitKodeKomponen.slice(1), unor.unor.filter(el => el.kodeKomponen === splitKodeKomponen[1]))
      }
      unor[0].jabatan = []
      unor[0].unor = this.unorSearchRecursive(splitKodeKomponen.slice(1), unor[0].unor.filter(el => el.kodeKomponen === splitKodeKomponen[1]))
      return unor
    },
    getFilterOpd() {
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
    formatUnor(item, unors, jabatans) {
      let unorChild = unors.filter(el => el.kodeKomponen.replace(item.kodeKomponen, "").indexOf(".") > -1 && el.kodeKomponen.replace(item.kodeKomponen, "").slice(el.kodeKomponen.indexOf(".")+1).indexOf(".") < 0)
      unorChild.forEach((el, idx) => {
        unorChild[idx]["jabatan"] = jabatans.filter(jab => jab.kodeKomponen === el.kodeKomponen)
        unorChild[idx]["unor"] = this.formatUnor(el, unors.filter(el_ => el_.kodeKomponen.includes(el.kodeKomponen)), jabatans.filter(el_ => el_.kodeKomponen.includes(el.kodeKomponen)))
      })
      return item.kodeKomponen !== "431" ? unorChild : {
        id: item.id,
        nama: item.nama,
        kodeKomponen: item.kodeKomponen,
        jabatan: [],
        unor: unorChild
      }
    },
    getDataUnitOrganisasi() {
      return axios({
        url: `${env.VITE_BACKEND_URL}/unit-organisasi`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    addDataJabatan() {
      this.$store.commit("onModalMethod", "CREATE")
      this.$store.commit("onModalFolder", "Jabatan")
      this.$store.commit("onModalContent", "DataJabatan")
    },
    orderJabatan(val) {
      let order = 0
      if (val.split(".").length > 1) {
        for (let i = 0; i < (val.split(".").length) - 1; i++) {
          order = order + 10
        }
      }
      return order
    },
    deleteDataJabatan(item) {
      this.$store.commit("onModalMethod", "DELETE")
      this.$store.commit("onModalFolder", "Jabatan")
      this.$store.commit("onModalContent", "DataJabatan")
      this.$store.commit("onModalData", item)
    },
    updateDataJabatan(item) {
      this.$store.commit("onModalMethod", "UPDATE")
      this.$store.commit("onModalFolder", "Jabatan")
      this.$store.commit("onModalContent", "DataJabatan")
      this.$store.commit("onModalData", item)
    },
    getDataJabatan() {
      this.isLoading = true
      return axios({
        url: `${env.VITE_BACKEND_URL}/jabatan`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
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
    this.getFilterOpd()
    this.getDataJabatan().then(res => {
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
      this.dataJabatan = data.message
      return this.getDataUnitOrganisasi()
    }).then(res => {
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
      this.isLoading = false
      this.dataUnor = this.formatUnor(data.message[0], data.message, this.dataJabatan)
    })
  }
}
</script>

<style lang="less" scoped>
.tambah-unor {
  position: sticky;
  z-index: 10;
  bottom: 0;
}
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
  overflow: hidden;
  overflow-y: auto;
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
        margin-top: 1px;
        border-bottom-width: 2px;
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
</style>