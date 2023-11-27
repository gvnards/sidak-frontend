<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jenis Pangkat
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPangkatBeforeUpdate.jenisPangkat }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPangkat.jenisPangkat }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-4">
          <p class="text-primary usulan-item-header">
            Golongan
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPangkatBeforeUpdate.golongan }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPangkat.golongan }}
          </p>
        </div>
        <div class="col-8">
          <p class="text-primary usulan-item-header">
            Pangkat
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPangkatBeforeUpdate.pangkat }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPangkat.pangkat }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <p class="text-primary usulan-item-header" style="margin: 0; margin-bottom: -8px; padding: 0px;">
        Masa Kerja
      </p>
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tahun
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPangkatBeforeUpdate.masaKerjaTahun }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPangkat.masaKerjaTahun }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Bulan
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPangkatBeforeUpdate.masaKerjaBulan }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPangkat.masaKerjaBulan }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Nomor BKN
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPangkatBeforeUpdate.nomorBkn }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPangkat.nomorBkn }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal BKN
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPangkatBeforeUpdate.tanggalBkn }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPangkat.tanggalBkn }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Nomor SK
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPangkatBeforeUpdate.nomorDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPangkat.nomorDokumen }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal SK
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPangkatBeforeUpdate.tanggalDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPangkat.tanggalDokumen }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Dokumen SK Pangkat/Golongan
          </p>
          <iframe v-if="dataPangkatBeforeUpdate.dokumen !== '' && dataPangkatBeforeUpdate.dokumen !== null && isUsulanUpdate" :src="dataPangkatBeforeUpdate.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #EC392F; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <iframe v-if="dataPangkat.dokumen !== '' && dataPangkat.dokumen !== null" :src="dataPangkat.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #477b79; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <div v-else class="text-danger" style="font-weight: 600;">Tidak ada Dokumen SK Pangkat/Golongan</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isUsulanUpdate: {
      default: false,
      required: true,
      type: Boolean
    },
    dataPangkat: {
      default() {
        return {
          jenisPangkat: "",
          pangkat: "",
          golongan: "",
          masaKerjaTahun: "",
          masaKerjaBulan: "",
          nomorBkn: "",
          tanggalBkn: "",
          nomorDokumen: "",
          tanggalDokumen: "",
          dokumen: "",
          keteranganUsulan: ""
        }
      },
      type: Object
    },
    dataPangkatBeforeUpdate: {
      default() {
        return {
          jenisPangkat: "",
          pangkat: "",
          golongan: "",
          masaKerjaTahun: "",
          masaKerjaBulan: "",
          nomorBkn: "",
          tanggalBkn: "",
          nomorDokumen: "",
          tanggalDokumen: "",
          dokumen: "",
          keteranganUsulan: ""
        }
      },
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.usulan-open-item-wrapper {
  margin-bottom: 20px;
}
p {
  padding: 0;
  margin: 0px;
  word-break: break-all;
  min-height: 32px;
  &.usulan-item-header {
    font-weight: 600;
    margin-bottom: 4px;
  }
  &.usulan-item-fill {
    margin-top: 4px;
    border: 1px solid #477b79;
    background-color: #EBEBEB;
    border-radius: 4px;
    font-weight: 500;
    padding: 6px 10px;
    box-sizing: border-box;
    cursor: default;
  }
  &.usulan-item-fill-red {
    border: 1px solid #EC392F;
    margin-top: 4px;
    background-color: #EBEBEB;
    border-radius: 4px;
    font-weight: 500;
    padding: 6px 10px;
    box-sizing: border-box;
    cursor: default;
  }
}
</style>