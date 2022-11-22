<template>
  <div id="app">
    <aside-menu :menu="menu" class="menu-style" />
    <!-- <sidebar-menu :menu="menu" class="e-sidebar"  /> -->
    <!-- <VueSidebarMenuAkahon  class="e-sidebar " /> -->
    <!-- <sidebar-menu
      class="e-sidebar"
      :menu="menu"
      :collapsed="collapsed"
      @item-click="onItemClick"
      @collapse="onCollapse"
    /> -->

    <router-view />
    <!-- <nav-bar /> -->
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import AsideMenu from "@/components/AsideMenu";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import VueSidebarMenuAkahon from "@/components/Sidebar-menu-akahon";
export default {
  name: "Home",
  components: {
    AsideMenu,
    NavBar,
    VueSidebarMenuAkahon,
    SidebarMenu,
  },

  data() {
    return {
      userName: "",
      userData: [],
      set: false,
      menuTitle: "Prueba",
    };
  },
  computed: {
    menu() {
      return [
        [
          {
            label: "Tareas",
            subLabel: "Submenus Example",
            icon: "pencil-box-outline",
            menu: [
              {
                to: "/",
                label: "Masivo",
                icon: "clipboard-text-outline",
              },
              {
                to: "Corporative",
                label: "Corporativo",
                icon: "clipboard-text-outline",
              },
            ],
          },
          {
            to: "Incidents",
            icon: "email",
            label: "Buzón",
            updateMark: false,
          },
          {
            to: "Home",
            icon: "chart-bar",
            label: "Reportes",
            updateMark: false,
          },

          {
            to: "Managment",
            icon: "folder",
            label: "Gestión",
            updateMark: false,
          },
          // {
          // 	label: "Configuración",
          // 	subLabel: "Submenus Example",
          // 	icon: "cogs",
          // 	updateMark: false,
          // 	// menu: [
          // 	//   {
          // 	//     to: 'usuarios',
          // 	//     label: 'Usuarios',
          // 	//     icon: 'account-outline'
          // 	//   },
          // 	//   {
          // 	//     to: 'notificaciones',
          // 	//     label: 'Notificaciones',
          // 	//     icon: 'bell-outline'
          // 	//   }
          // 	// ]
          // },
          // {
          //   to: '/',
          //   label: 'Bandeja de tareas',
          //   subLabel: 'Submenus Example',
          //   icon: 'file-document-outline',
          //   menu: [
          //     {
          //       to: '/tables',
          //       label: 'Abiertas',
          //       icon: 'clipboard-text-outline',
          //       updateMark: false
          //     },
          //     {
          //       to: '/tables',
          //       label: 'Cerradas',
          //       icon: 'clipboard-text-outline',
          //       updateMark: false
          //     }
          //   ]
          // },
          // {
          //   to: '/pedidos',
          //   label: 'Pedidos',
          //   icon: 'square-edit-outline',
          //   updateMark: false
          // },
          // {
          //   to: '/tracking',
          //   label: 'Tracking',
          //   icon: 'send-outline'
          // },
          // {
          //   to: '/checkin',
          //   label: 'Check-in',
          //   icon: 'plus-box-multiple-outline'
          // },
        ],
      ];
    },
  },
  created() {
    this.getUserInLocalStorage();
    this.$store.commit("user", {
      name: this.userName,
      email: this.userEmail,
      avatar: "",
    });
  },
  methods: {
    getUserInLocalStorage() {
      this.myUser = localStorage.getItem("myUser");
      this.userData = JSON.parse(this.myUser);
      this.userName = this.userData.userName;
      this.userEmail = this.userData.userEmail;
      //  console.log("User name got it: ", this.userData.userName);
    },
  },
};
</script>
