<!-- eslint-disable no-undef -->
<template>
  <div class="short-brief-wrapper">
    <blob-shape-1 class="blob" style="right: -40%; top: -10%"></blob-shape-1>
    <blob-shape-1 class="blob" style="left: -20%; bottom: -10%"></blob-shape-1>
    <div class="short-brief-data-wrapper">
      <div class="profile-picture-wrapper">
        <img
          class="profile-picture"
          src=""
          alt="Foto Profil"
          v-if="dataShortBrief.foto !== undefined && dataShortBrief.foto !== null && dataShortBrief.foto !== ''"
        />
        <illustration-profile-picture-man
          class="profile-picture"
          v-if="
            (dataShortBrief.foto === undefined || dataShortBrief.foto === null || dataShortBrief.foto === '') &&
            dataShortBrief.jenisKelamin === 'L'
          "
        ></illustration-profile-picture-man>
        <illustration-profile-picture-woman
          class="profile-picture"
          v-else-if="
            (dataShortBrief.foto === undefined || dataShortBrief.foto === null || dataShortBrief.foto === '') &&
            dataShortBrief.jenisKelamin === 'P'
          "
        ></illustration-profile-picture-woman>
      </div>
      <div class="detail-text-wrapper">
        <p class="greeting">
          Hai! Saya {{ dataShortBrief.nama }}
          <icon-four-leaf-clover
            class="icon-four-leaf-clover"
          ></icon-four-leaf-clover>
        </p>
        <p class="short-detail">
          Saya saat ini bekerja di <span>Pemerintah Kabupaten Situbondo</span> dengan jabatan
          <span>{{ dataShortBrief.jabatan }}</span> pada
          <span>{{ dataShortBrief.unitOrganisasi }}</span
          >. Saya sekarang berada di Golongan <span>{{ dataShortBrief.golongan }}</span> dengan Pangkat sebagai <span>{{ dataShortBrief.pangkat }}</span>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import IconFourLeafClover from "../icons/IconFourLeafClover.vue"
import IllustrationProfilePictureMan from "../icons/IllustrationProfilePictureMan.vue"
import IllustrationProfilePictureWoman from "../icons/IllustrationProfilePictureWoman.vue"
import BlobShape1 from "../icons/BlobShape1.vue"
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    IconFourLeafClover,
    IllustrationProfilePictureMan,
    IllustrationProfilePictureWoman,
    BlobShape1
  },
  data() {
    return {
      dataShortBrief: {
        nip: "",
        nama: "",
        jabatan: "",
        golongan: "",
        pangkat: "",
        kodeKomponen: "",
        unitOrganisasi: "",
        jenisKelamin: "",
        foto: "",
      },
    }
  },
  methods: {
    getShortBrief() {
      axios({
        url: `${env.VITE_BACKEND_URL}/data-short-brief/${this.$store.getters.getIdPegawai}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let p = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), p)
        if(data.status === 1) {
          this.dataShortBrief = data.message[0]
        } else {
          localStorage.clear()
          this.$router.push({
            name: "login"
          })
        }
      }).catch(() => {
        console.log("error")
      })
    }
  },
  created() {
    this.getShortBrief()
  }
}
</script>

<style lang="less" scoped>
.blob {
  position: absolute;
  z-index: 0;
}
.short-detail {
  font-size: 16px;
  span {
    font-weight: 600;
  }
}
.icon-four-leaf-clover {
  box-sizing: border-box;
  position: absolute;
  margin-left: 4px;
  margin-top: 2px;
}
.greeting {
  font-weight: 700;
  font-size: 16px;
  position: relative;
}
.short-brief-wrapper {
  height: 100%;
  max-width: 400px;
  min-width: 280px;
  border-radius: 8px;
  background-color: rgba(239, 245, 245, 0.3);
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}
.short-brief-data-wrapper {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 40px 20px;
  z-index: 2;
  overflow: hidden;
  position: relative;
  .profile-picture-wrapper {
    // filter: blur(4px);
    backdrop-filter: blur(8px);
    margin: auto;
    border-radius: 100%;
    border: 4px solid #477b79;
    height: 100%;
    max-height: 240px;
    width: 100%;
    max-width: 240px;
    position: relative;
    margin-bottom: 40px;
    &::after {
      content: "";
      width: 16px;
      height: 16px;
      position: absolute;
      background-color: #477b79;
      border-radius: 100%;
      left: 50%;
      transform: translateX(-50%);
      top: -10px;
    }
    .profile-picture {
      width: 100%;
      height: auto;
      max-width: 220px;
      max-height: 220px;
      border-radius: 100%;
      margin: auto;
      display: block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
    }
  }
}

@media screen and (max-width: 1200px) and (min-width: 601px) {
  .short-brief-wrapper {
    max-width: 100%;
    height: 100%;
    max-height: 240px;
  }
  .short-brief-data-wrapper {
    display: flex;
    padding: 20px 20px;
    .profile-picture-wrapper {
      min-width: 180px;
      min-height: 180px;
      max-width: 180px;
      max-height: 180px;
      padding: 4px;
    }
    .detail-text-wrapper {
      height: fit-content;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      padding: 0px 20px;
      max-height: 200px;
      overflow-y: auto;
      scrollbar-width: thin;
    }
  }
}
@media screen and (max-width: 600px) {
  .short-brief-wrapper {
    max-width: 100%;
  }
}
</style>
