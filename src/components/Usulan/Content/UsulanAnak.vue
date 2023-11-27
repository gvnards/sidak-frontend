<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Nama
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAnakBeforeUpdate.nama }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAnak.nama }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tempat Lahir
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAnakBeforeUpdate.tempatLahir }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAnak.tempatLahir }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Lahir
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAnakBeforeUpdate.tanggalLahir }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAnak.tanggalLahir }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Status Anak
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAnakBeforeUpdate.statusAnak }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAnak.statusAnak }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Nama Orang Tua
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAnakBeforeUpdate.namaOrangTua }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAnak.namaOrangTua }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Nomor Dokumen
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAnakBeforeUpdate.nomorDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAnak.nomorDokumen }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Dokumen
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAnakBeforeUpdate.tanggalDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAnak.tanggalDokumen }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Dokumen Akta Kelahiran
          </p>
          <iframe v-if="dataAnakBeforeUpdate.dokumen !== '' && dataAnakBeforeUpdate.dokumen !== null && isUsulanUpdate" :src="dataAnakBeforeUpdate.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #EC392F; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <iframe v-if="dataAnak.dokumen !== '' && dataAnak.dokumen !== null" :src="dataAnak.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #477b79; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <div v-else class="text-danger" style="font-weight: 600;">Tidak ada Dokumen Akta Kelahiran</div>
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
    dataAnak: {
      default() {
        return {
          nama: "",
          tempatLahir: "",
          tanggalLahir: "",
          statusAnak: "",
          namaOrangTua: "",
          nomorDokumen: "",
          tanggalDokumen: "",
          dokumen: "",
          keteranganUsulan: ""
        }
      },
      type: Object
    },
    dataAnakBeforeUpdate: {
      default() {
        return {
          nama: "",
          tempatLahir: "",
          tanggalLahir: "",
          statusAnak: "",
          namaOrangTua: "",
          nomorDokumen: "",
          tanggalDokumen: "",
          dokumen: "",
          keteranganUsulan: ""
        }
      },
      type: Object
    },
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