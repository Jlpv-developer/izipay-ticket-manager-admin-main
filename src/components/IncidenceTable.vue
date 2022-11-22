<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />

    <b-tabs v-model="activeTab">
      <b-tab-item label="Gráfico">
        <b-field label="Mes">
          <b-select v-model="selectedMonth" placeholder="Seleccionar">
            <option disabled value="1">Enero</option>
            <option disabled value="2">Febrero</option>
            <option disabled value="3">Marzo</option>
            <option disabled value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
            <!-- <option disabled value="">Selecciona</option>
            <option v-for="month in months" :key="month.id" :value="month.id">
              {{ month.name }}
            </option> -->
          </b-select>
        </b-field>
        <b-row>
          <b-col>
            <b-card title="Masivo">
              <b-card-text>
                Tickets Recibidos: {{ attentionReportMassive.totalReceived }}
                <br />
                Tickets Atendidos: {{ attentionReportMassive.totalAttended }}
              </b-card-text>

              <div id="chart">
                <apexchart
                  type="bar"
                  height="350"
                  :options="chartOptions"
                  :series="series12"
                ></apexchart>
              </div>
            </b-card>
          </b-col>
          <b-col>
            <b-card title="Corporativo">
              <b-card-text>
                Tickets Recibidos: {{ attentionReportCorp.totalReceived }}
                <br />
                Tickets Atendidos: {{ attentionReportCorp.totalAttended }}
              </b-card-text>

              <div id="chart">
                <div id="chart">
                  <apexchart
                    type="bar"
                    height="350"
                    :options="chartOptions"
                    :series="series13"
                  ></apexchart>
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-tab-item>
      <b-tab-item label="Base">
        <div class="hero-body">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <b-input
                  class="input-search"
                  placeholder="Buscar por código de comercio o RUC"
                  v-model="searchField"
                  icon-right="magnify"
                  icon-right-clickable
                  @keyup.native.enter="getIncidents()"
                  @icon-right-click="getIncidents()"
                  rounded
                  expanded
                  type="number"
                >
                </b-input>
              </div>
            </div>
            <div class="level-left">
              <div class="level-item">
                <div class="buttons">
                  <b-button
                    v-b-tooltip.hover
                    title="Agregar atención"
                    label=""
                    type="is-info"
                    icon-left="plus"
                    slot="right"
                    @click.prevent="openModalEditIncidence(null, 'create')"
                    v-if="isGuest"
                  >
                  </b-button>
                  <!-- <b-button
                    label="Filtros"
                    type="is-info"
                    icon-left="filter-variant"
                    slot="right"
                    @click.prevent="viewFilterTicket()"
                  >
                    Filtros
                  </b-button> -->

                  <b-button
                    label="Filtros"
                    type="is-info"
                    :icon-left="iconFilter"
                    slot="right"
                    @click="changeIcon()"
                  >
                  </b-button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <b-container class="bv-example-row" v-if="isOpen">
              <b-row>
                <b-col>
                  <b-field label="Tipo de cliente">
                    <b-select
                      placeholder="Seleccionar"
                      v-model="typeCustomerValue"
                      expanded
                    >
                      <option value="massive">Masivo</option>
                      <option value="ggee">Corporativo</option>
                    </b-select>
                  </b-field>
                </b-col>
                <b-col>
                  <b-field label="Tipo de atención">
                    <b-select
                      placeholder="Seleccionar"
                      v-model="attentionTypeValue"
                      expanded
                    >
                      <option value="0">Todos</option>
                      <option
                        v-for="typeAttention in typeAttentions"
                        :key="typeAttention.id"
                        :value="typeAttention.id"
                      >
                        {{ typeAttention.name }}
                      </option>
                    </b-select>
                  </b-field></b-col
                >
                <b-col>
                  <b-field label="Desde">
                    <b-datepicker
                      position="is-bottom-left"
                      placeholder="Seleccionar"
                      v-model="dateStart"
                    >
                    </b-datepicker>
                  </b-field>
                </b-col>
                <b-col>
                  <b-field label="Hasta">
                    <b-datepicker
                      position="is-bottom-left"
                      placeholder="Seleccionar"
                      v-model="dateEnd"
                    >
                    </b-datepicker>
                  </b-field>
                </b-col>
                <b-col>
                  <div class="buttons">
                    <b-button
                      type=""
                      @click.prevent="
                        filterIncidents(
                          typeCustomerValue,
                          attentionTypeValue,
                          dateStart,
                          dateEnd
                        )
                      "
                      >Filtrar</b-button
                    >
                    <b-button
                      type="is-danger"
                      @click="clearFilter(), getIncidents()"
                      v-b-tooltip.hover
                      title="Limpiar filtros"
                      icon-left="eraser-variant"
                    ></b-button>
                  </div> </b-col
                >
              </b-row>
            </b-container>
          </div>
        </div>

        <!-- <b-table
          :data="incidents"
          ref="table"
          per-page="5"
          :opened-detailed="defaultOpenedDetails"
          detailed
          detail-key="codigocomercio"
          @details-open="
            (row) => $buefy.toast.open(`Abriste la tarea ${row.codigocomercio}`)
          "
          :show-detail-icon="showDetailIcon"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        > -->
        <b-table
          :data="incidents"
          ref="table"
          per-page="50"
          :opened-detailed="defaultOpenedDetails"
          detail-key="id"
          @details-open="
            (row) => $buefy.toast.open(`Abriste la tarea ${row.id}`)
          "
          datailed
          :show-detail-icon="showDetailIcon"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          class="has-background-color-dark"
        >
          <b-table-column v-slot="incidents">
            <b-button
              size="is-small"
              type=""
              icon-right="chevron-right"
              v-b-tooltip.hover
              title="Ver detalle"
              @click.prevent="getIncidenceById(incidents.row.id)"
            />
          </b-table-column>
          <b-table-column
            label="Tipo de cliente"
            field="trackingId"
            sortable
            v-slot="incidents"
            centered
          >
            <p v-if="incidents.row.type_customer == 'ggee'">Corporativo</p>
            <p v-else>Masivo</p>

            <!-- <p>{{ incidents.row.type_customer }}</p> -->
          </b-table-column>
          <b-table-column
            label="Código de Comercio"
            field="status"
            sortable
            v-slot="incidents"
            centered
          >
            <div style="color: orange">{{ incidents.row.code }}</div>
          </b-table-column>
          <b-table-column
            label="RUC"
            field="estimatedDate"
            sortable
            v-slot="incidents"
            centered
          >
            {{ incidents.row.ruc }}
          </b-table-column>
          <b-table-column
            label="Fecha de Recepción "
            field="destiny"
            sortable
            v-slot="incidents"
            centered
          >
            {{ parseDate2(incidents.row.init_date) }}
          </b-table-column>
          <b-table-column
            label="Fecha de Atención "
            field="customer"
            sortable
            v-slot="incidents"
            centered
          >
            <p v-if="incidents.row.end_date == '0001-01-01T00:00:00'">
              Sin respuesta
            </p>
            <p v-else>
              {{ parseDate2(incidents.row.end_date) }}
            </p>
          </b-table-column>

          <b-table-column
            label="Tipo de Atención"
            field="orderId"
            sortable
            v-slot="incidents"
            centered
          >
            <span>
              <!-- <p v-if="incidents.row.type_attention_id == 1">
                Cancelación de ticket
              </p> -->
              <p v-if="incidents.row.type_attention_id == 1">Cancelación</p>

              <!-- <p v-else-if="incidents.row.type_attention_id == 2">
                "Validación de completado
              </p> -->
              <p v-else-if="incidents.row.type_attention_id == 2">Validación</p>

              <p v-else-if="incidents.row.type_attention_id == 3">Consultas</p>

              <!-- <p v-else-if="incidents.row.type_attention_id == 4">
                Atención de reingreso
              </p> -->
              <p v-else-if="incidents.row.type_attention_id == 4">Reingreso</p>

              <p v-else-if="incidents.row.type_attention_id == 5">
                Incidencias
              </p>
              <p v-else-if="incidents.row.type_attention_id == 6">PostVenta</p>
            </span>
          </b-table-column>

          <b-table-column
            label="🛠 "
            field="orderId"
            centered
            v-slot="incidents"
            v-if="isGuest"
          >
            <div class="buttons is-centered">
              <b-button
                size="is-small"
                type="is-success"
                icon-right="pencil"
                @click.prevent="openModalEditIncidence(incidents.row, 'update')"
              />
              <b-button
                size="is-small"
                type="is-danger"
                icon-right="delete"
                @click="openModalDeleteIncidence(incidents.row.id)"
              />
            </div>
          </b-table-column>

          <template #detail="incidents">
            <article class="media">
              <!-- <figure class="media-left">
                <p class="image is-64x64">
                  <img src="/static/img/placeholder-128x128.png" />
                </p>
              </figure> -->
              <div class="columns">
                <div class="column"></div>
                <div class="column is-full">
                  <div class="media-content">
                    <div class="content">
                      <!-- <p>Código de Comercio: {{ incidents.row.code }}</p>
                  <p>RUC: {{ incidents.row.ruc }}</p>
                  <p>
                    Fecha de Recepción: {{
                      parseDate2(incidents.row.init_date)
                    }}
                  </p>
                  <p>
                    Fecha de Atención: {{
                      parseDate2(incidents.row.end_date)
                    }}
                  </p> -->
                      <b>Tipo de Atención: </b>
                      <p>
                        {{ incidents.row.type_attention_name }}
                      </p>
                      <p v-if="incidents.row.type_incidence_name">
                        Tipo de Incidencia:
                        {{ incidents.row.type_incidence_name }}
                      </p>
                      <b>Respuesta:</b>
                      <p>{{ incidents.row.comments }}</p>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="buttons">
                    <b-button
                      size="is-small"
                      type="is-success"
                      icon-right="pencil"
                      @click.prevent="
                        openModalEditIncidence(incidents.row.id, 'update')
                      "
                    />
                    <b-button
                      size="is-small"
                      type="is-danger"
                      icon-right="delete"
                      @click="openModalDeleteIncidence(incidents.row.id)"
                    />
                  </div>
                </div>
              </div>
            </article>
          </template>
          <b-modal v-model="isModalShowInfo" has-modal-card>
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Detalle de la atención</p>
                    <p class="subtitle is-6"></p>
                  </div>
                </div>

                <div class="content">
                  <p>Código de Comercio:{{ incidencebyId.code }}</p>
                  <p>RUC:{{ incidencebyId.ruc }}</p>
                  <p>
                    Fecha de Recepción:{{
                      this.parseDate2(incidencebyId.init_date)
                    }}
                  </p>
                  <p>
                    Fecha de Atención:{{
                      this.parseDate2(incidencebyId.end_date)
                    }}
                  </p>
                  <p>
                    Tipo de Atención:{{ incidencebyId.type_attention_name }}
                  </p>
                  <p v-if="type_incidence_name">
                    Tipo de Incidencia:{{ type_incidence_name }}
                  </p>
                  <b>Respuesta:</b>
                  <p>{{ incidencebyId.comments }}</p>
                </div>
              </div>
            </div>
          </b-modal>
        </b-table>
        <!-- <b-table
          :data="incidents"
          ref="table"
          per-page="50"
          :opened-detailed="defaultOpenedDetails"
          detailed
          detail-key="id"
          @details-open="
            (row) => $buefy.toast.open(`Abriste la tarea ${row.id}`)
          "
          :show-detail-icon="showDetailIcon"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          class="has-background-color-dark"
        >
          <b-table-column
            label="Tipo de cliente"
            field="trackingId"
            sortable
            v-slot="incidents"
            centered
          >
            <p v-if="incidents.row.type_customer == 'ggee'">Corporativo</p>
            <p v-else>Masivo</p>

             <p>{{ incidents.row.type_customer }}</p> 
          </b-table-column>
          <b-table-column
            label="Código de Comercio"
            field="status"
            sortable
            v-slot="incidents"
            centered
          >
            <div style="color: orange">{{ incidents.row.code }}</div>
          </b-table-column>
          <b-table-column
            label="RUC"
            field="estimatedDate"
            sortable
            v-slot="incidents"
            centered
          >
            {{ incidents.row.ruc }}
          </b-table-column>
          <b-table-column
            label="Fecha de Recepción "
            field="destiny"
            sortable
            v-slot="incidents"
            centered
          >
            {{ parseDate2(incidents.row.init_date) }}
          </b-table-column>
          <b-table-column
            label="Fecha de Atención "
            field="customer"
            sortable
            v-slot="incidents"
            centered
          >
            <p v-if="incidents.row.end_date == '0001-01-01T00:00:00'">
              Sin respuesta
            </p>
            <p v-else>
              {{ parseDate2(incidents.row.end_date) }}
            </p>
          </b-table-column>

          <b-table-column
            label="Tipo de Atención"
            field="orderId"
            sortable
            v-slot="incidents"
            centered
          >
            <span>
              <p v-if="incidents.row.type_attention_id == 1">
                Cancelación de ticket
              </p>
              
              <p v-else-if="incidents.row.type_attention_id == 2">
                "Validación de completado
              </p>

              <p v-else-if="incidents.row.type_attention_id == 3">Consultas</p>

              <p v-else-if="incidents.row.type_attention_id == 4">
                Atención de reingreso
              </p>

              <p v-else-if="incidents.row.type_attention_id == 5">
                Incidencias
              </p>
              <p v-else-if="incidents.row.type_attention_id == 6">PostVenta</p>
            </span>
          </b-table-column>
          <b-table-column
            label="🛠 "
            field="orderId"
            centered
            v-slot="incidents"
            v-if="isGuest"
          >
            <div class="buttons is-centered">
              <b-field label="">
                              <b-select v-model="actions" placeholder="Seleccionar">
                                <option value="edit">Editar</option>
                                <option value="delete">Eliminar</option>
                              </b-select>
                            </b-field> -->

        <!-- <b-button
               size="is-small"
                type="is-info"
                icon-right="magnify"
                @click.prevent="getIncidenceById(incidents.row.id)"
              />
              <b-button
                size="is-small"
                type="is-success"
                icon-right="pencil"
                @click.prevent="openModalEditIncidence(incidents.row, 'update')"
              />
              <b-button
                size="is-small"
                type="is-danger"
                icon-right="delete"
                @click="openModalDeleteIncidence(incidents.row.id)"
              />
            </div>
          </b-table-column>

          <section slot="empty" class="section">
            <div class="content has-text-grey has-text-centered">
              <template v-if="isLoading">
                <p>
                  <b-icon icon="dots-horizontal" size="is-large" />
                </p>
                <p>Cargando datos...</p>
              </template>
              <template v-else>
                <p>
                  <b-icon icon="emoticon-sad" size="is-large" />
                </p>
                <p>No se encontro información &hellip;</p>
              </template>
            </div>
          </section>
          <b-modal v-model="isModalShowInfo" has-modal-card>
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Detalle de la incidencia</p>
                    <p class="subtitle is-6"></p>
                  </div>
                </div>

                <div class="content">
                  <p>Código de Comercio:{{ incidencebyId.code }}</p>
                  <p>RUC:{{ incidencebyId.ruc }}</p>
                  <p>
                    Fecha de Recepción:{{
                      this.parseDate2(incidencebyId.init_date)
                    }}
                  </p>
                  <p>
                    Fecha de Atención:{{
                      this.parseDate2(incidencebyId.end_date)
                    }}
                  </p>
                  <p>
                    Tipo de Atención:{{ incidencebyId.type_attention_name }}
                  </p>
                  <p v-if="type_incidence_name">
                    Tipo de Incidencia:{{ type_incidence_name }}
                  </p>
                  <b>Respuesta:</b>
                  <p>{{ incidencebyId.comments }}</p>
                </div>
              </div>
            </div>
          </b-modal>
        </b-table> -->
        <p>Total de Registros: {{ recordsNumber }}</p>
        <div class="top-level">
          <div class="level-left">
            <!-- Ver
            <b-select v-model="perPage" class="perPage">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </b-select>
            elementos por página -->
          </div>
          <div class="level-right">
            <b-pagination
              :total="dataLength"
              v-model="current"
              :range-before="1"
              :per-page="perPage"
            >
            </b-pagination>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>

    <b-modal v-model="isModalEditIncidence" has-modal-card>
      <modal-edit-incidence
        :incidenceIdValue="incidenceIdValue"
        :isModalViewEditIncidence="isModalEditIncidence"
        :actionType="actionType"
      ></modal-edit-incidence>
    </b-modal>
    <b-modal v-model="isModalDeleteIncidence" has-modal-card>
      <modal-confirmation-delete-incidence
        :incidenceId="incidenceId"
        :isModalViewDeleteIncidence="isModalDeleteIncidence"
      ></modal-confirmation-delete-incidence>
    </b-modal>
    <aside-filter-attention
      :isModalViewTrackingTable="isModalViewTrackingTable"
      :dataTracking="trashObject"
      v-if="!isAsideFilter"
    />
    <aside-filter-attention :isViewFilter="isAsideFilter" v-else />
  </div>
</template>

<script>
import axios from "axios";
import ModalBox from "@/components/ModalBox";
import AsideTrackingRight from "@/components/AsideTrackingRight";
import AsideFilterAttention from "@/components/AsideFilterAttention";
import ModalConfirmationDeleteIncidence from "@/components/ModalConfirmationDeleteIncidence.vue";
import ModalEditIncidence from "@/components/ModalEditIncidence.vue";

import CardWidget from "@/components/CardWidget";
import { mapActions, mapState } from "vuex";

import VueApexCharts from "vue-apexcharts";

import dayjs from "dayjs";
export default {
  name: "IncidenceTable",
  components: {
    ModalBox,
    AsideTrackingRight,
    AsideFilterAttention,
    ModalConfirmationDeleteIncidence,
    ModalEditIncidence,
    CardWidget,

    apexchart: VueApexCharts,
  },
  tareas: {
    keyword: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      defaultOpenedDetails: [0],
      showDetailIcon: true,
      useTransition: true,
      selected: null,
      iconFilter: "arrow-down",
      isOpen: false,
      series13: [],
      actions: null,
      series90: [
        {
          name: "Inflation",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6],
        },
      ],

      ///asdsda/da/sd/asd

      series12: [],
      series: [
        {
          name: "Tipos",
          data: [],
        },
      ],
      series99: [
        {
          name: "sales",
          data: [
            {
              x: "2019/01/01",
              y: 400,
            },
            {
              x: "2019/04/01",
              y: 430,
            },
            {
              x: "2019/07/01",
              y: 448,
            },
            {
              x: "2019/10/01",
              y: 470,
            },
            {
              x: "2020/01/01",
              y: 540,
            },
            {
              x: "2020/04/01",
              y: 580,
            },
            {
              x: "2020/07/01",
              y: 690,
            },
            {
              x: "2020/10/01",
              y: 690,
            },
          ],
        },
      ],
      chartOptions: {
        yaxis: [
          {
            labels: {
              formatter: function (val) {
                return val.toFixed(0);
              },
            },
          },
        ],
        chart: {
          type: "bar",
          height: 380,
        },
        labels: [
          "Reingreso",
          "Cancelación ",

          "Consultas",

          "Incidencias",

          "PostVenta",
          "Validación ",
        ],
        xaxis: {
          type: "category",
          // labels:
          // {0:'Cancelación',}
          // formatter: function() {

          //           return [
          //   "Cancelación de ticket",

          //   "Validación de completado",

          //   "Consultas",

          //   "Atención de reingreso",

          //   "Incidencias",

          //   "PostVenta",
          // ];
          //         }
          // },

          // labels: {

          //   // formatter: function(val) {
          //   //   return "Q" + dayjs(val).quarter()
          //   // }
          // },
          group: {
            style: {
              fontSize: "10px",
              fontWeight: 700,
            },
            groups: [
              // { title: '2019', cols: 4 },
              // { title: '2020', cols: 4 }
            ],
          },
        },
        title: {
          text: "",
        },
        tooltip: {
          enabled: false,
          x: {
            // formatter: function(val) {
            //   return "Q" + dayjs(val).quarter() + " " + dayjs(val).format("YYYY")
            // }
          },
        },
      },

      months: [
        { id: 1, name: "Enero" },
        { id: 2, name: "Febrero" },
        { id: 3, name: "Marzo" },
        { id: 4, name: "Abril" },
        { id: 5, name: "Mayo" },
        { id: 6, name: "Junio" },
        { id: 7, name: "Julio" },
        { id: 8, name: "Agosto" },
        { id: 9, name: "Setiembre" },
        { id: 10, name: "Octubre" },
        { id: 11, name: "Noviembre" },
        { id: 12, name: "Diciembre" },
      ],
      // chartOptions: {
      //   chart: {
      //     width: 380,
      //     type: "bar",
      //   },
      //   labels: [
      //     "Cancelación de ticket",

      //     "Validación de completado",

      //     "Consultas",

      //     "Atención de reingreso",

      //     "Incidencias",

      //     // "PostVenta",
      //   ],
      //   responsive: [
      //     {
      //       breakpoint: 500,
      //       options: {
      //         chart: {
      //           width: 200,
      //         },
      //         legend: {
      //           position: "bottom",
      //         },
      //       },
      //     },
      //   ],
      // },
      dateStart: "",
      dateEnd: "",
      typeCustomerValue: null,
      attentionTypeValue: null,
      init_date: "",
      end_date: "",
      type_incidence_name: "",
      isModalShowInfo: false,
      isGuest: false,
      searchField: "",
      isCardModalIncidenceActive: false,
      commerceId: "",
      businessRuc: "",
      businessName: "",
      sentDate: new Date(),
      responseDate: "",
      typeCustomer: "",
      userResponsable: "",
      selectedIncidence: "",
      customerTypes: "",
      users: "",
      usernameLC: "",
      json: "",
      integradorDefault: "",
      selectedUser: "",
      incidents: [],
      typeIncidents: [],
      incidencebyId: [],
      incidenceId: "",
      isModalDeleteIncidence: false,
      isModalEditIncidence: false,
      btnAñadirActividad: true,
      btnActualizarActividad: false,
      typeAttentions: "",
      selectedTypeAtenttion: "",
      seen: true,
      current: 1,
      selected: null,
      isModalActive: false,
      isModalViewTrackingTable: false,
      trashObject: null,
      tracking: [],
      isLoading: false,
      paginated: false,
      perPage: 5,
      checkedRows: [],
      dataLength: 0,
      recordsNumber: "",
      isCardModalActive: false,
      isCardModalActive2: false,
      isCardModalActiveDelete: false,
      isCardModalActiveConfirmacion: false,

      tareas: [],
      tareaData: null,
      estados: [],
      formularios: [],
      plugins: [],
      implementaciones: [],
      tipoDesarrollos: [],
      tipoClientes: [],
      selectedPlugin: "",
      selectedFormulario: "",
      selectedFechaCreacion: "",
      selectedFechaIngreso: "",
      selectedCliente: "",
      selectedDesarrollo: "",
      tareaEliminada: [],
      IdTarea: null,
      registro: [],
      selectedImplementacion: "",
      selectedFechaActividad: new Date(),
      fechaActividadGet: "",
      selectedEstado: "",
      selectedMotivo: "",
      motivos: "",
      selectedTipoActividad: "",
      selectedDuracion: "",
      descripcionActividad: "",
      selectedFechaActivity: new Date(),
      selectedFechaActividad: new Date(),
      selectedHora: new Date().toLocaleTimeString(),
      selectedResponsable: "",
      estadosBase: [],
      selectedMotivoActividad: "",
      selectedEstadoBase: "",
      tareaActividades: [],
      account: undefined,
      resultls: "{}",
      actividadData: [],
      actividadNumero: "",
      mensajeConfirmacion: "",
      totalRegistros: "",
      incidencias: "",
      locale: "es-MX",
      texto: "",
      seen: true,
      isCardModalActive: false,
      selected: null,
      createdReadable: null,
      dataLength: 0,
      tipoClientes: [],
      formularios: [],
      plugins: [],
      estados: [],
      registro: [],
      codigoComercio: "",
      ruc: "",
      razonSocial: "",
      tipoCliente: "",
      comercioData: "",
      incidencia: {
        tipoclienteid: [],
        fechaEnvio: "",
        clienteId: 3,
        selectedCasoReportar: "",
        usuarioid: "",
        fechaRespuesta: "",
        descripcion: "probando",
      },
      monthCounter: new Date().getMonth() + 1,
      monthArray: [],
      yearArray: [],
      attentionReportMassive: [],

      attentionReportCorp: [],
      activeTab: 0,
      selectedMonth: null,
      customerType: null,
      typeAttentions: null,
    };
  },
  props: {
    incidenceIdValue: "",
    actionType: "",
  },
  computed: {
    ...mapState(["isAsideFilter"]),
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name;
      }
      return null;
    },
    transitionName() {
      if (this.useTransition) {
        return "fade";
      }
    },
    dataFilter() {
      if (this.keyword === "") {
        return this.tracking;
      } else {
        const data = this.tracking.filter((item) => {
          if (
            item.trackingId.includes(this.keyword) ||
            item.status.includes(this.keyword) ||
            item.estimatedDate.includes(this.keyword) ||
            item.destiny.includes(this.keyword) ||
            item.customer.includes(this.keyword) ||
            item.orderId.includes(this.keyword)
          ) {
            return item;
          }
        });
        return data;
      }
    },
  },
  mounted() {},
  created() {
    this.setMonthAndYear(), this.getIncidents();
    //  this.getCustomerType();
    // this.getAttentionReport(this.monthCounter);
    this.getUsers();
    this.$root.$refs.A = this;
    this.selectedMonth = this.monthCounter;
    // this.getAttentionReport(this.monthCounter);

    this.getTypeAttention();
    // this.getAttentionReport(this.monthCounter, "ggee");
  },
  methods: {
    getAttentionReport(selectedMonthValue) {
      this.series12 = [];
      this.series13 = [];
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ForIncidence`, {
          type_customer: "massive",
          month: selectedMonthValue,
          year: this.yearArray.toString(),
        })
        .then((r) => {
          if (r.data) {
            this.attentionReportMassive = r.data.data;

            console.log("Series1", this.attentionReportMassive);
            let arrayReportMassive = [
              this.attentionReportMassive.totalTypeAttention
                .totalAttentionReentry,
              this.attentionReportMassive.totalTypeAttention.totalCancel,
              this.attentionReportMassive.totalTypeAttention.totalConsult,
              this.attentionReportMassive.totalTypeAttention.totalIncidence,
              this.attentionReportMassive.totalTypeAttention.totalPostSale,
              this.attentionReportMassive.totalTypeAttention.totalValidate,
            ];
            var o1 = { name: "", data: arrayReportMassive };
            this.series12.push(o1);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ForIncidence`, {
          type_customer: "ggee",
          month: selectedMonthValue,
          year: this.yearArray.toString(),
        })
        .then((r) => {
          if (r.data) {
            this.attentionReportCorp = r.data.data;
            console.log("Corp", this.attentionReportCorp);
            let arrayReportCorp = [
              this.attentionReportCorp.totalTypeAttention.totalAttentionReentry,
              this.attentionReportCorp.totalTypeAttention.totalCancel,
              this.attentionReportCorp.totalTypeAttention.totalConsult,
              this.attentionReportCorp.totalTypeAttention.totalIncidence,
              this.attentionReportCorp.totalTypeAttention.totalPostSale,
              this.attentionReportCorp.totalTypeAttention.totalValidate,
            ];
            console.log("Corp", arrayReportCorp);
            var o2 = { name: "", data: arrayReportCorp };
            this.series13.push(o2);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getTypeAttention() {
      axios
        .get(
          `${this.$router.options.baseprod}/TypeAttention?pageSize=20&pageNumber=1`
        )
        .then((r) => {
          if (r.data) {
            this.typeAttentions = r.data.data;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getCustomerType() {
      axios
        .get(`${this.$router.options.baseprod}/Types/customer`)
        .then((r) => {
          if (r.data) {
            this.customerTypes = r.data.data;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    setMonthAndYear() {
      for (let month = 1; month <= this.monthCounter; month++) {
        this.monthArray.push(month);
      }
      var year = new Date().getFullYear();
      this.yearArray.push(year);
    },

    slashDateFormat(value) {
      return dayjs(value).format("DD/MM/YYYY");
    },
    ...mapActions(["fromScreenToogleRight", "fromScreenFilter"]),
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
    viewTracking(trashObject) {
      this.trashObject = trashObject;
      this.fromScreenToogleRight(true);
      this.fromScreenFilter(false);
      this.isModalViewTrackingTable = true;
    },

    openModalDeleteIncidence(value) {
      this.incidenceId = value;
      this.isModalDeleteIncidence = true;
    },
    openModalEditIncidence(value, value2) {
      if (value == undefined && value2 == "create") {
        this.incidenceIdValue = 0;
        this.isModalEditIncidence = true;
        this.actionType = "create";
      } else if (value2 == "update") {
        this.incidenceIdValue = value.id;
        this.isModalEditIncidence = true;
        this.actionType = "update";
      }
    },

    clearFilter() {
      this.typeCustomerValue = null;
      this.attentionTypeValue = null;
      this.dateStart = "";
      this.dateEnd = "";
    },

    filterIncidents(clientType, typeAttention, sinceDate, fromToDate) {
      //  || !typeAttention || !sinceDate || !fromToDate
      if (clientType || typeAttention || sinceDate || fromToDate) {
        axios
          .post(`${this.$router.options.baseprod}/Incidence/Filter`, {
            pageSize: 50,
            pageNumber: this.current,
            type_customer: clientType,
            type_attention_id: typeAttention ? typeAttention : 0,
            // type_incidence_name
            //code: ,
            //ruc: ,
            code_or_business_ruc: this.searchField,
            //user_id,
            init_date: sinceDate ? this.parseDate(sinceDate) : "",
            end_date: fromToDate ? this.parseDate(fromToDate) : "",
          })
          .then((r) => {
            if (r.data) {
              console.log(1);
              this.incidents = [];
              this.incidents = r.data.data;
              this.recordsNumber = this.incidents.length;
              console.log("Tus incidencias", this.incidents);
            }
          })
          .catch((e) => {
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: "is-danger",
            });
          });
      }
    },
    getIncidents() {
      this.isLoading = true;
      axios
        .post(`${this.$router.options.baseprod}/Incidence/Filter`, {
          pageSize: 50,
          pageNumber: this.current,
          type_customer: "",
          type_attention_id: 0,
          // type_incidence_name
          //code: ,
          //ruc: ,
          code_or_business_ruc: this.searchField,
          //user_id,
          init_date: "",
          end_date: "",
        })
        .then((r) => {
          if (r.data) {
            this.incidents = r.data.data;
            this.recordsNumber = this.incidents.length;
            console.log("Tus incidencias", this.incidents);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getIncidenceById(value) {
      axios
        .get(`${this.$router.options.baseprod}/Incidence/${value}`)
        .then((r) => {
          if (r.data) {
            this.incidencebyId = r.data.data;
            console.log("Tus incidencia", this.incidencebyId);
            this.isModalShowInfo = true;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getUsers() {
      axios
        .get(`${this.$router.options.baseprod}/Users`)
        .then((r) => {
          if (r.data) {
            this.users = r.data.data;
            this.usernameLC = localStorage.getItem("myUser");

            this.json = JSON.parse(this.usernameLC);
            // this.usernameLC = this.json.userName.split(" ");
            // this.usernameLC = String(
            //   this.usernameLC[0] + " " + this.usernameLC[1]
            // );

            // this.integradorDefault = this.users.find(
            //   (element) => element.username == this.usernameLC
            // );
            // this.selectedUser = this.integradorDefault.id;
            this.integradorDefault = this.users.find(
              (element) => element.email == this.json.userEmail
            );
            console.log(this.users);
            this.selectedUser = this.integradorDefault.id;

            if (this.integradorDefault.email != "sholguin@izipay.pe") {
              this.isGuest = true;
            }
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    changeIcon() {
      this.iconFilter =
        this.iconFilter === "arrow-down" ? "arrow-up" : "arrow-down";
      if (this.iconFilter == "arrow-down") {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },
    viewFilterTicket() {
      this.fromScreenToogleRight(true);
      this.fromScreenFilter(true);
    },

    parseDate(value) {
      return dayjs(value).format("DD-MM-YYYY");
    },
    parseDate2(value) {
      return dayjs(value).format("DD/MM/YYYY");
    },
  },
  watch: {
    selectedMonth: function () {
      this.getAttentionReport(this.selectedMonth);
    },

    perPage: function () {
      this.getApi(this.current, this.perPage, this.trackingFilter);
    },
    current: function () {
      this.getApi(this.current, this.perPage, this.trackingFilter);
    },
    selected: function () {
      if (selected != null) {
        this.getIncidenceById(this.incidents.row.id);
      }
    },
    //     actions: function () {
    //       if(this.actions == 'edit'){
    // this.openModalEditIncidence(incidents.row, 'update')
    //       }else{
    // this.openModalDeleteIncidence(incidents.row.id)
    //       }
    //     }
  },
};
</script>

<style scoped>
.button-honda {
  color: #cc0000;
}

/* .top-level {
  padding: 1.125rem 1.5rem;
  padding-left: 0.7rem;
  padding-right: 1rem;
  overflow: hidden;
  margin: 0;
  border-top: rgba(24, 28, 33, 0.06);
  background: whitesmoke;
} */

.level-left {
  float: left;
}

.level-right {
  float: right;
}

.perPage {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

@media only screen and (max-width: 768px) {
  .level-left {
    padding-top: 1.5rem;
  }

  .top-level {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .perPage {
    margin: 0.5rem 0 0.5rem 0;
  }
}

.hero-body {
  padding: 1.6rem 1.5rem 1rem 1.5rem;
}

.input-search {
  width: 430px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  border: 1px solid #dbdbdb;
}

.input-search :focus {
  border-color: #dbdbdb;
}

.a-button {
  color: #cc0000;
  border-color: #cc0000;
}
#chart {
  padding: 0px;
}
</style>
