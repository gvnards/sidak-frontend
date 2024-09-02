<template>
  <div>
    <!-- <ModalWrapper>
      <StatusLoginContent v-if="showModalContent === 'StatusLogin'" />
    </ModalWrapper>
    <LoginWrapper /> -->
    <!-- <div id="idcard-pdf">
      <img :src="idCard.template.background.depan" alt="" style="width: 6cm; height: 9cm;">
    </div> -->
  </div>
</template>

<script>
import { jsPDF } from "jspdf"
import axios from "axios"
const env = import.meta.env
import LoginWrapper from "../components/Login/LoginWrapper.vue"
export default {
  components: {
    LoginWrapper,
  },
  computed: {
    showModalContent() {
      return this.$store.getters.getModalContent
    }
  },
  data() {
    return {
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
    templateIdCard(pdfCreate, templateGambar, foto, biodata, index) {
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
      let fontBiodata = pdfCreate.setFont("helvetica", "normal", "bold").setTextColor(39, 69, 123).setFontSize(initialFontSize)
      let widthTextBiodata = fontBiodata.getTextWidth("BIODATA")
      // console.log((6.5 / 2) + (widthTextBiodata / 2))
      fontBiodata.text("BIODATA", (6.5 / 2) + (widthTextBiodata / 2) , 18, {
        align: "left",
        angle: 180,
      }, 0)
    },
    idCard() {
      axios({
        url: `${env.VITE_BACKEND_URL}/idcard`,
        method: "GET",
      }).then(res => {
        this.idCardData.template = res.data.message.template
        this.idCardData.data = res.data.message.data
        let idCardPdf = new jsPDF({
          compress: true,
          orientation: "l",
          unit: "cm",
          format: "a4"
        })
        let dataIdCard = [
          {
            nama: "dr. DINI INDAH LAILATUL SOFARIYAH PURWANTININGSIH",
            nip: "199308052022042001",
            jabatan: "Dokter Ahli Pertama",
            unor: "Seksi Pelayanan Medis dan Keperawatan pada UOBK RSUD Besuki"
          },
        ]
        dataIdCard.forEach((dt, idx) => {
          this.templateIdCard(idCardPdf, res.data.message.template, "foto base64", dt, idx)
        })
        idCardPdf.save("x.pdf")
      })
    }
  },
  created() {
    this.idCard()
  }
}
</script>