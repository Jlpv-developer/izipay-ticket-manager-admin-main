<template>
	<!--<div>
	  	<section class="section is-main-section">
			<title-bar :title-stack="titleStack" />
			<br />
<div class="buttons">
            <b-button type="is-primary">Actividad</b-button>
            <b-button type="is-primary">Usuario</b-button>
            <b-button type="is-primary">Estado de Integración</b-button>
            <b-button type="is-primary">Motivo del Estado</b-button>
           <b-button type="is-primary">Tipo de Implementación</b-button>
            <b-button type="is-primary">Tipo de Desarrollo</b-button>  
            
        </div>
			
			
		</section>
	</div>-->
	<under-construction/>
</template>

<script>
	import axios from "axios";
	import GGEETableSample from "@/components/GGEETableSample";
	import TitleBar from "@/components/TitleBar";
	import { mapActions } from "vuex";
	import dayjs from "dayjs";
import UnderConstruction from '@/components/UnderConstruction.vue';
	export default {
		name: "Managment",
		data() {
			return {
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
				newTarea: {
					nombreComercial: "",
					tipoCliente: "",
					fechaCreacion: "",
					fechaIngreso: "",
					codigoComercio: "",
					ruc: "",
					razonSocial: "",
					capacitacionBO: [],
					tipoFormulario: "",
					tipoPlugin: "",
					contactoCliente: "",
					contactoTecnico: "",
					estadoIntegracion: "",
					nombreContacto: "",
					numtelefono: "",
					correoCliente: "",
					nombreTarea: "",
					fechaFin: "",
				},
				registro: [],
			};
		},
		components: {
			TitleBar,
			GGEETableSample,
UnderConstruction,
		},
		computed: {
			titleStack() {
				return [" Gestión"];
			},
			selectedString() {
				return this.selected ? this.selected.toDateString() : "";
			},
		},
		methods: {
			...mapActions(["fromScreenToogleRight", "fromScreenFilter"]),
			viewFilterTracking() {
				console.log("VIEW FILTER");
				this.fromScreenToogleRight(true);
				this.fromScreenFilter(true);
			},
			getTipoCliente() {
				axios
					.get(
						`${"https://appizipayweb.azurewebsites.net/api/v1/TipoCliente/Read"}`
					)
					.then((r) => {
						if (r.data) {
							this.dataLength = r.data.totalElements;
							this.tipoClientes = r.data;
							// this.data
							console.log("tipoClientes", this.tipoClientes);
						}
					})
					.catch((e) => {
						this.$buefy.toast.open({
							message: `Error: ${e.message}`,
							type: "is-danger",
						});
					});
			},
			getTipoFormulario() {
				axios
					// .get(`${this.$router.options.baselocal}/api/v1/ViewTareasWithoutActividades/Read`)
					.get(
						`${"https://appizipayweb.azurewebsites.net/api/v1/TipoFormulario/Read"}`
					)
					.then((r) => {
						if (r.data) {
							this.dataLength = r.data.totalElements;
							this.formularios = r.data;
							// this.data
							console.log("formularios", this.formularios);
						}
					})
					.catch((e) => {
						this.$buefy.toast.open({
							message: `Error: ${e.message}`,
							type: "is-danger",
						});
					});
			},
			// getTipoPlugin() {
			// 	axios
			// 		// .get(`${this.$router.options.baselocal}/api/v1/ViewTareasWithoutActividades/Read`)
			// 		.get(
			// 			`${"https://appizipayweb.azurewebsites.net/api/v1/TipoDesarrollo/Read"}`
			// 		)
			// 		.then((r) => {
			// 			if (r.data) {
			// 				this.dataLength = r.data.totalElements;
			// 				this.plugins = r.data;
			// 				// this.data
			// 				console.log("plugins", this.plugins);
			// 			}
			// 		})
			// 		.catch((e) => {
			// 			this.$buefy.toast.open({
			// 				message: `Error: ${e.message}`,
			// 				type: "is-danger",
			// 			});
			// 		});
			// },
			getEstadoIntegracion() {
				axios
					// .get(`${this.$router.options.baselocal}/api/v1/ViewTareasWithoutActividades/Read`)
					.get(
						`${"https://appizipayweb.azurewebsites.net/api/v1/EstadoIntegracion/Read"}`
					)
					.then((r) => {
						if (r.data) {
							this.dataLength = r.data.totalElements;
							this.estados = r.data;
							// this.data
							console.log("estados", this.estados);
						}
					})
					.catch((e) => {
						this.$buefy.toast.open({
							message: `Error: ${e.message}`,
							type: "is-danger",
						});
					});
			},
			registrarTarea() {
				this.newTarea.fechaCreacion = this.parseDate(this.newTarea.fechaCreacion);
				this.newTarea.fechaIngreso = this.parseDate(this.newTarea.fechaIngreso);
				this.newTarea.fechaFin = this.parseDate(this.newTarea.fechaFin);
				axios
					.post(
						`https://appizipayweb.azurewebsites.net/api/v1/Cliente/Tarea/Create`,
						this.newTarea
					)
					.then((r) => {
						if (r.data) {
							this.dataLength = r.data.totalElements;
							this.registro = r.data;
							// this.data
							//console.log("Respuesta", this.registro.status);
							if (this.registro.status == "Ok") {
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
			parseDate(value) {
				return dayjs(value).format("YYYY-MM-DD");
			},
			redirectExcel() {
				window.location.href =
					"https://forms.office.com/Pages/ResponsePage.aspx?id=RIunRLo_10q5UWu9x7mM27gC50JvghBIv9aZaVSfRkBUNEFXUVFKNlkyNFkxODlNWElBN1Y1SkNNRS4u";
			},
		},
		created() {
			this.fromScreenToogleRight(false);
		},
		watch: {
			servicio: function () {
				if (this.selectedEstadoBase !== "") {
					this.getEstados();
				}
			},
		},
	};
</script>

<style scoped>
	.hero-body {
		padding: 1.6rem 0.5rem 0rem 0.5rem;
	}
	.input-search {
		width: 430px;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
		border-radius: 20px;
	}

	.input-search :focus {
		border-color: #acabab;
	}
	.a-button {
		color: #cc0000;
		border-color: #cc0000;
	}
</style>

