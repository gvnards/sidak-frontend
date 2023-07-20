<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Nama
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
          <p class="usulan-item-fill text-primary">
            {{ dataAnak.tempatLahir }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Lahir
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
          <p class="usulan-item-fill text-primary">
            {{ dataAnak.statusAnak }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Nama Orang Tua
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
          <p class="usulan-item-fill text-primary">
            {{ dataAnak.nomorDokumen }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Dokumen
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
          <iframe v-if="dataAnak.dokumen !== '' && dataAnak.dokumen !== null" :src="dataAnak.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
          <div v-else class="text-danger" style="font-weight: 600;">Tidak ada Dokumen Akta Kelahiran</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
}
</style>