
import router from "../router";
import axios from "axios";
export const myGlobalFuctions ={
  data(){
    return{
users:"",
    }
  },
    methods:{
        getUsers:  function() {
            axios
              .get(`${this.$router.options.baseprod}/Users`)
              .then((r) => {
                if (r.data) {
                  users = r.data.data;
                  console.log(users);
                  return Array.from(users);
                }
              })
              .catch((e) => {
                this.$buefy.toast.open({
                  message: `Error: ${e.message}`,
                  type: "is-danger",
                });
              });

              
          },
    }
}