import { Bar } from "vue-chartjs"
import ChartDataLabels from "chartjs-plugin-datalabels"

export default {
  extends: Bar,

  props: {
    witSets: {
      type: Array,
      default: null
    },
    witTypes: {
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

    this.renderChart({
      labels: this.witTypes,
      datasets: [
        {
          label: "Live blocks",
          backgroundColor: this.gradient,
          data: this.witSets
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
        text: "Live blocks"
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
            return value + " Block "
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
            labelString: "Witnesses"
          }
        }],
        yAxes: [{
          ticks: {
            autoSkip: false
          },
          scaleLabel: {
            display: true,
            labelString: "Block count"
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
    witSets: {
        handler: function (val) {
          this.$data._chart.update(val)

          //console.log(this.$data._chart)
        },
        deep: true
    },
    */
    witTypes: {
      handler: function (val) {
        this.$data._chart.update()
      },
      deep: true
    }

  }

}
