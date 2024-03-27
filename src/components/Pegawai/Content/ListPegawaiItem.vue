<template>
  <tr class="item">
    <td style="max-width: 40px; padding-left: 10px;" ref="elOuterCol1">
      <p ref="elInnerCol1_1" class="text-primary" :class="widthInnerCol1_1 > widthOuterCol1 ? 'running-text' : ''">{{ dataPegawai.nama }}</p>
      <small ref="elInnerCol1_2" class="text-black" :class="widthInnerCol1_2 > widthOuterCol1 ? 'running-text' : ''">{{ dataPegawai.nip }}</small>
      <div style="height: 0.5px; width: 100%; background-color: rgb(239, 245, 245);"></div>
      <p ref="elInnerCol1_3" class="text-primary" :class="widthInnerCol1_3 > widthOuterCol1 ? 'running-text' : ''">Golongan: {{ dataPegawai.golongan }}</p>
    </td>
    <td style="max-width: 100px;" ref="elOuterCol3">
      <p ref="elInnerCol3_1" class="text-primary" :class="widthInnerCol3_1 > widthOuterCol3 ? 'running-text' : ''">{{ dataPegawai.jabatan }}</p>
      pada
      <p ref="elInnerCol3_2" class="text-primary" :class="widthInnerCol3_2 > widthOuterCol3 ? 'running-text' : ''">{{ dataPegawai.unitOrganisasi }}</p>
    </td>
    <td style="max-width: 20px; cursor: pointer;" @click="$emit('showPegawai')">
      <p class="text-primary" style="margin: auto;"><i class="fa-solid fa-eye text-primary" style="width: 24px;"></i></p>
    </td>
  </tr>
</template>

<script>
import { ref } from "vue"
import { useElementSize } from "@vueuse/core"
export default {
  setup() {
    /// col1
    const elOuterCol1 = ref(null)
    const widthOuterCol1 = useElementSize(elOuterCol1).width
    const elInnerCol1_1 = ref(null)
    const widthInnerCol1_1 = useElementSize(elInnerCol1_1).width
    const elInnerCol1_2 = ref(null)
    const widthInnerCol1_2 = useElementSize(elInnerCol1_2).width
    const elInnerCol1_3 = ref(null)
    const widthInnerCol1_3 = useElementSize(elInnerCol1_3).width
    /// col2
    // const elOuterCol2 = ref(null)
    // const widthOuterCol2 = useElementSize(elOuterCol2).width
    /// col3
    const elOuterCol3 = ref(null)
    const widthOuterCol3 = useElementSize(elOuterCol3).width
    const elInnerCol3_1 = ref(null)
    const widthInnerCol3_1 = useElementSize(elInnerCol3_1).width
    const elInnerCol3_2 = ref(null)
    const widthInnerCol3_2 = useElementSize(elInnerCol3_2).width
    return {
      // col1
      elOuterCol1,widthOuterCol1,
      elInnerCol1_1,widthInnerCol1_1,
      elInnerCol1_2,widthInnerCol1_2,
      elInnerCol1_3,widthInnerCol1_3,
      // col2
      // elOuterCol2,widthOuterCol2,
      // col3
      elOuterCol3,widthOuterCol3,
      elInnerCol3_1,widthInnerCol3_1,
      elInnerCol3_2,widthInnerCol3_2,
    }
  },
  props: {
    dataPegawai: {
      default: () => {
        return {
          nama: "Giovani Ardiansyah, S.Kom. Giovani Ardiansyah, S.Kom.",
          nip: "199601162019031001",
          golongan: "III/a",
          jabatan: "Plt. Kepala Dinas Pemberdayaan Perempuan, Perlindungan Anak, Pengendalian Penduduk dan Keluarga Berencana",
          unitOrganisasi: "Sub Bagian Umum dan Keuangan pada Sekretariat pada Dinas Pemberdayaan Perempuan, Perlindungan Anak, Pengendalian Penduduk dan Keluarga Berencana"
        }
      },
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
td {
  vertical-align: middle;
  padding: 4px;
}
.item {
  font-size: 13px !important;
  td {
    overflow: hidden;
    * {
      width: fit-content;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .running-text {
      animation: running-text 8s linear infinite;
      text-overflow: initial;
      overflow: initial;
    }
    p {
      padding: 0;
      margin: 0;
      font-weight: 500;
    }
    small {
      padding: 0;
      margin: 0;
    }
  }
  td {
    border-right: 2px solid rgb(239, 245, 245);
  }
}
@keyframes running-text {
  0% {
    transform: translateX(5%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>