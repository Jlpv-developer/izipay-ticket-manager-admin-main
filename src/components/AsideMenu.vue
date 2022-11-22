<template>
  <aside v-show="isAsideVisible" class="aside-left is-placed-left is-expanded">
    <aside-tools/>
    <div class="menu is-menu-main" >
      <template v-for="(menuGroup, index) in menu" >
        <p v-if="typeof menuGroup === 'string'" :key="index" class="menu-label ">
          <b>{{ menuGroup }}</b>
        </p>
        <!-- Componenete donde Listaremos los menus y submenus del proyecto Honda -->
        <aside-menu-list
          v-else
          :key="index"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
      </template>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import AsideTools from '@/components/AsideTools'
import AsideMenuList from '@/components/AsideMenuList'

export default {
  name: 'AsideMenu',
  components: { AsideTools, AsideMenuList },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(['isAsideVisible'])
  },
  methods: {
    menuClick (item) {
      console.log('submenu')
    }
  }
}
</script>

<style scoped>
  .aside-left {
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05)!important;
    border-radius: 0px 0px 4px 0px!important;
    
  }
</style>
