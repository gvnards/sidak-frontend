<template>
  <div id="list-pegawai-item-wrapper">
    <div class="foto-wrapper" v-if="true">
      <IllustrationProfilePictureMan class="foto" />
    </div>
    <div class="foto-wrapper" v-else>
      <IllustrationProfilePictureWoman class="foto" />
    </div>
    <div style="height: 8px;"></div>
    <h6 :title="pegawai.nama" class="text-primary text-center" style="margin: 0;">{{ pegawai.nama }}</h6>
    <p class="text-center" style="font-size: 12px; padding: 0; margin: 0;">{{ pegawai.nip }}</p>
    <div class="bottom-wrapper">
      <p class="text-center" style="font-size: 12px; padding: 0; margin: 0;">Jabatan</p>
      <p class="text-center text-primary" style="font-size: 12px; padding: 0; margin: 0; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" :title="pegawai.jabatan">{{ pegawai.jabatan }}</p>
      <p class="text-center" style="font-size: 12px; padding: 0; margin: 0;">Unit Organisasi</p>
      <p class="text-center text-primary" style="font-size: 12px; padding: 0; margin: 0; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" :title="pegawai.unitOrganisasi">{{ pegawai.unitOrganisasi }}</p>
      <p class="text-center" style="font-size: 12px; padding: 0; margin: 0;">Golongan/Pangkat</p>
      <p class="text-center text-primary" style="font-size: 12px; padding: 0; margin: 0; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" :title="`${pegawai.golongan} (${pegawai.pangkat})`">{{ pegawai.golongan }} ({{ pegawai.pangkat }})</p>
    </div>
  </div>
</template>

<script>
import IllustrationProfilePictureMan from "../../icons/IllustrationProfilePictureMan.vue"
import IllustrationProfilePictureWoman from "../../icons/IllustrationProfilePictureWoman.vue"
export default {
  components: {
    IllustrationProfilePictureMan,
    IllustrationProfilePictureWoman
  },
  props: {
    pegawai: {
      default() {
        return {}
      },
      type: Object,
    }
  }
}
</script>

<style lang="less" scoped>
#list-pegawai-item-wrapper {
  cursor: pointer;
  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 270px;
  max-width: 200px;
  max-height: 270px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  border-radius: 12px;
  box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.1);
  overflow: hidden;
  transition: all 0.4s;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.25);
  }
  .foto-wrapper {
    max-width: 60px;
    max-height: 60px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 100%;
    overflow: hidden;
    .foto {
      width: 100%;
      height: 100%;
    }
  }
  h6 {
    font-weight: 600;
    height: 100%;
    max-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bottom-wrapper {
    min-height: 70px;
    margin-top: 10px;
    background-color: rgba(239, 245, 245, 1);
    border-radius: 6px;
    padding: 4px 8px;
    box-sizing: border-box;
  }
}
@media screen and (max-width: 460px) {
  #list-pegawai-item-wrapper {
    min-width: 160px;
    max-width: 160px;
  }
}
</style>