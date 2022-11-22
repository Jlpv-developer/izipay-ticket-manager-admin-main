import { Line, mixins,Bar,Pie,Doughnut,BarProp,HorizontalBar} from 'vue-chartjs'

export default {
  name: 'pie-chart',
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
  props: {
    extraOptions: Object
  },
  data () {
    return {
      ctx: null
    }
  },
  mounted () {
    this.$watch(
      'chartData',
      (newVal, oldVal) => {
        if (!oldVal) {
          this.renderChart(this.chartData, this.extraOptions)
        }
      },
      { immediate: true }
    )
  }
}