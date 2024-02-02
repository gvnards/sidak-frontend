<template>
  <tr class="item">
    <td style="max-width: 100px; padding-left: 10px;">
      <p class="text-primary">{{ dataPegawai.nama }}</p>
      <small class="text-black">{{ dataPegawai.nip }}</small>
    </td>
    <td style="max-width: 30px;">
      <p class="text-center text-primary">{{ dataPegawai.golongan }}</p>
    </td>
    <td style="max-width: 100px;">
      <p class="text-primary scrolled">{{ dataPegawai.jabatan }}</p>
    </td>
    <td style="max-width: 100px;">
      <p class="text-primary scrolled">{{ dataPegawai.unitOrganisasi }}</p>
    </td>
    <td style="max-width: 20px; cursor: pointer;" @click="$emit('showPegawai')">
      <p class="text-center text-primary scrolled"><i class="fa-solid fa-eye text-primary"></i></p>
    </td>
  </tr>
</template>

<script>
export default {
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
.scrolled {
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
  height: 100%;
}
.item {
  font-size: 13px !important;
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
</style>