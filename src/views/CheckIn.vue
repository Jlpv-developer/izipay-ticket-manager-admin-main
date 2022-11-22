<template>
  <div>
    <section class="section is-main-section">
      <title-bar :title-stack="titleStack" />
      <br>
      <tiles>
        <card-component class="tile is-child">
          <b-field label="Ingresar tracking ID">
            <b-input
              name="tracking-id"
              type="number"
              v-model="trackingID"
            />
          </b-field>
          <span><b>Destino:</b> {{tracking.destiny}}</span>
          <br>
          <span><b>Cliente:</b> {{tracking.customer}}</span>
          <br>
          <span><b>Guía de remisión:</b> {{tracking.referenceGuide}}</span>
          <br>
          <span><b>Checkpoint actual:</b> {{tracking.status}}</span>
          <br><br>
          <b-field label="">
              <b-select placeholder="Seleccionar nuevo checkpoint" v-model="checkpoint" expanded>
                <option v-for="(item, index) in tracking.checkpoints" :key="index" :value="item.checkpoint">{{item.checkpoint}}</option>
              </b-select>
          </b-field>
        </card-component>
        <card-component class="tile is-child">
          <b-field label="Escanear">
            <b-button
              outlined
              expanded
              class="is-rounded"
            >
              Abrir cámara
            </b-button>
          </b-field>
        </card-component>
      </tiles>
        <div class="buttons">
          <b-button
            outlined
            expanded
            @click="isCardModalActive = true"
            class="is-rounded"
          >
          Check-in
          </b-button>
        </div>
      <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
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
                  @click="setCheckin"
                >
                Sí, hacer check-in
                </b-button>
              </div>
            </center>
          </div>
        </div>
      </b-modal>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import Tiles from '@/components/Tiles'
import axios from 'axios'

export default {
  name: 'CheckIn',
  data () {
    return {
      trackingID: null,
      checkpoint: null,
      tracking: [],
      isCardModalActive: false
    }
  },
  components: {
    Tiles,
    TitleBar,
    CardComponent
  },
  computed: {
    titleStack () {
      return ['Check-In']
    },
    ...mapState(['userName', 'userEmail'])
  },
  methods: {
    ...mapActions(['fromScreenToogleRight']),
    searchTrackingID (id) {
      if (this.trackingID) {
        axios
          .get(`${this.$router.options.baselocal}/v1/checkpoint/${id}`)
          .then((r) => {
            this.tracking = r.data
          })
          .catch((e) => {
            // this.$buefy.toast.open({
            //   message: `Error: ${e.message}`,
            //   type: 'is-danger'
            // })
            console.log(`Error: ${e.message}`)
          })
      }
    },
    setCheckin () {
      if (this.trackingID && this.checkpoint) {
        axios
          .post(`${this.$router.options.baselocal}/v1/checkpoint`, {
            trackingId: this.trackingID,
            checkpoint: this.checkpoint
          })
          .catch((e) => {
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger'
            })
            console.log(`Error: ${e.message}`)
          })
        this.isCardModalActive = false
      } else {
        console.log('NO GUARDO NADA')
      }
    }
  },
  created () {
    this.fromScreenToogleRight(false)
  },
  watch: {
    trackingID: function () {
      this.searchTrackingID(this.trackingID)
    }
  }
}
</script>

<style scoped>
  .is-child {
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
    border: transparent 0px solid;
  }

  .button.is-outlined {
    border-color: #CC0000;
    color: #CC0000;
    padding: 1.5rem 0 1.5rem 0;
  }

  .modal-title {
    margin: 3rem 0 3rem 0;
  }

  .modal-button {
    padding: 0 3rem 0 3rem!important;
    width: 13rem;
  }

  .modal-options {
    margin-bottom: 1.5rem;
  }

  .modal-button.left {
    margin-right: 2rem;
  }

  .modal-button.right {
    background-color: #CC0000;
    color: #ffffff;
  }

  @media (min-width: 466px) and  (max-width: 768px) {
    .modal-button.left {
      margin: 0rem .5rem!important;
    }
    .modal-button.left {
      margin: 0rem .5rem!important;
    }
  }

  @media only screen and  (max-width: 465px) {
    .modal-button.left {
      margin: .5rem 0rem!important;
    }
    .modal-button.left {
      margin: .5rem 0rem!important;
    }
  }
</style>
