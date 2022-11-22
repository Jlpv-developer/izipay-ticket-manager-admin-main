<template>
	<div>
		<section class="section is-main-section">
			<title-bar :title-stack="titleStack" />
			<br />
			<incidence-table :keyword="texto" />
		</section>
	</div>
</template>

<script>
	import IncidenceTable from "@/components/IncidenceTable";
	import TitleBar from "@/components/TitleBar";
	import { mapActions } from "vuex";
	export default {
		name: "Incidencias",
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
				registro: [],
				codigoComercio: "",
				ruc: "",
				razonSocial: "",
				tipoCliente: "",
				comercioData:"",
				incidencia: {
					tipoclienteid: [],
					fechaEnvio: "",
					clienteId: 3,
					selectedCasoReportar: "",
					usuarioid: "",
					fechaRespuesta: "",
					descripcion: "probando",
				},
			};
		},
		components: {
			TitleBar,
			IncidenceTable,
		},
		computed: {
			titleStack() {
				return ["Buzón Atenciones"];
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
		},
		created() {
			this.fromScreenToogleRight(false);
		},
		watch: {
			
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
