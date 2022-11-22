<template>
  <div class="scroll">
    <section class="section is-main-section">
      <title-bar :title-stack="titleStack" />
      <hero-bar>
        Integración de Comercios GGEE - CORP
        <!-- <router-link slot="right"  class="button"> -->
        <!-- <svg style="width:18px;height:18px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z" />
</svg>
<div style="padding:5px">
Filtros
</div> -->
        <!-- </router-link> -->
      </hero-bar>

      <b-field v-show="isInvisible" grouped group-multiline>
        <div class="control">
          <b-switch v-model="showDetailIcon">Show detail icon</b-switch>
        </div>
        <div class="control">
          <b-switch v-model="useTransition"
            >Use transition (fade) when toggling details</b-switch
          >
        </div>
      </b-field>
      <div class="level-right">
        <div class="level-item">
          <b-button
            class="is-rounded a-button"
            icon-left="filter-variant"
            outlined
            @click.prevent="viewFilterTracking()"
          >
            Filtros
          </b-button>
        </div>
      </div>
      <b-table
        :data="usuarios"
        ref="table"
        paginated
        per-page="5"
        :opened-detailed="defaultOpenedDetails"
        detailed
        detail-key="codigocomercio"
        :detail-transition="transitionName"
        @details-open="
          (row) => $buefy.toast.open(`Expanded ${row.codigocomercio}`)
        "
        :show-detail-icon="showDetailIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-table-column
          field="codigocomercio"
          label="Código de Comercio"
          width="180"
          v-slot="props"
        >
          {{ props.row.codigocomercio }}
        </b-table-column>

        <b-table-column
          field="user.first_name"
          label="RUC"
          sortable
          v-slot="props"
        >
          <template v-if="showDetailIcon">
            {{ props.row.ruc }}
          </template>
          <template v-else>
            <a @click="props.toggleDetails(props.row)">
              {{ props.row.ruc }}
            </a>
          </template>
        </b-table-column>

        <b-table-column
          field="user.last_name"
          label="Número de Actividades"
          sortable
          v-slot="props"
        >
          {{ props.row.numactividades }}
        </b-table-column>

        <b-table-column label="Fecha de Ingreso" v-slot="props">
          <span>
            {{ props.row.fechaingreso }}
          </span>
        </b-table-column>
        <b-table-column label="Fecha de Fin" v-slot="props">
          <span>
            {{ props.row.fechaactividad }}
          </span>
        </b-table-column>
        <template #detail="props">
          <article class="media">
            <figure class="media-left">
              <!-- <p class="image is-64x64">
                <img src="../assets/image/prioridad.png" />
              </p> -->
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong
                    >Ticket: {{ props.row.codigocomercio }}
                    {{ props.row.nombreestado }}</strong
                  >
                  <b-button
                    style="float: right;"
                    label="Editar"
                    type="is-info"
                    @click="isCardModalActive = true"
                  />
                  <br />
                  {{ props.row.descripcion }}
                </p>
              </div>
            </div>
            <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
              <div class="card">
                <div class="card-image"></div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <div class="columns">
                        <div class="column">
                          <p class="title is-4">
                            Ticket: {{ props.row.codigocomercio }} RUC:
                            {{ props.row.ruc }}
                          </p>
                          <span class="tag is-success">
                            {{ props.row.nombreestado }}
                          </span>
                          <br />
                          <br />
                          <b-field grouped group-multiline>
                            <b-field label="Tipo de Actividad">
                              <b-select v-model="locale">
                                <option :value="undefined"></option>
                                <option value="de-DE">de-DE</option>
                                <option value="en-CA">en-CA</option>
                                <option value="en-GB">en-GB</option>
                                <option value="en-US">en-US</option>
                                <option value="es-ES">es-ES</option>
                                <option value="es-MX">es-MX</option>
                                <option value="fr-CA">fr-CA</option>
                                <option value="fr-FR">fr-FR</option>
                                <option value="it-IT">it-IT</option>
                                <option value="ja-JP">ja-JP</option>
                                <option value="pt-BR">pt-BR</option>
                                <option value="ru-RU">ru-RU</option>
                                <option value="zn-CN">zn-CN</option>
                              </b-select>
                            </b-field>
                            <b-field label="Duración">
                              <b-select v-model="hourFormat">
                                <option :value="undefined"></option>
                                <option value="12">12</option>
                                <option value="24">24</option>
                              </b-select>
                            </b-field>
                          </b-field>
                        </div>
                        <div class="column">
                          <span>
                            {{ props.row.fechaingreso }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="content">
                    <b-field label="Descripción" vertical>
                      <b-input maxlength="200" type="textarea"></b-input>
                    </b-field>
                    <b-button
                      label="Añadir"
                      type="is-info"
                      @click="isCardModalActive = true"
                    />
                  </div>
                  <div class="content">
                    <b-field label="Responsable" vertical> </b-field>
                    <b-field label="Responsable" vertical> </b-field>
                  </div>
                </div>
              </div>
            </b-modal>
          </article>
        </template>
      </b-table>
    </section>
    <aside-tracking-right
      :isModalViewTrackingTable="isModalViewTrackingTable"
      :dataTracking="trashObject"
      v-if="!isAsideFilter"
    />
    <aside-filter-tracking :isViewFilter="isAsideFilter" v-else />
  </div>
</template>
<style scoped>
.tag {
  cursor: pointer;
}
</style>
<script>
// import ClientsTableSample from '@/components/ClientsTableSample'
// import CardComponent from '@/components/CardComponent'
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "BandejaTareas",
  components: {
    HeroBar,
    TitleBar,
  },
  // methods: {
  //   ...mapActions(['fromScreenToogleRight'])
  // },
  // created () {
  //   this.fromScreenToogleRight(false)
  // },
  data() {
    return {
      defaultOpenedDetails: [1],
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      usuarios: [],
      showDetailIcon: true,
      useTransition: true,
      isImageModalActive: false,
      isCardModalActive: false,
    };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    transitionName() {
      if (this.useTransition) {
        return "fade";
      }
    },
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name;
      }

      return null;
    },
    titleStack() {
      return ["Izipay", "Integración de Comercios GGEE - CORP"];
    },
  },
  mounted() {
    if (this.dataUrl) {
      this.isLoading = true;
      axios
        .get(this.dataUrl)
        .then((r) => {
          this.isLoading = false;
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true;
            }
            this.clients = r.data.data;
          }
        })
        .catch((e) => {
          this.isLoading = false;
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    }
  },

  created() {
    // eslint-disable-next-line no-unused-expressions
    this.getApi();
    this.fromScreenToogleRight(false);
  },
  methods: {
    ...mapActions(["fromScreenToogleRight", "fromScreenFilter"]),
    viewFilterTracking() {
      console.log("VIEW FILTER");
      this.fromScreenToogleRight(true);
      this.fromScreenFilter(true);
    },
    getApi() {
      axios
        // .get(`${this.$router.options.baselocal}/api/v1/ViewTareasWithoutActividades/Read`)
        .get(
          `${"https://appizipayweb.azurewebsites.net/api/v1/ViewTareasWithActividadForFilterClose"}`
        )
        .then((r) => {
          if (r.data) {
            if (r.data.length > this.perPage) {
              this.paginated = true;
            }
            this.dataLength = r.data.totalElements;
            this.usuarios = r.data;
            console.log(r.data);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    trashModal(trashObject) {
      this.trashObject = trashObject;
      this.isModalActive = true;
    },
    trashConfirm() {
      this.isModalActive = false;
      this.$buefy.snackbar.open({
        message: "Confirmed",
        queue: false,
      });
    },
    trashCancel() {
      this.isModalActive = false;
    },
  },
};
</script>
