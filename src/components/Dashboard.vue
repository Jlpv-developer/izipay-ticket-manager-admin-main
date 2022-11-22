<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <div>
      <div>
        <center>
          <h3>Estado mensual de tickets</h3>
          <div>
            <apexchart
              height="350"
              type="line"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </center>
      </div>

      <!-- <b-tabs v-model="activeTab" class="border">
        <b-tab-item label="Estado mensual de tickets">
          
        </b-tab-item>
 <b-tab-item label="Por tipo">
            <b-container class="bv-example-row">
              <b-row>
                <b-col sm="8">
                  <div id="chart">
                    <apexchart
                      type="bar"
                      height="350"
                      :options="chartOptions2"
                      :series="series2"
                    ></apexchart>
                  </div>
                </b-col>
                <b-col sm="1"> </b-col>
                <b-col sm="2">
                  <br />
                  <b-card title="Score" sub-title="comparado al mes anterior:">
                    <b-card-text>
                      <b class="fs-2">
                        {{ this.ticketsByType.totalPreviousPercent }}
                        <b-icon
                          size="is-large"
                          v-if="this.ticketsByType.upOrDown != 'Down'"
                          :type="{
                            'is-success': this.ticketsByType.upOrDown == 'Down',
                          }"
                          icon="arrow-up-thick"
                        ></b-icon>

                        <b-icon
                          size="is-large"
                          :type="{
                            'is-danger': this.ticketsByType.upOrDown == 'Down',
                          }"
                          icon="arrow-down-thick"
                        ></b-icon>
                      </b>
                    </b-card-text>
                  </b-card>
                  <p class="fs-2">Score comparado al mes anterior:</p>
                  <p class="fs-2">
                    {{ this.ticketsByType.totalPreviousPercent }}
                    <b-icon
                      size="is-large"
                      v-if="this.ticketsByType.upOrDown != 'Down'"
                      :type="{
                        'is-success': this.ticketsByType.upOrDown == 'Up',
                      }"
                      icon="arrow-up-thick"
                    ></b-icon>

                    <b-icon
                      size="is-large"
                      :type="{
                        'is-danger': this.ticketsByType.upOrDown == 'Down',
                      }"
                      icon="arrow-down-thick"
                    ></b-icon>
                  </p> 
                </b-col>
              </b-row>
            </b-container>
          </b-tab-item> -->

      <!-- <b-tab-item label="Por autogestión">
            <b-container class="bv-example-row">
              <b-row>
                <b-col>
                  <div id="chart">
                    <apexchart
                      type="bar"
                      height="350"
                      :options="chartOptions3"
                      :series="series3"
                    ></apexchart>
                  </div>
                </b-col>
                <b-col sm="4">
                  <b-card title="Score" sub-title="Cantidad de tickets:">
                    <b-card-text>
                      <b class="fs-2">
                        <p class="fs-4">
                          Gestionados:
                          {{ this.ticketsByTypeManagment.totalManagement }}
                        </p>
                        <p class="fs-4">
                          Autogestionados:
                          {{ this.ticketsByTypeManagment.totalSelfManagement }}
                        </p>
                      </b>
                    </b-card-text>
                  </b-card>
                </b-col>
              </b-row>
            </b-container>
          </b-tab-item> 
      <b-container class="bv-example-row">
        <br /> -->
      <!-- <b-row class="border">
          <b-col>
            <apexchart
              type="pie"
              height="350"
              :options="chartOptions4"
              :series="series4"
            ></apexchart>
          </b-col>
          <b-col>
            <apexchart
              type="pie"
              height="350"
              :options="chartOptions5"
              :series="series5"
            ></apexchart>
          </b-col>
          <b-col>
            <apexchart
              type="pie"
              height="350"
              :options="chartOptions6"
              :series="series6"
            ></apexchart>
          </b-col>
        </b-row> -->
      <!-- <b-tabs v-model="activeTab">
          <b-tab-item label="Tipo de implementación">
            <apexchart
              type="pie"
              height="350"
              :options="chartOptions4"
              :series="series4"
            ></apexchart>
          </b-tab-item>

          <b-tab-item label="Tipo de plataforma">
            <apexchart
              type="pie"
              height="350"
              :options="chartOptions5"
              :series="series5"
            ></apexchart>
          </b-tab-item>

          <b-tab-item label="Tipo de formulario">
            <apexchart
              type="pie"
              height="350"
              :options="chartOptions6"
              :series="series6"
            ></apexchart>
          </b-tab-item>

          <b-tab-item label="Tipo de Lenguaje /  Gestión">
            <div id="chart">
              <apexchart
                type="treemap"
                width="800"
                :options="chartOptions99"
                :series="series99"
              >
              </apexchart>
            </div>
          </b-tab-item>
        </b-tabs> -->

      <!-- <b-container class="bv-example-row">
          <b-row class="">
            <b-col>
              <p>Tarea completadas por semana</p>
              <div id="chart">
                <apexchart
                  type="bar"
                  height="350"
                  :options="chartOptions8"
                  :series="series2"
                ></apexchart>
              </div>
            </b-col>
          </b-row>
        </b-container> -->

      <!-- <b-container class="bv-example-row">
          <b-row>
            <b-col col lg="auto">
              <div class="card-content">
                <div class="content">
                  <p>Tareas Trabajadas</p>
                  <card-widget
                    class="tile is-child"
                    type="is-info"
                    icon="plus-box"
                    :number="this.ticketsByType.totalEntry"
                    label="Tareas Nuevas"
                  />
                </div>
              </div>
            </b-col>
          
          </b-row>
        </b-container> -->

      <!-- <b-row>
          <b-col>
            <div class="columns">
              <div class="column">
                <div class="card">
                  <div class="card-content">
                    <div class="content">
                      <p>Tareas Trabajadas</p>
                      <card-widget
                        class="tile is-child"
                        type="is-info"
                        icon="plus-box"
                        :number="this.ticketsByType.totalEntry"
                        label="Tareas Nuevas"
                      />
                    </div>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <card-widget
                        class="tile is-child"
                        type="is-success"
                        icon="autorenew"
                        :number="this.ticketsByType.totalReEntry"
                        label="Tareas de Reingreso"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="card">
                  <div class="card-content">
                    <div class="content">
                      <p>Total</p>
                      <card-widget
                        class="tile is-child"
                        type="is-danger"
                        icon="face-agent"
                        :number="this.ticketsByType.totalPostSale"
                        label="Tareas de Post Venta"
                      />
                    </div>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <card-widget
                        class="tile is-child"
                        type="is-danger"
                        icon="percent"
                        :number="this.ticketsByType.totalPreviousPercent"
                        label="Comparativo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row> -->
      <!-- </b-container>-->
    </div>

    <div>
      <div class="border">
        <b-row class="">
          <b-col> </b-col>
          <b-col>
            <div class="d-flex flex-row">
              <div class="p-2">
                <b-field label="Año">
                  <b-select v-model="selectedYear">
                    <option disabled value="">2022</option>
                    <option id="2022" selected="selected">2022</option>
                  </b-select>
                </b-field>
              </div>
              <div class="p-2">
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
                    <option
                      v-for="month in months"
                      :key="month.id"
                      :value="month.name"
                    >
                      {{ month.name }}
                    </option> -->
                  </b-select>
                </b-field>
              </div>
            </div>
          </b-col>
          <b-col> </b-col>
        </b-row>

        <b-row class="cards">
          <div class="card">
            <h3>Tareas trabajadas</h3>

            <div class="kpi">
              <div class="num">
                {{ this.ticketsByTypeMonthly.totalItems }}
              </div>
              <div
                class="percent-down"
                v-if="this.ticketsByTypeMonthly.upOrDown == 'Down'"
              >
                {{ this.ticketsByTypeMonthly.totalPreviousPercent }}%
              </div>
              <div
                class="percent-up"
                v-if="this.ticketsByTypeMonthly.upOrDown == 'Up'"
              >
                {{ this.ticketsByTypeMonthly.totalPreviousPercent }}%
              </div>
              <div class="arrow-icon">
                <b-icon
                  size="is-large"
                  v-if="this.ticketsByTypeMonthly.upOrDown != 'Down'"
                  :type="{
                    'is-success': this.ticketsByTypeMonthly.upOrDown == 'Down',
                  }"
                  icon="arrow-up-thick"
                ></b-icon>

                <b-icon
                  size="is-large"
                  :type="{
                    'is-danger': this.ticketsByTypeMonthly.upOrDown == 'Down',
                  }"
                  icon="arrow-down-thick"
                ></b-icon>
              </div>
            </div>
          </div>
          <div class="card">
            <h3>Nuevos</h3>
            <div class="kpi">
              <div class="num">
                {{ this.ticketsByTypeMonthly.totalEntry }}
              </div>
              <div class="arrow-icon">
                <b-icon
                  size="is-large"
                  v-if="this.ticketsByTypeMonthly.upOrDown == 'Down'"
                  :type="{
                    'is-success': this.ticketsByTypeMonthly.upOrDown == 'Down',
                  }"
                  icon="arrow-up-thick"
                ></b-icon>

                <!-- <b-icon
                          size="is-large"
                          :type="{
                            'is-danger': this.ticketsByTypeMonthly.upOrDown == 'Down',
                          }"
                          icon="arrow-down-thick"
                        ></b-icon> -->
              </div>
              <div class="percent-up">21%</div>

              <!-- <div class="percent-down">30%</div> -->
            </div>
          </div>
          <div class="card">
            <h3>Reingreso</h3>

            <div class="kpi">
              <div class="num">
                {{ this.ticketsByTypeMonthly.totalReEntry }}
              </div>
              <div class="arrow-icon">
                <b-icon
                  size="is-large"
                  v-if="this.ticketsByTypeMonthly.upOrDown == 'Down'"
                  :type="{
                    'is-success': this.ticketsByTypeMonthly.upOrDown == 'Down',
                  }"
                  icon="arrow-up-thick"
                ></b-icon>

                <!-- <b-icon
                          size="is-large"
                          :type="{
                            'is-danger': this.ticketsByTypeMonthly.upOrDown == 'Down',
                          }"
                          icon="arrow-down-thick"
                        ></b-icon> -->
              </div>
              <div class="percent-up">30%</div>
              <!-- <div class="percent-down">30%</div> -->
            </div>
          </div>
        </b-row>
        <br />
        <b-row class="cards">
          <!-- <div class="card">
            <h3>Tareas Completadas</h3>
            <div class="kpi">
              <div class="num">
                {{ this.ticketsByTypeMonthlyComplete.totalItems }}
              </div>

              <div
                class="percent-down"
                v-if="this.ticketsByTypeMonthlyComplete.upOrDown == 'Down'"
              >
                {{ this.ticketsByTypeMonthlyComplete.totalPreviousPercent }}%
              </div>
              <div
                class="percent-up"
                v-if="this.ticketsByTypeMonthlyComplete.upOrDown == 'Up'"
              >
                {{ this.ticketsByTypeMonthlyComplete.totalPreviousPercent }}%
              </div>
              <div class="arrow-icon">
                <b-icon
                  size="is-large"
                  v-if="this.ticketsByTypeMonthlyComplete.upOrDown != 'Down'"
                  :type="{
                    'is-success':
                      this.ticketsByTypeMonthlyComplete.upOrDown == 'Down',
                  }"
                  icon="arrow-up-thick"
                ></b-icon>

                <b-icon
                  size="is-large"
                  class="arrow-icon"
                  :type="{
                    'is-danger':
                      this.ticketsByTypeMonthlyComplete.upOrDown == 'Down',
                  }"
                  icon="arrow-down-thick"
                ></b-icon>
              </div>
            </div>
          </div> -->
          <div class="card-graphic card">
            <h3>Tipo de implementación</h3>
            <div id="chart">
              <apexchart
                type="pie"
                width="480"
                :options="dataReportDevelopmentByMonthOptions"
                :series="dataReportDevelopmentByMonth"
              ></apexchart>
            </div>
            <!-- <div class="num">3400</div> -->
          </div>
          <div class="card-graphic card">
            <h3>Tipo de plataforma</h3>
            <div id="chart">
              <apexchart
                type="pie"
                width="480"
                :options="dataReportDevelopmentByMonthOptions2"
                :series="series5"
              ></apexchart>
            </div>
            <!-- <div class="num">3400</div> -->
          </div>
          <div class="card-graphic card">
            <h3>Completados por semana</h3>
            <!-- <div class="num">3400</div> -->
            <div id="chart" class="">
              <apexchart
                type="bar"
                width="700"
                height="350"
                :options="chartOptions8"
                :series="dataReportCompleteAndDevelopmentByWeek"
              ></apexchart>
            </div>
            <b-row class="total-week">
              <b-col class="">
                <center>
                  <p>{{ this.ReportByDevelopmentWeekly[0].totalItems }}</p>
                </center>
              </b-col>
              <b-col class="">
                <center>
                  <p>{{ this.ReportByDevelopmentWeekly[1].totalItems }}</p>
                </center>
              </b-col>
              <b-col class="">
                <center>
                  <p>{{ this.ReportByDevelopmentWeekly[2].totalItems }}</p>
                </center>
              </b-col>
              <b-col class="">
                <center>
                  <p>{{ this.ReportByDevelopmentWeekly[3].totalItems }}</p>
                </center>
              </b-col>
              <b-col class="">
                <center>
                  <p>{{ this.ReportByDevelopmentWeekly[4].totalItems }}</p>
                </center>
              </b-col>
            </b-row>
          </div>

          <div class="card-graphic card">
            <h3>Tipo de lenguaje y tipo de gestión</h3>
            <!-- <div class="num">3400</div> -->
            <div id="chart">
              <apexchart
                type="treemap"
                width="700"
                height="350"
                :options="chartOptions99"
                :series="dataReportLanguagAndTypeManagmentByMonth"
              >
              </apexchart>
            </div>
          </div>

          <div class="card-graphic card">
            <h3>Tipo de formulario</h3>
            <div id="chart">
              <apexchart
                type="bar"
                height="350"
                width="350"
                :options="chartOptions6"
                :series="dataReporFormTypeByMonth"
              ></apexchart>
            </div>
          </div>
          <div class="card-graphic card">
            <h3>Ciclo de vida</h3>
            <div id="chart">
              <apexchart
                type="bar"
                height="350"
                width="350"
                :options="chartOptions88"
                :series="dataReportLifeCycleByMonth"
              ></apexchart>
            </div>
            <!-- <div class="num">3400</div> -->
          </div>
        </b-row>
        <br />
        <b-row class="cards"> </b-row>
        <br />
        <hr />

        <b-row class="large-cards">
          <div class="large-card">
            <h3>Tareas Canceladas</h3>
            <div class="kpi">
              <div class="num">
                {{ this.cancelledTicketReport.totalItems }}
              </div>
              <div class="percent">
                {{ this.ticketsByTypeMonthlyComplete.totalPreviousPercent }}%
              </div>
            </div>
          </div>
        </b-row>
        <b-row class="cards">
          <div class="card-graphic card">
            <h3>Comparativo semanal</h3>
            <!-- <div class="num">3400</div> -->
            <div id="chart">
              <apexchart
                type="bar"
                width="500"
                :options="chartOptions8"
                :series="dataReportCancelledByWeek"
              ></apexchart>
            </div>
          </div>
          <div class="card-graphic card">
            <h3>Estados</h3>
            <div id="chart">
              <apexchart
                type="pie"
                width="450"
                :options="chartOptionsCancelledMotive"
                :series="dataReportCancelledMotive"
              ></apexchart>
            </div>
            <!-- <div class="num">3400</div> -->
          </div>
          <div class="card-graphic card">
            <h3>Motivos</h3>
            <b-table
              :data="data"
              ref="table"
              detailed
              hoverable
              custom-detail-row
              :opened-detailed="['Board Games']"
              :default-sort="['name', 'asc']"
              detail-key="name"
              @details-open="
                (row, index) => $buefy.toast.open(`Expanded ${row.name}`)
              "
              :show-detail-icon="showDetailIcon"
            >
              <b-table-column
                field="name"
                :visible="columnsVisible['name'].display"
                :label="columnsVisible['name'].title"
                width="300"
                sortable
                v-slot="props"
              >
                <template v-if="showDetailIcon">
                  {{ props.row.name }}
                </template>
                <template v-else>
                  <a @click="toggle(props.row)">
                    {{ props.row.name }}
                  </a>
                </template>
              </b-table-column>

              <b-table-column
                field="sold"
                :visible="columnsVisible['sold'].display"
                :label="columnsVisible['sold'].title"
                sortable
                centered
                v-slot="props"
              >
                {{ props.row.sold }}
              </b-table-column>

              <b-table-column
                field="available"
                :visible="columnsVisible['available'].display"
                :label="columnsVisible['available'].title"
                sortable
                centered
                v-slot="props"
              >
                {{ props.row.available }}
              </b-table-column>

              <b-table-column
                :visible="columnsVisible['cleared'].display"
                :label="columnsVisible['cleared'].title"
                centered
                v-slot="props"
              >
                <span
                  :class="[
                    'tag',
                    {
                      'is-danger': props.row.sold / props.row.available <= 0.45,
                    },
                    {
                      'is-success': props.row.sold / props.row.available > 0.45,
                    },
                  ]"
                >
                  {{
                    Math.round((props.row.sold / props.row.available) * 100)
                  }}%
                </span>
              </b-table-column>

              <template slot="detail" slot-scope="props">
                <tr v-for="item in props.row.items" :key="item.name">
                  <td v-if="showDetailIcon"></td>
                  <td v-show="columnsVisible['name'].display">
                    &nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}
                  </td>
                  <td
                    v-show="columnsVisible['sold'].display"
                    class="has-text-centered"
                  >
                    {{ item.sold }}
                  </td>
                  <td
                    v-show="columnsVisible['available'].display"
                    class="has-text-centered"
                  >
                    {{ item.available }}
                  </td>
                  <td
                    v-show="columnsVisible['cleared'].display"
                    class="has-text-centered"
                  >
                    <span
                      :class="[
                        'tag',
                        { 'is-danger': item.sold / item.available <= 0.45 },
                        { 'is-success': item.sold / item.available > 0.45 },
                      ]"
                    >
                      {{ Math.round((item.sold / item.available) * 100) }}%
                    </span>
                  </td>
                </tr>
              </template>
            </b-table>
            <!-- <div id="chart">
              <apexchart
                type="pie"
                width="300"
                :options="chartOptionsCancelledStatus"
                :series="[12,32]"
              ></apexchart>
            </div> -->
            <!-- <div class="num">3400</div> -->
          </div>
        </b-row>

        <hr />
        <p></p>
        <!-- <b-row class="cards">
            <div class="card-graphic card">
              <h3>Tipo de lenguaje y tipo de gestión</h3>
              <div class="num">3400</div> 
              <div id="chart">
                <apexchart
                  type="treemap"
                  width="480"
                  :options="chartOptions99"
                  :series="series99"
                >
                </apexchart>
              </div>
            </div>
            <div class="card-graphic card">
              <h3>Web/App</h3>
              <div id="chart">
                <apexchart
                  type="pie"
                  width="450"
                  :options="chartOptions5"
                  :series="series5"
                ></apexchart>
              </div>
               <div class="num">3400</div> 
            </div>
          </b-row>
          <br>
          <b-row class="cards">
            <div class="card-graphic card">
              <h3>Tipo de formulario</h3>
              <div id="chart">
                <apexchart
                  type="bar"
                  height="350"
                  :options="chartOptions6"
                  :series="series2"
                ></apexchart>
              </div>
            </div>
            <div class="card-graphic card">
              <h3>Ciclo de vida</h3>
              <div id="chart">
                <apexchart
                  type="bar"
                  height="350"
                  :options="chartOptions6"
                  :series="series2"
                ></apexchart>
              </div>
             <div class="num">3400</div>
            </div>
          </b-row> -->

        <!-- <b-container class="bv-example-row">
            <b-row class="">
              <p class="fs-2">Tareas trabajadas</p>
              <b-col col lg="3">
                <b-card
                  title="Tareas nuevas"
                  tag="article"
                  style="max-width: 20rem"
                  class="mb-2"
                >
                  <b-card-text>
                    {{ this.ticketsByTypeMonthly.totalEntry }}
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col col lg="3">
                <b-card
                  title="Tareas reingreso"
                  tag="article"
                  style="max-width: 20rem"
                  class="mb-2"
                >
                  <b-card-text>
                    {{ this.ticketsByTypeMonthly.totalReEntry }}
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col col lg="2">
                <b-card
                  title="Total"
                  tag="article"
                  style="max-width: 20rem"
                  class="mb-2"
                >
                  <b-card-text>
                    {{ this.ticketsByTypeMonthly.totalItems }}
                  </b-card-text>
                </b-card></b-col
              >
              <b-col col lg="2">
                <b-card
                  title="Diferencial"
                  tag="article"
                  style="max-width: 20rem"
                  class="mb-2"
                >
                  <b-card-text>
                    <p>
                      {{ this.ticketsByTypeMonthly.totalPreviousPercent }}
                      <b-icon
                        size="is-large"
                        v-if="this.ticketsByTypeMonthly.upOrDown != 'Down'"
                        :type="{
                          'is-success':
                            this.ticketsByTypeMonthly.upOrDown == 'Up',
                        }"
                        icon="arrow-up-thick"
                      ></b-icon>

                      <b-icon
                        size="is-large"
                        :type="{
                          'is-danger':
                            this.ticketsByTypeMonthly.upOrDown == 'Down',
                        }"
                        icon="arrow-down-thick"
                      ></b-icon>
                    </p>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col>
                <p class="fs-2">Tareas completadas</p>
                <b-card
                  title="Total"
                  tag="article"
                  style="max-width: 20rem"
                  class="mb-2"
                >
                  <b-card-text>
                    <p>
                      {{ this.ticketsByTypeMonthly.totalItems }}
                    </p>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col> </b-col>
            </b-row>
          </b-container> -->
        <!-- <div>
            <b-row>
              <b-col cols="4">
                <b-card
                  title="Tipo de implemetación"
                  tag="article"
                  style="max-width: 50rem"
                  class="mb-2"
                >
                  <b-card-text>
                    <apexchart
                      type="pie"
                      height="350"
                      :options="chartOptions4"
                      :series="series4"
                    ></apexchart>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col cols="4">
                <b-card
                  title="Tipo de implemetación"
                  tag="article"
                  style="max-width: 50rem"
                  class="mb-4"
                >
                  <b-card-text>
                    <apexchart
                      type="pie"
                      width="250"
                      :options="chartOptions5"
                      :series="series5"
                    ></apexchart>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col cols="4">
                <b-card
                  title="Tipo de formulario"
                  tag="article"
                  style="max-width: 50rem"
                  class="mb-2"
                >
                  <b-card-text>
                    <apexchart
                      type="pie"
                      height="280"
                      :options="chartOptions6"
                      :series="series6"
                    ></apexchart>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </div> -->
      </div>
    </div>
    <!-- <div id="chart">
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
:series="series"
      ></apexchart>
    </div> -->

    <aside-tracking-right
      :isModalViewTrackingTable="isModalViewTrackingTable"
      :dataTracking="trashObject"
      v-if="!isAsideFilter"
    />
    <aside-filter-GGEE :isViewFilter="isAsideFilter" v-else />
  </div>
</template>

<script>
// import { myGlobalFuctions } from "@/mixins/mixins";
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
import * as chartConfig from "@/components/Charts/chart.config";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import Tiles from "@/components/Tiles";
import CardWidget from "@/components/CardWidget";
import CardComponent from "@/components/CardComponent";
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import ClientsTableSample from "@/components/ClientsTableSample";

import Dashboard from "@/components/Dashboard";
import UnderConstruction from "@/components/UnderConstruction.vue";

import VueApexCharts from "vue-apexcharts";

export default {
  name: "Dashboard",
  components: {
    ModalBox,
    AsideFilterGGEE,
    ModalCreateClientTicket,
    ModalEditTicket,
    ModalConfirmationDeleteTicket,
    AsideTrackingRight,
    apexchart: VueApexCharts,
    ClientsTableSample,
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar,
    PieChart,
    Dashboard,
    UnderConstruction,
  },
  tareas: {
    keyword: {
      type: String,
    },
  },
  // mixins:[myGlobalFuctions],
  data() {
    return {
      data: [
        {
          name: "Board Games",
          sold: 131,
          available: 301,
          items: [
            {
              name: "Monopoly",
              sold: 57,
              available: 100,
            },
            {
              name: "Scrabble",
              sold: 23,
              available: 84,
            },
            {
              name: "Chess",
              sold: 37,
              available: 61,
            },
            {
              name: "Battleships",
              sold: 14,
              available: 56,
            },
          ],
        },
        {
          name: "Jigsaws & Puzzles",
          sold: 88,
          available: 167,
          items: [
            {
              name: "World Map",
              sold: 31,
              available: 38,
            },
            {
              name: "London",
              sold: 23,
              available: 29,
            },
            {
              name: "Sharks",
              sold: 20,
              available: 44,
            },
            {
              name: "Disney",
              sold: 14,
              available: 56,
            },
          ],
        },
        {
          name: "Books",
          sold: 434,
          available: 721,
          items: [
            {
              name: "Hamlet",
              sold: 101,
              available: 187,
            },
            {
              name: "The Lord Of The Rings",
              sold: 85,
              available: 156,
            },
            {
              name: "To Kill a Mockingbird",
              sold: 78,
              available: 131,
            },
            {
              name: "Catch-22",
              sold: 73,
              available: 98,
            },
            {
              name: "Frankenstein",
              sold: 51,
              available: 81,
            },
            {
              name: "Alice's Adventures In Wonderland",
              sold: 46,
              available: 68,
            },
          ],
        },
      ],
      columnsVisible: {
        name: { title: "Estado", display: true },
        sold: { title: "#", display: true },
        available: { title: "%", display: false },
        cleared: { title: "%", display: true },
      },
      showDetailIcon: true,

      series9: [44, 55, 13, 43],
      chartOptions9: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },

      serie8: [
        // {
        //   name: "CMS",
        //   data: [44, 55, 41, 67],
        // },
        // {
        //   name: "Código",
        //   data: [13, 23, 20, 8],
        // },
        // {
        //   name: "Plataforma de tienda",
        //   data: [11, 17, 15, 15],
        // },
      ],
      chartOptions8: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false,
                position: "right",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          // type: "datetime",
          categories: [
            "Semana 1",
            "Semana 2",
            "Semana 3",
            "Semana 4",
            "Semana 5",
          ],
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: 0,
          offsetX: -5,
        },
        fill: {
          opacity: 1,
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
      cancelledTicketReport: "",
      monthCounter: new Date().getMonth() + 1,
      monthArray: [],
      yearArray: [],
      users: "",
      selectedMonth: null,
      selectedYear: "",
      selectedResponsable: "",
      activeTab: 0,
      isModalActive: false,
      isModalViewTrackingTable: false,
      trashObject: null,
      ticketsByTypeStatus: [],
      ticketsByType: [],
      ticketsByTypeManagment: [],
      ticketsByTypeMonthly: [],
      ticketsByTypeMonthlyComplete: [],
      dataReportCancelledByWeek: [],
      reportByDevelopment: [],
      reportByPlatform: [],
      reportByForm: [],
      openNumber: [],
      cancelNumber: "",
      completeNumber: "",
      series3: [],
      series2: [],
      series4: [],
      series5: [],
      series6: [],
      ReportByDevelopmentWeekly: [],
      ReportByDevelopmentWeeklyCancelled: [],
      dataReportCompleteAndDevelopmentByWeek: [],
      dataReportDevelopmentByMonth: [],
      dataReporFormTypeByMonth: [],
      dataReportLifeCycleByMonth: [],
      dataReportCancelledMotive: [],
      dataReportDevelopmentByMonthOptions: {
        chart: {
          width: 500,
          type: "pie",
        },
        legend: {
          position: "left",
          floating: false,
          offsetY: 0,
          offsetX: 0,
        },
        labels: ["CMS", "Código", "Plataforma"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      dataReportDevelopmentByMonthOptions2: {
        chart: {
          width: 500,
          type: "pie",
        },
        legend: {
          position: "left",
          floating: false,
          offsetY: 0,
          offsetX: 0,
        },
        labels: ["Web", "App", "Otros"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      chartOptions4: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["CMS", "Propio", "Plataforma de tienda"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      chartOptionsCancelledMotive: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Protocolo Fallido", "CP Desistió", "Stand By SLA"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      chartOptionsCancelledStatus: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Cancelado", "Completado"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      chartOptions5: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Web", "App"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      //   chartOptions6: {
      //     chart: {
      //       type: "bar",
      //       height: 350,
      //       stacked: true,
      //       toolbar: {
      //         show: true,
      //       },
      //       zoom: {
      //         enabled: true,
      //       },
      //     },
      //     responsive: [
      //       {
      //         breakpoint: 480,
      //         options: {
      //           legend: {
      //             show: false,
      //             position: "bottom",
      //             offsetX: -10,
      //             offsetY: 0,
      //           },
      //         },
      //       },
      //     ],
      //     plotOptions: {
      //       bar: {
      //         horizontal: true,
      //         borderRadius: 10,
      //       },
      //     },
      //      xaxis: {
      //       // type: "datetime",
      //       categories: [
      //         "Incrustado",
      // "Redirección",
      // "Pop-in",
      // "Iframe",
      // "Webview",
      // "SDK",
      // "Otros",

      //       ],
      //     },
      //     legend: {
      //       position: "right",
      //       offsetY: 40,
      //     },
      //     fill: {
      //       opacity: 1,
      //     },
      //   },
      chartOptions88: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: ["1 día", "2 - 3 días", "4 - 5 días", "6+ días"],
        },
      },
      chartOptions6: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },

        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#000000"],
          },
        },
        xaxis: {
          categories: [
            "Incrustado",
            "Redirección",
            "Pop-in",
            "Iframe",
            "Webview",
            "SDK",
            "Otros",
          ],
        },
      },
      chartOptions: {
        noData: {
          text: "Cargando Información...",
        },
        chart: {
          height: 550,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#F14667", "#49C68D", "#177DF0", "#FFE74C"],

        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "",
          align: "left",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: ["Mayo", "Junio", "Julio"],
          title: {
            text: "Mes",
          },
        },
        yaxis: {
          title: {
            text: "",
          },
          min: 0,
          max: 380,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: 0,
          offsetX: -5,
        },
      },

      chartOptions2: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },

        xaxis: {
          categories: ["Junio"],
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
        title: {
          text: "",
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "#444",
          },
        },
      },
      chartOptions3: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },

        xaxis: {
          categories: ["Junio"],
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
        title: {
          text: "",
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "#444",
          },
        },
      },

      series: [],
      dataReportLanguagAndTypeManagmentByMonth: [
        {
          name: "Desktops",
          data: [
            {
              x: "ABC",
              y: 10,
            },
            {
              x: "DEF",
              y: 60,
            },
            {
              x: "XYZ",
              y: 41,
            },
          ],
        },
        {
          name: "Mobile",
          data: [
            {
              x: "ABCD",
              y: 10,
            },
            {
              x: "DEFG",
              y: 20,
            },
            {
              x: "WXYZ",
              y: 51,
            },
            {
              x: "PQR",
              y: 30,
            },
            {
              x: "MNO",
              y: 20,
            },
            {
              x: "CDE",
              y: 30,
            },
          ],
        },
      ],
      chartOptions99: {
        legend: {
          show: false,
        },
        chart: {
          height: 550,
          type: "treemap",
        },
        title: {
          text: "",
          align: "center",
        },
      },
    };
  },
  props: {
    customerTypeToAddTicket: String,
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
    this.setMonthAndYear();
    this.getTicketsByType();
    this.fromScreenToogleRight(false);
    this.getticketsByTypesByStatus();
    this.getticketsByTypesByManagment();
    this.getTicketsByTypeMonthlyWorked();
    this.getTicketsByTypeMonthlyComplete();
    this.getReportByImplementationMonthly();
    this.getReportByPlatformMonthly();
    this.getReportByFormMonthly();
    this.getReportByDevelomentWeekly();
    this.getReportByLifeCycleMonthly();
    this.getReportByCancelledWeekly();
    this.getCancelledTicket();
    this.getReportCancelledMotive();
    // this.treemapTest();
  },
  methods: {
    getReportCancelledMotive(monthValue, yearValue) {
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ForTypeCancel`, {
          type_customer: "massive",
          month: monthValue ? monthValue : this.monthCounter,
          year: yearValue ? yearValue : parseInt(this.yearArray.toString()),
        })
        .then((r) => {
          if (r.data) {
            var reportCancelledMotive = r.data.data;
            // this.reportByPlatform = r.data.data;

            var cancelledMotiveArray = [];

            this.dataReportCancelledMotive.push(
              reportCancelledMotive.totalFailedProtocol,
              reportCancelledMotive.totalCpDesist,
              reportCancelledMotive.totalStandBySla
            );
            // this.dataReportCancelledMotive = [{ data: cancelledMotiveArray }];

            // console.log("reportLifeCycle", reportCancelledMotive);
            // this.dataReportLanguagAndTypeManagmentByMonth.push(
            //   this.reportByPlatform.totalApp,
            //   this.reportByPlatform.totalWeb
            // );
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getReportByLifeCycleMonthly(monthValue, yearValue) {
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ForSla`, {
          type_customer: "massive",
          complete: "true",
          month: monthValue ? [monthValue] : [this.monthCounter],
          year: yearValue ? yearValue : this.yearArray,
        })
        .then((r) => {
          if (r.data) {
            var reportLifeCycle = r.data.data;
            // this.reportByPlatform = r.data.data;
            var lifeCycleArray = [];

            lifeCycleArray.push(
              reportLifeCycle.totalOneDay,
              reportLifeCycle.totalTwotoThreeDays,
              reportLifeCycle.totalFourtoFiveDays,
              reportLifeCycle.totalSixtoMore
            );
            this.dataReportLifeCycleByMonth = [{ data: lifeCycleArray }];
            console.log("reportLifeCycle", dataReportLifeCycleByMonth);
            // this.dataReportLanguagAndTypeManagmentByMonth.push(
            //   this.reportByPlatform.totalApp,
            //   this.reportByPlatform.totalWeb
            // );
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },

    getReportByLanguageAndTypeManagmentMonthly(monthValue, yearValue) {
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ByPlatform`, {
          type_customer: "massive",
          complete: "true",
          month: monthValue ? monthValue : [this.monthCounter],
          year: yearValue ? yearValue : this.yearArray,
        })
        .then((r) => {
          if (r.data) {
            this.reportByPlatform = r.data.data;

            console.log("reportByPlatform", this.reportByPlatform);
            this.dataReportLanguagAndTypeManagmentByMonth.push(
              this.reportByPlatform.totalApp,
              this.reportByPlatform.totalWeb
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

    setMonthAndYear() {
      for (let month = 1; month <= this.monthCounter; month++) {
        this.monthArray.push(month);
      }
      var year = new Date().getFullYear();
      this.yearArray.push(year);
    },
    getticketsByTypesByStatus() {
      this.series = [];

      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ForStatus`, {
          type_customer: "massive",

          month: ["5", "6", "7"],
          year: this.yearArray,
        })
        .then((r) => {
          if (r.data) {
            this.ticketsByTypeStatus = r.data.data;

            console.log(this.ticketsByTypeStatus);
            var cancelArray = [];
            var completeArray = [];
            var standByArray = [];
            var openArray = [];
            for (let i = 0; i < this.ticketsByTypeStatus.length; i++) {
              cancelArray.push(this.ticketsByTypeStatus[i]["totalCancel"]);
              completeArray.push(this.ticketsByTypeStatus[i]["totalComplete"]);
              standByArray.push(this.ticketsByTypeStatus[i]["totalStandBy"]);
              openArray.push(this.ticketsByTypeStatus[i]["totalOpen"]);
            }
            console.log(standByArray, cancelArray, completeArray, openArray);
            var standByObject = { name: "Stand By Deriv.", data: standByArray };
            var cancelObject = { name: "Cancelado", data: cancelArray };
            var completeObject = { name: "Completado", data: completeArray };
            var openObject = { name: "Abierto", data: openArray };
            this.series.push(
              cancelObject,
              completeObject,
              standByObject,
              openObject
            );
            // console.log(this.series);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getTicketsByType() {
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ForType`, {
          type_customer: "massive",
          complete: "false",
          month: [this.monthCounter],
          year: this.yearArray,
        })
        .then((r) => {
          if (r.data) {
            this.ticketsByType = r.data.data;
            console.log("ticketspor tipo", this.ticketsByType.totalEntry);
            var newArray = [];
            var reentryArray = [];
            var postSaleArray = [];

            newArray.push(this.ticketsByType.totalEntry);
            reentryArray.push(this.ticketsByType.totalReEntry);
            postSaleArray.push(this.ticketsByType.totalPostSale);
            console.log("arrays", newArray, reentryArray, postSaleArray);
            var newObject = { name: "Nuevo", data: newArray };
            var reentryAObject = { name: "Reingreso", data: reentryArray };
            var postSaleObject = { name: "Post Venta", data: postSaleArray };
            this.series2.push(newObject, reentryAObject, postSaleObject);
            console.log("Prueba 2", this.series2);
            var chart = new ApexCharts(
              document.querySelector("#chart"),
              options
            );
            chart.render();
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getticketsByTypesByManagment() {
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ForManagement`, {
          type_customer: "massive",
          date_start: "",
          date_end: "",
          month: [this.monthCounter],
          year: this.yearArray,
        })
        .then((r) => {
          if (r.data) {
            this.ticketsByTypeManagment = r.data.data[0];

            console.log("ticketsByTypeManagment", this.ticketsByTypeManagment);
            var managedArray = [];
            var selfManagedArray = [];

            managedArray.push(
              this.ticketsByTypeManagment.totalManagementPercent
            );
            selfManagedArray.push(
              this.ticketsByTypeManagment.totalSelfManagementPercent
            );
            var managedObject = { name: "Gestionados", data: managedArray };
            var selfManagedObject = {
              name: "Autogestionados",
              data: selfManagedArray,
            };
            this.series3.push(managedObject, selfManagedObject);
            console.log("Gestion", this.series3);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getTicketsByTypeMonthlyWorked(monthValue, yearValue) {
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ForType`, {
          type_customer: "massive",
          complete: "false",
          month: monthValue ? [monthValue] : [this.monthCounter],
          year: yearValue ? yearValue : this.yearArray,
        })
        .then((r) => {
          if (r.data) {
            this.ticketsByTypeMonthly = r.data.data;
            console.log("Mes", this.ticketsByTypeMonthly);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getTicketsByTypeMonthlyComplete(monthValue, yearValue) {
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ForType`, {
          type_customer: "massive",
          complete: "true",
          month: monthValue ? [monthValue] : [this.monthCounter],
          year: yearValue ? yearValue : this.yearArray,
        })
        .then((r) => {
          if (r.data) {
            this.ticketsByTypeMonthlyComplete = r.data.data;
            console.log("Mes", this.ticketsByTypeMonthlyComplete);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getReportByDevelomentWeekly(monthValue, yearValue) {
      this.dataReportCompleteAndDevelopmentByWeek = [];
      axios
        .post(
          `${this.$router.options.baseprod}/TicketReports/ForTypeDevelopmentByWeeks`,
          {
            type: "",
            type_customer: "massive",
            month: monthValue ? monthValue : this.monthCounter,
            year: yearValue ? yearValue : parseInt(this.yearArray.toString()),
          }
        )
        .then((r) => {
          if (r.data) {
            var totalCmsArray = [];
            var totalPlatformArray = [];
            var totalCodeArray = [];
            this.ReportByDevelopmentWeekly = r.data.data;
            //this.week1=this.ReportByDevelopmentWeekly[0].totalItems;
            var dataReportDevelopmentByWeek;
            console.log(
              "aqui empieza2 12312",
              this.ReportByDevelopmentWeekly[0]
            );

            for (var i = 0; i < this.ReportByDevelopmentWeekly.length; i++) {
              dataReportDevelopmentByWeek = this.ReportByDevelopmentWeekly[i];
              var totalCms = dataReportDevelopmentByWeek.totalCms;
              var totalCode = dataReportDevelopmentByWeek.totalCode;
              var totalPlatform = dataReportDevelopmentByWeek.totalPlatform;
              totalCmsArray.push(totalCms);
              totalCodeArray.push(totalCode);
              totalPlatformArray.push(totalPlatform);
              //  console.log("repuesta", totalCmsArray);
            }

            console.log("final", totalCmsArray);

            var totalCmsObject = { name: "CMS", data: totalCmsArray };

            var totalCodeObject = { name: "Código", data: totalCodeArray };

            var totalPlatformObject = {
              name: "Plataforma",
              data: totalPlatformArray,
            };

            this.dataReportCompleteAndDevelopmentByWeek.push(
              totalCmsObject,
              totalCodeObject,
              totalPlatformObject
            );
            //  var newArray = [];
            // var reentryArray = [];
            // var postSaleArray = [];

            // newArray.push(this.ticketsByType.totalEntry);
            // reentryArray.push(this.ticketsByType.totalReEntry);
            // postSaleArray.push(this.ticketsByType.totalPostSale);
            // console.log("arrays", newArray, reentryArray, postSaleArray);
            // var newObject = { name: "Nuevo", data: newArray };
            // var reentryAObject = { name: "Reingreso", data: reentryArray };
            // var postSaleObject = { name: "Post Venta", data: postSaleArray };
            // this.series2.push(newObject, reentryAObject, postSaleObject);
            // this.series4.push(
            //   this.reportByDevelopment.totalCms,
            //   this.reportByDevelopment.totalCode,
            //   this.reportByDevelopment.totalPlatform
            // );
            // this.dataReportCompleteAndDevelopmentByWeek.push({name:'CMS',data:totalCmsArray})
            // console.log('s',this.dataReportCompleteAndDevelopmentByWeek);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getReportByCancelledWeekly(monthValue, yearValue) {
      this.dataReportCancelledByWeek = [];
      axios
        .post(
          `${this.$router.options.baseprod}/TicketReports/ForTypeCancelByWeeks`,
          {
            type: "",
            type_customer: "massive",
            month: monthValue ? monthValue : this.monthCounter,
            year: yearValue ? yearValue : parseInt(this.yearArray.toString()),
          }
        )
        .then((r) => {
          if (r.data) {
            var totalFailedProtocolArray = [];
            var totalCpDesistArray = [];
            var totalStandbySlarray = [];
            this.ReportByDevelopmentWeeklyCancelled = r.data.data;

            var dataReportCancelledByWeekValue;
            console.log(
              "aqui empieza3",
              this.ReportByDevelopmentWeeklyCancelled
            );

            for (
              var i = 0;
              i < this.ReportByDevelopmentWeeklyCancelled.length;
              i++
            ) {
              dataReportCancelledByWeekValue =
                this.ReportByDevelopmentWeeklyCancelled[i];
              var totalFailedProtocol =
                dataReportCancelledByWeekValue.totalFailedProtocol;
              var totalCpDesist = dataReportCancelledByWeekValue.totalCpDesist;
              var totalStandbySla =
                dataReportCancelledByWeekValue.totalStandBySla;
              totalFailedProtocolArray.push(totalFailedProtocol);
              totalCpDesistArray.push(totalCpDesist);
              totalStandbySlarray.push(totalStandbySla);
              //  console.log("repuesta", totalFailedProtocol);
            }

            var totalFailedProtocolObject = {
              name: "Protocolo Fallido",
              data: totalFailedProtocolArray,
            };

            var totalCpDesistObject = {
              name: "CP Desistió",
              data: totalCpDesistArray,
            };

            var totalStandBySlaObject = {
              name: "Stand By SLA",
              data: totalStandbySlarray,
            };

            this.dataReportCancelledByWeek.push(
              totalFailedProtocolObject,
              totalCpDesistObject,
              totalStandBySlaObject
            );

            console.log("s123", this.dataReportCancelledByWeek);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getCancelledTicket(monthValue, yearValue) {
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ForTypeCancel`, {
          type_customer: "massive",
          month: monthValue ? monthValue : this.monthCounter,
          year: yearValue ? yearValue : parseInt(this.yearArray.toString()),
        })
        .then((r) => {
          if (r.data) {
            this.cancelledTicketReport = r.data.data;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },

    getReportByImplementationMonthly(monthValue, yearValue) {
      this.dataReportDevelopmentByMonth = [];
      axios
        .post(
          `${this.$router.options.baseprod}/TicketReports/ForTypeDevelopment`,
          {
            type_customer: "massive",
            complete: "true",
            month: monthValue ? [monthValue] : [this.monthCounter],
            year: yearValue ? yearValue : this.yearArray,
          }
        )
        .then((r) => {
          if (r.data) {
            this.reportByDevelopment = r.data.data[0];

            this.dataReportDevelopmentByMonth.push(
              this.reportByDevelopment.totalCms,
              this.reportByDevelopment.totalCode,
              this.reportByDevelopment.totalPlatform
            );
            console.log("Implementacion", this.reportByDevelopment);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getReportByPlatformMonthly(monthValue, yearValue) {
      this.series5 = [];
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ByPlatform`, {
          type_customer: "massive",
          complete: "true",
          month: monthValue ? [monthValue] : [this.monthCounter],
          year: yearValue ? yearValue : this.yearArray,
        })
        .then((r) => {
          if (r.data) {
            this.reportByPlatform = r.data.data;

            console.log("reportByPlatform", this.reportByPlatform);
            this.series5.push(
              this.reportByPlatform.totalWeb,
              this.reportByPlatform.totalApp,
              this.reportByPlatform.totalOther
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
    getReportByFormMonthly(monthValue, yearValue) {
      axios
        .post(`${this.$router.options.baseprod}/TicketReports/ByForm`, {
          type_customer: "massive",
          complete: "true",
          month: monthValue ? [monthValue] : [this.monthCounter],
          year: yearValue ? yearValue : this.yearArray,
        })
        .then((r) => {
          if (r.data) {
            this.reportByForm = r.data.data;

            console.log("reportByForm", this.reportByForm);
            var reportTypeFormValue = [];
            reportTypeFormValue.push(
              this.reportByForm.totalEmbedded,
              this.reportByForm.totalRedirect,
              this.reportByForm.totalPopin,
              this.reportByForm.totalIframe,
              this.reportByForm.totalWebview,
              this.reportByForm.totalSdk,

              this.reportByForm.totalOther
            );

            this.dataReporFormTypeByMonth = [{ data: reportTypeFormValue }];
            console.log("reportTypeFormValue", this.dataReporFormTypeByMonth);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },

    parseDate(value) {
      console.log(dayjs(value).format("DD-MM-YYYY"));
      return dayjs(value).format("DD-MM-YYYY");
    },
    parseDate2(value) {
      return dayjs(value).format("DD/MM/YYYY");
    },
    openModalEditTicket(value, initDateValue) {
      console.log(value);
      this.initDateColunm = initDateValue;
      this.ticketIdValue = value.id;
      (this.validationCode = 99), (this.isModalEditTicket = true);
      console.log(this.ticketIdValue);
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
  },
  watch: {
    selectedMonth: function () {
      this.getTicketsByTypeMonthlyWorked(this.selectedMonth, this.selectedYear),
        this.getTicketsByTypeMonthlyComplete(
          this.selectedMonth,
          this.selectedYear
        ),
        this.getReportByImplementationMonthly(
          this.selectedMonth,
          this.selectedYear
        ),
        this.getReportByPlatformMonthly(this.selectedMonth, this.selectedYear),
        this.getReportByFormMonthly(this.selectedMonth, this.selectedYear);
      this.getReportByDevelomentWeekly(this.selectedMonth, this.selectedYear);
      this.getReportByLifeCycleMonthly(this.selectedMonth, this.selectedYear);
      this.getCancelledTicket(this.selectedMonth, this.selectedYear);
      this.getReportByCancelledWeekly(this.selectedMonth, this.selectedYear);
    },
    selectedYear: function () {
      this.getTicketsByTypeMonthlyWorked(this.selectedMonth, this.selectedYear);
      this.getTicketsByTypeMonthlyComplete(
        this.selectedMonth,
        this.selectedYear
      );
      this.getReportByImplementationMonthly(
        this.selectedMonth,
        this.selectedYear
      );
      this.getReportByPlatformMonthly(this.selectedMonth, this.selectedYear);
      this.getReportByFormMonthly(this.selectedMonth, this.selectedYear);
      this.getReportByDevelomentWeekly(this.selectedMonth, this.selectedYear);
      this.getReportByLifeCycleMonthly(this.selectedMonth, this.selectedYear);
      this.getCancelledTicket(this.selectedMonth, this.selectedYear);
      this.getReportByCancelledWeekly(this.selectedMonth, this.selectedYear);
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
  width: 480px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
}

.input-search :focus {
  border-color: #acabab;
}
.cards-container {
  background-color: #00d2c5;
}
.cards {
  flex: 0 1 34%;
  flex-wrap: wrap;
  justify-content: center;
  /* for vertical aligning */
  /* align-items: right; */
  background-color: #f4f2f2;
  width: 95%;
  border-radius: 6px;
  padding: 20px 0 10px;
  margin: auto;
}
.large-cards {
  flex: auto;
  flex-wrap: wrap;
  justify-content: center;
  /* for vertical aligning */
  align-items: center;
}
.large-card {
  border-radius: 6px;
  border: 1px solid #dbdbdb;
  /* box-shadow: 0 3px 10px rgba(62, 85, 120, 0.045) ;
   */
  box-shadow: 0 3px 10px #dbdbdb;
  margin: 0px 8px 10px;
  position: relative;
  /* background-color:; */
  height: 230px;
  padding: 20px;
  width: 20%;
}
.card {
  border-radius: 6px;
  border: 1px solid #dbdbdb;
  /* box-shadow: 0 3px 10px rgba(62, 85, 120, 0.045) ;
   */
  /* box-shadow: 0 3px 10px #dbdbdb; */
  margin: 0 15px 15px;
  position: relative;
  /* background-color:; */
  height: auto;
  padding: 20px;
  width: 30%;
}
.card .icon {
  color: rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 38px;
  bottom: 69px;
  z-index: 1;
}
.card .icon i {
  font-size: 100px;
  line-height: 0;
  margin: 0;
  padding: 0;
  vertical-align: bottom;
}
.card .num,
.card h3 {
  position: relative;
  color: rgb(92, 92, 92);
  z-index: 5;
  margin: 0;
  padding: 0;
}
.card .num {
  font-size: 55px;
  font-weight: bold;
}
.card h3 {
  margin-top: 10px;
  font-size: 20px;
  margin-left: 5px;
}

.card-graphic {
  border-radius: 6px;
  /* border: 1px solid #dbdbdb; */
  /* box-shadow: 0 3px 10px rgba(62, 85, 120, 0.045) ;
   */
  /* box-shadow: 0 3px 10px #dbdbdb;  */
  margin: 0 8px 10px;
  position: relative;
  /* background-color:; */
  height: auto;
  padding: 8px;
  width: auto;
}
.card .percent-up {
  position: relative;
  color: rgb(13, 160, 0);
  z-index: 5;
  margin: 0;

  padding: 40px 0 0 2%;
  font-weight: bold;
}
.card .percent-down {
  position: relative;
  color: rgb(163, 33, 33);
  z-index: 5;
  margin: 0;
  padding: 40px 0 0 2%;
  font-weight: bold;
}

.kpi {
  display: flex;
}

.large-card .icon {
  color: rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 38px;
  bottom: 69px;
  z-index: 1;
}
.large-card .icon i {
  font-size: 100px;
  line-height: 0;
  margin: 0;
  padding: 0;
  vertical-align: bottom;
}
.large-card .num,
.large-card h3 {
  position: relative;
  color: rgb(92, 92, 92);
  z-index: 5;
  margin: 0;
  padding: 0;
}
.large-card .num {
  font-size: 55px;
  font-weight: bold;
}
.large-card h3 {
  margin-top: 10px;
  font-size: 20px;
  margin-left: 5px;
}
.large-card .percent-up {
  position: relative;
  color: rgb(13, 160, 0);
  z-index: 5;
  margin: 0;
  padding: 40px 0 0 2%;
  font-weight: bold;
}
.large-card .percent-down {
  position: relative;
  color: rgb(163, 33, 33);
  z-index: 5;
  margin: 0;
  padding: 40px 0 0 2%;
  font-weight: bold;
}

.mini-card .icon {
  color: rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 38px;
  bottom: 69px;
  z-index: 1;
}
.mini-card .icon i {
  font-size: 100px;
  line-height: 0;
  margin: 100px;
  padding: 0;
  vertical-align: bottom;
}
.mini-card .num,
.mini-card h3 {
  position: relative;
  color: rgb(92, 92, 92);
  z-index: 5;
  margin: 0;
  padding: 0;
}
.mini-card .num {
  font-size: 50px;
  font-weight: bold;
}
.mini-card h3 {
  margin-top: 20px;
  font-size: 20px;
  margin-left: 5px;
}
.mini-card .percent-up {
  position: relative;
  color: rgb(13, 160, 0);
  z-index: 5;
  margin: 0;
  padding: 18.5% 0 0 1%;
  font-weight: bold;
}
.mini-card .percent-down {
  position: relative;
  color: rgb(163, 33, 33);
  z-index: 5;
  margin: 0;
  padding: 18.5% 0 0 1%;
  font-weight: bold;
}

.mini-card {
  border-radius: 6px;
  border: 1px solid #dbdbdb;
  /* box-shadow: 0 3px 10px rgba(62, 85, 120, 0.045) ;
   */
  box-shadow: 0 3px 10px #dbdbdb;
  margin: 0px 8px 10px;
  position: relative;
  background-color: #ffffff;
  height: auto;
  padding: 20px;
  width: 22%;
}
.arrow-icon {
  margin: 110px 0 0 0 !important;
}
.total-week {
  margin: 0 0 0 35px;
}
.total-week .item {
  padding: 0 0 0 10%;
}
</style>
