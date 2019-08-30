import { Line } from "vue-chartjs"

export default {
  extends: Line,

  props: {
    askdata: {
      type: Array,
      default: null
    },
    asklabels: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      gradient: null
    }
  },

  mounted () {
    this.gradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)") // show this color at 0%;
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)") // show this color at 50%
    this.gradient.addColorStop(1, "rgba(145, 67, 204, 0.46)") // show this color at 100%

    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.asklabels,
      datasets: [
        {
          label: "Ask orders",
          backgroundColor: this.gradient,
          data: this.askdata,
          datalabels: { display: false }
        }
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        xAxes: [{
          type: "time",
          ticks: {
            display: true
          }
        }],
        yAxes: [{
          ticks: {
            autoSkip: false
          },
          scaleLabel: {
            display: true,
            labelString: "Steem Backed Dollars"
          }
        }]
      }
    })
  }

}
