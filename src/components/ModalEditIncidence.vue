<template>
  <div
    class="modal-card"
    style="width: 640px"
    v-show="isModalViewEditIncidence"
  >
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">Agregar Atención</p>
          </div>
        </div>

        <div class="content">
          <div class="columns">
            <div class="column">
              <b-field label="Fecha de Recepción">
                <b-datepicker
                  placeholder="Seleccionar"
                  icon="calendar-today"
                  v-model="sentDate"
                >
                </b-datepicker>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Fecha de Atención">
                <b-datepicker
                  placeholder="Seleccionar"
                  icon="calendar-today"
                  v-model="responseDate"
                >
                </b-datepicker>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-half">
              <b-field label="Código de comercio">
                <b-input
                  v-model="commerceId"
                  placeholder="Agregar datos"
                ></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Tipo de cliente">
                <b-select
                  placeholder="Seleccionar"
                  v-model="selectedCustomerType"
                >
                  <option
                    v-for="(customerType, index, value) in this.customerTypes"
                    :key="value"
                    :value="index"
                  >
                    {{ customerType }}
                  </option>
                </b-select>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="RUC">
                <b-input
                  v-model="businessRuc"
                  placeholder="Agregar datos"
                ></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Razón Social">
                <b-input
                  v-model="businessName"
                  placeholder="Agregar datos"
                ></b-input>
              </b-field>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <b-field label="Tipo de atención">
                <b-select
                  v-model="selectedTypeAtenttion"
                  placeholder="Seleccionar"
                >
                  <option value="" disabled>Seleccionar</option>
                  <option
                    v-for="typeAttention in typeAttentions"
                    :key="typeAttention.id"
                    :value="typeAttention.id"
                  >
                    {{ typeAttention.name }}
                  </option>
                </b-select>
              </b-field>
            </div>

            <div class="column">
              <b-field
                label="Tipo de incidencia"
                v-if="selectedTypeAtenttion == 5"
              >
                <b-select v-model="selectedIncidence" placeholder="Seleccionar">
                  <option value="" disabled>Seleccionar</option>
                  <option
                    v-for="incidence in typeIncidents"
                    :key="incidence.id"
                    :value="incidence.name"
                  >
                    {{ incidence.name }}
                  </option>
                </b-select>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column"></div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Respuesta" v-if="avaibleFields">
                <b-input
                  maxlength="200"
                  type="textarea"
                  v-model="responseComments"
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="buttons is-centered">
            <b-button
              type="is-info expanded"
              @click="createIncidence()"
              v-if="actionType == 'create'"
              >Registrar</b-button
            >
            <b-button
              type="is-info expanded"
              v-on:click="updateIncidence(incidenceData.id)"
              v-if="actionType == 'update'"
              >Guardar</b-button
            >
            <b-button type="is-danger expanded" @click="$parent.close()"
              >Cerrar</b-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- <header class="modal-card-head"> -->

    <!-- <button type="button" class="delete" @click="$parent.close()" /> -->
    <!-- </header>
    <section class="modal-card-body" v-if="incidenceData">
      <div class="columns">
        <div class="column">
          <b-field label="Fecha de repuesta">
            <b-datepicker
              placeholder="Type or select a date..."
              icon="calendar-today"
              v-model="responseDate"
              
            >
            </b-datepicker>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field label="Respuesta">
            <b-input maxlength="200" type="textarea" v-model="responseComments" ></b-input>
          </b-field>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <b-button type="is-success" v-on:click="updateIncidence(incidenceData.id)"
        >Modificar</b-button
      >
       <b-button type="is-alert" 
        >Cerrar</b-button
      >

    </footer> -->
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
import router from "../router";

import dayjs from "dayjs";
export default {
  data() {
    return {
      typeIncidents: "",
      incidenceData: [],
      responseDate: null,
      id: "",
      name: "",
      typeForm: "",
      typeCustomer: null,
      platform: "",
      customerId: "",
      userId: "",
      implementation: "",
      selectedDevelopment: "",
      customerTypes: [],
      selectedCustomerType: null,
      platformTypes: [],
      formTypes: [],
      implementationTypes: [],
      developmentTypes: [],
      endDate: "",
      functionalities: [],
      functionality: "",
      implementationTypeByDevelopment: "",
      selfManagement: false,
      definitionDevelopment: [],
      definitionDevelomentResponse: [],
      definitionDevelopmentId: "",
      admissionDate: "",
      responseComments: "",
      avaibleFields: false,
      commerceId: "",
      businessRuc: "",
      businessName: "",
      sentDate: "",
      userResponsable: "",
      selectedIncidence: null,
      users: "",
      typeAttentions: "",
      selectedTypeAtenttion: null,
    };
  },
  props: {
    incidenceIdValue: Number,
    actionType: "",
    isModalViewEditIncidence: { type: Boolean, default: false },
  },

  methods: {
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
    getTypeAttention() {
      axios
        .get(
          `${this.$router.options.baseprod}/TypeAttention?pageSize=20&pageNumber=1`
        )
        .then((r) => {
          if (r.data) {
            this.typeAttentions = r.data.data;
            //  this.typeAttentions =Object.keys(this.typeAttentions).map((key) => [Number(key), this.typeAttentions[key]]);
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
     getTypeIncidents() {
      axios
        .get(
          `${this.$router.options.baseprod}/TypeIncidence?type_attention_id=${this.selectedTypeAtenttion}&pageSize=20&pageNumber=1`
        )
        .then((r) => {
          if (r.data) {
            this.typeIncidents = r.data.data;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },
    createIncidence() {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      };

      axios
        .post(
          `${this.$router.options.baseprod}/Incidence`,
          {
            type_customer: this.selectedCustomerType,
            init_date: this.parseDate(this.sentDate),
            end_date: "",
            type_attention_id: this.selectedTypeAtenttion,
            type_incidence_name: this.selectedIncidence,
            file_image: "",
            code: this.commerceId,
            ruc: this.businessRuc,
            user_id: parseInt(this.selectedUser),
            comments: "",
            business_name: this.businessName,
          },
          axiosConfig
        )
        .then((r) => {
          if (r.data) {
            this.dataLength = r.data.totalElements;
            this.tipoClientes = r.data;

            if (r.status == 200) {
              this.$buefy.toast.open({
                message: `Ticket de atención creado!`,
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
    },


    validateAction() {
      if (this.actionType == "create" && this.incidenceIdValue == 0) {
        this.avaibleFields = false;
      } else if (this.actionType == "update") {
        this.getIncidenceById(this.incidenceIdValue);
        this.avaibleFields = true;
      }
    },

    getIncidenceById(value) {
      axios
        .get(`${this.$router.options.baseprod}/Incidence/${value}`)
        .then((r) => {
          if (r.data) {
            this.incidenceData = r.data.data;

            console.log("Incidencia", this.incidenceData);

            this.selectedIncidence = this.incidenceData.type_incidence_name;
            this.selectedTypeAtenttion = this.incidenceData.type_attention_id;
            this.sentDate = new Date(this.incidenceData.init_date);
            this.responseDate = new Date(this.incidenceData.end_date);
            this.commerceId = this.incidenceData.code;
            this.selectedCustomerType = this.incidenceData.type_customer;
            this.businessRuc = this.incidenceData.ruc;
            this.businessName = this.incidenceData.business_name;
            if (this.parseDate(this.responseDate) == "1-01-01") {
              this.responseDate = new Date();
            }

            this.responseComments = this.incidenceData.comments;
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: "is-danger",
          });
        });
    },

   

    getDataByIdCommerce() {
      axios
        .get(
          `${this.$router.options.baseprod}/Customers?code=${this.commerceId}`
        )
        .then((r) => {
          if (r.data) {
            this.customerData = r.data.data[0];
            if (this.customerData) {
              this.businessRuc = this.customerData.business_ruc;
              this.businessName = this.customerData.business_name;
              this.selectedCustomerType = this.customerData.type_customer;

            }
          }
        })
        .catch((e) => {
          this.$buefy.toast.open({
            message: `Comercio no encontrado`,
            // message: `Error: ${e.message}`,
            type: "is-warning",
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
    
    
    parseDate(value) {
      return dayjs(value).format("YYYY-MM-DD");
    },
    parseDate2(value) {
      return dayjs(value).format("DD/MM/YYYY");
    },
    updateIncidence(value) {
      console.log(this.selectedTypeAtenttion);
      axios
        .put(`${this.$router.options.baseprod}/Incidence/${value}`, {
          id: this.incidenceData.id,
          type_customer: this.selectedCustomerType,
          init_date: this.parseDate(this.sentDate),
          end_date: this.parseDate(this.responseDate),
          type_attention_id: this.selectedTypeAtenttion,
          type_incidence_name: this.selectedIncidence,
          file_image: "",
          code: this.incidenceData.code,
          ruc: this.incidenceData.ruc,
          user_id: 0,
          comments: this.responseComments,

          business_name: this.businessName,
        })
        .then((r) => {
          if (r.data) {
            this.dataLength = r.data.totalElements;
            this.registro = r.data;
            if (this.registro.succeeded == true) {
              this.$buefy.toast.open({
                message: `Atención Actualizado Correctamente`,
                type: "is-success",
              });

              this.$emit("close");
              this.$parent.close();
              this.$root.$refs.A.getIncidents();
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

    
  },
  computed: {},
  created() {
    this.getTypeAttention();
    this.getUsers();
    this.getCustomerType();
    this.validateAction();
    // this.getIncidenceById(this.incidenceIdValue);
  },
  watch: {
    commerceId: function () {
      if (this.commerceId.length >= 7) {
        this.getDataByIdCommerce();
      }
    },
    selectedTypeAtenttion: function () {
      if (this.selectedTypeAtenttion == 5) {
        this.getTypeIncidents();
      }
    },
  },
};
</script>
