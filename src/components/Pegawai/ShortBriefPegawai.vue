<!-- eslint-disable no-undef -->
<template>
  <div class="short-brief-wrapper">
    <div class="short-brief-data-wrapper">
      <div class="profile-picture-wrapper" @click="changePicture()" data-toggle="modal" data-target="#modal" data-backdrop="static" data-keyboard="false">
        <img
          class="profile-picture"
          :src="dataShortBrief.foto"
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
        <div v-if="isLoaded" style="margin-top: 20px; margin-bottom: 14px;" class="text-center">
          <div class="btn btn-sm btn-block my-btn-outline-primary">{{ parseInt(roleUser.idAppRoleUser) === 1 ? 'Lihat/Ubah Foto' : 'Lihat Foto' }}</div>
        </div>
      </div>
      <br>
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
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    IconFourLeafClover,
    IllustrationProfilePictureMan,
    IllustrationProfilePictureWoman
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
      isLoaded: false,
    }
  },
  methods: {
    changePicture() {
      $("#modal-picture").click()
      this.$store.commit("onModalMethod", "UPDATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "ProfilePicture")
      this.$store.commit("onModalData", {
        foto: this.dataShortBrief.foto,
        jenisKelamin: this.dataShortBrief.jenisKelamin,
        nip: this.dataShortBrief.nip,
        idAppRoleUser: this.roleUser.idAppRoleUser
      })
    },
    getShortBrief() {
      this.isLoaded = false
      axios({
        url: `${env.VITE_BACKEND_URL}/data-short-brief/${this.$store.getters.getIdPegawai}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = res.data
        if(parseInt(data.status) === 2) {
          this.dataShortBrief = data.message[0]
          this.isLoaded = true
        }
      }).catch(() => {
        localStorage.clear()
        this.$router.push({
          name: "login"
        })
      })
    },
  },
  computed: {
    roleUser() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      return {
        idAppRoleUser: u.idAppRoleUser,
        appRoleUser: u.appRoleUser
      }
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
  &::after {
    background-image: url('./../icons/BlobShape1.svg');
    // background-repeat: space right;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  height: 100%;
  min-height: 400px;
  max-width: 400px;
  min-width: 280px;
  border-radius: 8px;
  background-color: rgba(239, 245, 245, 0.3);
  overflow: hidden;
  overflow-y: auto;
  // padding-bottom: 80px;
  box-sizing: border-box;
  position: relative;
}
.short-brief-data-wrapper {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 40px 20px;
  z-index: 2;
  // overflow: hidden;
  position: relative;
  .profile-picture-wrapper {
    // filter: blur(4px);
    backdrop-filter: blur(8px);
    // overflow: hidden;
    margin: auto;
    border-radius: 100%;
    border: 4px solid #477b79;
    height: 100%;
    max-height: 240px;
    width: 100%;
    max-width: 240px;
    position: relative;
    margin-bottom: 40px;
    padding: 4px;
    &:hover::after {
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      border-radius: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0,0,0,0.25);
      z-index: 4;
      content: '\f030';
      font-family: FontAwesome;
      font-weight: normal;
      font-style: normal;
      text-align: center;
      font-size: 32px;
      line-height: 3rem;
      color: rgba(255,255,255,0.75);
      padding-top: calc(50% - 30px);
      cursor: pointer;
      // margin:0px 0px 0px 10px;
      // text-decoration:none;
    }
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      position: absolute;
      background-color: #477b79;
      border: 3px solid white;
      border-radius: 100%;
      left: 80%;
      bottom: 7.5%;
      z-index: 4;
    }
    .profile-picture {
      width: 100%;
      height: auto;
      width: 100%;
      height: 100%;
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
    min-height: auto;
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
