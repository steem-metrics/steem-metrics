import { Line } from "vue-chartjs"

export default {
  extends: Line,

  props: {
    feedquote: {
      type: Array,
      default: null
    },
    feedbase: {
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
      labels: this.feedquote,
      datasets: [
        {
          label: "Daily transactions",
          backgroundColor: this.gradient,
          data: this.feedbase,
          datalabels: { display: false }
        }
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false,

      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Steem price feed"
      },

      scales: {
        xAxes: [{
          ticks: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: "Steem Backed Dollars quote for " + this.feedquote[0] + " Steem"
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
      },

      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            return data["labels"][tooltipItem[0]["index"]] + " Steem"
          },
          label: function (tooltipItem, data) {
            return data["datasets"][0]["data"][tooltipItem["index"]] + " Steem Dollars"
          }
        }
      }
    })
  }

}
