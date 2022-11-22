<template>
  <div>
    <section class="section is-main-section">
      <title-bar :title-stack="titleStack" />
      <br />

      <dashboard  />
      <!-- <card-component title="Integraciones" icon="finance" header-icon="reload">
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart
            ref="bigChart"
            style="height: 100%"
            chart-id="big-line-chart"
            :chart-data="defaultChart.chartData"
            :extra-options="defaultChart.extraOptions"
          >
          </line-chart>
        </div>
      </card-component> -->

      <!-- <tiles>
        <pie-chart
          ref="bigChart"
          style="height: 100%"
          chart-id="big-pie-chart"
          :chart-data="defaultChart.chartDataTipoDesarrollo"
          :extra-options="defaultChart2.extraOptions"
        >
        </pie-chart>
        <pie-chart
          ref="bigChart"
          style="height: 100%"
          chart-id="big-pie-chart"
          :chart-data="defaultChart.chartData"
          :extra-options="defaultChart.extraOptions"
        >
        </pie-chart>
        <pie-chart
          ref="bigChart"
          style="height: 100%"
          chart-id="big-pie-chart"
          :chart-data="defaultChart.chartData"
          :extra-options="defaultChart.extraOptions"
        >
        </pie-chart>
      </tiles> -->

      <!-- <card-component title="Clients" class="has-table has-mobile-sort-spaced">
        <clients-table-sample
          :data-url="`${$router.options.base}data-sources/clients.json`"
        />
      </card-component> -->
    </section>
    <!-- <under-construction/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import * as chartConfig from "@/components/Charts/chart.config";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import Tiles from "@/components/Tiles";
import CardWidget from "@/components/CardWidget";
import CardComponent from "@/components/CardComponent";
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import ClientsTableSample from "@/components/ClientsTableSample";
import { mapActions } from "vuex";
import Dashboard from "@/components/Dashboard";
import UnderConstruction from "@/components/UnderConstruction.vue";
import VueApexCharts from "vue-apexcharts";
import axios from "axios";
import { name } from "@azure/msal-browser/dist/packageMetadata";
export default {
  name: "Home",
  components: {
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
    apexchart: VueApexCharts,
  },
  data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain,
      },
      defaultChart2: {
        chartDataTipoDesarrollo: null,
        extraOptions2: chartConfig.chartOptionsMain,
      },
      ticketReport: [],
      ticketsByType: [],
      openNumber: [],
      cancelNumber: "",
      completeNumber: "",
      series: [
        {
          name: "Cancelado",
          data: [156, 96, 149, 68],
        },
        {
          name: "Completado",
          data: [441, 242, 348, 243],
        },

        {
          name: "Stand By",
          data: [211, 85, 166, 60],
        },
        { name: "Abiertos", data: [0, 0, 0, 0] },
      ],
      chartOptions: {
        chart: {
          height: 550,
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
          categories: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
          position: "bottom",
          axisBorder: {
            show: true,
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
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          position: "bottom",
          horizontalAlign: "center",
          floating: false,
          fontSize: "14px",
          fontFamily: "Helvetica, Arial",
          fontWeight: 400,
          formatter: undefined,
          inverseOrder: false,
          width: undefined,
          height: undefined,
          tooltipHoverFormatter: undefined,
          customLegendItems: [],
          offsetX: 0,
          offsetY: 0,
          labels: {
            colors: ["#F14667", "#49C68D", "#177DF0", "#FFE74C"],
            useSeriesColors: undefined,
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: ["#F14667", "#49C68D", "#177DF0", "#FFE74C"],
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
          itemMargin: {
            horizontal: 5,
            vertical: 0,
          },
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
        fill: {
          colors: ["#F14667", "#49C68D", "#177DF0", "#FFE74C"],
        },
      },
    };
  },
  computed: {
    titleStack() {
      return [ "Dashboard"];
    },
  },
  mounted() {
    // this.fillChartTipoDesarrollo();

    this.$buefy.snackbar.open({
      message: "Welcome back",
      queue: false,
    });
  },
  methods: {
    getTicketReportsByStatus() {
      axios
        .get(
          `${this.$router.options.baseprod}/TicketReports/ForStatus?type_customer=massive`
        )
        .then((r) => {
          if (r.data) {
            this.ticketReport = r.data.data;
            // this.openNumber = this.ticketReport.totalComplete;
            console.log("Tickets abiertos", this.ticketReport);
            this.fillChartData();

            //this.openNumber = this.series[0].data.push(this.ticketReport.totalComplete) ;
            this.series.push({ name: "Prueba" });
            this.series[0].data.push(this.ticketReport.totalCancel);
            this.series[1].data.push(this.ticketReport.totalComplete);
            //  this.series[2].data.push(this.ticketReport.totalItems);
            this.series[2].data.push(this.ticketReport.totalStandBy);
            this.series[3].data.push(this.ticketReport.totalOpen);
            console.log("HOLA", this.series[3]);
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
        .get(
          `${this.$router.options.baseprod}/TicketReports/ForType?type_customer=massive`
        )
        .then((r) => {
          if (r.data) {
            this.ticketsByType = r.data.data;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    ...mapActions(["fromScreenToogleRight"]),
    randomChartData(n) {
      const data = [];

      // for (let i = 0; i < n; i++) {
      //   data.push(Math.round(Math.random() * 200));
      // }
      data.push(parseInt(n));
      console.log("TOMALO", data);
      return data;
    },
    fillChartData() {
    },
    // fillChartTipoDesarrollo() {
    //   this.defaultChart2.chartDataTipoDesarrollo = {
    //     datasets: [
    //       {
    //         fill: false,
    //         borderColor: chartConfig.chartColors.default.primary,
    //         borderWidth: 2,
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         pointBackgroundColor: chartConfig.chartColors.default.primary,
    //         pointBorderColor: "rgba(255,255,255,0)",
    //         pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
    //         pointBorderWidth: 20,
    //         pointHoverRadius: 4,
    //         pointHoverBorderWidth: 15,
    //         pointRadius: 4,
    //         // data: this.randomChartData(4),
    //          data:this.ticketReport.totalComplete,
    //       },
    //     ],
    //     labels: ["Shopify", "Woocommerce", "PHP", "Android"],
    //   };
    // },
  },
  created() {
    // this.fromScreenToogleRight(false);
    // this.getTicketReportsByStatus();
    // this.getTicketsByType();
    // this.fillChartData();
  },
};
</script>
