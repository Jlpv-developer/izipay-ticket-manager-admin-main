<template>
	<div class="modal-card" style="width: 640px" v-show="isModalViewDeleteTicket">
		<header class="modal-card-head">
			<p class="modal-card-title">Eliminar ticket {{ this.ticketId }}</p>
		</header>
		<section class="modal-card-body" v-if="ticketId">
			<p>Seguro que desea eliminar el ticket?</p>
		</section>
		<footer class="modal-card-foot">
			<b-button type="is-primary" v-on:click="deleteTicket(ticketId)"
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
    ticketId: Number,
    isModalViewDeleteTicket: { type: Boolean, default: false },
  },
 created() {
  
  },
  methods: {
         
     async deleteTicket(ticketId) {
    	axios
    		 .delete(`${this.$router.options.baseprod}/Tickets/${ticketId}`)
    		.then((r) => {
    			if (r.data) {
    				this.responseData = r.data;
    				// this.data
    			if (this.responseData.succeeded == true ) {
              this.$buefy.toast.open({  
                message: `Ticket Eliminado Correctamente`,
                type: "is-success",
              });
              this.$root.$refs.A.getTickets(1, 50);
              // this.$emit('close')
              this.$parent.close();
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
