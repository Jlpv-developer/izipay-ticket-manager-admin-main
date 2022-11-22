<template>
  <div>
    <section class="section is-main-section">
      <title-bar :title-stack="titleStack" />
      <hero-bar>
        Notificaciones
        <router-link slot="right" to="/" class="button">
          Notificaciones
        </router-link>
      </hero-bar>
      <br>
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Pedidos"
        icon="car"
      >
        <clients-table-sample
          :data-url="`${$router.options.base}data-sources/clients.json`"
          :checkable="false"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import ClientsTableSample from '@/components/ClientsTableSample'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import { mapActions } from 'vuex'
export default {
  name: 'Pedidos',
  components: {
    HeroBar,
    TitleBar,
    ClientsTableSample,
    CardComponent
  },
  computed: {
    titleStack () {
      return ['Honda / Configuración', 'Notificaciones']
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
