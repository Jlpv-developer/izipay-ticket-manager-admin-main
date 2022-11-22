<template>
  <aside v-show="modalViewUserTable" class="aside-right is-placed-right is-expanded">
    <b-button
      class="aside-icon-close"
      size="is-small"
      outlined
      icon-right="close"
      @click="closeModalViewUser"
    />
    <div v-if="dataUser" class="container">
        <h5 class="title is-6">Detalle de usuario</h5>
        <hr>
        <div class="label-text"><b>Nombre:</b><span> {{dataUser.name}}</span></div>
        <div class="label-text"><b>Estado:</b><span> {{dataUser.state}}</span></div>
        <div class="label-text"><b>Perfil:</b><span> {{dataUser.profile}}</span></div>
        <div class="label-text"><b>Celular:</b><span> 999 999 999</span></div>
        <div class="label-text"><b>Correo electrónico:</b><span> {{dataUser.email}}</span></div>
        <div class="label-text"><b>Empresa:</b><span> Empresa</span></div>
        <div class="label-text"><b>Puesto:</b><span> Puesto</span></div>
    </div>
    <div v-else class="content has-text-grey has-text-centered">
      <template>
        <p>
          <b-icon icon="dots-horizontal" size="is-large" />
        </p>
        <p>Cargando datos...</p>
      </template>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AsideMenu',
  components: {
  },
  data () {
    return {
      modalViewUserTable: true
    }
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    isModalViewUserTable: Boolean,
    dataUser: Object
  },
  computed: {
    ...mapState(['isAsideVisible'])
  },
  methods: {
    ...mapActions(['fromScreenToogleRight']),
    menuClick (item) {
      console.log('submenu')
    },
    closeModalViewUser () {
      this.fromScreenToogleRight(false)
    }
  }
}
</script>

<style scoped>
  .aside-icon-close {
      margin-inline-start: 12.5rem;
      border-color: rgba(0, 0, 0, 0)!important;
  }

  .container{
      margin: 0 0 0 .5rem;
  }
  .label-text{
      margin: .5rem 0 .5rem 0;
  }

  /* Dimensiones de pantalla Responsive */
  @media only screen and  (min-width: 1389px) {
    .aside-right{
      position: absolute;
      height: 700px;
    }
  }

  @media (min-width: 1239px) and (max-width: 1388px)  {
    .aside-right{
      position: absolute;
      height: 700px;
    }
  }

  @media (min-width: 1177px) and (max-width: 1239px)  {
    .aside-right{
      position: absolute;
      height: 700px;
    }
  }

  @media (min-width: 1024px) and (max-width: 1176px) {
    .aside-right{
      position: absolute;
      height: 880px;
    }
  }

  @media (min-width: 984px)  and (max-width: 1023px) {
    .aside-right{
      position: absolute;
      height: 705px;
    }
  }

  @media (min-width: 915px)  and (max-width: 983px) {
    .aside-right{
      position: absolute;
      height: 701px;
    }
  }

  @media (min-width: 906px)  and (max-width: 914px) {
    .aside-right{
      position: absolute;
      height: 755px;
    }
  }

  @media (min-width: 899px)  and (max-width: 905px) {
    .aside-right{
      position: absolute;
      height: 774px;
    }
  }

  @media (min-width: 768px)  and (max-width: 898px) {
    .aside-right{
      position: absolute;
      height: 880px;
    }
  }
  /* Fin de dimensiones */

</style>
