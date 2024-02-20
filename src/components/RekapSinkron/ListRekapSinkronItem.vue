<template>
  <div class="col-12 col-sm-6 outer">
    <div class="row">
      <div class="col-12" style="border-bottom: 1px solid #dee2e6;">
        <p class="text-primary text-center" style="font-weight: 600;">{{ dataPegawai.nip }}</p>
      </div>
      <div class="col-12 col-md-6" v-for="(itemOuter, idxInner) in listRekap" :key="idxInner">
        <div class="row" v-for="(itemInner, idxInner) in itemOuter" :key="idxInner" style="border-bottom: 1px solid #dee2e6;">
          <div class="col-9"><p class="scrolled">{{ itemInner.nama }}</p></div>
          <div class="col-3">
            <i v-if="dataPegawai[itemInner.content] === null" class="fa-solid fa-circle-xmark text-danger"></i>
            <i v-else class="fa-solid fa-circle-check text-primary"></i>
          </div>
        </div>
      </div>
      <div class="col-12">
        <button :disabled="!btnSyncActive" class="btn btn-sm btn-block my-btn-primary" @click="$emit('onSync')">Sinkron</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btnSyncActive: {
      default: false,
      type: Boolean,
      required: true
    },
    dataPegawai: {
      default: () => {
        return {
          nip: "",
          idDataPribadi: null,
          idDataCpnsPns: null,
          idDataPendidikan: null,
          idDataPangkat: null,
          idDataJabatan: null,
        }
      },
      type: Object,
      required: true
    }
  },
  data() {
    return {
      listRekap: [
        [
          {nama: "Data Pribadi", content: "idDataPribadi"},
          {nama: "Data CPNS/PNS", content: "idDataCpnsPns"}
        ],
        [
          {nama: "Data Pendidikan", content: "idDataPendidikan"},
          {nama: "Data Pangkat", content: "idDataPangkat"},
        ],
        [
          {nama: "Data Jabatan", content: "idDataJabatan"},
        ]
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.btn:disabled {
  cursor: not-allowed;
}
div {
  font-size: 0.9rem;
  p {
    margin-bottom: 0;
  }
}
.row {
  box-sizing: border-box;
  padding: 0px 10px;
}
.outer {
  padding: 4px 8px;
  box-sizing: border-box;
}
.scrolled {
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
  height: 100%;
}
.item {
  font-size: 14px !important;
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