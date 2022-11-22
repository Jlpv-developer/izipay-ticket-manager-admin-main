<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
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
              @keyup.native.enter="getTickets(1,  searchField)"
              @icon-right-click="getTickets(1,  searchField)"
              rounded
              expanded
              type="number"
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
                slot="right"
                v-b-tooltip.hover
                title="Cargar Base"
                @click="redirectToExcelUpload()"
                v-if="isGuest"
              >
              </b-button>
              <b-button
                label=""
                type="is-info"
                v-b-tooltip.hover
                title="Agregar Tarea"
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
              </b-button>-->
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
                  native-value="Kick Off"
                  type="is-warning"
                >
                  <span>Kick Off</span>
                </b-checkbox-button>

                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="En proceso"
                  type="is-warning"
                >
                  <span>En proceso</span>
                </b-checkbox-button>

                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Pruebas en producción"
                  type="is-warning"
                >
                  Pruebas en producción
                </b-checkbox-button>

                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Kick Off - Cancelado"
                  type="is-warning"
                >
                  Kick Off - Cancelado
                </b-checkbox-button>
                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Retorno Izipay Comercial"
                  type="is-warning"
                >
                  Retorno Comercial
                </b-checkbox-button>
                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Retorno Técnico"
                  type="is-warning"
                >
                  Retorno Técnico
                </b-checkbox-button>
                <b-checkbox-button
                  size="is-small"
                  v-model="checkboxGroup"
                  native-value="Capacitación BO"
                  type="is-success"
                >
                  Capacitación BO
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
            <b-col cols="auto">
              <b-field label="Tipo de ticket">
                <b-select
                  v-model="ticketType"
                  placeholder="Seleccionar"
                  size="is-small"
                >
                  <option id="0" value="0">Todos</option>
                  <option id="1" value="1">Nuevos</option>
                  <option id="3" value="4">Retorno</option>
                </b-select>
              </b-field>
            </b-col>
            <b-col cols="auto">
              <b-field label="Fechas">
                <b-select
                  v-model="filterByDate"
                  placeholder="Seleccionar"
                  size="is-small"
                >
                  <option id="0" value="0">Cualquiera</option>
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
            <!-- <b-col cols="auto">
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
            </b-col> -->
            <b-col cols="auto">
              <br />
              <div class="buttons">
                <b-button
                  type=""
                  size="is-small"
                  @click.prevent="
                    getTickets(1,
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
    <b-table
      :data="tickets"
      ref="table"
      per-page="50"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="id"
      @details-open="(row) => $buefy.toast.open(`Abriste la tarea ${row.id}`)"
      :show-detail-icon="false"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
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
        label="Nombre Comercial"
        field="codigocomercio"
        sortable
        v-slot="tickets"
        centered
      >
        {{ tickets.row.name }}
      </b-table-column>
      <b-table-column
        label="Código de Comercio"
        field="codigocomercio"
        sortable
        v-slot="tickets"
        centered
      >
        {{ tickets.row.code }}
      </b-table-column>
      <b-table-column
        label="RUC"
        field="status"
        sortable
        v-slot="tickets"
        centered
      >
        <div>{{ tickets.row.business_ruc }}</div>
      </b-table-column>
      <b-table-column
        label="N° Actividades"
        field="number"
        sortable
        v-slot="tickets"
        centered
      >
        {{ getNumberActivities(tickets.row.activities) }}
      </b-table-column>
      <b-table-column
        label="Fecha de Ingreso"
        field="destiny"
        sortable
        v-slot="tickets"
        centered
      >
        <p v-if="tickets.row.activities.length > 0">
          {{ parseDate2(tickets.row.activities.slice(0)[0].created_at) }}
        </p>
        <p v-else>
          {{ "-" }}
        </p>
      </b-table-column>
      <b-table-column
        label="Fecha de Producción"
        field="customer"
        sortable
        v-slot="tickets"
        centered
      >
        <p v-if="tickets.row.production_date">
          {{ parseDate2(tickets.row.production_date) }}
        </p>
        <p v-else>
          {{ "Por definir" }}
        </p>
      </b-table-column>
      <b-table-column
        label="Fecha Fin"
        field="customer"
        sortable
        v-slot="tickets"
        centered
        v-if="visible"
      >
        <p
          v-if="
            tickets.row.status == 'complete' || tickets.row.status == 'cancel'
          "
        >
          {{ parseDate2(tickets.row.activities.slice(-1)[0].created_at) }}
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
      <b-table-column
        label="Estado"
        field="orderId"
        sortable
        v-slot="tickets"
        centered
      >
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
        label="🛠"
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
            v-b-tooltip.hover
            title="Eliminar tarea"
            icon-right="delete"
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
                {
                  'is-danger': tickets.row.laststate == 'Retorno Técnico',
                },
                {
                  'is-danger': tickets.row.laststate == 'Retorno Comercial',
                },
                {
                  'is-danger':
                    tickets.row.laststate == 'No Iniciado - Cancelado',
                },
                {
                  'is-success': tickets.row.laststate == 'Capacitación BO',
                },
                {
                  'is-warning': tickets.row.laststate == 'No Iniciado',
                },
                {
                  'is-warning': tickets.row.laststate == 'Kick Off',
                },
                {
                  'is-warning': tickets.row.laststate == 'En proceso',
                },
                {
                  'is-warning': tickets.row.laststate == 'Técnico no responde',
                },
                {
                  'is-warning': tickets.row.laststate == 'Stand By',
                },
                {
                  'is-warning':
                    tickets.row.laststate == 'Pruebas Finales en Proceso',
                },
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
                    {{ tickets.row.activities[0].description }}
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
                        Actividad - N° {{ index + 1 }}
                        {{ parseDate2(activity.created_at) }}
                      </p>
                      {{ activity.description }}
                    </div>
                  </b-message>
                </div>
              </div>
            </div>
          </div>
          <b-modal v-model="isCardModalActive" :width="850" scroll="keep">
            <div class="modal-card" style="width: auto">
              <header class="modal-card-head">
                <p class="modal-card-title">Agregar Actividad</p>
                 <p>
                  {{ selectedHour }} -
                  {{ slashDateFormat(selectedActivityDate) }}
                </p>
                <!-- <button type="button" class="delete" @click="$emit('close')" /> -->
              </header>
              <section class="modal-card-body">
             
                 <div class="buttons">
                      <b-button
                        class="button-icon"
                        label=""
                        :type="[
                          {
                            'is-danger':
                              tickets.row.laststate == 'Retorno Técnico',
                          },
                          {
                            'is-danger':
                              tickets.row.laststate == 'Retorno Comercial',
                          },
                          {
                            'is-danger':
                              tickets.row.laststate ==
                              'No Iniciado - Cancelado',
                          },
                          {
                            'is-success':
                              tickets.row.laststate == 'Capacitación BO',
                          },
                          {
                            'is-warning':
                              tickets.row.laststate == 'No Iniciado',
                          },
                          {
                            'is-warning': tickets.row.laststate == 'Kick Off',
                          },
                          {
                            'is-warning': tickets.row.laststate == 'En proceso',
                          },
                          {
                            'is-warning':
                              tickets.row.laststate == 'Listo para iniciar',
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
                  <!-- <div class="column">
                    <b-field label="Estado">
                      <b-select v-model="selectedStatus" required>
                        <option disabled value="">Selecciona Estado</option>
                        <option
                          v-for="(status, index, value) in statuses"
                          :key="value"
                          :value="index"
                        >
                          {{ status }}
                        </option>
                      </b-select>
                    </b-field>
                  </div> -->
                  <div class="column">
                    <b-field label="Estado de Integración">
                      <b-select v-model="selectedIntegrationStatus">
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
                      v-if="selectedIntegrationStatus == 11"
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
                  <div class="column">
                    <b-field label="Descripción">
                      <b-input
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
                      <b-select v-model="selectedResponsable">
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

          <b-modal v-model="isCardModalActive2" :width="640" scroll="keep">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Editar tarea</p>
                  </div>
                </div>

                <div class="content" v-if="tareaData">
                  <b-field label="Nombre de la Tarea">
                    <b-input v-model="tareaData.nombretarea"> </b-input>
                  </b-field>
                  <b-field label="Fecha de creacion (CRM)">
                    <b-datepicker
                      placeholder="Type or select a date..."
                      icon="calendar-today"
                      v-model="selectedFechaCreacion"
                      disabled
                    >
                    </b-datepicker>
                  </b-field>
                  <b-field label="Fecha de Ingreso">
                    <b-datepicker
                      placeholder="Type or select a date..."
                      icon="calendar-today"
                      v-model="selectedFechaIngreso"
                      disabled
                    >
                    </b-datepicker>
                  </b-field>
                  <b-field label="Tipo de Cliente">
                    <b-select v-model="selectedCliente">
                      <option
                        v-for="cliente in tipoClientes"
                        :key="cliente.tipoclienteid"
                        :value="cliente.tipoclienteid"
                      >
                        {{ cliente.nombretipocliente }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-field label="Tipo de Desarrollo">
                    <b-select v-model="selectedDesarrollo">
                      <option
                        v-for="plugin in plugins"
                        :key="plugin.tipodesarrolloid"
                        :value="plugin.tipodesarrolloid"
                      >
                        {{ plugin.nombretipodesarrollo }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-field label="Tipo de Implementacion">
                    <b-select v-model="selectedImplementacion">
                      <option
                        v-for="implementacion in implementaciones"
                        :key="implementacion.tipoimplementacionid"
                        :value="implementacion.tipoimplementacionid"
                      >
                        {{ implementacion.nombretipoimplementacion }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-field label="Tipo de Formulario">
                    <b-select v-model="selectedFormulario">
                      <option
                        v-for="formulario in formularios"
                        :key="formulario.idtipoformulario"
                        :value="formulario.idtipoformulario"
                      >
                        {{ formulario.nombretipoformulario }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-button
                    type="is-success"
                    @click="isCardModalActive2 = false"
                    v-on:click="actualizarTarea()"
                  >
                    Actualizar Datos</b-button
                  >
                </div>
              </div>
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
        :initDateColunm="initDateColunm"
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
    
    <p>Total: {{ recordsNumber }} de {{dataLength}}</p>
    <!--<div class="top-level">
			<div class="level-left">
				Ver
				<b-select v-model="perPage" class="perPage">
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
					<option value="20">20</option>
				</b-select>
				elementos por página
			</div>
		
		</div> -->
    <div class="level-right">
      <b-pagination
        :total="dataLength"
        v-model="current"
        :range-before="1"
        :per-page="perPage"
      >
      </b-pagination>
    </div>
    <aside-tracking-right
      :isModalViewTrackingTable="isModalViewTrackingTable"
      :dataTracking="trashObject"
      v-if="!isAsideFilter"
    />
    <aside-filter-GGEE :isViewFilter="isAsideFilter" v-else />
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
import AsideFilterGGEE from "@/components/AsideFilterGGEE";

import AsideTrackingRight from "@/components/AsideTrackingRight";
import { mapActions, mapState } from "vuex";
import dayjs from "dayjs";
import ModalCreateClientTicket from "@/components/ModalCreateClientTicket.vue";
import ModalEditTicket from "@/components/ModalEditTicket.vue";
import router from "../router";
import ModalConfirmationDeleteTicket from "@/components/ModalConfirmationDeleteTicket.vue";

export default {
  name: "GGEETableSample",
  components: {
    ModalBox,
    AsideFilterGGEE,
    ModalCreateClientTicket,
    ModalEditTicket,
    ModalConfirmationDeleteTicket,
    AsideTrackingRight,
  },
  tareas: {
    keyword: {
      type: String,
    },
  },
  data() {
    return {
      ticketType: null,
      filterByDate: null,
      sinceDate: null,
      fromToDate: null,
      selectedUserAssigned: null,
      checkboxGroup: [],
      iconFilter: "arrow-down",
      isOpen: false,
      endDateEdit: "",
      visible: false,
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
      ticketIdValue: "",
      ticketId: "",
      showModal: false,
      isModalCreateClientTicket: false,
      isModalEditTicket: false,
      isModalDeleteTicket: false,
      idStatus: "",
      users: [],
      icons: {
        ABIERTO: ["progress-check"],
        COMPLETADO: ["progress-check"],
        CERRADO: ["progress-check"],
      },
      recordsNumber: "",
      btnAñadirActividad: true,
      btnActualizarActividad: false,
      seen: true,
      current: 1,
      selected: null,
      isModalActive: false,
      isModalViewTrackingTable: false,
      trashObject: null,
      tracking: [],
      isLoading: false,
      paginated: false,
      perPage: 50,
      checkedRows: [],
      dataLength: 0,
      isGuest: false,
      defaultOpenedDetails: [0],
      showDetailIcon: true,
      useTransition: false,
      isCardModalActive: false,
      isCardModalActive2: false,
      isCardModalActiveDelete: false,
      isCardModalActiveConfirmacion: false,
      tareas: [],
      datos: [],
      tareaData: null,
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
      selectedActivityDate: new Date(),
      fechaActividadGet: "",
      selectedIntegrationStatus: "",
      selectedIntegrationReason: "",
      motivos: "",
      selectedActivityType: "",
      selectedDuration: "",
      descripcionActividad: "",
      selectedFechaActivity: new Date(),
      selectedHour: new Date().toLocaleTimeString(),
      selectedResponsable: 1, // For Corporative Bryan is the only Integrator
      estadosBase: [],
      selectedMotivoActividad: "",
      selectedStatus: "",
      tareaActividades: [],
      account: undefined,
      resultls: "{}",
      json: [],
      actividadData: [],
      usernameLC: "",
      integradorDefault: "",
      actividadNumero: "",
      mensajeConfirmacion: "",
      totalRegistros: "",
      ticketFilter: {
        userName: "",
        state: [],
        dateStart: "",
        dateEnd: "",
        selectedResponsableFilter: "",
      },

      customerTypeDefault: "ggee",
      validationCode: "",
      initDateColunm: "",
    };
  },
  props: {
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
    //this.getFilter();
    this.getTickets();
    this.$root.$refs.A = this;
    this.getTypeActivities();
    this.getStatuses();
    this.getIntegrationStatuses();
    //this.getStatusReason();
    this.getUsers();

    // //this.getTickets(1, this.perPage, this.ticketFilter);
    // this.getIntegradores();
    this.obtenerUsuarioLocalStorage();
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
    parseDate(value) {
      console.log(dayjs(value).format("DD-MM-YYYY"));
      return dayjs(value).format("DD-MM-YYYY");
    },
    parseDate2(value) {
      return dayjs(value).format("DD/MM/YYYY");
    },
    stripeDateFormat(value) {
      return dayjs(value).format("YYYY-MM-DD");
    },
    openModalCreateClientTicket() {
      this.isModalCreateClientTicket = true;
      this.customerTypeToCreateTicket = "ggee";
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
    slashDateFormat(value) {
      return dayjs(value).format("DD/MM/YYYY");
    },
    openModalDeleteTicket(value) {
      console.log(value);
      this.ticketId = value;
      this.isModalDeleteTicket = true;
      console.log(this.ticket_id);
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
    trashCancel() {
      this.isModalActive = false;
    },
    viewTracking(trashObject) {
      this.trashObject = trashObject;
      this.fromScreenToogleRight(true);
      this.fromScreenFilter(false);
      this.isModalViewTrackingTable = true;
    },
    getNumberActivities(value) {
      return value.length;
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
          "Kick Off",
          "En proceso",
          "Pruebas en Producción",
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
            ticket_reference: ticketTypeValue ? ticketTypeValue : "0",
          },
          axiosConfig
        )
        .then((r) => {
          if (r.data) {
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

    //   if (localStorage.getItem("ticketFilter")) {
    //     this.ticketFilter = JSON.parse(localStorage.getItem("ticketFilter"));
    //   }
    //   if (this.ticketFilter.filterByDate == null) {
    //     this.ticketFilter.filterByDate = "0";
    //   }
    //   if (this.ticketFilter.state.length == 0) {
    //     this.ticketFilter.state = [
    //       "Kick Off",
    //       "En proceso",
    //       "Pruebas en Producción",
    //     ];
    //   }
    //   if (this.searchField) {
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
    //         this.dataLength = r.data.totalItems;
    //         this.tickets = r.data.data;
    //         this.recordsNumber = this.tickets.length;
    //         console.log(r.data);
    //         if (this.recordsNumber == 0) {
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
        // .get(`${this.$router.options.baselocal}/api/v1/ViewTareasWithoutActividades/Read`)
        .get(`${this.$router.options.baseprod}/Types/activity`)
        .then((r) => {
          if (r.data) {
            this.activityTypes = r.data.data;
            // this.data
            console.log("Tipo de Actividades", this.activityTypes);
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
            // this.data
            console.log("ESTADOS", this.statuses);
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
        .get(`${this.$router.options.baseprod}/Status?type_customer=ggee`)
        .then((r) => {
          if (r.data) {
            this.integrationStatuses = r.data.data;
            // this.data
            console.log("ESTADOS de integracion", this.integrationStatuses);
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
          `${this.$router.options.baseprod}/StatusReason?status_id=${this.selectedIntegrationStatus}`
        )
        .then((r) => {
          if (r.data) {
            this.statusReasons = r.data.data;
            // this.data
            console.log("Razon del Estado", this.statusReasons);
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
          user_id: this.selectedResponsable,
          ticket_id: value,
          session_time: this.selectedDuration,
          status_id: this.selectedIntegrationStatus,
          reason: this.selectedIntegrationReason,
        })
        .then((r) => {
          if (r.status === 200) {
            this.$buefy.toast.open({
              message: `Tarea Actualizada!`,
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
            this.selectedFechaActivity = "";
            this.isCardModalActiveConfirmacion = false;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });

          console.log("prueba", prueba);
        });
    },
    confirmTicketStatus(value, ticketid) {
      if (value == "cancel") {
        this.isCardModalActiveConfirmacion = true;
        this.validationMessage = "¿Esta seguro de cancelar la integración?";
      } else if (value == 16) {
        this.ticketIdValue = ticketid;
        this.validationCode = value;
        this.isModalEditTicket = true;
        this.registerActivity(ticketid);
        isCardModalActive = false;
      } else {
        this.registerActivity(ticketid);
      }
    },
    editTicket(ticketId) {
      axios
        .get(`${this.$router.options.baseprod}/Tickets/${ticketId}`)
        .then((r) => {
          if (r.data) {
            this.statusReasons = r.data.data;
            // this.data
            console.log("Razon del Estado", this.statusReasons);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    redirectToExcelUpload() {
      window.open("https://forms.office.com/r/cfcHU6waKB", "_blank");
    },
    getUsers() {
      axios
        .get(`${this.$router.options.baseprod}/Users`)
        .then((r) => {
          if (r.data) {
            this.users = r.data.data;
            // this.data
            console.log("Usuarios", this.users);
          }
          this.usernameLC = localStorage.getItem("myUser");
          this.json = JSON.parse(this.usernameLC);
          this.integradorDefault = this.users.find(
            (element) => element.email == this.json.userEmail
          );
          if (
            this.integradorDefault.email != "sholguin@izipay.pe" ||
            this.integradorDefault.email != "mc1584@izipay.pe"
            // this.integradorDefault.email != "edgardosamame@hotmail.com"
          ) {
            this.isGuest = true;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getFilter() {
      if (JSON.parse(localStorage.getItem("ticketFilter"))) {
        this.ticketFilter = JSON.parse(localStorage.getItem("ticketFilter"));
        if (this.ticketFilter.customerType == "massive") {
          this.customerTypeDefault = "ggee";
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
        console.log("RESULTADO DE FILTROS", this.ticketFilter);
      } else {
        this.customerTypeDefault = "ggee";
        this.ticketFilter.state = [];
      }
    },
    getIntegradores() {
      axios
        // .get(`${this.$router.options.baselocal}/api/v1/ViewTareasWithoutActividades/Read`)
        .get(`${"https://appizipayweb.azurewebsites.net/api/v1/Usuario/Read"}`)
        .then((r) => {
          if (r.data) {
            this.integradores = r.data;
            this.usernameLC = localStorage.getItem("myUser");
            this.json = JSON.parse(this.usernameLC);
            this.usernameLC = this.json.userName.split(" ");
            this.usernameLC = String(
              this.usernameLC[0] + " " + this.usernameLC[1]
            );

            console.log("Integradores", this.integradores);
            this.integradorDefault = this.integradores.find(
              (element) => element.nombreusuario == this.usernameLC
            );
            this.selectedResponsable = this.integradorDefault.usuarioid;

            console.log(
              "INTEGRADOr SELECCIONADO",
              this.integradorDefault.usuarioid
            );
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },

    obtenerUsuarioLocalStorage() {
      this.usernameLC = localStorage.getItem("myUser");
      this.json = JSON.parse(this.usernameLC);
      this.usernameLC = this.json.userName.split(" ");
      this.usernameLC = String(this.usernameLC[0] + " " + this.usernameLC[1]);
      console.log("USUARIO", this.usernameLC);
    },
  },
  watch: {
    perPage: function () {
      this.getTickets();
    },
   current: function () {
      this.getTickets(this.current, "", this.checkboxGroup);

    },

    selectedIntegrationStatus: function () {
      if (this.selectedIntegrationStatus !== "") {
        this.getStatusReason();
      }
    },
  },
};
</script>

<style scoped>
.button-icon {
  margin-right: 1.5rem;
}
.buttons {
  margin-top: 0.5rem;
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
  width: 480px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
}

.input-search :focus {
  border-color: #acabab;
}
</style>
