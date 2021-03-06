import { Bar } from "vue-chartjs"
import ChartDataLabels from "chartjs-plugin-datalabels"

export default {
  extends: Bar,

  props: {
    catSets: {
      type: Array,
      default: null
    },
    catTypes: {
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
    this.gradient.addColorStop(0, "#97D16B") // show this color at 0%;
    this.gradient.addColorStop(0.5, "#86E78E") // show this color at 50%
    this.gradient.addColorStop(1, "#5FFBF1") // show this color at 100%

    this.renderChart({
      labels: this.catTypes,
      datasets: [
        {
          label: "Live transactions",
          backgroundColor: this.gradient,
          data: this.catSets
        }
      ]
    },
      // options
    {
      responsive: true,
      maintainAspectRatio: false,

      legend: {
        display: false
      },

      title: {
        display: true,
        text: "Live transactions"
      },

      tooltips: {
        mode: "index",
        intersect: false
      },

      plugins: {
        datalabels: {
          align: "end",
          anchor: "end",
          backgroundColor: function (context) {
            return context.dataset.backgroundColor
          },
          borderRadius: 4,
          color: "white",
          formatter: function (value) {
            return value + " tx "
          }
        }
      },

      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false
          },
          scaleLabel: {
            display: true,
            labelString: "Operations"
          }
        }],
        yAxes: [{
          ticks: {
            autoSkip: false
          },
          scaleLabel: {
            display: true,
            labelString: "Transaction count"
          }
        }]
      }
    })

    // update chart every 5 seconds to reflect new transaction count
    setInterval(() => {
      this.$data._chart.update()
    }, 5000)
  },

  watch: {
    /*
    catSets: {
        handler: function (val) {
          this.$data._chart.update(val)

          //console.log(this.$data._chart)
        },
        deep: true
    },
    */
    catTypes: {
      handler: function (val) {
        this.$data._chart.update()
      },
      deep: true
    }

  }

}
