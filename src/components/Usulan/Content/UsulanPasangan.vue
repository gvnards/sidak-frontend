<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Nama
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPasangan.nama }}
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
            {{ dataPasangan.tempatLahir }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Lahir
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPasangan.tanggalLahir }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Status Perkawinan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPasangan.statusPerkawinan }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Status Perkawinan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPasangan.tanggalStatusPerkawinan }}
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
            {{ dataPasangan.nomorDokumen }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Dokumen
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPasangan.tanggalDokumen }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Dokumen Akta Nikah/Cerai/Meninggal
          </p>
          <iframe v-if="dataPasangan.dokumen !== '' && dataPasangan.dokumen !== null" :src="dataPasangan.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
          <div v-else class="text-danger" style="font-weight: 600;">Tidak ada Dokumen Akta Nikah/Cerai/Meninggal</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataPasangan: {
      default() {
        return {
          nama: "",
          tempatLahir: "",
          tanggalLahir: "",
          statusPerkawinan: "",
          tanggalStatusPerkawinan: "",
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