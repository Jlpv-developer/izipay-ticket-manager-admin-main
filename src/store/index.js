import Vue from "vue";
import Vuex from "vuex";
import dayjs from "dayjs";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* NavBar */
    isNavBarVisible: true,

    /* FooterBar */
    isFooterBarVisible: true,

    /* Aside */
    isAsideVisible: true,
    isAsideMobileExpanded: false,

    /* AsideFilter */
    isAsideFilter: false,

    /* Login */
    loggedIn: false,

    /* Azure AD DESARROLLO */
    msalConfig: {
      auth: {
        clientId: "0af763b5-3983-45af-ae33-176f8af3f98b",
        authority:
          "https://login.microsoftonline.com/44a78b44-3fba-4ad7-b951-6bbdc7b98cdb",
      },
      cache: {
        cacheLocation: "localStorage",
      },
    },
  },
  mutations: {
    /* A fit-them-all commit */
    basic(state, payload) {
      state[payload.key] = payload.value;
    },

    /* User */
    user(state, payload) {
      if (payload.name) {
        state.userName = payload.name;
      }
      if (payload.email) {
        state.userEmail = payload.email;
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar;
      }
    },

    /* Aside Mobile */
    asideMobileStateToggle(state, payload = null) {
      const htmlClassName = "has-aside-left-mobile-expanded";

      let isShow;

      if (payload !== null) {
        isShow = payload;
      } else {
        isShow = !state.isAsideMobileExpanded;
      }

      if (isShow) {
        document.documentElement.classList.add(htmlClassName);
      } else {
        document.documentElement.classList.remove(htmlClassName);
      }

      state.isAsideMobileExpanded = isShow;
    },
  },
  actions: {
    parseDate({commit},value) {
      var datos = dayjs(value).format("DD-MM-YYYY");
      return datos;
    },
    /* set token */
    setAccessToken({ commit, state }, value) {
      localStorage.setItem("accessToken", value);
    },
    setSesion({ commit, state }, value) {
      commit("basic", { key: "loggedIn", value });
      localStorage.setItem("loggedIn", value);
      console.log(state.loggedIn);
    },
    formScreenToggle({ commit }, value) {
      console.log("dato prueba:", value);
      commit("basic", { key: "isAsideVisible", value });
      commit("basic", { key: "isFooterBarVisible", value });
      commit("basic", { key: "isNavBarVisible", value });
      // Devuelve el documento raiz (<html>) document.documentElement
      document.documentElement.classList[value ? "add" : "remove"](
        "has-navbar-fixed-top"
      );
      document.documentElement.classList[value ? "add" : "remove"](
        "has-aside-left"
      );
    },
    fromScreenToogleRight({ commit }, value) {
      // Movilizacion de todo el sector derecho de opciones
      document.documentElement.classList[value ? "add" : "remove"](
        "has-aside-right"
      );
      document.documentElement.classList[value ? "add" : "remove"](
        "has-aside-right-expanded"
      );
    },
    fromScreenFilter({ commit }, value) {
      commit("basic", { key: "isAsideFilter", value });
    },
   
  },
});
