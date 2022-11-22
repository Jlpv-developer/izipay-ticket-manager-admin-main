<template>
  <div>
    <div class="hero-body">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <b-input
              class="input-search"
              placeholder="Buscar por código de comercio o RUC"
              v-model.number="searchField"
              icon-right="magnify"
              icon-right-clickable
              @keyup.native.enter="getTickets(1, searchField)"
              @icon-right-click="getTickets(1, searchField)"
              rounded
              expanded
              type="number"
              min="7"
              max="11"
            >
            </b-input>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="buttons">
              <b-button
                label=""
                type="is-success"
                icon-left="file-upload-outline"
                v-b-tooltip.hover
                title="Cargar Base"
                slot="right"
                @click="redirectToExcelUpload()"
                v-if="isGuest"
              >
              </b-button>

              <b-button
                v-b-tooltip.hover
                title="Agregar Tarea"
                type="is-info"
                icon-left="clipboard-plus-outline"
                slot="right"
                @click="openModalCreateClientTicket()"
                v-if="isGuest"
              />
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
        <div class="filters" v-if="isOpen">
          <b-row class="" align-v="">
            <b-col cols="auto">
              <b-field label="Seleccionar ESTADOS">
                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Integración lista para iniciar"
                  type="is-warning"
                >
                  <span>Listo para iniciar</span>
                </b-checkbox-button>

                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Integración en desarrollo"
                  type="is-warning"
                >
                  <span>En desarrollo</span>
                </b-checkbox-button>

                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Técnico no responde"
                  type="is-warning"
                >
                  Técnico no responde
                </b-checkbox-button>

                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Pruebas Finales Proceso"
                  type="is-warning"
                >
                  Pruebas finales en proceso
                </b-checkbox-button>
                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Pruebas Finales Fallidas"
                  type="is-warning"
                >
                  Pruebas finales fallidas
                </b-checkbox-button>
                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Integración en Stand By"
                  type="is-warning"
                >
                  Integración en stand by
                </b-checkbox-button>

                <!-- <p class="content">
              <b>Selection:</b>
              {{ checkboxGroup }}
            </p> -->
              </b-field>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <b-field>
                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Protocolo Fallido"
                  type="is-danger"
                >
                  <!-- <b-icon icon="close"></b-icon> -->
                  <span>Protocolo fallido</span>
                </b-checkbox-button>

                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="CP Desistió"
                  type="is-danger"
                >
                  <span>CP Desistió</span>
                </b-checkbox-button>

                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Stand By - SLA"
                  type="is-danger"
                >
                  Stand By - SLA
                </b-checkbox-button>
                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Pruebas Finales Exitosas"
                  type="is-success"
                >
                  Pruebas finales exitosas
                </b-checkbox-button>
              </b-field>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col cols="auto">
              <b-field label="Tipo de ticket">
                <b-select
                  v-model="ticketType"
                  placeholder="Seleccionar"
                  size="is-small"
                >
                  <option id="0" value="0">Todos</option>
                  <option id="1" value="1">Nuevos</option>
                  <option id="2" value="2">Reingreso</option>
                </b-select>
              </b-field>
            </b-col>
            <b-col cols="auto">
              <b-field label="Fecha">
                <b-select
                  v-model="filterByDate"
                  placeholder="Seleccionar"
                  size="is-small"
                >
                  <option id="1" value="1">Fecha de Ingreso</option>
                  <option id="2" value="2">Fecha de Fin</option>
                </b-select>
              </b-field>
            </b-col>
            <b-col cols="auto">
              <b-field
                label="Desde"
                v-if="filterByDate == 1 || filterByDate == 2"
              >
                <b-datepicker
                  size="is-small"
                  position="is-bottom-left"
                  placeholder="Seleccionar"
                  v-model="sinceDate"
                >
                </b-datepicker>
              </b-field>
            </b-col>
            <b-col cols="auto">
              <b-field
                label="Hasta"
                v-if="filterByDate == 1 || filterByDate == 2"
              >
                <b-datepicker
                  size="is-small"
                  position="is-bottom-left"
                  placeholder="Seleccionar"
                  v-model="fromToDate"
                >
                </b-datepicker>
              </b-field>
            </b-col>
            <b-col cols="auto">
              <b-field label="Responsable">
                <b-select
                  v-model="selectedUserAssigned"
                  placeholder="Seleccionar"
                  size="is-small"
                >
                  <option
                    v-for="user in users"
                    :key="user.id"
                    :value="user.username"
                  >
                    {{ user.username }}
                  </option>
                </b-select>
              </b-field>
            </b-col>
            <b-col cols="auto">
              <br />
              <div class="buttons">
                <b-button
                  type=""
                  size="is-small"
                  @click.prevent="
                    getTickets(
                      1,
                      '',
                      checkboxGroup,
                      ticketType,
                      filterByDate,
                      sinceDate,
                      fromToDate,
                      selectedUserAssigned
                    )
                  "
                  >Filtrar</b-button
                >
                <b-button
                  type="is-danger"
                  @click="
                    getTickets(),
                      (checkboxGroup = []),
                      (ticketType = null),
                      (filterByDate = ''),
                      (sinceDate = ''),
                      (fromToDate = ''),
                      (selectedUserAssigned = null)
                  "
                  size="is-small"
                  v-b-tooltip.hover
                  title="Limpiar filtros"
                  icon-left="eraser-variant"
                ></b-button>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>

    <br />

    <b-table
      :data="tickets"
      ref="table"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="id"
      @details-open="(row) => $buefy.toast.open(`Abriste la tarea ${row.id}`)"
      :show-detail-icon="showDetailIcon"
      detail-transition="fade"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      class="has-background-color-dark"
    >
      <!-- <b-table-column
           v-slot="tickets">
            <b-button
              size="is-small"
              type=""
              icon-right="chevron-right"
              v-b-tooltip.hover
              title="Ver detalle"
              @click.prevent="opened-detailed['2']"
            />
          </b-table-column> -->

      <!-- <b-table-columm
        label="Código de Comercio"
        field="codigocomercio"
        v-slot="tickets"
        centered
      >
        <b-button
          size="is-small"
          type=""
          icon-right="chevron-right"
          v-b-tooltip.hover
          title="Ver detalle"
          @click.prevent="tickets.toggleDetails(tickets.row)"
        />
      </b-table-columm> -->
      <b-table-column label="" field="codigocomercio" v-slot="tickets" centered>
        <b-button
          size="is-small"
          type=""
          icon-right="chevron-right"
          v-b-tooltip.hover
          title="Ver detalle"
          @click.prevent="tickets.toggleDetails(tickets.row)"
        />
      </b-table-column>
      <b-table-column
        label="Código de Comercio"
        field="codigocomercio"
        v-slot="tickets"
        centered
      >
        {{ tickets.row.code }}
      </b-table-column>
      <b-table-column
        label="RUC"
        field="business_ruc"
        v-slot="tickets"
        centered
      >
        <div>{{ tickets.row.business_ruc }}</div>
      </b-table-column>
      <b-table-column
        label="N° Actividades"
        field="number"
        v-slot="tickets"
        centered
      >
        {{ getNumberActivities(tickets.row.activities) }}
      </b-table-column>
      <b-table-column
        label="Fecha de Ingreso"
        field="destiny"
        v-slot="tickets"
        centered
      >
        {{ slashDateFormat(tickets.row.init_date) }}
      </b-table-column>
      <b-table-column
        label="Fecha de Modificación"
        field="customer"
        v-slot="tickets"
        centered
      >
        <p v-if="tickets.row.activities.length !== 0">
          {{ slashDateFormat(tickets.row.activities.slice(-1)[0].created_at) }}
        </p>
        <p v-else>
          {{ "Sin modificaciones" }}
        </p>
      </b-table-column>
      <b-table-column
        label="Fecha Fin"
        field="customer"
        v-slot="tickets"
        centered
        v-if="visible"
      >
        <p
          v-if="
            tickets.row.status == 'complete' || tickets.row.status == 'cancel'
          "
        >
          {{ slashDateFormat(tickets.row.activities.slice(-1)[0].created_at) }}
        </p>
        <p v-else>
          {{ "-" }}
        </p>
      </b-table-column>
      <b-table-column
        label="Ciclo de vida"
        field="orderId"
        v-slot="tickets"
        centered
      >
        <b>{{ tickets.row.lifecycle }}</b>
      </b-table-column>

      <!-- <b-table-column
        label="Ciclo de Vida"
        field="orderId"
        v-slot="tickets"
        centered
      >
        {{ tickets.row.username }}
      </b-table-column> -->

      <b-table-column label="Estado" field="orderId" v-slot="tickets" centered>
        <b v-if="tickets.row.status === 'cancel'" style="color: red"
          >Cancelado</b
        >

        <b v-else-if="tickets.row.status === 'complete'" style="color: green"
          >Completado</b
        >

        <b v-else-if="tickets.row.status === 'open'" style="color: #dab600"
          >Abierto</b
        >
      </b-table-column>

      <b-table-column
        label="Responsable"
        field="orderId"
        v-slot="tickets"
        centered
      >
        {{ tickets.row.username }}
      </b-table-column>
      <b-table-column
        label="🛠 "
        field="orderId"
        centered
        v-slot="tickets"
        v-if="isGuest"
      >
        <div class="buttons is-centered">
          <b-button
            type="is-success"
            icon-right="pencil"
            v-b-tooltip.hover
            title="Editar tarea"
            @click="
              openModalEditTicket(
                tickets.row.id,
                tickets.row.lastdateactivity,
                tickets.row.status
              )
            "
          />
          <b-button
            type="is-danger"
            icon-right="delete"
            v-b-tooltip.hover
            title="Eliminar Tarea"
            @click="openModalDeleteTicket(tickets.row.id)"
          />
        </div>
      </b-table-column>

      <template #detail="tickets">
        <article class="media">
          <div class="buttons">
            <b-button
              class="button-icon"
              label=""
              :type="[
                'tag',
                { 'is-danger': tickets.row.status == 'Cancelado' },
                { 'is-success': tickets.row.status == 'Completado' },
                { 'is-warning': tickets.row.status == 'Abierto' },
              ]"
              icon-left="file-code"
              size="is-medium"
            />
          </div>

          <div class="media-content">
            <div class="content">
              <div class="columns">
                <div class="column">
                  <strong>Descripción de la última actividad: </strong>
                  <p v-if="tickets.row.activities.length > 0">
                    {{ tickets.row.activities.slice(-1)[0].description }}
                  </p>
                  <p v-else>
                    {{ "Sin Descripción" }}
                  </p>
                </div>
                <div class="column">
                  <div style="float: right">
                    <div class="column">
                      <b-button
                        label=""
                        v-b-tooltip.hover.left="'Agregar actividad'"
                        position="is-left"
                        icon-left="plus"
                        type="is-info"
                        @click="
                          isCardModalActive = true;
                          getLocalUserInLocalStorage();
                        "
                        v-if="isGuest"
                      />
                    </div>
                    <div class="column">
                      <b-button
                        v-if="btnShowActivities"
                        label=""
                        v-b-tooltip.hover.left="'Ver historial'"
                        icon-right="chevron-down"
                        type=""
                        @click="
                          tableActivities = true;
                          btnHideActivities = true;
                          btnShowActivities = false;
                        "
                      />
                      <b-button
                        v-if="btnHideActivities"
                        label=""
                        icon-right="chevron-up"
                        type=""
                        @click="
                          (tableActivities = false),
                            (btnHideActivities = false);
                          btnShowActivities = true;
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns" v-if="tableActivities">
                <div class="column is-full">
                  <b-message
                    v-for="(activity, index) in tickets.row.activities"
                    :key="activity.id"
                    :value="activity.description"
                  >
                    <div>
                      <p>
                        ID:{{ tickets.row.activities[0].id }} Actividad - N°{{
                          index + 1
                        }}
                        {{ slashDateFormat(activity.created_at) }}
                      </p>
                      {{ activity.description }}
                    </div>
                  </b-message>
                </div>
              </div>
            </div>
          </div>
          <b-modal v-model="isCardModalActive" :width="850">
            <div class="modal-card" style="width: auto">
              <header class="modal-card-head">
                <p class="modal-card-title">Agregar Actividad</p>
                <p>
                  {{ selectedHour }} -
                  {{ slashDateFormat(selectedActivityDate) }}
                </p>
              </header>
              <section class="modal-card-body section-has-text-grey-light">
               
                <div class="columns">
                  <div class="column">
                    <div class="buttons">
                    
                    <b-button
                        class="button-icon"
                        label=""
                        :type="[
                          'tag',
                          {
                            'is-danger':
                              tickets.row.laststate == 'Stand By - SLA',
                          },
                          {
                            'is-danger': tickets.row.laststate == 'CP Desistió',
                          },
                          {
                            'is-danger':
                              tickets.row.laststate == 'Protocolo Fallido',
                          },
                          {
                            'is-success':
                              tickets.row.laststate ==
                              'Pruebas Finales Exitosas',
                          },
                          {
                            'is-warning':
                              tickets.row.laststate == 'Lista para iniciar',
                          },
                          {
                            'is-warning':
                              tickets.row.laststate ==
                              'Integración en desarrollo',
                          },
                          {
                            'is-warning':
                              tickets.row.laststate ==
                              'Integración en desarrollo',
                          },
                          {
                            'is-warning':
                              tickets.row.laststate == 'Técnico no responde',
                          },
                          {
                            'is-warning': tickets.row.laststate == 'Stand By',
                          },
                          {
                            'is-warning':
                              tickets.row.laststate ==
                              'Pruebas Finales en Proceso',
                          },
                        ]"
                        size="is-small"
                      >
                        {{ tickets.row.laststate }}
                      </b-button>
                      </div>
                    <b-field label="Estado de Integración">
                      <b-select v-model="selectedIntegrationStatus" required>
                        <option disabled value="">Seleccionar</option>
                        <option
                          v-for="integrationStatus in integrationStatuses"
                          :key="integrationStatus.id"
                          :value="integrationStatus.id"
                        >
                          {{ integrationStatus.name }}
                        </option>
                      </b-select>
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field
                      label="Motivo"
                      v-if="
                        selectedIntegrationStatus == 4 ||
                        selectedIntegrationStatus == 6 ||
                        selectedIntegrationStatus == 7 ||
                        selectedIntegrationStatus == 8 ||
                        selectedIntegrationStatus === null
                      "
                    >
                      <b-select v-model="selectedIntegrationReason">
                        <option disabled value="">Seleccionar</option>
                        <option
                          v-for="statusReason in statusReasons"
                          :key="statusReason.id"
                          :value="statusReason.text"
                        >
                          {{ statusReason.text }}
                        </option>
                      </b-select>
                    </b-field>
                  </div>
                </div>
                <div class="columns">
                  <!-- <div class="column">
                    <b-field label="Fecha de actividad">
                      <b-datepicker
                        disabled
                        placeholder="Type or select a date..."
                        icon="calendar-today"
                        v-model="selectedActivityDate"
                      >
                      </b-datepicker>
                    </b-field>
                  </div> -->
                  <!-- <div class="column">
                    <b-field label="Hora">
                      <b-input v-model="selectedHour" disabled> </b-input>
                    </b-field>
                  </div> -->
                  <div class="column">
                    <b-field label="Tipo de Actividad">
                      <b-select v-model="selectedActivityType" required>
                        <option disabled value="">Seleccionar</option>
                        <option
                          v-for="(activityType, index, value) in activityTypes"
                          :key="value"
                          :value="index"
                        >
                          {{ activityType }}
                        </option>
                      </b-select>
                    </b-field>
                    
                  </div>
                  <div class="column">
                    <b-field label="Duración (min)">
                      <b-select v-model="selectedDuration" required>
                        <option disabled value="">0:00</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                        <option value="90">90</option>
                      </b-select>
                    </b-field>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <b-field label="Descripción">
                      <b-input
                        required
                        maxlength=""
                        type="textarea"
                        v-model="descriptionActivity"
                      ></b-input>
                    </b-field>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-one-third">
                    <b-field label="Responsable">
                      <b-select v-model="selectedUser" required>
                        <option
                          v-for="user in users"
                          :key="user.id"
                          :value="user.id"
                        >
                          {{ user.username }}
                        </option>
                      </b-select>
                    </b-field>
                  </div>
                </div>
              </section>
              <footer class="modal-card-foot">
                <b-button
                  label="Añadir"
                  type="is-primary"
                  @click="
                    confirmTicketStatus(
                      selectedIntegrationStatus,
                      tickets.row.id
                    )
                  "
                />
              </footer>
            </div>
          </b-modal>
          <b-modal v-model="isCardModalActiveDelete" :width="640" scroll="keep">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Seguro de eliminar esta tarea?</p>
                  </div>
                </div>

                <div class="content">
                  <div class="buttons">
                    <b-button
                      type="is-success"
                      v-on:click="deleteTicket(tareas.row.tareaid)"
                      >Si</b-button
                    >
                    <b-button type="is-danger">No</b-button>
                  </div>
                </div>
              </div>
            </div>
          </b-modal>
          <b-modal
            v-model="isCardModalActiveConfirmacion"
            :width="640"
            scroll="keep"
          >
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">{{ validationMessage }}</p>
                  </div>
                </div>

                <div class="content">
                  <div class="buttons">
                    <b-button
                      type="is-success"
                      v-on:click="registarActividad(tareas.row.tareaid)"
                      >Si</b-button
                    >
                    <b-button type="is-danger">No</b-button>
                  </div>
                </div>
              </div>
            </div>
          </b-modal>
        </article>
      </template>
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
            <p>No se encontró información</p>
          </template>
        </div>
      </section>
    </b-table>
    <b-modal v-model="isModalEditTicket" has-modal-card>
      <modal-edit-ticket
        :ticketIdValue="ticketIdValue"
        :validationCode="validationCode"
        :isModalViewEditTicket="isModalEditTicket"
        :endDateEdit="endDateEdit"
      ></modal-edit-ticket>
    </b-modal>
    <b-modal v-model="isModalDeleteTicket" has-modal-card>
      <modal-confirmation-delete-ticket
        :ticketId="ticketId"
        :isModalViewDeleteTicket="isModalDeleteTicket"
      >
      </modal-confirmation-delete-ticket>
    </b-modal>
    <p>Total: {{ recordsNumber }} de {{ dataLength }}</p>
    <div class="top-level">
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
    <aside-tracking-right
      :isModalViewTrackingTable="isModalViewTrackingTable"
      :dataTracking="trashObject"
      v-if="!isAsideFilter"
    />
    <aside-filter-tracking :isViewFilter="isAsideFilter" v-else />
    <b-modal v-model="isModalCreateClientTicket" has-modal-card>
      <modal-create-client-ticket
        :customerTypeToCreateTicket="customerTypeToCreateTicket"
      ></modal-create-client-ticket>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import ModalBox from "@/components/ModalBox";
import AsideTrackingRight from "@/components/AsideTrackingRight";
import AsideFilterTracking from "@/components/AsideFilterTracking";
import { mapActions, mapState } from "vuex";
import dayjs from "dayjs";
import ModalCreateClientTicket from "@/components/ModalCreateClientTicket.vue";
import ModalEditTicket from "@/components/ModalEditTicket.vue";
import router from "../router";
import ModalConfirmationDeleteTicket from "@/components/ModalConfirmationDeleteTicket.vue";
export default {
  name: "MassiveTable",
  components: {
    ModalBox,
    AsideTrackingRight,
    AsideFilterTracking,
    ModalCreateClientTicket,
    ModalEditTicket,
    ModalConfirmationDeleteTicket,
  },
  tareas: {
    keyword: {
      type: String,
    },
  },
  data() {
    return {
      checkboxGroup: [],
      iconFilter: "arrow-down",
      isOpen: false,
      visible: false,
      selectedUser: "",
      isCardModalDeleteTicketConfirmation: false,
      tableActivities: false,
      tickets: [],
      btnShowActivities: true,
      btnHideActivities: false,
      activityTypes: [],
      statuses: [],
      integrationStatuses: [],
      statusReasons: [],
      descriptionActivity: "",
      searchField: "",
      validationCode: "",
      ticketId: "",
      isModalCreateClientTicket: false,
      isModalEditTicket: false,
      isModalDeleteTicket: false,
      users: [],
      current: 1,
      selected: null,
      isModalActive: false,
      isModalViewTrackingTable: false,
      trashObject: null,
      isLoading: false,
      paginated: false,
      perPage: 50,
      dataLength: 0,
      defaultOpenedDetails: [0],
      showDetailIcon: false,
      useTransition: true,
      isCardModalActive: false,
      isCardModalActiveDelete: false,
      isCardModalActiveConfirmacion: false,
      tareas: [],
      selectedActivityDate: new Date(),
      selectedIntegrationStatus: "",
      selectedIntegrationReason: "",
      selectedActivityType: "",
      selectedDuration: "",
      selectedHour: new Date().toLocaleTimeString(),
      selectedStatus: "",
      recordsNumber: "",
      isModalCreateClientTicket: false,
      ticketFilter: {
        userName: "",
        state: [],
        dateStart: "",
        dateEnd: "",
        selectedResponsableFilter: "",

        rdTypeTicket: "",
      },
      endDateEdit: "",
      validationMessage: "",
      type: "",
      // Variables will be use
      jsonLocalStorage: [],
      usernameLC: "",
      customerTypeDefault: "massive",
      isGuest: false,
      ticketType: null,
      filterByDate: null,
      sinceDate: null,
      fromToDate: null,
      selectedUserAssigned: null,
      statusCheckboxGroup: [],

      open: [
        "Integración lista para iniciar",
        "Integración en desarrollo",
        "Técnico no responde",
        "Pruebas Finales Proceso",
        "Pruebas Finales Fallidas",
        "Integración en Stand By",
      ],
      cancel: ["Protocolo Fallido", "CP Desistió", "Stand By - SLA"],
      complete: ["Pruebas Finales Exitosas"],
      selected: [],
      selectedCancel: [],
      selectedComplete: [],
      //allSelected: false,
      allSelectedOpen: false,
      allSelectedCancel: false,
      allSelectedComplete: false,
      selected: [],
      allSelected: false,
      indeterminate: false,
      selected2: [],
      allSelected2: false,
      indeterminate2: false,
      selected3: [],
      allSelected3: false,
      indeterminate3: false,
    };
  },
  props: {
    ticketIdValue: String,
    customerTypeToCreateTicket: String,
  },
  computed: {
    ...mapState(["isAsideFilter"]),
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name;
      }
      return null;
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
    //Keep the order of the fuctions
    this.$root.$refs.A = this;
    //this.getFilter();
    this.getLocalUserInLocalStorage();
    this.getUsers();
    this.getTickets();
    this.getTypeActivities();
    this.getIntegrationStatuses();
  },
  methods: {
    changeIcon() {
      this.iconFilter =
        this.iconFilter === "arrow-down" ? "arrow-up" : "arrow-down";
      if (this.iconFilter == "arrow-down") {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },
    hyphenDateFormat(value) {
      return dayjs(value).format("DD-MM-YYYY");
    },
    slashDateFormat(value) {
      return dayjs(value).format("DD/MM/YYYY");
    },
    stripeDateFormat(value) {
      // return dayjs(value).format("DD/MM/YYYY");
      return dayjs(value).format("YYYY-MM-DD");
    },
    openModalCreateClientTicket() {
      this.isModalCreateClientTicket = true;
      this.customerTypeToCreateTicket = "massive";
    },
    openModalEditTicket(idTicket, endDateValue, statusTicket) {
      if (statusTicket === "cancel" || statusTicket === "complete") {
        this.endDateEdit = this.slashDateFormat(endDateValue);
      } else if (statusTicket == "open") {
        if (typeof endDateValue == undefined) {
          this.endDateEdit = "";
        } else {
          this.endDateEdit = "";
        }
      }
      this.ticketIdValue = idTicket;
      this.validationCode = 99;
      this.isModalEditTicket = true;
    },
    openModalDeleteTicket(value) {
      this.ticketId = value;
      this.isModalDeleteTicket = true;
    },

    viewFilterTicket() {
      this.fromScreenToogleRight(true);
      this.fromScreenFilter(true);
    },
    transitionName() {
      if (this.useTransition) {
        return "fade";
      }
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
    viewTracking(trashObject) {
      this.trashObject = trashObject;
      this.fromScreenToogleRight(true);
      this.fromScreenFilter(false);
      this.isModalViewTrackingTable = true;
    },
    //Count the number of activities by ticket
    getNumberActivities(value) {
      return value.length;
    },
    getFilter() {
      if (JSON.parse(localStorage.getItem("ticketFilter"))) {
        this.ticketFilter = JSON.parse(localStorage.getItem("ticketFilter"));
        if (this.ticketFilter.customerType == "ggee") {
          this.customerTypeDefault = "massive";
          this.ticketFilter.state = [];
        } else {
          this.customerTypeDefault = this.ticketFilter.customerType;
        }
        if (this.ticketFilter.estimatedDate) {
          this.ticketFilter.estimatedDate = new Date(
            this.ticketFilter.estimatedDate
          );
          var dateFlag = `${this.ticketFilter.estimatedDate.getDate()}.${
            this.ticketFilter.estimatedDate.getMonth() + 1
          }.${this.ticketFilter.estimatedDate.getFullYear()}`;
          this.ticketFilter.estimatedDate = dateFlag;
        }
      } else {
        this.customerTypeDefault = "massive";
        this.ticketFilter.state = [];
      }
    },
    getTickets(
      currentValue,
      searchFieldValue,
      statusCheckboxGroupValue,
      ticketTypeValue,
      filterByDateValue,
      sinceDateValue,
      fromToDateValue,
      selectedUserAssignedValue
    ) {
      this.isLoading = true;

      if (
        searchFieldValue ||
        statusCheckboxGroupValue ||
        ticketTypeValue ||
        filterByDateValue ||
        sinceDateValue ||
        fromToDateValue ||
        selectedUserAssignedValue
      )
        if (filterByDateValue == null || filterByDateValue == "") {
          filterByDateValue = "0";
        }
      if (!statusCheckboxGroupValue) {
        statusCheckboxGroupValue = [
          "Integración lista para iniciar",
          "Integración en desarrollo",
          "Técnico no responde",
          "Pruebas Finales Proceso",
        ];
      } else if (statusCheckboxGroupValue) {
        statusCheckboxGroupValue = statusCheckboxGroupValue;
      } else {
        statusCheckboxGroupValue = statusCheckboxGroupValue;
      }
      if (searchFieldValue) {
        statusCheckboxGroupValue = [];
      }
      if (ticketTypeValue == "") {
        statusCheckboxGroupValue = [];
      } else {
        statusCheckboxGroupValue = statusCheckboxGroupValue;
      }

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      };
      axios
        .post(
          `${this.$router.options.baseprod}/Customers/Tickets/Dynamic`,
          {
            pageSize: 50,
            pageNumber: currentValue ? currentValue : 1,
            date_start: sinceDateValue
              ? this.stripeDateFormat(sinceDateValue)
              : "",
            date_end: fromToDateValue
              ? this.stripeDateFormat(fromToDateValue)
              : "",
            state: statusCheckboxGroupValue,
            username: selectedUserAssignedValue,
            code_or_business_ruc: searchFieldValue,
            type_customer: this.customerTypeDefault,
            date_opt: filterByDateValue,
            ticket_reference: ticketTypeValue ? ticketTypeValue : 0,
          },
          axiosConfig
        )
        .then((r) => {
          if (r.data) {
            console.log("eSTADO:", statusCheckboxGroupValue);
            this.tickets = r.data.data;
            this.dataLength = r.data.totalItems;
            this.recordsNumber = this.tickets.length;
            console.log(this.ticketFilter.ticket_reference);
            if (this.tickets.length == 0) {
              this.isLoading = false;
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

    // getTickets() {
    //   this.isLoading = true;
    //   if (this.ticketFilter.filterByDate == null) {
    //     this.ticketFilter.filterByDate = "0";
    //   }
    //   if (this.ticketFilter.state.length == 0) {
    //     this.ticketFilter.state = [
    //       "Integración lista para iniciar",
    //       "Integración en desarrollo",
    //       "Técnico no responde",
    //       "Pruebas Finales Proceso",
    //     ];
    //   }
    //   if (this.searchField || this.ticketFilter.rdTypeTicket) {
    //     this.ticketFilter.state = [];
    //   }

    //   let axiosConfig = {
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   };

    //   axios
    //     .post(
    //       `${this.$router.options.baseprod}/Customers/Tickets/Dynamic`,
    //       {
    //         pageSize: 50,
    //         pageNumber: this.current,
    //         date_start: this.ticketFilter.dateStart
    //           ? this.stripeDateFormat(this.ticketFilter.dateStart)
    //           : "",
    //         date_end: this.ticketFilter.dateEnd
    //           ? this.stripeDateFormat(this.ticketFilter.dateEnd)
    //           : "",
    //         state: this.ticketFilter.state,
    //         username: this.ticketFilter.userName,
    //         code_or_business_ruc: this.searchField,
    //         type_customer: this.customerTypeDefault,
    //         date_opt: this.ticketFilter.filterByDate
    //           ? this.ticketFilter.filterByDate
    //           : 0,
    //         ticket_reference: this.ticketFilter.rdTypeTicket
    //           ? this.ticketFilter.rdTypeTicket
    //           : 0,
    //       },
    //       axiosConfig
    //     )
    //     .then((r) => {
    //       if (r.data) {
    //         this.tickets = r.data.data;
    //         this.dataLength = r.data.totalItems;
    //         this.recordsNumber = this.tickets.length;
    //         console.log(this.ticketFilter.ticket_reference);
    //         if (this.tickets.length == 0) {
    //           this.isLoading = false;
    //         }
    //       }
    //     })
    //     .catch((e) => {
    //       this.$buefy.toast.open({
    //         message: `Error: ${e.message}`,
    //         type: "is-danger",
    //       });
    //     });
    // },
    getTypeActivities() {
      axios
        .get(`${this.$router.options.baseprod}/Types/activity`)
        .then((r) => {
          if (r.data) {
            this.activityTypes = r.data.data;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getStatuses() {
      axios
        .get(`${this.$router.options.baseprod}/Types/status`)
        .then((r) => {
          if (r.data) {
            this.statuses = r.data.data;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getIntegrationStatuses() {
      axios
        .get(`${this.$router.options.baseprod}/Status?type_customer=massive`)
        .then((r) => {
          if (r.data) {
            this.integrationStatuses = r.data.data;
            console.log("WADAS", this.integrationStatuses);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getStatusReason() {
      axios
        .get(
          `${this.$router.options.baseprod}/StatusReason?status_id=${this.selectedIntegrationStatus}&pageSize=50`
        )
        .then((r) => {
          if (r.data) {
            this.statusReasons = r.data.data;
            console.log("AEA MONGOL", this.statusReasons);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    registerActivity(value) {
          axios
            .post(`https://appizipayweb.azurewebsites.net/api/v1/Activities`, {
              description: this.descriptionActivity,
              type: this.selectedActivityType.toString(),
              user_id: this.selectedUser,
              ticket_id: value,
              session_time: this.selectedDuration,
              status_id: this.selectedIntegrationStatus,
              reason: this.selectedIntegrationReason,
            })
            .then((r) => {
              if (r.status === 200) {
                this.$buefy.toast.open({
                  message: `Actividad Registrada!`,
                  type: "is-success",
                });
                this.getTickets();
                this.isCardModalActive = false;
                this.selectedActivityDate = new Date();
                this.selectedActivityType = "";
                this.selectedDuration = "";
                this.selectedHour = new Date().toLocaleTimeString();
                this.selectedStatus = "";
                this.selectedIntegrationStatus = "";
                this.selectedIntegrationReason = "";
                this.descriptionActivity = "";
                this.isCardModalActiveConfirmacion = false;
                this.getTickets();
              }
            })
            .catch((e) => {
              if (e.message == "Request failed with status code 400") {
                this.$buefy.toast.open({
                  message: `Valida que todos los datos esten completos`,
                  type: "is-danger",
                });
              } else {
                console.log(e.message);
                this.$buefy.toast.open({
                  message: `Error: ${e.message}`,
                  type: "is-danger",
                });
              }
            });
        },
    confirmTicketStatus(value, ticketid) {
      if (value == "cancel") {
        this.isCardModalActiveConfirmacion = true;
        this.validationMessage = "¿Esta seguro de cancelar la integración?";
      } else if (value == 9) {
        this.ticketIdValue = ticketid;
        this.validationCode = value;
        this.isModalEditTicket = true;
        this.registerActivity(ticketid);
        isCardModalActive = false;
      } else {
        this.registerActivity(ticketid);
      }
    },

    redirectToExcelUpload() {
      window.open("https://forms.office.com/r/1CVkF5i2md", "_blank");
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
            console.log("El usuario es", this.integradorDefault.email);
            this.selectedUser = this.integradorDefault.id;
            if (this.integradorDefault.email != "sholguin@izipay.pe") {
              this.isGuest = true;
            }
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Su usuario tiene acciones limitadas`,
            type: "is-warning",
          });
          this.isGuest = false;
        });
    },

    getLocalUserInLocalStorage() {
      this.usernameLC = localStorage.getItem("myUser");
      this.jsonLocalStorage = JSON.parse(this.usernameLC);
      this.userNameLocal = this.jsonLocalStorage.userName.split(" ");
      this.userNameLocal = String(
        this.userNameLocal[0] + " " + this.userNameLocal[1]
      );
    },
  },
  watch: {
    // perPage: function () {
    //   this.getTickets(this.current, this.perPage, this.checkboxGroup);
    //   console.log("grup2", this.checkboxGroup);
    // },
    current: function () {
      this.getTickets(this.current, "", this.checkboxGroup);
      console.log("grupo ", this.checkboxGroup);
    },
    selectedIntegrationStatus: function () {
      if (this.selectedIntegrationStatus !== "") {
        this.getStatusReason();
      }
      if (this.selectedIntegrationStatus == "5") {
        this.descriptionActivity =
          "Integración con pruebas finales en test y producción exitosas.";
           this.selectedActivityType = "";
        this.selectedDuration = "";
      } else if (this.selectedIntegrationStatus == "9") {
        this.descriptionActivity = "Se envía correo de confirmación.";
        this.selectedActivityType = "email";
        this.selectedDuration = "5";
      } else if (this.selectedIntegrationStatus == "4") {
        this.descriptionActivity = "Se envía correo de stand by.";
        this.selectedActivityType = "email";
        this.selectedDuration = "5";
      
      } else if (this.selectedIntegrationStatus == "8") {
        this.descriptionActivity = "Se cancela por SLA 2 semanas";
        this.selectedActivityType = "message";
        this.selectedDuration = "5";
        this.selectedIntegrationReason = "SLA 2 semanas";
      }else{
         this.descriptionActivity = "";
        this.selectedActivityType = "";
        this.selectedDuration = "";
      }
    },
  },
};
</script>

<style scoped>
.button-icon {
  margin-right: 1.5rem;
}

.top-level {
  padding: 1.125rem 1.5rem;
  padding-left: 0.7rem;
  padding-right: 1rem;
  overflow: hidden;
  margin: 0;
  border-top: rgba(24, 28, 33, 0.06);
  background: whitesmoke;
}

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

.input-search {
  width: 430px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
}

.input-search :focus {
  border-color: #acabab;
}

.modal-close {
  visibility: hidden !important;
}

.search-box {
  position: relative;
  top: 0%;
  left: 60%;
  transform: translate(-50%, -50%);
  height: 60px;
  background: #0f77ea;
  line-height: 40px;
  padding: 10px;
  border-radius: 60px;
  cursor: pointer;
  box-sizing: border-box;
}

.search-input {
  background: #0f77ea;
  color: #fff;
  outline: none;
  border: none;
  line-height: 40px;
  width: 0px;
  float: left;
  font-size: 1em;
  transition: 0.7s ease;
  padding: 0px 0px 0px 5px;
}
.buttons {
  margin-top: 0.5rem;
}

.search-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background: #353535;
  padding: 12px;
  border-radius: 50%;
  float: right;
  color: #22ffc0;
  transition: 0.4s ease;
}

.search-box:hover > .search-input,
.search-input:focus {
  width: 240px;
  margin: 0px 8px;
}

.search-box:hover > .search-btn,
.search-input:focus + .search-btn {
  background: #22ffc0;
  color: #101010;
}
</style>
