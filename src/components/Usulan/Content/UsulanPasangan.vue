<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Nama
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPasanganBeforeUpdate.nama }}
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
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPasanganBeforeUpdate.tempatLahir }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPasangan.tempatLahir }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Lahir
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPasanganBeforeUpdate.tanggalLahir }}
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
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPasanganBeforeUpdate.statusPerkawinan }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPasangan.statusPerkawinan }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Status Perkawinan
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPasanganBeforeUpdate.tanggalStatusPerkawinan }}
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
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPasanganBeforeUpdate.nomorDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPasangan.nomorDokumen }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Dokumen
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPasanganBeforeUpdate.tanggalDokumen }}
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
          <iframe v-if="dataPasanganBeforeUpdate.dokumen !== '' && dataPasanganBeforeUpdate.dokumen !== null && isUsulanUpdate" :src="dataPasanganBeforeUpdate.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #EC392F; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <iframe v-if="dataPasangan.dokumen !== '' && dataPasangan.dokumen !== null" :src="dataPasangan.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #477b79; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <div v-else class="text-danger" style="font-weight: 600;">Tidak ada Dokumen Akta Nikah/Cerai/Meninggal</div>
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
    },
    dataPasanganBeforeUpdate: {
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