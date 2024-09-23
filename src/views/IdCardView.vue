<template>
  <div style="width: 100%; box-sizing: border-box; padding: 40px;">
    <h5 class="text-primary" style="font-weight: 600;">
      Pencetakan ID Card Pegawai
    </h5>
    <div class="form-group search-wrapper">
        <i
          class="fa-solid fa-magnifying-glass search-icon text-primary"
        ></i>
        <input
          type="text"
          v-model="searchValue"
          class="form-control search"
          placeholder="Cari NIP/Nama/Unit Organisasi"
        />
      </div>
      <div class="btn btn-sm my-btn-primary" v-if="listPegawai.checkedCount > 0" @click="idCard()">Cetak ID Card</div>
      <div id="list-pegawai-wrapper">
        <table class="table">
          <thead class="thead-dark">
            <tr style="font-size: 0.85rem;">
              <th scope="col" colspan="2" class="text-primary text-center" style="background-color: #eff5f5; border-color: #eff5f5; border-right: 2px solid white;">Daftar Pegawai</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in pegawaiShow" :key="idx" style="border: 2px solid rgb(239,245,245);">
              <td style="width: 40px; border-right: 2px solid rgb(239,245,245);">
                <input :disabled="!item.hasPhoto" type="checkbox" :checked="item.checked" class="form-control checked-box" @click="item.hasPhoto ? pegawaiChecked(item) : () => {}">
              </td>
              <td>
                <p style="padding: 0px; margin: 0px; font-size: 14px; font-weight: 500;">
                  {{ item.nama }} | {{ item.nip }}
                  <br>
                  {{ item.jabatan }} pada {{ item.unitOrganisasi }}
                </p>
                <small :class="item.hasPhoto ? 'text-primary' : 'text-danger'" style="font-weight: 600;">{{ item.hasPhoto ? "(Foto tersedia)" : "(Foto tidak ada)" }}</small>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center">
                <ul class="pagination-wrapper" style="margin-top: 24px;">
                  <li class="pagination-item" :class="page.active === 1 ? 'disabled' : ''" @click="updateActivePage('prev')">Sebelumnya</li>
                  <div style="width: 12px;"></div>
                  <li class="pagination-item" :class="page.active === page.total ? 'disabled' : ''" @click="updateActivePage('next')">Selanjutnya</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf"
import axios from "axios"
const env = import.meta.env
export default {
  watch: {
    searchValue () {
      this.resetPage()
    }
  },
  data() {
    return {
      searchValue: "",
      listPegawai: {
        all: [],
        checkedCount: 0
      },
      idCardData: {
        template: {
          background: {},
          components: {}
        },
      },
      page: {
        perPage: 20,
        active: 1,
        total: 1
      }
    }
  },
  computed: {
    pegawaiShow() {
      let idxMin = (this.page.active - 1) * this.page.perPage
      let idxMax = (this.page.active * this.page.perPage) - 1
      if (this.searchValue === "") {
        this.updateTotalPage(this.listPegawai.all.length)
        return this.listPegawai.all.slice(idxMin, idxMax+1)
      }
      let tempPegawaiSearch = this.listPegawai.all.filter(el =>
        (el.nip.toLowerCase()).includes(this.searchValue.toLowerCase()) ||
        (el.nama.toLowerCase()).includes(this.searchValue.toLowerCase())
      || (el.unitOrganisasi.toLowerCase()).includes(this.searchValue.toLowerCase())
      )
      this.updateTotalPage(tempPegawaiSearch.length)
      return tempPegawaiSearch.slice(idxMin, idxMax+1)
    },
  },
  methods: {
    updateTotalPage(lengthData) {
      this.page.total = Math.ceil(lengthData / this.page.perPage)
    },
    updateActivePage(mode) {
      // <li class="pagination-item" :class="page.active === 1 ? 'disabled' : ''" @click="page.active=page.active===1?page.active:page.active-1">Sebelumnya</li>
      // <div style="width: 12px;"></div>
      // <li class="pagination-item" :class="page.active === page.total ? 'disabled' : ''" @click="page.active===page.total?page.active=page.active:page.active+1">Selanjutnya</li>
      if (mode === "prev") {
        if (this.page.active !== 1) this.page.active--
      }
      else if (mode === "next") {
        if (this.page.active !== this.page.total) this.page.active++
      }
    },
    resetPage() {
      this.page = {
        perPage: 20,
        active: 1,
        total: 1
      }
    },
    pegawaiChecked(item) {
      let idx = this.listPegawai.all.findIndex(el => el.nip === item.nip)
      this.listPegawai.all[idx].checked = !this.listPegawai.all[idx].checked
      this.listPegawai.checkedCount = this.listPegawai.all[idx].checked ? this.listPegawai.checkedCount + 1 : this.listPegawai.checkedCount - 1
    },
    templateIdCard(pdfCreate, templateGambar, foto, ekstensiFoto, biodata, profilSekda, index) {
      // next nya, bg => y + 6
      let kurangiLebar = 0.5
      let bgDepan = pdfCreate.addImage(templateGambar.background.depan, "JPEG", (1 + (index * 5.5)), 1, (6 - kurangiLebar), 9, "bgDepan", "FAST", 0)
      let logoDepan = pdfCreate.addImage(templateGambar.components.logo, "PNG", ((3.45 - (kurangiLebar/2)) + (index * 5.5)), 1.4, 1.1, 0, "logoDepan", "FAST", 0)
      let headerDepan1 = pdfCreate.setFont("helvetica", "normal", "bold").setTextColor(39, 69, 123).setFontSize(9).text("PEMERINTAH KABUPATEN", ((4 - (kurangiLebar/2)) + (index * 5.5)), 3.35, {
        align: "center"
      }, 0)
      let headerDepan2 = pdfCreate.setFont("helvetica", "normal", "bold").setTextColor(39, 69, 123).setFontSize(9).text("SITUBONDO", ((4 - (kurangiLebar/2)) + (index * 5.5)), 3.7, {
        align: "center"
      }, 0)

      // FOTO DI SINI
      let fotoDepan = pdfCreate.addImage(foto, ekstensiFoto, (1.925 + (index * 5.5)), 4, 3.5, 4.5, `foto-${biodata.nip}`, "FAST", 0)
      // END FOTO

      let name = biodata.nama
      let initialFontSize = 10
      /// 4.75
      let footerDepan = pdfCreate.setFont("helvetica", "normal", "bold").setTextColor(39, 69, 123).setFontSize(initialFontSize)
      let widthName = footerDepan.getTextWidth(name)
      let maxWidthName = 5
      if (widthName > maxWidthName) {
        let nameSplit = name.split(" ")
        let nameSplitLength = nameSplit.length
        let tempName = ""
        for (let i=0; i<nameSplitLength; i++) {
          tempName = tempName + nameSplit[i]
          if (i+1 < nameSplitLength) tempName = tempName + " "
          widthName = footerDepan.getTextWidth(tempName)
          if (widthName > maxWidthName) {
            let nameInSecondLine = (nameSplit.slice(i+1)).join(" ")
            name = nameInSecondLine === "" ? [tempName] : [tempName, nameInSecondLine]
            break
          }
        }
      } else {
        name = [name]
      }
      for (let i=0; i<name.length; i++) {
        let fontSizeDecrease = 0
        widthName = footerDepan.getTextWidth(name[i])
        while (widthName > maxWidthName) {
          fontSizeDecrease += 0.1
          footerDepan.setFontSize(initialFontSize - fontSizeDecrease)
          widthName = footerDepan.getTextWidth(name[i])
        }
        footerDepan.text(name[i], ((4 - (kurangiLebar/2)) + (index * 5.5)), i === 0 ? 9.2 : 9.55, {
          align: "center"
        }, 0)
      }

      //// BELAKANG
      let tambahJarakBelakang = 0.5
      let bgBelakang = pdfCreate.addImage(templateGambar.background.belakang, "JPEG", (1 + (index * 5.5)), (10+tambahJarakBelakang), (6+ - kurangiLebar), 9, "bgBelakang", "FAST", 0)
      pdfCreate.addImage(templateGambar.components.line, "JPEG", (1.2 + (index * 5.5)), (16.35+tambahJarakBelakang), 5.1, 0.7, "line", "FAST", 0)
      pdfCreate.addImage(templateGambar.components.line, "JPEG", (1.2 + (index * 5.5)), (15.05+tambahJarakBelakang), 5.1, 0.7, "line", "FAST", 0)
      pdfCreate.addImage(templateGambar.components.line, "JPEG", (1.2 + (index * 5.5)), (13.8+tambahJarakBelakang), 5.1, 0.7, "line", "FAST", 0)
      pdfCreate.addImage(templateGambar.components.line, "JPEG", (1.2 + (index * 5.5)), (12.6+tambahJarakBelakang), 5.1, 0.7, "line", "FAST", 0)
      let fontBiodata = pdfCreate.setFont("helvetica", "normal", "bold").setTextColor(202, 34, 38).setFontSize(initialFontSize)
      let txtBiodata = "BIODATA"
      let widthTextBiodata = fontBiodata.getTextWidth(txtBiodata)
      fontBiodata.text(txtBiodata, (((0.25 - (kurangiLebar/2)) + (index * 5.5))) + (7.5/2)+(widthTextBiodata/2), (18+tambahJarakBelakang), {
        align: "left",
        angle: 180,
      }, 0)
      ///// CONTENT BELAKANG
      let contentBelakang = [
        {label: "NAMA", value: biodata.nama},
        {label: "NIP", value: biodata.nip},
        {label: "JABATAN", value: biodata.jabatan},
        {label: "INSTANSI", value: biodata.unitOrganisasi}
      ]
      let initialLocation = (17.75+tambahJarakBelakang)
      let initialLocationDecreaseForLabel = 0
      let initialLocationDecreaseForText = 0
      let initialFontSizeBelakang = 9
      contentBelakang.forEach((el,idx) => {
        pdfCreate.setTextColor(0,0,0)
        pdfCreate.setFontSize(initialFontSizeBelakang)
        let labelBelakang = el.label
        let widthlabelBelakang = fontBiodata.getTextWidth(labelBelakang)
        fontBiodata.text(labelBelakang, (((0.25 - (kurangiLebar/2)) + (index * 5.5))) + (7.5/2)+(widthlabelBelakang/2), (initialLocation-(0.65*(idx+1)))-initialLocationDecreaseForLabel, {
          align: "left",
          angle: 180,
        }, 0)
        let txtBlkg = el.value
        /// 4.75
        let fontSetting = pdfCreate.setFont("helvetica", "normal", "bold").setTextColor(0,0,0).setFontSize(initialFontSizeBelakang)
        let widthTxtBlkg = fontSetting.getTextWidth(txtBlkg)
        let maxWidthTxtBlkg = 5
        if (widthTxtBlkg > maxWidthTxtBlkg) {
          let txtBlkgSplit = txtBlkg.split(" ")
          let txtBlkgSplitLength = txtBlkgSplit.length
          let tempTxtBlkg = ""
          for (let i=0; i<txtBlkgSplitLength; i++) {
            tempTxtBlkg = tempTxtBlkg + txtBlkgSplit[i]
            if (i+1 < txtBlkgSplitLength) tempTxtBlkg = tempTxtBlkg + " "
            widthTxtBlkg = fontSetting.getTextWidth(tempTxtBlkg)
            if (widthTxtBlkg > maxWidthTxtBlkg) {
              let txtBlkgInSecondLine = (txtBlkgSplit.slice(i+1)).join(" ")
              txtBlkg = txtBlkgInSecondLine === "" ? [tempTxtBlkg] : [tempTxtBlkg, txtBlkgInSecondLine]
              break
            }
          }
        } else {
          txtBlkg = [txtBlkg]
        }
        let textBelakang = pdfCreate.setFont("helvetica", "normal", "bold").setTextColor(0,0,0).setFontSize(initialFontSizeBelakang)
        // pdfCreate.rect(x, y, w, h, style)
        for (let i=0; i<txtBlkg.length; i++) {
          let fontSizeDecrease = 0
          widthTxtBlkg = textBelakang.getTextWidth(txtBlkg[i])
          while (widthTxtBlkg > maxWidthTxtBlkg) {
            fontSizeDecrease += 0.1
            textBelakang.setFontSize(initialFontSizeBelakang - fontSizeDecrease)
            widthTxtBlkg = textBelakang.getTextWidth(txtBlkg[i])
          }
          let secondHeight = ((initialLocation-initialLocationDecreaseForText)-((1*(idx+1))+0.3))
          let firstHeight = txtBlkg.length === 1 ? (secondHeight+((((initialLocation-initialLocationDecreaseForText)-(1*(idx+1)))-secondHeight)/2)) : ((initialLocation-initialLocationDecreaseForText)-(1*(idx+1)))
          textBelakang.text(txtBlkg[i], (((0.25 - (kurangiLebar/2)) + (index * 5.5))) + (7.5/2)+(widthTxtBlkg/2), i === 0 ? firstHeight : secondHeight, {
            align: "left",
            angle: 180,
          }, 0)
        }
        initialLocationDecreaseForLabel = (initialLocation - (initialLocation-((1*(idx+1))+0.3)))/1.9
        initialLocationDecreaseForText = (initialLocation - (initialLocation-((1*(idx+1))+0.3)))/4.5
      })
      ////// TTD
      let arrayTtd = [
        "an. BUPATI SITUBONDO",
        profilSekda.jabatan.toUpperCase(),
        profilSekda.nama.toUpperCase(),
        "NIP. "+profilSekda.nip.toUpperCase()
      ]
      arrayTtd.forEach((el, idx) => {
        let fontTtd = pdfCreate.setFont("helvetica", "normal", "bold").setTextColor(0,0,0).setFontSize(7)
        let txtTtd = el
        let widthTxtTtd = fontTtd.getTextWidth(txtTtd)
        if (widthTxtTtd > 5.5) {
          fontTtd.setFontSize(5)
          widthTxtTtd = fontTtd.getTextWidth(txtTtd)
        }
        fontTtd.text(txtTtd, (((0.25 - (kurangiLebar/2)) + (index * 5.5))) + (7.5/2)+(widthTxtTtd/2), idx <= 1 ? (11.95+tambahJarakBelakang)-(idx*0.25) : (11.95+tambahJarakBelakang)-(0.6+(idx*0.25)), {
          align: "left",
          angle: 180,
        }, 0)
      })
      pdfCreate.addImage(templateGambar.components.ttd, "JPEG", (2.75 + (index * 5.5)), 10.7, 1.3, 0, "ttd", "FAST", 0)
      pdfCreate.addImage(templateGambar.components.stempel, "JPEG", (3.8 + (index * 5.5)), 10.7, 1.3, 1.3, "stempel", "FAST", 0)
    },
    getFoto(nip) {
      return axios({
        url: `${env.VITE_BACKEND_URL}/idcard/photo/${nip}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
    async idCard() {
      let listCheckedPegawai = this.listPegawai.all.filter(el => el.checked === true)
      let listFoto = []
      for (let i = 0; i < listCheckedPegawai.length; i++) {
        await this.getFoto(listCheckedPegawai[i]["nip"]).then(res => {
          listFoto.push({
            nip: listCheckedPegawai[i]["nip"],
            blob: res.data.blob,
            ekstensi: res.data.ekstensi
          })
        }).catch(() => {
          listFoto.push({
            nip: listCheckedPegawai[i]["nip"],
            blob: "",
            ekstensi: "jpeg"
          })
        })
      }
      let profilSekdaTemp = this.listPegawai.all.find(el => (el.jabatan.toLowerCase()).includes("sekretaris daerah"))
      let profilSekda = profilSekdaTemp === undefined ? {id:0,nama:"{ Data tidak ada }",nip:"{ Data tidak ada }",jabatan:"{ Data tidak ada }",unitOrganisasi:"{ Data tidak ada }"} : profilSekdaTemp
      axios({
        url: `${env.VITE_BACKEND_URL}/idcard/pdf`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.idCardData.template = res.data.message.template
        let idCardPdf = new jsPDF({
          compress: true,
          orientation: "l",
          unit: "cm",
          format: "a4"
        })
        listCheckedPegawai.forEach((dt, idx) => {
          let dtFoto = listFoto.find(el => el.nip === dt.nip)
          this.templateIdCard(idCardPdf, this.idCardData.template, dtFoto["blob"], dtFoto["ekstensi"], dt, profilSekda, (idx%5))
          if ((idx+1)%5===0) idCardPdf.addPage("a4", "landscape")
        })
        idCardPdf.save("idCard.pdf")
      })
    },
    getListPegawai() {
      axios({
        url: `${env.VITE_BACKEND_URL}/idcard/created`,
        method: "GET",
      }).then(res => {
        this.listPegawai.all = res.data.message.pegawai.filter(el => el.hasOwnProperty("unitOrganisasi"))
      })
    }
  },
  created() {
    this.getListPegawai()
  }
}
</script>

<style lang="less" scoped>
#list-pegawai-wrapper {
  margin-top: 10px;
  max-height: calc(100vh - 240px);
  height: 100%;
  overflow-y: auto;
}
.search {
  border-radius: 40px;
  padding-left: 50px;
  letter-spacing: 1px;
  &-wrapper {
    position: relative;
    // max-width: 300px;
    max-width: 100%;
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
</style>