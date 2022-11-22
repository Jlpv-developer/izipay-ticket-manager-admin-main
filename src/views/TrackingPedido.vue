<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <b-button
              icon-left="arrow-left"
              @click="regresar"
            >
              Atrás
            </b-button>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-button
              focused
              @click="isCardModalActive = true"
            >
              Agregar tareas
            </b-button>
          </div>
        </div>
      </div>
    </section>
    <section class="section is-main-section">
      <b-collapse
          class="card"
          animation="slide"
          v-for="(collapse, index) of collapses"
          :key="index"
          :open="isOpen == index"
          @open="isOpen = index">
          <template #trigger="props">
              <div
                  class="card-header"
                  role="button"
              >
                  <p class="card-header-title">
                      {{ collapse.title }}
                  </p>
                  <a class="card-header-icon">
                      <b-icon
                          :icon="props.open ? 'menu-down' : 'menu-up'">
                      </b-icon>
                  </a>
              </div>
          </template>
          <div class="card-content">
              <!-- <div class="content">
                  {{ collapse.text }}
              </div> -->
              <span><b>N° de pedido:</b> 000000</span>
              <br>
              <span><b>Empresa de transporte:</b> Empresa</span>
              <br>
              <span><b>Destino:</b> Destino</span>
              <br>
              <span><b>Cliente:</b> Cliente</span>
              <br>
              <span><b>Estado del tracking:</b></span>
              <br><br>
              <div class="column">
                <b-button
                  class="circulo-check"
                  icon-right="check"
                />
                <span class="subtitle">Pendiente de recojo</span>
              </div>
              <light-timeline :items='items'></light-timeline>
              <div class="column">
                <b-button
                  class="circulo-check"
                  icon-right="check"
                />
                <span class="subtitle">Pendiente de recojo</span>
              </div>
              <light-timeline :items='items'></light-timeline>
              <div class="column">
                <b-button
                  class="circulo-check"
                  icon-right="check"
                />
                <span class="subtitle">Pendiente de recojo</span>
              </div>
          </div>
      </b-collapse>
      <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque tenetur reprehenderit numquam maxime dolor architecto nihil enim laboriosam hic saepe unde corrupti,
              dignissimos obcaecati iusto tempora distinctio commodi maiores sapiente!
            </h1>
          </div>
        </div>
      </b-modal>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import router from '../router'
import { mapActions } from 'vuex'
export default {
  name: 'TrackingPedido',
  data () {
    return {
      isCardModalActive: false,
      isOpen: 0,
      collapses: [
        {
          title: 'Tracking ID: 000000001',
          text: 'Text 1'
        },
        {
          title: 'Tracking ID: 000000002',
          text: 'Text 2'
        },
        {
          title: 'Tracking ID: 000000003',
          text: 'Text 3'
        },
        {
          title: 'Tracking ID: 000000004',
          text: 'Text 1'
        },
        {
          title: 'Tracking ID: 000000005',
          text: 'Text 2'
        },
        {
          title: 'Tracking ID: 000000006',
          text: 'Text 3'
        }
      ],
      items: [
        {
          tag: '',
          color: '#CC0000',
          htmlMode: true,
          content: 'Sub estado 1 12:45pm'
        },
        {
          tag: '',
          type: 'circle',
          color: '#CC0000',
          htmlMode: true,
          content: 'Sub estado 2 12:45pm'
        },
        {
          tag: '',
          color: '#CC0000',
          type: 'circle',
          content: 'Sub estado 3 12:45pm'
        },
        {
          tag: '',
          color: '#CC0000',
          htmlMode: true,
          content: 'Sub estado 1 12:45pm'
        },
        {
          tag: '',
          type: 'circle',
          color: '#CC0000',
          htmlMode: true,
          content: 'Sub estado 2 12:45pm'
        },
        {
          tag: '',
          color: '#CC0000',
          type: 'circle',
          content: 'Sub estado 3 12:45pm'
        }
      ]
    }
  },
  components: {
    TitleBar
  },
  computed: {
    titleStack () {
      return ['Honda / Tracking', 'Pedido']
    }
  },
  methods: {
    ...mapActions(['fromScreenToogleRight']),
    regresar () {
      router.push('/tracking')
    }
  },
  created () {
    this.fromScreenToogleRight(false)
  }
}
</script>

<style scoped>
  .section {
    padding: 1rem 3rem 0 3rem;
  }

  .button {
    border-color: #CC0000!important;
    color: #CC0000!important;
  }

  .circulo-check {
    background: #CC0000;
    color: white!important;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    margin-left: 3.5rem;
  }

  .subtitle {
    margin-left: 0.6rem;
  }
</style>
