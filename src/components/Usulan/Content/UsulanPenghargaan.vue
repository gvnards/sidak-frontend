<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jenis Penghargaan
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPenghargaanBeforeUpdate.jenisPenghargaan }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPenghargaan.jenisPenghargaan }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Tahun Penghargaan Diperoleh
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPenghargaanBeforeUpdate.tahunPenghargaan }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPenghargaan.tahunPenghargaan }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <p class="text-primary usulan-item-header">
            Nomor Dokumen
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPenghargaanBeforeUpdate.nomorDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPenghargaan.nomorDokumen }}
          </p>
        </div>
        <div class="col-12 col-sm-6">
          <p class="text-primary usulan-item-header">
            Tanggal Dokumen
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPenghargaanBeforeUpdate.tanggalDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPenghargaan.tanggalDokumen }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Dokumen
          </p>
          <iframe v-if="dataPenghargaanBeforeUpdate.dokumen !== '' && dataPenghargaanBeforeUpdate.dokumen !== null && isUsulanUpdate" :src="dataPenghargaanBeforeUpdate.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #EC392F; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <iframe v-if="dataPenghargaan.dokumen !== '' && dataPenghargaan.dokumen !== null" :src="dataPenghargaan.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #477b79; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <div v-else class="text-danger" style="font-weight: 600;">Tidak ada Dokumen Penghargaan</div>
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
    dataPenghargaan: {
      default() {
        return {
          jenisPenghargaan: "",
          tahunPenghargaan: "",
          tanggalDokumen: "",
          nomorDokumen: "",
          dokumen: "",
        }
      },
      type: Object
    },
    dataPenghargaanBeforeUpdate: {
      default() {
        return {
          jenisPenghargaan: "",
          tahunPenghargaan: "",
          tanggalDokumen: "",
          nomorDokumen: "",
          dokumen: "",
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