<template>
  <div>
    <section class="hero is-fullheight" id="backgroundImage">
      <div class="contenedor">
        <center>
          <div class="contenedor-imagen">
            <img
              :src="require('@/assets/image/worker.png')"
              alt="Logo"
              width="250"
              height="350"
            />
          </div>
          <h1 class="title is-1">En Construcciòn</h1>
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
</template>

<script>
export default {
  name: "UnderConstruction",
  components: {},

  data() {
    return {};
  },
  props: {},
  computed: {},
};
</script>

<style scoped>
.contenedor {
  margin-top: 10%;
}
.button-honda {
  color: #cc0000;
}
.top-level {
  padding: 1.125rem 1.5rem;
  padding-left: 0.7rem;
  padding-right: 1rem;
  overflow: hidden;
  margin: 0;
  border-top: rgba(24, 28, 33, 0.06);
  background: whitesmoke;
}
.level-left {
  float: left;
}
.level-right {
  float: right;
}
.perPage {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
@media only screen and (max-width: 768px) {
  .level-left {
    padding-top: 1.5rem;
  }
  .top-level {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .perPage {
    margin: 0.5rem 0 0.5rem 0;
  }
}

.hero-body {
  padding: 1.6rem 1.5rem 1rem 1.5rem;
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
