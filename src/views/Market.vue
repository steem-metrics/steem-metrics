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

        <h2>Steem Dollars to Steem price feed</h2>

        <feed
          v-if="ready"
          :feedbase="feedbase"
          :feedquote="feedquote"
          :styles="styles"
        />

      </div>

      <div class="Chart">

        <h2>Steem to Steem Dollars ASK orders</h2>

        <ask
          v-if="ready"
          :askdata="askdata"
          :asklabels="asklabels"
          :styles="styles"
        />

      </div>

      <div class="Chart">

        <h2>Steem to Steem Dollars BIDS orders</h2>

        <bid
          v-if="ready"
          :biddata="biddata"
          :bidlabels="bidlabels"
          :styles="styles"
        />

      </div>

    </div>

  </div>

</template>

<script>
//
import Feed from "../components/market/Feed"
import Ask from "../components/market/Ask"
import Bid from "../components/market/Bid"

const steem = require("steem")
steem.api.setOptions({ url: "https://api.steemit.com" })

export default {
  components: {
    "feed": Feed,
    "ask": Ask,
    "bid": Bid
  },

  data: () => ({
    ready: false,

    feedbase: [],
    feedquote: [],

    askdata: [],
    asklabels: [],

    biddata: [],
    bidlabels: [],

    styles: {
      height: "500px",
      position: "relative"
    },

    gradient: null

  }),

  async mounted () {
    try {
      var self = this

      var feedData = new Promise((resolve, reject) => {
        steem.api.getFeedHistory(function (err, result) {
          if (err) return reject(err)

          self.feedbase = result.price_history.map(e => +e.base.split(" ")[0])
          self.feedquote = result.price_history.map(e => +e.quote.split(" ")[0])
          resolve()
        })
      }).catch(err => {
        console.error(err)
      })

      var orderData = new Promise((resolve, reject) => {
        steem.api.getOrderBook(50, function (err, result) {
          // console.log(err, result);

          if (err) return reject(err)

          // re-order by created first
          let asks = result.asks.sort((a, b) => a.created.localeCompare(b.created))
          let bids = result.bids.sort((a, b) => a.created.localeCompare(b.created))

          for (var bid in bids) {
            self.bidlabels.push(new Date(bids[bid].created))
            self.biddata.push(+Number(bids[bid].real_price).toFixed(4))
          }

          for (var ask in asks) {
            self.asklabels.push(new Date(asks[ask].created))
            self.askdata.push(+Number(asks[ask].real_price).toFixed(4))
          }

          resolve()
        })
      }).catch(err => {
        console.error(err)
      })

      await Promise.all([feedData, orderData])

      this.ready = true
    } catch (e) {
      console.error(e)
    }
  },
  destroyed () {
    this.ready = false
  }

}

</script>

<style>
</style>
