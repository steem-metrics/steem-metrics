import { Bar } from "vue-chartjs"

export default {
  extends: Bar,

  props: {
    apps: {
      type: Array,
      default: null
    },
    daytxapp: {
      type: Array,
      default: null
    },
    weektxapp: {
      type: Array,
      default: null
    },
    monthtxapp: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      daygradient: null,
      weekgradient: null,
      monthgradient: null
    }
  },

  mounted () {
    this.daygradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450)
    this.daygradient.addColorStop(0, "rgba(255, 0,0, 0.5)") // show this color at 0%;
    this.daygradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)") // show this color at 50%
    this.daygradient.addColorStop(1, "rgba(145, 67, 204, 0.46)") // show this color at 100%

    this.weekgradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450)
    this.weekgradient.addColorStop(0, "#D16BA5") // show this color at 0%;
    this.weekgradient.addColorStop(0.5, "#86A8E7") // show this color at 50%
    this.weekgradient.addColorStop(1, "#5FFBF1") // show this color at 100%

    this.monthgradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450)
    this.monthgradient.addColorStop(0, "#97D16B") // show this color at 0%;
    this.monthgradient.addColorStop(0.5, "#86E78E") // show this color at 50%
    this.monthgradient.addColorStop(1, "#5FFBF1") // show this color at 100%

    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.apps,
      datasets: [
        {
          label: "Daily transactions",
          backgroundColor: this.daygradient,
          data: this.daytxapp,
          datalabels: { display: false }
        },
        {
          label: "Weekly transactions",
          backgroundColor: this.weekgradient,
          data: this.weektxapp,
          datalabels: { display: false }
        },
        {
          label: "Monthly transactions",
          backgroundColor: this.monthgradient,
          data: this.monthtxapp,
          datalabels: { display: false }
        }
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }],
        yAxes: [{
          ticks: {
            autoSkip: false
          }
        }]
      }
    })
  }

}
