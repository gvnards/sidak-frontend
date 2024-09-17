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
          placeholder="Cari NIP/Nama"
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
            <tr v-for="(item, idx) in listPegawai.all" v-show="pegawaiShow(item)" :key="idx" style="border: 2px solid rgb(239,245,245);">
              <td style="width: 40px; border-right: 2px solid rgb(239,245,245);">
                <input :disabled="!item.hasPhoto" type="checkbox" :checked="item.checked" class="form-control checked-box" @click="item.hasPhoto ? pegawaiChecked(idx) : () => {}">
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
  data() {
    return {
      searchValue: "",
      listPegawai: {
        all: [],
        checkedCount: 0
      },
      idCardData: {
        template: {
          background: {
            depan: "",
            belakang: ""
          },
          components: {
            logo: "",
            ttd: "",
            stempel: ""
          }
        },
        data: []
      }
    }
  },
  methods: {
    pegawaiShow(item) {
      return this.searchValue === "" ? true :
        (item.nip.toLowerCase()).includes(this.searchValue.toLowerCase()) ||
        (item.nama.toLowerCase()).includes(this.searchValue.toLowerCase())
        // || (item.unitOrganisasi.toLowerCase()).includes(this.searchValue.toLowerCase())
    },
    pegawaiChecked(idx) {
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
      let bgBelakang = pdfCreate.addImage(templateGambar.background.belakang, "JPEG", (1 + (index * 5.5)), 10, (6 - kurangiLebar), 9, "bgBelakang", "FAST", 0)
      pdfCreate.addImage(templateGambar.components.line, "JPEG", (1.2 + (index * 5.5)), 16.35, 5.1, 0.7, "line", "FAST", 0)
      pdfCreate.addImage(templateGambar.components.line, "JPEG", (1.2 + (index * 5.5)), 15.05, 5.1, 0.7, "line", "FAST", 0)
      pdfCreate.addImage(templateGambar.components.line, "JPEG", (1.2 + (index * 5.5)), 13.8, 5.1, 0.7, "line", "FAST", 0)
      pdfCreate.addImage(templateGambar.components.line, "JPEG", (1.2 + (index * 5.5)), 12.6, 5.1, 0.7, "line", "FAST", 0)
      let fontBiodata = pdfCreate.setFont("helvetica", "normal", "bold").setTextColor(202, 34, 38).setFontSize(initialFontSize)
      let txtBiodata = "BIODATA"
      let widthTextBiodata = fontBiodata.getTextWidth(txtBiodata)
      fontBiodata.text(txtBiodata, (((0.25 - (kurangiLebar/2)) + (index * 5.5))) + (7.5/2)+(widthTextBiodata/2), 18, {
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
      let initialLocation = 17.75
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
        fontTtd.text(txtTtd, (((0.25 - (kurangiLebar/2)) + (index * 5.5))) + (7.5/2)+(widthTxtTtd/2), idx <= 1 ? 11.95-(idx*0.25) : 11.95-(0.6+(idx*0.25)), {
          align: "left",
          angle: 180,
        }, 0)
      })
    },
    idCard() {
      let listNip = []
      let listCheckedPegawai = this.listPegawai.all.filter(function (el) {
        if (el.checked) {
          listNip.push(el.nip)
          return el
        }
      })
      let profilSekdaTemp = this.listPegawai.all.find(el => (el.jabatan.toLowerCase()).includes("sekretaris daerah"))
      let profilSekda = profilSekdaTemp === undefined ? {id:0,nama:"{ Data tidak ada }",nip:"{ Data tidak ada }",jabatan:"{ Data tidak ada }",unitOrganisasi:"{ Data tidak ada }"} : profilSekdaTemp
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let data = this.$store.getters.getEncrypt(JSON.stringify({listNip}), u)
      axios({
        url: `${env.VITE_BACKEND_URL}/idcard/make-pdf`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: data
        }
      }).then(res => {
        let listFotoJson = res.data.message.foto.replace("[", "")
        listFotoJson = listFotoJson.replace("]", "")
        listFotoJson = listFotoJson.replace("}},{", "},")
        listFotoJson = JSON.parse(listFotoJson)
        this.idCardData.template = res.data.message.template
        // this.idCardData.data = res.data.message.data
        let idCardPdf = new jsPDF({
          compress: true,
          orientation: "l",
          unit: "cm",
          format: "a4"
        })
        listCheckedPegawai.forEach((dt, idx) => {
          this.templateIdCard(idCardPdf, this.idCardData.template, listFotoJson[dt.nip]["foto"], listFotoJson[dt.nip]["ekstensi"], dt, profilSekda, (idx%5))
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
        this.listPegawai.all = res.data.message.pegawai
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