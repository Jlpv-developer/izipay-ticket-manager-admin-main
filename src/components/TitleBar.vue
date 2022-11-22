<template>
	<section class="section is-title-bar">
		<div class="level">
			<div class="level-left">
				<div class="level-item">
					<ul>
						<li v-for="(title, index) in titleStack" :key="index">
							{{ title }}
						</li>
					</ul>
				</div>
			</div>

			<!-- <div class="level-right">
        <div class="level-item">
          <div class="buttons is-right">
            <a
              href="https://delfosti.com/"
              target="_blank"
              class="button is-primary"
            >
              <b-icon icon="car" custom-size="default" />
              <span>DelfosTI</span>
            </a>
          </div>
        </div>
      </div> -->
		</div>
		<b-modal v-model="isCardModalActive" :width="640" scroll="keep">
			<div class="card">
				<div class="card-content">
					<div class="media">
						<div class="media-content">
							<p class="title is-4">Incidencia</p>
						</div>
					</div>

					<div class="content">
						<div class="columns">
							<div class="column is-half">
								<b-field label="Código de comercio">
									<b-input v-model="name"></b-input>
								</b-field>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<b-field label="RUC">
									<b-input v-model="name"></b-input>
								</b-field>
							</div>
							<div class="column">
								<b-field label="Razon Social">
									<b-input v-model="name"></b-input>
								</b-field>
							</div>
						</div>

						<div class="columns">
							<div class="column">
								<b-field label="Fecha de Envio">
									<b-input v-model="name"></b-input>
								</b-field>
							</div>
							<div class="column">
								<b-field label="Fecha de Respuesta">
									<b-input v-model="name"></b-input>
								</b-field>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<b-field label="">
									<b-select v-model="tipo">
										<option disabled value="">
											Selecciona Tipo de Comercio
										</option>
										<option
											v-for="integrador in integradores"
											:key="integrador.usuarioid"
											:value="integrador.usuarioid"
										>
											{{ integrador.nombreusuario }}
										</option>
									</b-select>
								</b-field>
							</div>
							<div class="column">
								<b-field label="">
									<b-select v-model="selectedResponsable">
										<option value="Responsable" disabled></option>
										<option
											v-for="integrador in integradores"
											:key="integrador.usuarioid"
											:value="integrador.usuarioid"
										>
											{{ integrador.nombreusuario }}
										</option>
									</b-select>
								</b-field>
							</div>
						</div>
						<div class="columns">
							<div class="column is-half">
								<b-field>
									<b-checkbox>Basic</b-checkbox>
								</b-field>
								<b-field>
									<b-checkbox v-model="checkbox">
										{{ checkbox }}
									</b-checkbox>
								</b-field>
								<b-field>
									<b-checkbox :indeterminate="true"> Indeterminate </b-checkbox>
								</b-field>
								<b-field>
									<b-checkbox disabled>Disabled</b-checkbox>
								</b-field>
							</div>
						</div>
					</div>
				</div>
			</div>
		</b-modal>
	</section>
</template>

<script>
	export default {
		name: "TitleBar",
		props: {
			titleStack: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				checkbox:"",
				name:"",
				tipo:"",
				isCardModalActive: false,
				integradores:"",
				selectedResponsable:"",
			};
		},
	};
</script>

<style scoped>
	section.section.is-title-bar {
		padding: 0.5rem;
	}
</style>