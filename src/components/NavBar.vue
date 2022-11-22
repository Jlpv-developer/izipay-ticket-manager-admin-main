<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand ">
      
      <a
        class="navbar-item is-hidden-desktop "
        @click.prevent="menuToggleMobile"
      >
        <b-icon :icon="menuToggleMobileIcon" />
      </a>
        <!-- <div class="navbar-item has-control no-left-space-touch">
          <div class="control">
            <input class="input" placeholder="Search everywhere..." />
          </div>
        </div> -->
    </div>
    <div class="navbar-brand is-right">
      <a
        class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
        @click.prevent="menuNavBarToggle"
      >
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
      </a>
    </div>
    <div
      class="navbar-menu fadeIn animated faster"
      :class="{ 'is-active': isMenuNavBarActive }"
    >
      <div class="navbar-end">
        <nav-bar-menu class="has-divider has-user-avatar">
          <!-- <user-avatar /> -->
          <div class="is-user-name">
            <p>{{ userName }}</p>
          </div>

          <div slot="dropdown" class="navbar-dropdown">
            <router-link
              to="/profile"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="account" custom-size="default" />
              <span>Mi Perfil</span>
            </router-link>
            <a class="navbar-item" @click="isCardModalActive = true">
              <b-icon icon="lock" custom-size="default"></b-icon>
              <span>Cambiar contraseña</span>
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item" @click="logout">
              <b-icon icon="logout" custom-size="default"></b-icon>
              <span>Cerrar sesión</span>
            </a>
          </div>
        </nav-bar-menu>

        <a
          class="navbar-item is-desktop-icon-only"
          title="Salir"
          @click="logout"
        >
          <b-icon icon="logout" custom-size="default" />
          <span>Cerrar sesión</span>
        </a>
      </div>
    </div>
      <b-modal v-model="isCardModalActive">
        <div class="card">
          <div class="card-content">
            <center>
              <b-field class="modal-title" label="¿Está seguro que quiere hacer check-in?"></b-field>
              <div class="modal-options">
                <b-button
                  class="is-rounded modal-button left"
                  @click="isCardModalActive = false"
                  outlined
                >
                No
                </b-button>
                <b-button
                  class="is-rounded modal-button right"
                  outlined
                >
                Sí, hacer check-in
                </b-button>
              </div>
            </center>
          </div>
        </div>
      </b-modal>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import NavBarMenu from '@/components/NavBarMenu'
import UserAvatar from '@/components/UserAvatar'
import router from '../router'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu
  },
  data () {
    return {
      isMenuNavBarActive: false,
      isCardModalActive: false
    }
  },
  computed: {
    menuNavBarToggleIcon () {
      return this.isMenuNavBarActive ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon () {
      return this.isAsideMobileExpanded ? 'menu' : 'menu'
    },
    ...mapState(['isNavBarVisible', 'isAsideMobileExpanded', 'userName'])
  },
  mounted () {
    this.$router.afterEach(() => {
      this.isMenuNavBarActive = false
    })
  },
  methods: {
    ...mapActions(['formScreenToggle', 'setSesion']),
    menuToggleMobile () {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle () {
      this.isMenuNavBarActive = !this.isMenuNavBarActive
    },
    logout () {
      this.$buefy.snackbar.open({
        message: 'Cerrar sesión',
        queue: false
      })
      this.setSesion(false)
      this.formScreenToggle(true)
      router.push('/login')
    }
  }
}
</script>
<style scoped>

</style>
