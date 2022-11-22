<template>
  <div v-if="!loading">
    <section class="hero is-fullheight" id="backgroundImage">
      <div class="contenedor">
        <center>
          <div class="contenedor-imagen">
						  <b-image
							:src="require('@/assets/image/logo_izipay2.png')"
							alt="Logo"
						></b-image>
  
          </div>
		  <br>
		  <br>
		  <div class="card">
            <div class="card-content">
              <div class="content">
                <h1 class="title">Login</h1>
                <div class="button" id="button" @click="SignIn">
                  <div class="columns">
                    <!-- <div class="column"><div class="icon-microsoft"></div></div> -->
                    <div class="column" id="label-microsoft">
                      <p>Iniciar sesión</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <span>
                  Powered by
                  <figure
                    class="image image is-2by1"
                  >
                    <img src="@/assets/image/logo-secundario.svg" />
                  </figure>
                </span>
              </p>
            </footer>
          </div>
        </center>
      </div>
      <!-- <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <div class="box">
                <span class="title-login">¡Hola, bienvenid@!</span><br /><br />
                <div class="button" id="button" @click="SignIn">
                  <div class="columns">
                    <div class="column"><div class="icon-microsoft"></div></div>
                    <div class="column" id="label-microsoft">
                      Iniciar sesión con Microsoft
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
		 
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h1 class="title">Login</h1>
                <div class="button" id="button" @click="SignIn">
                  <div class="columns">
                    <div class="column"><div class="icon-microsoft"></div></div>
                    <div class="column" id="label-microsoft">
                      Iniciar sesión con Microsoft
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <span>
                  Powered by
                  <figure
                    class="image image is-4by1"
                  >
                    <img src="@/assets/image/logo_delfosti.png" />
                  </figure>
                </span>
              </p>
            </footer>
          </div>
        </div>
      </div> -->
    </section>
  </div>
  <b-loading v-else v-model="isLoading"></b-loading>
</template>

<script>
import { PublicClientApplication } from "@azure/msal-browser";
import { mapActions, mapState } from "vuex";
import router from "../router";
import { name } from "@azure/msal-browser/dist/packageMetadata";

export default {
  data() {
    return {
      isLoading: true,
      loading: false,
      account: undefined,
      flag: false,
      form: {
        email: "geerson.pizarro@delfosti.com",
        password: "123",
      },
      loadedSrc2: "",
    };
  },
  components: {},
  computed: {
    ...mapState(["loggedIn"]),
  },
  methods: {
    ...mapActions([
      "setSesion",
      "formScreenToggle",
      "fromScreenToogleRight",
      "setAccessToken",
    ]),
    procesarFormulario() {
      if (
        this.form.email === "geerson.pizarro@delfosti.com" &&
        this.form.password === "123"
      ) {
        this.setSesion(true);
        this.formScreenToggle(true);
        router.push("/");
      } else {
        this.$buefy.snackbar.open({
          message: "Error al iniciar sesión",
          queue: false,
        });
      }
    },
    async SignIn() {
      await this.$msalInstance
        .loginPopup({})
        .then(async (response) => {
          this.loading = true;
          const myAccounts = this.$msalInstance.getAllAccounts();
          this.account = myAccounts[0];
          const myUser = {
            userName: this.account.name,
            userEmail: this.account.username,
          };
          this.$store.commit("user", {
            name: myUser.userName,
            email: myUser.userEmail,
          });
          localStorage.setItem("myUser", JSON.stringify(myUser));
          if (response.idToken) {
            this.setAccessToken(response.idToken);
            // await this.setPermissions()
            this.setSesion(true);
            this.formScreenToggle(true);
            this.loading = false;
            router.push("/");
          }
          this.loading = false;
           this.$buefy.toast.open({
        message: 'Bienvenido ' + myUser.userName+"!",
        type:"is-success",
        queue: false
      })
        })
        .catch((error) => {
          this.loading = false;
          console.error(`error during authentication: ${error}`);
          this.$buefy.snackbar.open({
            message: "Error al iniciar sesión",
            queue: false,
          });
        });
    },
    
    forgotPassword() {
      router.push("/forgot-password");
    },
  },
  async created() {
    this.$msalInstance = new PublicClientApplication(
      this.$store.state.msalConfig
    );
    this.fromScreenToogleRight(false);
    if (localStorage.getItem("loggedIn") === "true") {
      this.formScreenToggle(true);
      router.push("/");
    }
  },
  mounted() {
    const accounts = this.$msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      return;
    }
    this.account = accounts[0];
    this.$emitter.emit("login", this.account);
  },
};
</script>

<style scoped>
#card-color {
  background-color: rgb(139, 139, 138) !important;
  opacity: 0.5 !important;
}
.card {
   margin: auto;
   width: 30%;
}
#backgroundImage {
  /* background-image: url("../assets/image/fondo_loginv3.jpg"); */
  background-color: #F72C44;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.icon-microsoft {
  background-image: url("../assets/image/icono-microsoft.png");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 35px;
  height: 35px;
}
#label-microsoft {
  margin-top: 0rem;
  color: #616161;
  font-size: 24px;
}
#button {
  width: 15rem;
  height: 50px;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
.box-login {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
    0 0px 0 1px rgb(10 10 10 / 2%);
  color: #4a4a4a;
  display: block;
}
.text {
  color: white !important;
}

a:hover {
  text-decoration: underline white;
}

#login {
  background-color: white;
  width: 479px;
  height: 60px;
}

#icon-logo {
  margin-top: 1rem;
  width: 32px;
  height: 32px;
}

.row {
  margin-top: 1rem;
  font-size: 24px;
  display: inline-block;
}

.box {
  background: rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(15px);
  padding-top: 5.5rem !important;
  padding-left: 3.45rem !important;
  /* margin: 3rem 1rem 3rem 1rem; */
  margin-left: -1.3rem;
  border-radius: 20px;
  height: 20rem;
  width: 40rem !important;
}

.contenedor {
		margin-top:8%;
	}

	.contenedor-imagen {
		margin: 1rem 0 0.5rem 0;
		width: 15rem;
	} 

.icon {
  color: #cc0000 !important;
}

.title-login {
  font-size: 2rem;
  color: #4a4a4a;
}
/* Dimension Movil */
@media only screen and (max-width: 768px) {
  .box {
    width: 20em !important;
    padding-left: 2.3rem !important;
  }
  .columns {
    display: inline-flex;
  }
  .button {
    width: 15rem !important;
  }
  #label-microsoft {
    margin-right: 0.5rem;
    margin-top: 0.6rem;
    font-size: 1rem;
  }
  .icon-microsoft {
    margin-right: -1rem;
  }
}

/* @media only screen and (min-width: 768px) and (max-width: 1024px){
	    .box {
	      width: 37rem;
	      padding: 2rem 1.5rem 2rem 1.5rem;
	      margin: 0rem 0rem 0rem 0rem;
	    }
	  }

	  @media only screen and (min-width: 1025px) {
	    .box {
	      width: 37rem;
	      padding: 2rem 1.5rem 2rem 1.5rem;
	      margin: 0rem 0rem 0rem 0rem;
	    }
	  } */
/* ===== */
/* Dimension Movil */
/* @media only screen and  (max-width: 768px) {
	    .box {
	      width: 20em!important;
	      padding-left: 2.3rem!important;
	    }
	  } */
</style>
