<template>
  <div style="width: 100%; padding: 40px; overflow-y: auto;">
    <!-- <div class="text-center" style="position: relative; top: 50%; transform: translateY(calc(-50% - 40px));">
      <illustration-coming-soon style="max-width: 200px; max-height: 200px;" />
      <h1 class="text-primary">COMING SOON</h1>
      <h6 class="text-secondary">Ditunggu yaa masih dalam tahap pengembangan</h6>
    </div> -->
    <div class="row">
      <div class="col-6 col-md-3" v-for="(item, index) in blockData" :key="index">
        <BlockItem :topText="item.topText" :bottomText="item.bottomText" />
      </div>
    </div>
    <div style="height: 24px;"></div>
    <RekapPegawai />
    <div class="row">
      <div class="col-12 col-sm-6">
        <div style="height: 24px;"></div>
        <PegawaiUltah />
      </div>
      <div class="col-12 col-sm-6">
        <div style="height: 24px;"></div>
        <PegawaiAkanPensiun />
      </div>
    </div>
  </div>
</template>

<script>
import BlockItem from "../components/Dashboard/BlockItem.vue"
import RekapPegawai from "../components/Dashboard/RekapPegawai.vue"
import PegawaiUltah from "../components/Dashboard/PegawaiUltah.vue"
import PegawaiAkanPensiun from "../components/Dashboard/PegawaiAkanPensiun.vue"
export default {
  components: {
    BlockItem,
    RekapPegawai,
    PegawaiUltah,
    PegawaiAkanPensiun
  },
  data() {
    return {
      blockData: [
        {topText: "Pegawai", bottomText: 0},
        {topText: "Struktural", bottomText: 0},
        {topText: "JFT", bottomText: 0},
        {topText: "JFU", bottomText: 0},
        {topText: "Laki-laki", bottomText: 0},
        {topText: "Perempuan", bottomText: 0},
      ]
    }
  }
}
</script>
