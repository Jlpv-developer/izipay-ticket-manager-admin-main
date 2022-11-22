<template>
  <aside v-show="isModalViewTrackingTable" class="aside-right is-placed-right is-expanded">
    <b-button
      class="aside-icon-close"
      size="is-small"
      outlined
      icon-right="close"
      @click="closeModalViewTracking"
    />
    <div v-if="dataTracking" class="container">
        <h5 class="title is-6">Tracking ID: {{dataTracking.trackingId}}</h5>
        <hr class="space">
        <div class="label-text"><b>N° de pedido:</b><span> {{dataTracking.orderId}}</span></div>
        <div class="label-text"><b>Empresa de transporte:</b><span> {{dataTracking.carrier}}</span></div>
        <div class="label-text"><b>Destino:</b><span> {{dataTracking.destiny}}</span></div>
        <div class="label-text"><b>Cliente:</b><span> {{dataTracking.customer}}</span></div>
        <div class="label-text"><b>Estado del tracking:</b></div>
        <div v-if="dataTracking.status === 'Pendiente de recojo'"><light-timeline :items='items1' ></light-timeline><br></div>
        <div v-if="dataTracking.status === 'En transito'"><light-timeline :items='items2' ></light-timeline><br></div>
        <div v-if="dataTracking.status === 'Entregado'"><light-timeline :items='items3' ></light-timeline><br></div>
        <a class="label-text a-button" @click="isCardModalActive = true">Ver guía de remisión</a>
        <b-button
          class="is-rounded a-button"
          icon-left="plus"
          outlined
        >
          Agregar tarea
        </b-button>
    </div>
    <div v-else class="content has-text-grey has-text-centered">
      <template>
        <p>
          <b-icon icon="dots-horizontal" size="is-large" />
        </p>
        <p>Cargando datos...</p>
      </template>
    </div>
    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <center>
            <b-field class="modal-title" label="Guía de remisión XYZ"></b-field>
            <div>Información de guía de remisión</div>
            <div ref="content" v-if="dataTracking">
              <vue-qr :text="dataTracking.trackingId" :size="100"></vue-qr>
              <vue-qr :text="dataTracking.orderId" :size="100"></vue-qr>
            </div>
            <b-button @click="generarPDF" hovered>Descargar pdf</b-button>
          </center>
        </div>
      </div>
    </b-modal>
  </aside>
</template>

<script>
import { mapActions } from 'vuex'
import JSPDF from 'jspdf'
import Vue from 'vue'

Vue.use(JSPDF)
export default {
  name: 'AsideTrackingRight',
  components: {
  },
  data () {
    return {
      isCardModalActive: false,
      items1: [
        {
          tag: '',
          color: '#CC0000',
          htmlMode: true,
          content: 'Pendiente de recojo'
        },
        {
          tag: '',
          type: 'circle',
          color: '#adb5bd',
          htmlMode: true,
          content: 'En transito'
        },
        {
          tag: '',
          color: '#adb5bd',
          type: 'circle',
          content: 'Entregado'
        }
      ],
      items2: [
        {
          tag: '',
          color: '#CC0000',
          htmlMode: true,
          content: 'Pendiente de recojo'
        },
        {
          tag: '',
          type: 'circle',
          color: '#CC0000',
          htmlMode: true,
          content: 'En transito'
        },
        {
          tag: '',
          color: '#adb5bd',
          type: 'circle',
          content: 'Entregado'
        }
      ],
      items3: [
        {
          tag: '',
          color: '#CC0000',
          htmlMode: true,
          content: 'Pendiente de recojo'
        },
        {
          tag: '',
          type: 'circle',
          color: '#CC0000',
          htmlMode: true,
          content: 'En transito'
        },
        {
          tag: '',
          color: '#CC0000',
          type: 'circle',
          content: 'Entregado'
        }
      ]
    }
  },
  props: {
    isModalViewTrackingTable: {
      type: Boolean,
      default: false
    },
    dataTracking: Object
  },
  methods: {
    ...mapActions(['fromScreenToogleRight']),
    closeModalViewTracking () {
      this.fromScreenToogleRight(false)
      // this.isModalViewTrackingTable = false
    },
    generarPDF () {
      const doc = new JSPDF()
      const contentHtml = this.$refs.content
      doc.html(contentHtml, {
        callback: function (doc) {
          doc.save('codigos.pdf')
        },
        x: 10,
        y: 10
      })
    }
  }
}
</script>

<style scoped>
  .aside-icon-close {
    margin-inline-start: 14rem;
    border-color: rgba(0, 0, 0, 0)!important;
  }

  .space{
    margin-top: 1rem;
  }

  .container{
    margin: 0 0 0 .5rem;
  }
  .label-text{
    margin: .5rem 0 .5rem 0;
  }
  .line-container {
    margin: 0rem;
    font-size: 13px;
    padding-left: 2rem;
  }
  .line-container::after {
    left: 1rem;
  }
  .a-button{
    color: #CC0000;
    border-color: #CC0000;
    margin: 2rem 0
  }
  .label-text.a-button:hover {
    text-decoration: underline #CC0000;
  }

  /* Dimensiones de pantalla Responsive */
  @media only screen and  (min-width: 1406px) {
    .aside-right{
      position: absolute;
      height: 680px;
    }
  }

  @media (min-width: 1256px) and (max-width: 1405px)  {
    .aside-right{
      position: absolute;
      height: 885px;
    }
  }

  @media (min-width: 1177px) and (max-width: 1255px)  {
    .aside-right{
      position: absolute;
      height: 1145px;
    }
  }

  @media (min-width: 1024px) and (max-width: 1176px) {
    .aside-right{
      position: absolute;
      height: 1145px;
    }
  }

  @media (min-width: 984px)  and (max-width: 1023px) {
    .aside-right{
      position: absolute;
      height: 1145px;
    }
  }

  @media (min-width: 921px)  and (max-width: 983px) {
    .aside-right{
      position: absolute;
      height: 1145px;
    }
  }

  @media (min-width: 768px)  and (max-width: 920px) {
    .aside-right{
      position: absolute;
      height: 1145px;
    }
  }
  /* Fin de dimensiones */

</style>
