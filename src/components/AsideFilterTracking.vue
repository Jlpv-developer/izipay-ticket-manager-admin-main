<template>
  <aside v-show="isAsideFilter" class="aside-right is-placed-right is-expanded">
    <b-button
      class="aside-icon-close"
      size="is-small"
      outlined
      icon-right="close"
      @click="closeModalViewTracking"
    />
    <div class="container">
      <h5 class="title is-6"></h5>

      <!-- <h5 class="subtitle is-5">Estados</h5> -->
      <b></b>
      <hr class="space" />
      <b>ESTADOS</b> 
      <br>
      <b-form-group class="">
        <template #label>
          <b-form-checkbox
            v-model="allSelected"
            :indeterminate="indeterminate"
            aria-describedby="flavours"
            aria-controls="flavours"
            @change="toggleAll"
          >
            <!-- {{ allSelected ? "ABIERTO" : "ABIERTO" }} -->
             <u>Abierto</u>
          </b-form-checkbox>
        </template>
        <template v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
          size="sm"
            id="flavors"
            v-model="selected"
            :options="open"
            :aria-describedby="ariaDescribedby"
            name="flavors"
            class=" "
            aria-label="Individual flavours"
            stacked
          ></b-form-checkbox-group>
        </template>
      </b-form-group>

      <b-form-group class="space">
        <template #label>
          <b-form-checkbox
            v-model="allSelected2"
            :indeterminate="indeterminate2"
            aria-describedby="flavours"
            aria-controls="flavours"
            @change="toggleAll2"
          >
            <!-- {{ allSelected2 ? "CANCELADO" : "CANCELADO" }} -->
            <u>Cancelado</u>
          </b-form-checkbox>
        </template>

        <template v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            id="flavors"
            v-model="selected2"
            :options="cancel"
            :aria-describedby="ariaDescribedby"
            name="flavors"
            class="ml-4"
            aria-label="Individual flavours"
            stacked
          ></b-form-checkbox-group>
        </template>
      </b-form-group>
      <b-form-group class="space">
        <template #label>
          <b-form-checkbox
            v-model="allSelected3"
            :indeterminate="indeterminate3"
            aria-describedby="flavours"
            aria-controls="flavours"
            @change="toggleAll3"
          >
            <!-- {{ allSelected2 ? "COMPLETADO" : "COMPLETADO" }} -->
             <u>Completado</u>
          </b-form-checkbox>
        </template>
        <template v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            id="flavors"
            v-model="selected3"
            :options="complete"
            :aria-describedby="ariaDescribedby"
            name="flavors"
            class="ml-4"
            aria-label="Individual flavours"
            stacked
          ></b-form-checkbox-group>
        </template>
      </b-form-group>
      <br />
      <b>TIPO DE TICKET</b>
      <!-- <h5 class="title is-5">Tipo de ticket</h5> -->
      <!-- <h5 class="subtitle is-5">Tipo de ticket</h5> -->
      <b-field label="">
        <b-select v-model="ticketFilter.rdTypeTicket">
          <option id="" value="" disabled>Seleccionar</option>
          <option id="0" value="0">Todos</option>
          <option id="1" value="1">Nuevos</option>
          <option id="2" value="2">Reingreso</option>
        </b-select>
      </b-field>
      <b>FECHAS</b>
      <div class="block">
        <b-radio
          v-model="ticketFilter.filterByDate"
          name="name"
          native-value="1"
        >
          Fecha de Ingreso
        </b-radio>
        <b-radio
          v-model="ticketFilter.filterByDate"
          name="name"
          native-value="2"
        >
          Fecha de Fin
        </b-radio>

        <p>Desde</p>
        <b-datepicker
          position="is-bottom-left"
          placeholder="Seleccionar"
          v-model="ticketFilter.dateStart"
        >
        </b-datepicker>
        <p>Hasta</p>
        <b-datepicker
          position="is-bottom-left"
          placeholder="Seleccionar"
          v-model="ticketFilter.dateEnd"
        >
        </b-datepicker>
      </div>
      <b>RESPONSABLE</b>
      <b-select v-model="ticketFilter.userName">
        <option id="" value="" disabled>Seleccionar</option>
        <option v-for="user in users" :key="user.id" :value="user.username">
          {{ user.username }}
        </option>
      </b-select>
      <br />
      <center>
        <b-button class="is-rounded" type="is-success" @click="setFilter">
          Aplicar filtros
        </b-button>
        <br />
        <br />
        <a class="label-text a-button" @click="deleteFilter">Limpiar todo</a>
      </center>
    </div>
  </aside>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";

import router from "../router";
export default {
  name: "AsideFilterTracking",
  components: {},
  data() {
    return {
      ticketFilter: {
        userName: "",
        state: null,
        dateStart: "",
        dateEnd: "",
        userName: "",
        filterByDate: "",
        rdTypeTicket: "",
        customerType: "massive",
      },
      carrier: [],
      customer: [],
      users: [],
      selectAll: false,

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
    isViewFilter: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["isAsideFilter"]),
  },
  methods: {
    toggleAll(checked) {
      this.selected = checked ? this.open.slice() : [];
    },
    toggleAll2(checked) {
      this.selected2 = checked ? this.cancel.slice() : [];
    },
    toggleAll3(checked) {
      this.selected3 = checked ? this.complete.slice() : [];
    },
    ...mapActions(["fromScreenToogleRight", "fromScreenFilter"]),
    closeModalViewTracking() {
      this.fromScreenToogleRight(false);
      this.fromScreenFilter(false);
    },
    getFilter() {
      if (JSON.parse(localStorage.getItem("ticketFilter"))) {
        this.ticketFilter = JSON.parse(localStorage.getItem("ticketFilter"));
      }
    },
    setFilter() {
      this.ticketFilter.state = [].concat(
        this.selected,
        this.selected2,
        this.selected3
      );
      localStorage.setItem("ticketFilter", JSON.stringify(this.ticketFilter));
      console.log(this.ticketFilter.state);
      location.reload();
    },
    prueba() {
      var dateFilter = `${this.ticketFilter.estimatedDate.getDay()}.${this.ticketFilter.estimatedDate.getMonth()}.${this.ticketFilter.estimatedDate.getFullYear()}`;
      console.log("fecha", dateFilter);
    },
    deleteFilter() {
      this.ticketFilter = {
        trackingId: null,
        status: [],
        estimatedDate: null,
        destiny: null,
        customer: null,
        orderId: null,
        carrier: null,
      };
      localStorage.removeItem("ticketFilter");
      location.reload();
    },
    getCarrier() {
      axios
        .get(`${this.$router.options.baselocal}/v1/carrier`)
        .then((r) => {
          if (r.data) {
            this.carrier = r.data;
          }
          console.log("carrier: ", this.carrier);
        })
        .catch((e) => {
          this.carrier = [];
        });
    },
    getCustomer() {
      axios
        .get(`${this.$router.options.baselocal}/v1/customer`)
        .then((r) => {
          if (r.data) {
            this.customer = r.data;
          }
          console.log("customer: ", this.customer);
        })
        .catch((e) => {
          this.customer = [];
        });
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
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    parseDate(value) {
      return dayjs(value).format("YYYY-MM-DD");
    },
  },

  created() {
    this.getFilter();
    this.getCarrier();
    this.getCustomer();

    this.getUsers();
  },
  watch: {
    selected(newValue, oldValue) {
      // Handle changes in individual flavour checkboxes
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newValue.length === this.open.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    },
    selected2(newValue, oldValue) {
      // Handle changes in individual flavour checkboxes
      if (newValue.length === 0) {
        this.indeterminate2 = false;
        this.allSelected2 = false;
      } else if (newValue.length === this.cancel.length) {
        this.indeterminate2 = false;
        this.allSelected2 = true;
      } else {
        this.indeterminate2 = true;
        this.allSelected2 = false;
      }
    },
    selected3(newValue, oldValue) {
      // Handle changes in individual flavour checkboxes
      if (newValue.length === 0) {
        this.indeterminate3 = false;
        this.allSelected3 = false;
      } else if (newValue.length === this.complete.length) {
        this.indeterminate3 = false;
        this.allSelected3 = true;
      } else {
        this.indeterminate3 = true;
        this.allSelected3 = false;
      }
    },

    state(newValue, oldValue) {
      // Handle changes in individual flavour checkboxes
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newValue.length === this.open.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    },
    selectedCancel(newValue, oldValue) {
      // Handle changes in individual flavour checkboxes
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelectedCancel = false;
      } else if (newValue.length === this.cancel.length) {
        this.indeterminate = false;
        this.allSelectedCancel = true;
      } else {
        this.indeterminate = true;
        this.allSelectedCancel = false;
      }
    },
    selectedComplete(newValue, oldValue) {
      // Handle changes in individual flavour checkboxes
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelectedComplete = false;
      } else if (newValue.length === this.complete.length) {
        this.indeterminate = false;
        this.allSelectedComplete = true;
      } else {
        this.indeterminate = true;
        this.allSelectedComplete = false;
      }
    },
  },
};
</script>

<style scoped>
.aside-icon-close {
  margin-inline-start: 14.5rem;
  border-color: rgba(0, 0, 0, 0) !important;
}

.space {
  margin-top: 0.5rem;
}

.is-small {
  font-size: 14.5px !important;
}

.container {
  margin: 0 0 0 0.5rem;
}
.label-text {
  margin: 0.5rem 0 0.5rem 0;
}

.a-button {
  color: #cc0000;
  border-color: #cc0000;
  margin: 1rem 0;
}
.label-text.a-button:hover {
  text-decoration: underline #cc0000;
}

/* Dimensiones de pantalla Responsive */
@media only screen and (min-width: 1406px) {
  .aside-right {
    position: absolute;
    height: 970px;
    width: 280px !important;
  }
}

@media (min-width: 1256px) and (max-width: 1405px) {
  .aside-right {
    position: absolute;
    height: 885px;
  }
}

@media (min-width: 1177px) and (max-width: 1255px) {
  .aside-right {
    position: absolute;
    height: 1145px;
  }
}

@media (min-width: 1024px) and (max-width: 1176px) {
  .aside-right {
    position: absolute;
    height: 1145px;
  }
}

@media (min-width: 984px) and (max-width: 1023px) {
  .aside-right {
    position: absolute;
    height: 1145px;
  }
}

@media (min-width: 921px) and (max-width: 983px) {
  .aside-right {
    position: absolute;
    height: 1145px;
  }
}

@media (min-width: 768px) and (max-width: 920px) {
  .aside-right {
    position: absolute;
    height: 1145px;
  }
}
/* Fin de dimensiones */
</style>
