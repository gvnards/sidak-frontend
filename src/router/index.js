import Vue from "vue"
import VueRouter from "vue-router"
import ViewLogin from "../views/LoginView.vue"
import ViewSidak from "../views/SidakView.vue"
import ViewDashboard from "../views/DashboardView.vue"
import ViewPegawai from "../views/PegawaiView.vue"
import ViewUsulan from "../views/UsulanView.vue"
import ViewJabatan from "../views/JabatanView.vue"
import ViewUnitOrganisasi from "../views/UnitOrganisasiView.vue"
import ViewUbahPassword from "../views/UbahPasswordView.vue"
import ViewAkunPengguna from "../views/AkunPenggunaView.vue"
import ViewRekapSinkron from "../views/RekapSinkronView.vue"
import axios from "axios"
import store from "./../store/index"
const env = import.meta.env

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    {
      path: "/",
      name: "login",
      component: ViewLogin,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") !== null && localStorage.getItem("token") !== "") {
          axios({
            url: `${env.VITE_BACKEND_URL}/auth`,
            method: "POST",
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            let p = store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
            let data = store.getters.getDecrypt(JSON.stringify(res.data), p)
            if (data.status === 1) {
              next(
                {
                  name: "sidak"
                }
              )
            } else {
              next()
            }
          }).catch(() => {
            localStorage.clear()
            next()
          })
        }
        else {
          next()
        }
      }
    },
    {
      path: "/sidak",
      name: "sidak",
      component: ViewSidak,
      redirect: {
        name: "pegawai"
      },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: ViewDashboard,
        },
        {
          path: "pegawai",
          name: "pegawai",
          component: ViewPegawai,
        },
        {
          path: "usulan",
          name: "usulan",
          component: ViewUsulan,
        },
        {
          path: "jabatan",
          name: "jabatan",
          component: ViewJabatan,
        },
        {
          path: "unitorganisasi",
          name: "unit organisasi",
          component: ViewUnitOrganisasi,
        },
        {
          path: "ubahpassword",
          name: "ubah password",
          component: ViewUbahPassword
        },
        {
          path: "akunpengguna",
          name: "akun pengguna",
          component: ViewAkunPengguna
        },
        {
          path: "rekapsinkron",
          name: "rekap sinkron",
          component: ViewRekapSinkron
        },
      ],
    },
    // {
      // path: "/about",
      // name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/AboutView.vue"),
    // },
  ],
})

export default router
