<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="usuarios"
    >
      <b-table-column label="Correo electronico" field="email" sortable v-slot="props">
        {{ props.row.email }}
      </b-table-column>
      <b-table-column label="Nombre" field="name" sortable v-slot="props">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column label="Estado" field="state" sortable v-slot="props">
        {{ props.row.state }}
      </b-table-column>
      <b-table-column label="Perfil" field="profile" sortable v-slot="props">
        {{ props.row.profile }}
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <button class="button is-small button-honda" type="button" @click.prevent="viewUser(props.row)">
            <b-icon icon="eye" size="is-small"/>
          </button>
        </div>
      </b-table-column>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Cargando datos...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Error &hellip;</p>
          </template>
        </div>
      </section>

    </b-table>
    <aside-menu-right :isModalViewUserTable="isModalViewUserTable" :dataUser="trashObject"/>
  </div>
</template>

<script>
import axios from 'axios'
import ModalBox from '@/components/ModalBox'
import AsideMenuRight from '@/components/AsideMenuRight'
import { mapActions } from 'vuex'
export default {
  name: 'UsuariosTableSample',
  components: {
    ModalBox,
    AsideMenuRight
  },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      isModalViewUserTable: false,
      trashObject: null,
      usuarios: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }
  },
  mounted () {
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl)
        .then((r) => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.usuarios = r.data.data
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  },
  methods: {
    ...mapActions(['fromScreenToogleRight']),
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    },
    viewUser (trashObject) {
      this.trashObject = trashObject
      this.fromScreenToogleRight(true)
      this.isModalViewUserTable = true
    }
  }
}
</script>

<style scoped>
    .button-honda {
        color: #CC0000;
    }
</style>
