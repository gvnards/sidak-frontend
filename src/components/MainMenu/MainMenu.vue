<template>
  <div id="menubar" :class="getWindowWidth <= 780 ? 'menu-mobile-wrapper' : 'menu-web-wrapper'">
    <div v-if="getWindowWidth <= 780" class="menu-mobile">
      <div class="menu-mobile-drawer" :class="menuMobileDrawer ? 'active' : ''">
        <div class="menu-mobile-drawer-item" :class="menuActive === menu.id ? 'active' : ''" v-for="menu in mainMenu.filter(item => item.nama !== 'Logout' && item.nama !== 'Pegawai' && item.nama !== 'Usulan')" :key="menu.id" @click="onActiveMenu(menu)" :style="menuActive === menu.id ? 'border-bottom: 2px solid white;' : ''">
            <span style="position: relative;"><i style="font-size: 24px;" :class="menu.icon"></i></span>
            <div style="font-size: 12px; font-weight: 600;">
              {{ menu.nama }}
            </div>
        </div>
        <div class="menu-mobile-drawer-item" :class="menuActive === menu.id ? 'active' : ''" v-for="menu in mainMenu.filter(item => item.nama === 'Logout')" :key="menu.id" @click="logout()">
            <span style="position: relative;"><i style="font-size: 24px;" :class="menu.icon"></i></span>
            <div style="font-size: 12px; font-weight: 600;">
              {{ menu.nama }}
            </div>
        </div>
      </div>
      <div class="menu-mobile-item text-center" :class="menuActive === menu.id ? 'active' : ''" v-for="menu in mainMenu.filter(item => item.nama === 'Pegawai')" :key="menu.id" @click="onActiveMenu(menu)">
        <span style="position: relative;"><i style="font-size: 24px;" :class="menu.icon"></i></span>
        <div style="font-size: 12px; font-weight: 600;">
          {{ menu.nama }}
        </div>
      </div>
      <div class="app-icon" style="cursor: pointer;" @click="onMenuMobileDrawer()">
        <AppIcon style="max-width: 26px; max-height: 26px;" />
      </div>
      <div class="menu-mobile-item text-center" :class="menuActive === menu.id ? 'active' : ''" v-for="menu in mainMenu.filter(item => item.nama === 'Usulan')" :key="menu.id" @click="onActiveMenu(menu)">
          <span style="position: relative;"><i style="font-size: 24px;" :class="menu.icon"></i></span>
          <div style="font-size: 12px; font-weight: 600;">
            {{ menu.nama }}
          </div>
      </div>
    </div>
    <div v-else class="menu-web">
      <div class="logo-wrapper">
        <AppLogo class="logo"></AppLogo>
      </div>
      <p class="main-menu">Main Menu</p>
      <div class="main-menu-wrapper">
        <div
          class="main-menu-item-wrapper"
          v-for="menu in mainMenu.slice(0, mainMenu.length-1)"
          :key="menu.id"
          @click="onActiveMenu(menu)"
        >
          <main-menu-item
            :menu="menu"
            :active="menuActive === menu.id"
          ></main-menu-item>
        </div>
      </div>
      <div class="tutorial-wrapper">
        <div class="text-center">
          <illustration-to-do-list class="tutorial-icon"></illustration-to-do-list>
        </div>
        <p class="text-center text-black">
          Ada yang masih bingung ? Coba fitur tutorial ini sekarang !
        </p>
        <div class="btn btn-sm my-btn-primary btn-block">Coba Sekarang !</div>
      </div>
      <div style="height: 20px;"></div>
      <div @click="logout()">
        <main-menu-item
          :menu="mainMenu[mainMenu.length-1]"
          :active="false"
        ></main-menu-item>
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from "../icons/AppIcon.vue"
import AppLogo from "../icons/AppLogo.vue"
import MainMenuItem from "./MainMenuItem.vue"
import IllustrationToDoList from "../icons/IllustrationToDoList.vue"
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    MainMenuItem,
    AppLogo,
    IllustrationToDoList,
    AppIcon
  },
  computed: {
    getWindowWidth() {
      return this.$store.getters.getWindowWidth
    },
  },
  data() {
    return {
      menuActive: 0,
      mainMenu: [],
      menuMobileDrawer: false,
    }
  },
  methods: {
    onMenuMobileDrawer() {
      this.menuMobileDrawer = !this.menuMobileDrawer
    },
    getMainMenu() {
      axios({
        url: `${env.VITE_BACKEND_URL}/main-menu`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let p = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), p)
        if(data.status === 1) {
          this.mainMenu = data.message
          this.isMenuActive()
        } else {
          localStorage.clear()
          this.$router.push({
            name: "login"
          })
        }
      }).catch(() => {
        console.log("error")
      })
    },
    logout() {
      localStorage.clear()
      this.$router.push({
        name: "login"
      })
    },
    onActiveMenu(menu) {
      this.menuMobileDrawer = false
      this.menuActive = menu.id
      let menuText = menu.nama.toLowerCase()
      this.$router.push({
        name: menuText,
      })
    },
    isMenuActive() {
      let menu = this.mainMenu.filter((e) => e.nama.toLowerCase() === this.$route.name)
      this.menuActive = menu[0].id
    }
  },
  created() {
    this.getMainMenu()
  }
}
</script>

<style lang="less" scoped>
.app-icon {
  border-radius: 100%;
  background-color: #477B79;
  box-shadow: 0px 0px 0px 6px white;
  width: max-content;
  height: max-content;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
  top: -12px;
  z-index: 2;
}
.menu-mobile-drawer {
  position: absolute;
  top: 100%;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 170px;
  background-color: rgba(11,10,15,0);
  box-sizing: border-box;
  padding: 10px 40px;
  transition: all 0.4s;
  &.active {
    top: -90px;
    background-color: rgba(11,10,15,0.6);
    .menu-mobile-drawer-item {
      transition: all 0.4s;
      transition-delay: 0.4s;
      opacity: 1;
    }
  }
  .menu-mobile-drawer-item {
    width: fit-content;
    height: fit-content;
    color: white;
    position: relative;
    cursor: pointer;
    margin: 0px 20px;
    text-align: center;
    opacity: 0;
  }
}
#menubar {
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
  &.menu-web-wrapper {
    min-height: 100vh;
    border-right: 1px solid #e0e0e2;
    min-width: 200px;
    max-width: 218px;
    padding: 20px 10px 20px 10px;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 100vh;
  }
  &.menu-mobile-wrapper {
    background-color: #477B79;
    box-shadow: 0px -4px 12px 0px #e0e0e2;
    position: fixed;
    bottom: 0;
    height: 100%;
    max-height: 60px;
    max-width: 100vw;
    overflow-y: visible;
    .menu-mobile {
      .menu-mobile-item {
        position: relative;
        box-sizing: border-box;
        padding: 6px 20px;
        cursor: pointer;
        color: white;
        background-color: #477B79;
        transition: all 0.4s;
        border-radius: 100% 100% 0px 0px;
        top: 0px;
        &.active {
          padding: 12px 20px;
          top: -12px;
        }
        &:hover {
          padding: 12px 20px;
          top: -12px;
        }
      }
    }
  }
}

.menu-mobile {
  display: flex;
  justify-content: space-around;
}
.logo-wrapper {
  height: 100%;
  max-height: 80px;
  max-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.main-menu {
  margin-bottom: 10px;
  font-size: 10px;
  font-weight: 600;
  color: #477b79;
}
.main-menu-wrapper {
  max-height: 220px;
  overflow: hidden;
  overflow-y: auto;
  scrollbar-width: none;
}
.tutorial-wrapper {
  width: 100%;
  max-width: 180px;
  height: 100%;
  max-height: 250px;
  margin-top: 20px;
  border-radius: 14px;
  background-color: #eff5f5;
  padding: 20px 12px;
  p {
    font-weight: 500;
    font-size: 12px;
    margin-top: 20px;
  }
}
.btn {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
