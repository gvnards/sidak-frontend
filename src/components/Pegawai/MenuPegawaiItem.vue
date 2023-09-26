<template>
  <div
    class="menu-pegawai-item-wrapper"
    :style="`${dataMenuPegawaiItem.active == '' ? 'cursor: pointer;' : ''}`"
  >
    <div class="menu-pegawai-item-top">
      <div class="illustration-wrapper">
        <!-- Illustration -->
        <!-- // component illustration nya bisa dilihat di /src/main.js -->
        <runtime-template-compiler
          :class="`${
            dataMenuPegawaiItem.active == dataMenuPegawaiItem.data.id
              ? 'illustration-active'
              : 'illustration-inactive'
          }`"
          :template="`<${dataMenuPegawaiItem.data.illustration} />`"
        ></runtime-template-compiler>
        <!-- End of Illustration -->
      </div>
      <div class="active-content" v-if="dataMenuPegawaiItem.active != ''">
        <div class="header">
          <div class="icon-back" @click="$emit('menuPegawaiItemBack')">
            <i class="fa-solid fa-chevron-left"></i>
          </div>
          <h1 class="header-text">{{ dataMenuPegawaiItem.data.nama }}</h1>
        </div>
        <div class="content">
          <!-- <slot name="content"></slot> -->
          <DataCpnsPns v-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataCpnsPns'" />
          <DataDiklatKursus v-else-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataDiklatKursus'" />
          <DataHukumanDisiplin v-else-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataHukumanDisiplin'" />
          <DataKeluarga v-else-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataKeluarga'" />
          <DataPangkatGolongan v-else-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataPangkatGolongan'" />
          <DataPendidikan v-else-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataPendidikan'" />
          <DataPribadi v-else-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataPribadi'" />
          <DataSkp v-else-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataSkp'" />
          <DataJabatanUnitKerja v-else-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataJabatanUnitKerja'" />
          <DataStatusKepegawaian v-else-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataStatusKepegawaian'" />
          <DataPenghargaan v-else-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataPenghargaan'" />
          <DataAngkaKredit v-else-if="dataMenuPegawaiItem.data.illustration.split('Illustration')[1] === 'DataAngkaKredit'" />
        </div>
      </div>
      <div
        class="text-wrapper"
        v-if="dataMenuPegawaiItem.active != dataMenuPegawaiItem.data.id"
      >
        <p class="text-center">
          {{ dataMenuPegawaiItem.data.nama }}
        </p>
      </div>
    </div>
    <div
      class="menu-pegawai-item-bottom my-btn-primary text-center"
      v-if="dataMenuPegawaiItem.active == ''"
    >
      <div>
        <span>Lihat Detail Data</span><i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import DataCpnsPns from "./Content/DataCpnsPns.vue"
import DataDiklatKursus from "./Content/DataDiklatKursus.vue"
import DataHukumanDisiplin from "./Content/DataHukumanDisiplin.vue"
import DataKeluarga from "./Content/DataKeluarga.vue"
import DataPangkatGolongan from "./Content/DataPangkatGolongan.vue"
import DataPendidikan from "./Content/DataPendidikan.vue"
import DataPribadi from "./Content/DataPribadi.vue"
import DataSkp from "./Content/DataSkp.vue"
import DataJabatanUnitKerja from "./Content/DataJabatanUnitKerja.vue"
import DataStatusKepegawaian from "./Content/DataStatusKepegawaian.vue"
import DataPenghargaan from "./Content/DataPenghargaan.vue"
import DataAngkaKredit from "./Content/DataAngkaKredit.vue"
export default {
  components: {
    DataCpnsPns,
    DataDiklatKursus,
    DataHukumanDisiplin,
    DataKeluarga,
    DataPangkatGolongan,
    DataPendidikan,
    DataPribadi,
    DataSkp,
    DataJabatanUnitKerja,
    DataStatusKepegawaian,
    DataPenghargaan,
    DataAngkaKredit
  },
  props: {
    dataMenuPegawaiItem: {
      type: Object,
      default: Object,
      required: true
    }
  },
}
</script>

<style lang="less" scoped>
.active-content {
  height: 100%;
  max-height: 100%;
  .header {
    height: 62px;
    border-bottom: 1px solid #869e9e;
    box-sizing: border-box;
    padding-top: 16px;
    position: relative;
    overflow: hidden;
    text-transform: uppercase;
    margin-bottom: 20px;
    .icon-back {
      color: #477b79;
      position: absolute;
      left: 0px;
      top: 6px;
      font-size: 22px;
      padding: 10px;
      cursor: pointer;
      &:hover {
        color: #284f4d;
      }
      &:active {
        color: #1f403f;
      }
    }
    .header-text {
      margin: 0;
      padding: 0px 40px;
      width: 100%;
      color: #477b79;
      font-weight: 700;
      font-size: 22px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .content {
    height: 100%;
    max-height: calc(100% - 82px);
    overflow-y: auto;
    scrollbar-width: thin;
  }
  .footer {
    height: 100%;
    max-height: 40px;
    border-radius: 0px 0px 8px 8px;
    position: relative;
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-transform: uppercase;
    }
  }
}
.illustration-active {
  width: 90%;
  height: 90%;
  opacity: 0.075;
}
.illustration-inactive {
  width: 100%;
  height: 80px;
}
.menu-pegawai-item-wrapper {
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.1);
  margin-bottom: 40px;
  margin: 0px 20px 40px 20px;
  overflow: hidden;
  transition: all 0.4s;
  &.clicked {
    margin: 0;
    &:hover {
      transform: none;
      box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.1);
    }
    .menu-pegawai-item-top {
      max-height: 100%;
      .illustration-wrapper {
        max-height: 100%;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
    }
  }
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.25);
  }
  .menu-pegawai-item-top {
    height: 100%;
    max-height: 160px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    .illustration-wrapper {
      position: relative;
      max-height: 80px;
      height: 100%;
      overflow: hidden;
    }
    .text-wrapper {
      max-height: 60px;
      height: 100%;
      position: relative;
      text-transform: uppercase;
      p {
        padding: 0px;
        margin: 0px;
        font-weight: 600;
        font-size: 14px;
        color: #477b79;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
      }
    }
  }
  .menu-pegawai-item-bottom {
    height: 100%;
    max-height: 40px;
    width: 100%;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    position: relative;
    div {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .fa-arrow-right {
    margin-left: 6px;
  }
}
@media only screen and (max-width: 560px) {
  .menu-pegawai-item-wrapper {
    margin: 0px 10px 40px 10px;
  }
  .menu-pegawai-item-wrapper {
    max-width: 160px;
    max-height: 200px;
  }
  .text-wrapper {
    p {
      font-size: 12px !important;
    }
  }
}
</style>