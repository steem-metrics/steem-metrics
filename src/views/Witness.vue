<template>

  <div class="container">

    <div
      v-if="!ready"
      class="spinner">
      <a-spin />
    </div>

    <div
      v-else
      class="Chart__list">

      <div class="Chart">
        <h2>Top 20 Witness Metrics</h2>

        <a-table
          :data-source="witnessData"
          :pagination="false"
          :class="tableClass"
          :row-class-name="getrowclass"
          size="middle"
          @change="onChange">

          <a-table-column
            key="owner"
            title="Account"
            data-index="owner"
          >
            <span slot-scope="owner">
              <a-tag color="blue" >{{ owner }}</a-tag>
            </span>
          </a-table-column>

          <a-table-column
            key="url"
            title="URL"
            data-index="url"
          >
            <span slot-scope="url">
              <a
                :href="url"
                :title="'Witness URL'"
                target="_blank">URL</a>
            </span>
          </a-table-column>

          <a-table-column
            key="votes"
            title="Votes"
            data-index="votes"
          />

          <a-table-column
            key="total_missed"
            title="Missed"
            data-index="total_missed"
          />

          <a-table-column
            key="last_confirmed_block_num"
            title="Last Block"
            data-index="last_confirmed_block_num"
          >
            <span slot-scope="last_confirmed_block_num">
              <a
                :href="'https://steemd.com/b/' + last_confirmed_block_num"
                target="_blank" >{{ last_confirmed_block_num }}</a>
            </span>

          </a-table-column>

          <a-table-column
            key="running_version"
            title="Version"
            data-index="running_version"
          />

          <a-table-column
            key="sbd_exchange_rate_base"
            title="Feed"
            data-index="sbd_exchange_rate_base"
          />

          <a-table-column
            key="available_witness_account_subsidies"
            title="AC avail."
            data-index="available_witness_account_subsidies"
          />

          <a-table-column
            key="props_account_subsidy_budget"
            title="AC budget"
            data-index="props_account_subsidy_budget"
          />

          <a-table-column
            key="props_account_subsidy_decay"
            title="AC decay"
            data-index="props_account_subsidy_decay"
          />

          <a-table-column
            key="props_maximum_block_size"
            title="Block size"
            data-index="props_maximum_block_size"
          />

          <a-table-column
            key="props_account_creation_fee"
            title="Reg fee"
            data-index="props_account_creation_fee"
          />

        </a-table>

      </div>

    </div>

  </div>

</template>

<script>
//
const steem = require("steem")
steem.api.setOptions({ url: "https://api.steemit.com" })

export default {
  components: {
  },

  data: () => ({
    ready: false,

    witnessData: [],

    styles: {
      height: "500px",
      position: "relative"
    },

    tableClass: ""

  }),

  async mounted () {
    this.ready = false
    var self = this

    try {
      let dataArray = []

      var getWitnesses = new Promise((resolve, reject) => {
        steem.api.getActiveWitnesses(function (err, result) {
          // console.log(err, result)
          if (err) {
            alert("Sorry an error occured")
            console.log(err)
            reject(err)
          } else {
            let count = 0

            for (var x in result) {
              steem.api.getWitnessByAccount(result[x], function (err, witness) {
                if (err) {
                  console.log(err)
                  reject(err)
                } else {
                  // console.log(err)

                  let configData = {
                    key: witness.id,
                    owner: witness.owner,
                    url: witness.url,
                    votes: nFormatter(witness.votes),
                    raw_votes: witness.votes,
                    total_missed: witness.total_missed,
                    last_confirmed_block_num: witness.last_confirmed_block_num,
                    running_version: witness.running_version,
                    available_witness_account_subsidies: witness.available_witness_account_subsidies,
                    sbd_exchange_rate_base: witness.sbd_exchange_rate.base.split(" ")[0],
                    props_account_subsidy_budget: witness.props.account_subsidy_budget,
                    props_account_subsidy_decay: witness.props.account_subsidy_decay,
                    props_maximum_block_size: witness.props.maximum_block_size,
                    props_account_creation_fee: Number(witness.props.account_creation_fee.split(" ")[0]).toFixed(1)
                  }

                  count = count + 1

                  dataArray.push(configData)

                  if (count === result.length) {
                    dataArray = dataArray.sort(function (a, b) { return b.raw_votes.localeCompare(a.raw_votes) })
                    resolve()
                  }
                }
              })
            }
          }
        })
      }).catch(err => {
        console.error(err)
      })

      await Promise.resolve(getWitnesses)

      self.witnessData = dataArray

      self.ready = true
    } catch (err) {
      console.log(err)
    }
  },

  destroyed () {
    this.ready = false
  },

  methods: {
    getrowclass: function (record, index) {
      return "highlightrow"
    },
    setrowheader: function (column, index) {
      return '<transition name="update" />'
    },
    onChange: function (pagination, filters, sorter) {
      // console.log('params', pagination, filters, sorter);
    }
  }

}

function nFormatter (num, digits) {
  digits = digits || 3
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ]
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
