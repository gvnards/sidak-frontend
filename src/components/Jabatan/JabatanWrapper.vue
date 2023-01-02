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
        <div v-if="!isLoading" style="height: 100%; max-height: 100%;">
          <div
            class="data-not-found-wrapper text-center"
            v-if="!isLoading && dataJabatan.length == 0"
          >
            <DataEmpty @addData="addDataJabatan" />
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
              <!-- <UnitOrganisasiItem
                @onDelete="deleteDataJabatan(item)"
                @onUpdate="updateDataJabatan(item)"
                v-for="item in findDataJabatan"
                :key="item.id"
                :orderUnitKerja="orderJabatan(item.kodeKomponen)"
                :namaUnitKerja="`${item.nama}`"
              /> -->
            </div>
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
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    JabatanHeader,
  },
  data() {
    return {
      isLoading: false,
      dataJabatan: [],
      searchValue: ""
    }
  },
  computed: {
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
      this.dataJabatan = []
      axios({
        url: `${env.VITE_BACKEND_URL}/dataJabatan`,
        method: "GET"
      }).then(res => {
        this.dataJabatan = res.data
      })
      setTimeout(() => {
        let dataJabatan = [
          {
            id: 1,
            nama: "Badan Kepegawaian dan Pengembangan Sumber Daya Manusia",
            kodeKomponen: "431.404",
          },
          {
            id: 2,
            nama: "Pemerintah Kabupaten Situbondo",
            kodeKomponen: "431",
          },
          {
            id: 3,
            nama: "BIDANG PENGEMBANGAN KOMPETENSI APARATUR",
            kodeKomponen: "431.404.4",
          },
          {
            id: 4,
            nama: "SUB BAGIAN UMUM DAN KEPEGAWAIAN",
            kodeKomponen: "431.404.1.1",
          },
          {
            id: 5,
            nama: "SEKRETARIAT",
            kodeKomponen: "431.404.1",
          },
          {
            id: 6,
            nama: "SUB BAGIAN PENYUSUNAN PROGRAM DAN KEUANGAN ",
            kodeKomponen: "431.404.1.2",
          },
          {
            id: 7,
            nama: "BIDANG PENGADAAN, INFORMASI DAN KESEJAHTERAAN PEGAWAI",
            kodeKomponen: "431.404.2",
          },
          {
            id: 8,
            nama: "BIDANG MUTASI DAN KEPANGKATAN",
            kodeKomponen: "431.404.3",
          },
          {
            id: 9,
            nama: "SUB BIDANG PENGEMBANGNAN KOMPETENSI MANJERIAL",
            kodeKomponen: "431.404.4.1",
          },
          {
            id: 10,
            nama: "SUB BIDANG PEMBINAAN PEGAWAI",
            kodeKomponen: "431.404.3.3",
          },
          {
            id: 11,
            nama: "BADAN KESATUAN BANGSA DAN POLITIK",
            kodeKomponen: "431.421",
          },
        ]
        this.isLoading = false
        this.dataJabatan = this.sortUnitOrganisasi(dataJabatan)
      }, 1000)
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
    this.getDataJabatan()
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