
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
        <h2>Distribution Among Top 100 Tags</h2>
        <tag-reward
          :tagnames="tagnames"
          :tagpayouts="tagpayouts"
          :tagcomments="tagcomments"
          :tagtopposts="tagtopposts"
          :colors="colors"
          :styles="styles"
        />
      </div>

    </div>

  </div>

</template>

<script>
import tagReward from "../components/reward/Tags"

const steem = require("steem")
steem.api.setOptions({ url: "https://api.steemit.com" })

export default {
  components: {
    "tag-reward": tagReward

  },

  data: () => ({
    ready: false,

    tagnames: [],
    tagpayouts: [],
    tagcomments: [],
    tagtopposts: [],

    colors: [],

    styles: {
      height: "500px",
      position: "relative"
    },

    gradient: null

  }),

  async mounted () {
    this.ready = false

    try {
      let colors1 = ["#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe", "#008080"]
      let colors2 = ["#e6beff", "#9a6324", "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080", "#ffffff", "#000000"]

      this.colors = colors1.concat(colors2).concat(colors1)

      var self = this

      var fetchTags = new Promise((resolve, reject) => {
        steem.api.getTrendingTags(null, 20, function (err, result) {
          if (err) {
            alert("Sorry an error occured")
            console.log(err)
            reject(err)
          } else {
            self.tagnames = result.map(e => e.name)
            self.tagpayouts = result.map(e => +e.total_payouts.split(".")[0])
            self.tagcomments = result.map(e => e.comments)
            self.tagtopposts = result.map(e => e.top_posts)

            resolve()

            self.ready = true
          }
        })
      }).catch(err => {
        console.error(err)
      })

      await Promise.all([fetchTags])
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
