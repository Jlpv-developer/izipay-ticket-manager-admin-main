<template>
  <form @submit="createTicket">
    <div class="modal-card" style="width: 640px">
      <header class="modal-card-head">
        <p class="modal-card-title">Agregar Nuevo Ticket</p>
        <!-- <button type="button" class="delete" @click="$parent.close()" /> -->
      </header>
      <section class="modal-card-body">
        <!-- <b-field label="Cliente">
          <b-select v-model="typeCustomer">
            <option disabled value="">Selecciona</option>
            <option
              v-for="(customerType, index, value) in customerTypes"
              :key="value"
              :value="index"
            >
              {{ customerType }}
            </option>
          </b-select>
        </b-field> -->
        <b-field label="Tipo de ticket"  v-if="typeCustomer == 'massive'">
          <b-select v-model="ticketType" required placeholder="Seleccionar">
            <option value="entry">Nuevo</option>
            <option value="reentry">Reingreso</option>
          </b-select>
        </b-field>
         <b-field label="Tipo de ticket" v-if="typeCustomer == 'ggee'">
          <b-select v-model="ticketType" required placeholder="Seleccionar">
            <option value="entry">Nuevo</option>
            <option value="returned">Retorno</option>
          </b-select>
        </b-field>
        <b-field label="Código de Comercio">
          <b-input
            placeholder="Agregar datos"
            v-model="commerceId"
            type="number"
            min="0000000"
            max="9999999"
            required
          ></b-input>
        </b-field>
        <b-field label="RUC">
          <b-input
            placeholder="Agregar datos"
            v-model="businessRuc"
            type="number"
            required
          ></b-input>
        </b-field>
        <b-field label="Razón Social">
          <b-input
            placeholder="Agregar datos"
            v-model="businessName"
            required
          ></b-input>
        </b-field>
        <b-field label="Nombre Comercial">
          <b-input
            placeholder="Agregar datos"
            v-model="name"
            required
          ></b-input>
        </b-field>

        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child box">
              <p class="title">Datos del Contacto</p>
              <b-field label="Nombre y Apellidos ">
                <b-input
                  placeholder="Agregar datos"
                  v-model="fullName"
                  required
                ></b-input>
              </b-field>
              <b-field label="Número de Celular">
                <b-input
                  placeholder="Agregar datos"
                  v-model="phone"
                  type="number"
                  required
                ></b-input>
              </b-field>
              <b-field label="Email">
                <b-input
                  placeholder="Agregar datos"
                  v-model="email"
                  required
                ></b-input>
              </b-field>
            </div>
          </div>
        </div>

        <b-field label="Contacto Técnico" v-if="typeCustomer != 'ggee'">
          <b-input
            placeholder="Agregar datos"
            maxlength="200"
            type="textarea"
            v-model="contact"
            required
          ></b-input>
        </b-field>
        <b-field label="Fecha de Ingreso">
          <b-datepicker
            placeholder="Type or select a date..."
            icon="calendar-today"
            v-model="admissionDate"
            disabled
          >
          </b-datepicker>
        </b-field>
        <b-field label="Tipo de Botón">
          <b-select
            v-model="platform"
            required
            validation-message="Por favor seleccione una opción"
          >
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
        <b-field label="Tipo de Implementación" v-if="platform != 'lpd'">
          <b-select
            v-model="implementation"
            required
            validation-message="Por favor seleccione una opción"
          >
            <option disabled value="">Seleccionar</option>
            <option
              v-for="(implementationType, index, value) in implementationTypes"
              :key="value"
              :value="index"
            >
              {{ implementationType }}
            </option>
          </b-select>
        </b-field>
        <b-field label="Tipo de Desarrollo">
          <b-select
            v-model="development"
            required
            v-if="platform != 'lpd'"
            validation-message="Por favor seleccione una opción"
          >
            <option disabled value="">Seleccionar</option>
            <option
              v-for="developmentType in developmentTypes"
              :key="developmentType.id"
              :value="developmentType.name"
            >
              {{ developmentType.name }}
            </option>
          </b-select>
        </b-field>
        <b-field label="Tipo de Formulario">
          <b-select
            v-model="typeForm"
            required
            validation-message="Por favor seleccione una opción"
          >
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
        <b-field label="Necesita?" v-if="typeCustomer != 'ggee'">
          <b-checkbox
            v-model="chkNeedToken"
            name="name"
            native-value="'token': Yes"
          >
            Tokenización
          </b-checkbox>
          <b-checkbox
            v-model="chkNeedRecurrence"
            name="name"
            native-value="'recurrence': Yes"
          >
            Recurrencia
          </b-checkbox>
          <b-checkbox
            v-model="chkNeedIntLink"
            name="name"
            native-value="'integrated_link': Yes"
          >
            Link Integrado
          </b-checkbox>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <!-- <b-button label="Cerrar" @click="$parent.close()" /> -->
        <b-button type="is-primary" v-on:click="createTicket()"
          >Registrar</b-button
        >
      </footer>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
import router from "../router";

import dayjs from "dayjs";
export default {
  data() {
    return {
      ticketType: null,
      fullName: "",
      email: "",
      phone: "",
      contact: "",
      businessName: "",
      businessRuc: "",
      commerceId: "",
      name: "",
      typeCustomer: this.customerTypeToCreateTicket,
      admissionDate: new Date(),
      userId: "",
      typeForm: "",
      platform: "",
      development: "",
      customerTypes: "",
      platformTypes: [],
      formTypes: [],
      estados: [],
      implementation: "",
      implementationTypes: [],
      developmentTypes: [],
      commerceId: "",
      chkNeedToken: false,
      chkNeedRecurrence: false,
      chkNeedIntLink: false,
      valueNeed: "",
      urlRequest: "",
      objectRequest: [],
    };
  },
  props: {
    customerTypeToCreateTicket: "",
  },
  created() {
    this.getCustomerType();
    this.getPlatformType();
    this.getFormType();
    this.getUsers();
    this.getImplementationType();
    this.getDevelopmentType();
    console.log("Tipo de cliente",this.customerTypeToCreateTicket );
  },
  methods: {
    ...mapActions(["parseDate"]),
    async createTicket() {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      };
      if (this.customerTypeToCreateTicket == "massive") {
        if (
          this.fullName &&
          this.email &&
          this.phone &&
          this.contact &&
          this.businessName &&
          this.businessRuc &&
          this.commerceId &&
          this.name &&
          this.customerTypeToCreateTicket &&
          this.admissionDate &&
          this.selectedUser &&
          this.typeForm &&
          this.platform &&
          this.development &&
          this.ticketType
        ) {
          this.urlRequest = `${this.$router.options.baseprod}/Customers/Tickets/Development`;
          axios
            .post(
              this.urlRequest,
              {
                fullname: this.fullName,
                email: this.email,
                phone: this.phone,
                contact: this.contact,
                business_name: this.businessName,
                business_ruc: this.businessRuc,
                code: this.commerceId,
                name: this.name,
                type_customer: this.customerTypeToCreateTicket,
                admission_date: this.parseDate2(this.admissionDate),
                user_id: this.selectedUser,
                type_form: this.typeForm,
                platform: this.platform,
                state_integration: "Integración lista para iniciar",
                type_development: this.development,
                observation: this.rdoNeed,
                integrated_link: "",
                integrated_link_end: this.chkNeedIntLink,
                recurrence: "",
                recurrence_end: this.chkNeedRecurrence,
                token: "",
                token_end: this.chkNeedToken,

                type_ticket: this.ticketType,
              },
              axiosConfig
            )
            .then((r) => {
              if (r.data) {
                this.dataLength = r.data.totalElements;
                this.tipoClientes = r.data;
                if (r.status == 200) {
                  this.$buefy.toast.open({
                    message: `Ticket creado correctamente!`,
                    type: "is-success",
                  });
                  location.reload();
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
          this.$buefy.toast.open({
            message: `Complete todos los datos`,
            type: "is-danger",
          });
        }
      } else if (this.customerTypeToCreateTicket == "ggee") {
        if (
          this.commerceId &&
          this.businessRuc &&
          this.businessName &&
          this.name &&
          this.fullName &&
          this.email &&
          this.phone &&
          this.customerTypeToCreateTicket &&
          this.admissionDate &&
          this.selectedUser &&
         // this.typeForm &&
          //this.platform &&
          //this.development &&
          this.ticketType
        ) {
          this.urlRequest = `${this.$router.options.baseprod}/Customers/Tickets/Development/Corporate`;
          axios
            .post(
              this.urlRequest,
              {
                fullname: this.fullName,
                email: this.email,
                phone: this.phone,
                contact: this.contact,
                business_name: this.businessName,
                business_ruc: this.businessRuc,
                code: this.commerceId,
                name: this.name,
                type_customer: this.customerTypeToCreateTicket,
                admission_date: this.parseDate2(this.admissionDate),
                user_id: this.selectedUser,
                type_form: this.typeForm,
                platform: this.platform,
                state_integration: "Kick Off",
                state_activity: "Abierto",
                type_development: this.development,
                observation: this.rdoNeed,
                integrated_link: "",
                integrated_link_end: this.chkNeedIntLink,
                recurrence: "",
                recurrence_end: this.chkNeedRecurrence,
                token: "",
                token_end: this.chkNeedToken,
                observation: "",
                type_ticket: this.ticketType,
              },
              axiosConfig
            )
            .then((r) => {
              if (r.data) {
                this.dataLength = r.data.totalElements;
                this.tipoClientes = r.data;
                if (r.status == 200) {
                  this.$buefy.toast.open({
                    message: `Ticket creado correctamente!`,
                    type: "is-success",
                  });
                  location.reload();
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
          this.$buefy.toast.open({
            message: `Complete todos los datos`,
            type: "is-danger",
          });
        }
      }
    },
    getUsers() {
      axios
        .get(`${this.$router.options.baseprod}/Users`)
        .then((r) => {
          if (r.data) {
            this.users = r.data.data;
            this.usernameLC = localStorage.getItem("myUser");
            this.json = JSON.parse(this.usernameLC);
            //this.usernameLC = this.json.userName.split(" ");
            // this.usernameLC = String(
            //   this.usernameLC[0] + " " + this.usernameLC[1]
            // );

            this.integradorDefault = this.users.find(
              (element) => element.email == this.json.userEmail
            );
            console.log(this.users);
            this.selectedUser = this.integradorDefault.id;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    parseDate2(value) {
      var datos = dayjs(value).format("YYYY-MM-DD");
      return datos;
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
    getPlatformType() {
      axios
        .get(`${this.$router.options.baseprod}/Types/platform`)
        .then((r) => {
          if (r.data) {
            this.platformTypes = r.data.data;
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
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    async registerTicket() {
      this.newTarea.fechaCreacion = await this.parseDate(
        this.newTarea.fechaCreacion
      );
      this.newTarea.fechaIngreso = await this.parseDate(
        this.newTarea.fechaIngreso
      );
      this.newTarea.fechaFin = await this.parseDate(this.newTarea.fechaFin);
      axios
        .post(
          `https://appizipayweb.azurewebsites.net/api/v1/Cliente/Tarea/Create`,
          this.newTarea
        )
        .then((r) => {
          if (r.data) {
            this.dataLength = r.data.totalElements;
            this.registro = r.data;
            if (this.registro.status == "Ok") {
              this.$buefy.toast.open({
                message: `Ticket Registrado Correctamente`,
                type: "is-success",
              });
              this.$root.$refs.A.getTickets(1, 50);
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
    },
    registerDefinitionDevelopment() {
      axios
        .post(`${this.$router.options.baseprod}/DefinitionDevelopment`, {
          fullname: this.fullName,
          email: this.email,
          phone: this.phone,
          contact: this.contact,
        })
        .then((r) => {
          if (r.data) {
            this.definitionDevelomentResponse = r.data;
            this.definitionDevelopment =
              this.definitionDevelomentResponse.data[0];
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
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    async getCustomerData() {
      axios
        .get(
          `${this.$router.options.baseprod}/Customers?code=${this.commerceId}`
        )
        .then((r) => {
          if (r.data) {
            this.customerData = r.data.data[0];
            this.fullName = this.customerData.fullname;
            this.name = this.customerData.name;
            this.email = this.customerData.email;
            this.phone = this.customerData.phone;
            this.contact = this.customerData.contact;
            this.businessName = this.customerData.business_name;
            this.businessRuc = this.customerData.business_ruc;
            this.typeCustomer;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Comercio o Integración no encontrado`,
            // message: `Error: ${e.message}`,
            type: "is-warning",
          });
        });
    },
  },
  watch: {
    implementation: function () {
      if (this.implementation !== "") {
        this.getDevelopmentType();
      }
    },
    commerceId: function () {
      if (this.commerceId.length >= 7) {
        this.getCustomerData();
      }
    },
  },
};
</script>
