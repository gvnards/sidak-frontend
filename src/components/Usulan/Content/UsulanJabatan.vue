<template>
  <div>
    <!-- {{ dataJabatan.isPltPlh !== 0 && dataJabatan.isPltPlh !== undefined ? `Plt. ${dataJabatan.jabatan}` : dataJabatan.jabatan }} -->
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Unit Organisasi
          </p>
          <p class="usulan-item-fill text-primary" v-for="(item, idx) in dataJabatan.unitOrganisasi" :key="idx">
            {{ item.unitOrganisasi }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jabatan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataJabatan.isPltPlh != 0 && dataJabatan.isPltPlh !== undefined ? `Plt. ${dataJabatan.jabatan}` : dataJabatan.jabatan }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper" v-if="dataJabatan.tugasTambahan !== null">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Tugas Tambahan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataJabatan.tugasTambahan }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            TMT
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataJabatan.tmt }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            SPMT
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataJabatan.spmt }}
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
          <p class="usulan-item-fill text-primary">
            {{ dataJabatan.nomorDokumen }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal SK
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataJabatan.tanggalDokumen }}
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
          <iframe v-if="dataJabatan.dokumen !== '' && dataJabatan.dokumen !== null" :src="dataJabatan.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataJabatan: {
      default() {
        return {
          unitOrganisasi: [],
          jabatan: "",
          tugasTambahan: null,
          isPltPlh: 0,
          spmt: "",
          tmt: "",
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