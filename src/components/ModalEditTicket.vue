<template>
  <div class="modal-card" style="width: 850px" v-show="isModalViewEditTicket">
    <header class="modal-card-head">
      <p class="modal-card-title">Editar tarea</p>
      <!-- <button type="button" class="delete" @click="$parent.close()" /> -->
    </header>
    <section class="modal-card-body" v-if="ticketData">
      <div class="columns">
        <div class="column">
          <b-field label="Nombre de la Tarea">
            <b-input v-model="name" required> </b-input>
          </b-field>
        </div>

        <div class="column">
          <b-field label="Tipo de Cliente">
            <b-select v-model="typeCustomer" required>
              <option
                v-for="(customerType, index, value) in customerTypes"
                :key="value"
                :value="index"
              >
                {{ customerType }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Tipo de ticket">
            <b-select
              v-model="typeTicket"
              v-if="typeCustomer == 'ggee'"
              placeholder="Seleccionar"
            >
              <option id="1" value="entry">Nuevo</option>
              <option id="4" value="returned">Retorno</option>
            </b-select>
            <b-select
              v-model="typeTicket"
              v-if="typeCustomer == 'massive'"
              placeholder="Seleccionar"
            >
              <option id="1" value="entry">Nuevo</option>
              <option id="2" value="reentry">Reingreso</option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Autogestión" required>
            <div class="block">
              <b-radio v-model="selfManagement" native-value="1"> Si </b-radio>
              <b-radio v-model="selfManagement" native-value="0"> No </b-radio>
            </div>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column" v-if="ticketData.type_customer == 'ggee'">
          <b-field label="Fecha de Producción">
            <b-datepicker
              placeholder="Seleccionar"
              icon="calendar-today"
              v-model="productionDate"
              :locale="locale"
            >
            </b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Fecha de creación (CRM)">
            <b-datepicker
              placeholder="Seleccionar"
              icon="calendar-today"
              v-model="admissionDate"
              disabled
              :locale="locale"
            >
            </b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Fecha de Ingreso">
            <b-datepicker
              placeholder="Seleccionar"
              icon="calendar-today"
              v-model="initDate"
              disabled
              :locale="locale"
            >
            </b-datepicker>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field label="Fecha Fin">
            <b-datepicker
              placeholder="Seleccionar"
              icon="calendar-today"
              v-model="endDate"
              disabled
              :locale="locale"
            >
            </b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Tipo de Botón">
            <b-select v-model="platform" required>
              <option disabled value="">Seleccionar</option>
              <option
                v-for="(platformType, index, value) in platformTypes"
                :key="value"
                :value="index"
              >
                {{ platformType }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Tipo Implementación" v-if="platform != 'lpd'">
            <b-select v-model="implementation" required>
              <option disabled value="">Seleccionar</option>
              <option
                v-for="(
                  implementationType, index, value
                ) in implementationTypes"
                :key="value"
                :value="index"
              >
                {{ implementationType }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column" v-if="platform != 'lpd'">
          <b-field label="Tipo de Desarrollo">
            <b-select v-model="selectedDevelopment" required>
              <option disabled value="">Seleccionar</option>
              <option
                v-for="developmentType in developmentTypes"
                :key="developmentType.id"
                :value="developmentType.id"
              >
                {{ developmentType.name }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Tipo de Formulario">
            <b-select v-model="typeForm" required>
              <option disabled value="">Seleccionar</option>
              <option
                v-for="(formType, index, value) in formTypes"
                :key="value"
                :value="index"
              >
                {{ formType }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field
            label="Funcionalidades adicionales"
            v-if="ticketData.type_customer == 'ggee' && platform != 'lpd'"
          >
            <b-select
              v-model="functionality"
              required
              placeholder="Seleccionar"
            >
              <option
                v-for="(functionality, index, value) in functionalities"
                :key="value"
                :value="index"
              >
                {{ functionality }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <!-- <b-button label="Cerrar" @click="$parent.close()" /> -->

      <b-button
        v-if="validationCode == 9 || validationCode == 16"
        type="is-success"
        v-on:click="updateTicket(ticketData.id)"
        >Completar Integración</b-button
      >
      <b-button
        v-if="validationCode == 99"
        type="is-primary"
        v-on:click="updateTicket(ticketData.id)"
        >Actualizar
      </b-button>
    </footer>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";
import dayjs from "dayjs";
export default {
  data() {
    return {
      locale: "en-GB",
      ticketData: [],
      id: "",
      name: "",
      typeForm: "",
      typeCustomer: "",
      platform: "",
      customerId: "",
      userId: "",
      implementation: "",
      selectedDevelopment: "",
      customerTypes: [],
      platformTypes: [],
      formTypes: [],
      implementationTypes: [],
      developmentTypes: [],
      endDate: "",
      functionalities: [],
      functionality: null,
      implementationTypeByDevelopment: "",
      selfManagement: false,
      definitionDevelopment: [],
      definitionDevelomentResponse: [],
      definitionDevelopmentId: "",
      admissionDate: "",
      productionDate: "",
      initDate: "",
      typeTicket: null,
    };
  },
  props: {
    endDateEdit: String,
    validationCode: Number,
    ticketIdValue: Number,
    isModalViewEditTicket: { type: Boolean, default: false },
  },
  async created() {
    this.getCustomerType();
    this.getDefinitionDevelopment(this.ticketIdValue);
    this.getDevelopmentType();
    this.getPlatformType();
    this.getFormType();
    this.getImplementationType();
    this.getFunctionalities();
    await this.getTicketById(this.ticketIdValue);
  },

  methods: {
    async getTicketById(ticketId) {
      (this.ticketData = []), console.log(ticketId);
      axios
        .get(`${this.$router.options.baseprod}/Tickets/${ticketId}`)
        .then((r) => {
          if (r.data) {
            this.ticketData = r.data.data;
            this.id = this.ticketData.id; //id del ticket
            this.name = this.ticketData.name;
            this.typeForm = this.ticketData.type_form;
            this.typeCustomer = this.ticketData.type_customer;
            this.admissionDate = new Date(this.ticketData.admission_date);
            this.initDate = new Date(this.ticketData.init_date);
            this.platform = this.ticketData.platform;
            this.customerId = this.ticketData.customer_id;
            this.userId = this.ticketData.user_id;
            this.typeTicket = this.ticketData.type_ticket;
            if (this.ticketData.production_date != null) {
              this.productionDate = new Date(this.ticketData.production_date);
            } else {
              this.productionDate = "";
            }
            if (this.endDateEdit == undefined) {
              this.endDateEdit = this.endDateEdit
                .split("/")
                .reverse()
                .join(",");
              this.endDate = new Date(this.endDateEdit);
            }

            if (this.definitionDevelomentResponse.data == null) {
              this.selfManagement = this.definitionDevelopment.self_management;
              this.selectedDevelopment =
                this.definitionDevelopment.type_development_id;
            }
            this.getImplementationTypeByDevelopment(this.selectedDevelopment);
            console.log("TICKET CONSULTADO", this.ticketData);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            //message: `Completar todos los datos`,
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    parseDate(value) {
      return dayjs(value).format("DD/MM/YYYY");
    },
    parseDate3(value) {
      return dayjs(value).format("YYYY-MM-DD");
    },
    getCustomerType() {
      axios
        .get(`${this.$router.options.baseprod}/Types/customer`)
        .then((r) => {
          if (r.data) {
            this.customerTypes = r.data.data;
            // this.data
            console.log("Tipo de Clientes", this.customerTypes);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getFunctionalities() {
      axios
        .get(`${this.$router.options.baseprod}/Types/functionality`)
        .then((r) => {
          if (r.data) {
            this.functionalities = r.data.data;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getPlatformType() {
      axios
        .get(`${this.$router.options.baseprod}/Types/platform`)
        .then((r) => {
          if (r.data) {
            this.platformTypes = r.data.data;
            console.log("Tipo de Botón", this.platformTypes);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getImplementationType() {
      axios
        .get(`${this.$router.options.baseprod}/Types/implementation`)
        .then((r) => {
          if (r.data) {
            this.implementationTypes = r.data.data;
            // this.data
            console.log("Tipo de Implementacion", this.implementationTypes);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getDevelopmentType() {
      axios
        .get(
          `${this.$router.options.baseprod}/Types/Development?type_implementation=${this.implementation}`
        )
        .then((r) => {
          if (r.data) {
            this.developmentTypes = r.data.data;
            // this.data
            console.log("Tipo de Desarrollo", this.developmentTypes);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getFormType() {
      axios
        .get(`${this.$router.options.baseprod}/Types/form`)
        .then((r) => {
          if (r.data) {
            this.formTypes = r.data.data;
            console.log("Tipo de Formulario", this.formTypes);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },

    async getImplementationTypeByDevelopment(value) {
      console.log("Tipo de implementación ", value);
      axios
        .get(`${this.$router.options.baseprod}/Types/Development/${value}`)
        .then((r) => {
          if (r.data) {
            this.implementationTypeByDevelopment =
              r.data.data.type_implemantion;
            this.implementation = this.implementationTypeByDevelopment;
            // this.data
            console.log(
              "getImplementationTypeByDevelopment",
              this.implementationTypeByDevelopment
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
    updateDefinitionDevelopment(value) {
      if (this.selfManagement == 1) {
        this.selfManagement = true;
      } else {
        this.selfManagement = false;
      }
      axios
        .put(
          `${this.$router.options.baseprod}/DefinitionDevelopment/${value}`,
          {
            id: value,
            ticket_id: this.ticketIdValue,
            type_development_id: this.selectedDevelopment,
            self_management: this.selfManagement,
            observation: this.functionality,
          }
        )
        .then((r) => {
          if (r.data) {
            this.registro = r.data;
            if (this.registro.succeeded == true) {
              console.log("Registro de definición exitosa!");
            }
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            //message: `Completar todos los datos`,
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    getDefinitionDevelopment(value) {
      axios
        .get(
          `${this.$router.options.baseprod}/DefinitionDevelopment?ticket_id=${value}`
        )
        .then((r) => {
          if (r.data) {
            this.definitionDevelomentResponse = r.data;
            this.definitionDevelopment =
              this.definitionDevelomentResponse.data[0];
            this.selectedDevelopment =
              this.definitionDevelopment.type_development_id;

            if (this.definitionDevelopment.self_management == true) {
              this.selfManagement = 1;
            } else {
              this.selfManagement = 0;
            }
            this.definitionDevelopmentId = this.definitionDevelopment.id;
            this.functionality = this.definitionDevelopment.observation;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Completar todos los datos`,
            //message: `Error: ${e.message}`,
            type: "is-warning",
          });
        });
    },
    async updateTicket(ticketId) {
      if (this.ticketData.type_customer == "massive") {
        this.admissionDate = await this.parseDate3(
          this.ticketData.admission_date
        );
        console.log(this.admissionDate);
        axios
          .put(`${this.$router.options.baseprod}/Tickets/${ticketId}`, {
            id: this.id,
            name: this.name,
            type_form: this.typeForm,
            type_customer: this.typeCustomer,
            admission_date: this.admissionDate,
            platform: this.platform,
            customer_id: this.customerId,
            user_id: this.userId,
            type_ticket: this.typeTicket,
          })
          .then((r) => {
            if (r.data) {
              this.dataLength = r.data.totalElements;
              this.registro = r.data;
              console.log("asda  ", this.definitionDevelopmentId);
              this.updateDefinitionDevelopment(this.definitionDevelopmentId);
              if (this.registro.succeeded == true) {
                this.$buefy.toast.open({
                  message: `Ticket Actualizado Correctamente`,
                  type: "is-success",
                });
                this.$root.$refs.A.getTickets(1, 50);
                console.log("SI FUNCIONÓ");
                // this.$emit('close')
                this.$parent.close();
              }
            }
          })
          .catch((e) => {
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: "is-danger",
            });
          });
      } else {
        if (this.productionDate) {
          this.productionDate = this.parseDate(this.productionDate);
        } else {
          this.productionDate = "";
        }
        this.admissionDate = await this.parseDate3(
          this.ticketData.admission_date
        );
        console.log(this.admissionDate);
        axios
          .put(`${this.$router.options.baseprod}/Tickets/${ticketId}`, {
            id: this.id,
            name: this.name,
            type_form: this.typeForm,
            type_customer: this.typeCustomer,
            admission_date: this.admissionDate,
            platform: this.platform,
            customer_id: this.customerId,
            user_id: this.userId,
            production_date: this.productionDate,
          })
          .then((r) => {
            if (r.data) {
              this.dataLength = r.data.totalElements;
              this.registro = r.data;
              console.log("asda  ", this.definitionDevelopmentId);
              this.updateDefinitionDevelopment(this.definitionDevelopmentId);
              if (this.registro.succeeded == true) {
                this.$buefy.toast.open({
                  message: `Ticket Actualizado Correctamente`,
                  type: "is-success",
                });
                this.$root.$refs.A.getTickets(1, 50);
                console.log("SI FUNCIONÓ");
                // this.$emit('close')
                this.$parent.close();
              }
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
  },
  computed: {},
  watch: {
    implementation: function () {
      if (this.implementation !== "") {
        this.getDevelopmentType();
      }
    },
  },
};
</script>
