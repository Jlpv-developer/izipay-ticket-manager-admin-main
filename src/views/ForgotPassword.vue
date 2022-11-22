<template>
  <section class="hero is-fullheight" id="backgroundImage">
    <div class="contenedor">
      <center>
        <div class="contenedor-imagen">
          <b-image
            :src="require('@/assets/image/logo_login.png')"
            alt="Logo"
          ></b-image>
        </div>
      </center>
    </div>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6-tablet is-6-desktop is-6-widescreen">
            <div class="box">
              <form @submit.prevent="procesarFormulario">
                    <span class="text">
                        Por favor, ingrese su correo electrónico
                        para el envío de su nueva contraseña
                    </span><br><br>
                    <b-field expanded>
                        <b-input
                            v-model.trim="form.email"
                            icon="account"
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                        />
                    </b-field>
                    <br>
                    <b-field>
                        <b-button
                            native-type="submit"
                            type="is-primary"
                            style="background-color: red;"
                            expanded
                        >
                        Obtener una contraseña nueva
                        </b-button>
                    </b-field>
                    <br>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '../router'

export default {
  name: 'ForgotPassword',
  data () {
    return {
      form: {
        email: ''
      }
    }
  },
  components: {
  },
  computed: {
    ...mapState(['loggedIn'])
  },
  methods: {
    ...mapActions(['setSesion', 'formScreenToggle', 'fromScreenToogleRight']),
    procesarFormulario () {
      if (this.form.email === 'geerson.pizarro@delfosti.com') {
        this.$buefy.snackbar.open({
          message: 'Se envio el codigo',
          queue: false
        })
      } else {
        this.$buefy.snackbar.open({
          message: 'Ocurrió un error',
          queue: false
        })
      }
    }
  },
  created () {
    this.fromScreenToogleRight(false)
    console.log('valor:', localStorage.getItem('loggedIn'))
    if (localStorage.getItem('loggedIn') === 'true') {
      this.formScreenToggle(true)
      router.push('/')
    }
  }
}
</script>

<style scoped>

  #card-color {
    background-color: rgb(139, 139, 138)!important;
    opacity: 0.5!important;
  }
  #backgroundImage {
    background-image: url('../assets/image/fondo_login.jpg');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .box-login{
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
    color: #4a4a4a;
    display: block;
    padding: 1.25rem;
  }

  .text {
    color: white!important;
    text-align: justify!important;
  }

  a:hover {
    text-decoration: underline white;
  }

  .box {
    background: rgba(0, 0, 0, 0.55);
    padding: 2rem 3.5rem 2rem 3.5rem;
    margin: 3rem 1rem 3rem 1rem;
    border-radius: 20px;
  }

  .contenedor {
    background-color: white;
    height: 4rem;
  }

  .contenedor-imagen {
    margin: 0.5rem 0 0.5rem 0;
    width: 23rem;
  }

  .icon {
    color: #CC0000 !important;
  }

  @media only screen and (max-width: 768px) {
    .box {
      padding: 2rem 1.5rem 2rem 1.5rem;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px){
    .box {
      padding: 2rem 1.5rem 2rem 1.5rem;
      margin: 0rem 0rem 0rem 0rem;
    }
  }
</style>
