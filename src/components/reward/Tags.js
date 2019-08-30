import { Doughnut } from "vue-chartjs"

export default {
  extends: Doughnut,

  props: {
    tagnames: {
      type: Array,
      default: null
    },
    tagpayouts: {
      type: Array,
      default: null
    },
    tagcomments: {
      type: Array,
      default: null
    },
    tagtopposts: {
      type: Array,
      default: null
    },
    colors: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
    }
  },

  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.tagnames,
      datasets: [
        {
          label: "Payouts",
          backgroundColor: this.colors,
          data: this.tagpayouts,
          datalabels: { display: false }
        },
        {
          label: "Comments",
          backgroundColor: this.colors,
          data: this.tagcomments,
          datalabels: { display: false }
        },
        {
          label: "Top comments",
          backgroundColor: this.colors,
          data: this.tagtopposts,
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

      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            let datasetIndex = tooltipItem[0].datasetIndex
            let index = tooltipItem[0].index
            let label = data.datasets[datasetIndex].label
            let tag = data.labels[index]
            return "[" + tag + "] " + label
          },
          label: function (tooltipItem, data) {
            let datasetIndex = tooltipItem.datasetIndex
            let index = tooltipItem.index
            let label = data.datasets[datasetIndex].label
            let tag = data.labels[index]
            let prefix = (label === "Payouts") ? "$" : ""
            let surfix = (label === "Payouts") ? "" : " posts"
            return prefix + data["datasets"][datasetIndex]["data"][index] + surfix
          }
        }
      }

    })
  }

}
