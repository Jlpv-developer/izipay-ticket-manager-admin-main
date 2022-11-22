<template>
  <h1>404</h1>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['fromScreenToogleRight'])
  },
  created () {
    this.fromScreenToogleRight(false)
  }
}
</script>

<style>

</style>
