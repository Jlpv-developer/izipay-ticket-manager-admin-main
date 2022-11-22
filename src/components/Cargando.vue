<template>
    <div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isFullPage: true
    }
  },
  methods: {
    open () {
      const loadingComponent = this.$buefy.loading.open({
        container: null
      })
      setTimeout(() => loadingComponent.open(), 10 * 1000)
    }
  },
  created () {
    this.open()
  }
}
</script>
