<template>
  <div>
    <section class="section is-main-section">
      <title-bar :title-stack="titleStack" />
      <hero-bar>
        Usuarios
        <router-link slot="right" to="/" class="button">
          Usuarios
        </router-link>
      </hero-bar>
      <br>
        <usuarios-table-sample
          :data-url="`${$router.options.base}data-sources/usuarios.json`"
          :checkable="false"
        />
    </section>
  </div>
</template>

<script>
import UsuariosTableSample from '@/components/UsuariosTableSample'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import { mapActions } from 'vuex'
export default {
  name: 'Usuarios',
  components: {
    HeroBar,
    TitleBar,
    UsuariosTableSample
  },
  computed: {
    titleStack () {
      return ['Honda / Configuración', 'Usuarios']
    }
  },
  methods: {
    ...mapActions(['fromScreenToogleRight'])
  },
  created () {
    this.fromScreenToogleRight(false)
  }
}
</script>
