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
        <h2>Live transaction operations</h2>
        <live-tx
          v-if="ready"
          :tx-types="txTypes"
          :tx-sets="txSets"
          :styles="styles"
        />
        <a-alert
          message="This charts shows all operations as they happen on the Steem Blockchain"
          type="info"
          show-icon />
      </div>

      <div class="Chart">
        <h2>Live app usage metrics</h2>
        <live-app
          v-if="ready"
          :app-types="appTypes"
          :app-sets="appSets"
          :styles="styles"
        />
        <a-alert
          message="App data is built only from *comment* and *custom_json* operations"
          type="info"
          show-icon />
      </div>

      <div class="Chart">
        <h2>Live category metrics</h2>
        <live-cat
          v-if="ready"
          :cat-types="catTypes"
          :cat-sets="catSets"
          :styles="styles"
        />
        <a-alert
          message="Categories are built from *comment* operations which do not have *parent_author*"
          type="info"
          show-icon />
      </div>

      <div class="Chart">
        <h2>Live witness metrics</h2>
        <live-wit
          v-if="ready"
          :wit-types="witTypes"
          :wit-sets="witSets"
          :styles="styles"
        />
        <a-alert
          message="Live data from *head* blocks"
          type="info"
          show-icon />
      </div>

      <div class="Chart">
        <h2>{{ chartStats }}</h2>

        <a-table
          :data-source="blocks"
          :pagination="false"
          :class="tableClass"
          :row-class-name="getrowclass"
          :custom-header-row="setrowheader"
          size="middle">

          <a-table-column
            key="block"
            title="Block"
            data-index="block"
            width="150"
          />

          <a-table-column
            key="time"
            title="Timestamp"
            data-index="time"
            width="150"
          />

          <a-table-column
            key="count"
            title="Tx count"
            data-index="count"
            width="150"
          />

          <a-table-column
            key="witness"
            title="Witness"
            data-index="witness"
            width="150"
          >
            <span slot-scope="witness">
              <a-tag color="blue" >{{ witness }}</a-tag>
            </span>
          </a-table-column>

          <a-table-column
            key="id"
            title="Block ID"
            data-index="id"
          >
            <span slot-scope="id">
              <a
                :href="'https://steemd.com/id/' + id"
                :title="id"
                target="_blank">{{ id.substring(0, 20) + '...' }}</a>
            </span>
          </a-table-column>

        </a-table>

        <a-alert
          message="Live transactions on the Steem Blockchain"
          type="info"
          show-icon />

      </div>

    </div>

  </div>

</template>

<script>
//
/* eslint-disable no-unused-expressions */
import LiveApp from "../components/live/App"
import LiveCat from "../components/live/Cat"
import LiveTx from "../components/live/Tx"
import LiveWit from "../components/live/Wit"

const steem = require("steem")
steem.api.setOptions({ url: "https://api.steemit.com" })

var streamer

var counter = 0
var txCount = 0

export default {
  components: {
    "live-app": LiveApp,
    "live-cat": LiveCat,
    "live-tx": LiveTx,
    "live-wit": LiveWit
  },

  data: () => ({
    ready: false,

    txSets: [],
    txTypes: [],

    witSets: [],
    witTypes: [],

    catSets: [],
    catTypes: [],

    appSets: [],
    appTypes: [],

    chartStats: "",

    blocks: [],

    styles: {
      height: "500px",
      position: "relative"
    },

    tableClass: "bottomfade"

  }),

  async mounted () {
    this.ready = false

    try {
      var self = this

      var secCount = 0
      var timer = setInterval(function () { secCount++ }, 1000)

      streamer = steem.api.streamBlock("head", function (err, block) {
        if (!err) self.ready = true

        // console.log(block)

        if (!block || !block.witness) return true

        let witType = block.witness
        let witInd = self.witTypes.indexOf(witType);

        // build self.witTypes
        (witInd > -1) ? self.witTypes : self.witTypes.push(witType);

        // build witSets
        (witInd > -1) ? self.witSets[witInd] = self.witSets[witInd] + 1 : self.witSets.push(1)

        block.transactions.map(function (tx) {
          // ----------- part 1

          let txType = tx.operations[0][0]
          let op = tx.operations[0][1]

          // console.log(txType)

          let txInd = self.txTypes.indexOf(txType);

          // build self.txTypes
          (txInd > -1) ? self.txTypes : self.txTypes.push(txType);

          // build txSets
          (txInd > -1) ? self.txSets[txInd] = self.txSets[txInd] + 1 : self.txSets.push(1)

          // ----------- part 2

          if (txType === "comment" || txType === "custom_json") {
            let jsonMetadata = (txType === "comment") ? JSON.parse(op.json_metadata || "{}") : JSON.parse(op.json || "{}")

            if (jsonMetadata.app) {
              let appType = jsonMetadata.app.split("/")[0]
              let appInd = self.appTypes.indexOf(appType);

              // build self.appTypes
              (appInd > -1) ? self.appTypes : self.appTypes.push(appType);

              // build appSets
              (appInd > -1) ? self.appSets[appInd] = self.appSets[appInd] + 1 : self.appSets.push(1)
            }

            if (txType === "comment" && !op.parent_author) {
              let catType = op.parent_permlink
              let catInd = self.catTypes.indexOf(catType);

              // build self.catTypes
              (catInd > -1) ? self.catTypes : self.catTypes.push(catType);

              // build appSets
              (catInd > -1) ? self.catSets[catInd] = self.catSets[catInd] + 1 : self.catSets.push(1)
            }
          }

          // ----------- part 3
        })

        let opData = {
          key: counter,
          block: block.transactions[0].block_num,
          witness: block.witness,
          count: block.transactions.length,
          id: block.block_id,
          time: block.timestamp
        }

        counter++

        let len = self.blocks.length

        if (len > 10) {
          // self.blocks = self.blocks.pop;
          self.blocks.pop()
          self.blocks.unshift(opData)
        } else {
          self.blocks.unshift(opData)
        };

        // ----------- part 3
        // build title

        txCount += block.transactions.length

        self.chartStats = counter + " blocks " + txCount + " transactions  in " + secCount + " sec"

        // console.log(self.chartStats)
      })
    } catch (err) {
      console.log(err)
    }
  },

  destroyed () {
    streamer() // end stream
    // steem.api.setOptions({ url: null }) //force streaming to STOP
    this.ready = false
  },

  methods: {
    getrowclass: function (record, index) {
      return "highlightrow"
    },
    setrowheader: function (column, index) {
      return '<transition name="update" />'
    }
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
