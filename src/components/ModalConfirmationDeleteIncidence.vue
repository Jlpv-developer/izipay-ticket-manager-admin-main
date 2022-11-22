<template>
	<div class="modal-card" style="width: 640px" v-show="isModalViewDeleteIncidence">
		<header class="modal-card-head">
			<p class="modal-card-title">Eliminar incidencia {{ this.incidenceId }}</p>
		</header>
		<section class="modal-card-body" v-if="incidenceId">
			<p>Seguro que desea eliminar esta incidencia?</p>
		</section>
		<footer class="modal-card-foot">
			<b-button type="is-primary" v-on:click="deleteIncidence(incidenceId)"
				>Si, eliminar</b-button
			>
		</footer>
	</div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import router from "../router";
export default {
  data() {
    return {
      responseData:[],
    };
  },
  props: {
    incidenceId: Number,
    isModalViewDeleteIncidence: { type: Boolean, default: false },
  },
 created() {
  
  },
  methods: {
         
     async deleteIncidence(incidenceId) {
    	axios
    		// .get(`${this.$router.options.baselocal}/api/v1/ViewTareasWithoutActividades/Read`)
    		 .delete(`${this.$router.options.baseprod}/Incidence/${incidenceId}`)
    		.then((r) => {
    			if (r.data) {
    				this.responseData = r.data;
    				// this.data
    			if (this.responseData.succeeded == true ) {
              this.$buefy.toast.open({  
                message: `Incidencia Eliminada Correctamente`,
                type: "is-success",
              });
             
              this.$emit('close');
              this.$parent.close();
			   this.$root.$refs.A.getIncidents();
            }
    				console.log("tareaEliminada", this.IdTarea);
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
};
</script>
