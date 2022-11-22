
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
      <p>TIPO DE CLIENTE</p>
      <b-field label="">
        <b-select
          placeholder="Seleccionar"
          v-model="typeCustomerValue"
          expanded
        >
          <option
            v-for="(customerType, index, value) in customerTypes"
            :key="value"
            :value="index"
          >
            {{ customerType }}
          </option>
        </b-select>
      </b-field>

      <p>TIPO DE ATENCIÓN</p>
      <b-field label="">
        <b-select
          placeholder="Seleccionar"
          v-model="attentionTypeValue"
          expanded
        >
          <option
            v-for="typeAttention in typeAttentions"
            :key="typeAttention.id"
            :value="typeAttention.id"
          >
            {{ typeAttention.name }}
          </option>
        </b-select>
      </b-field>
      <!-- <b-field label="">
        <b-select v-model="test">
          <option value="" disabled>Seleccionar</option>
          <option v-for="typeAttention in typeAttentions" :key="typeAttention.id" :value="typeAttention.id">
            {{ typeAttention.name }}
          </option>
        </b-select>
      </b-field> -->
      <p>FECHA DE RECEPCIÓN</p>

      <div class="block">
        <p>Desde</p>
        <b-datepicker
          position="is-bottom-left"
          placeholder="Seleccionar"
          v-model="attentionFilter.dateStart"
        >
        </b-datepicker>
        <p>Hasta</p>
        <b-datepicker
          position="is-bottom-left"
          placeholder="Seleccionar"
          v-model="attentionFilter.dateEnd"
        >
        </b-datepicker>
      </div>

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
  name: "AsideFilterAttention",
  components: {},
  data() {
    return {
      users: [],
      attentionFilter: {
        customerType: "",
        attentionType: "",
        dateStart: new Date(),
        dateEnd: new Date(),
      },
      customerTypes: [],
      typeAttentions: [],
      typeCustomerValue: null,
      attentionTypeValue: null,
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
    ...mapActions(["fromScreenToogleRight", "fromScreenFilter"]),
    closeModalViewTracking() {
      this.fromScreenToogleRight(false);
      this.fromScreenFilter(false);
    },
    getTypeAttention() {
      axios
        .get(
          `${this.$router.options.baseprod}/TypeAttention?pageSize=20&pageNumber=1`
        )
        .then((r) => {
          if (r.data) {
            this.typeAttentions = r.data.data;

            console.log("Tu usuario cmt", this.typeAttentions);
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
      if (JSON.parse(localStorage.getItem("attentionFilter"))) {
        this.attentionFilter = JSON.parse(
          localStorage.getItem("attentionFilter")
        );

        if (this.attentionFilter.estimatedDate) {
          this.attentionFilter.estimatedDate = new Date(
            this.attentionFilter.estimatedDate
          );
        }
      }
    },
    setFilter() {
      this.attentionFilter.customerType = this.customerTypeValue;
      this.attentionFilter.attentionType = this.attentionTypeValue;
      localStorage.setItem(
        "attentionFilter",
        JSON.stringify(this.attentionFilter)
      );
      console.log(this.attentionFilter);
      location.reload();
    },
    prueba() {
      var dateFilter = `${this.attentionFilter.estimatedDate.getDay()}.${this.attentionFilter.estimatedDate.getMonth()}.${this.attentionFilter.estimatedDate.getFullYear()}`;
      console.log("fecha", dateFilter);
    },
    deleteFilter() {
      this.attentionFilter = {
        clientType: "",
        ticketType: "",
        dateStart: "",
        dateEnd: "",
      };
      localStorage.removeItem("attentionFilter");
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
      return dayjs(value).format("DD/MM/YYYY");
    },
  },
  created() {
    this.getFilter();
    this.getTypeAttention();
    this.getCustomerType();
  },
};
</script>

<style scoped>
.aside-icon-close {
  margin-inline-start: 14rem;
  border-color: rgba(0, 0, 0, 0) !important;
}

.space {
  margin-top: -0.5rem;
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
    height: 830px;
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

/* .form-item__element {
  display: inline-block;
  padding: 0.5em;
  vertical-align: middle;
  background: #fff;
  border-radius: 4px;
  border: 1px solid gray;
} */
.select:invalid {
  color: gray !important;
}
/* Fin de dimensiones */
</style>
