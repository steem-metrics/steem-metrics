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
        <h2>Average transactions of top 10 apps</h2>
        <tx-by-app
          v-if="loadedtoptxapp"
          :apps="apps"
          :daytxapp="daytxapp"
          :weektxapp="weektxapp"
          :monthtxapp="monthtxapp"
          :styles="styles"
        />
      </div>

      <div class="Chart">
        <h2>Average users of top 10 apps</h2>
        <dau-users
          v-if="loadeddauusers"
          :apps="apps"
          :dauday="dauday"
          :dauweek="dauweek"
          :daumonth="daumonth"
          :styles="styles"
        />
      </div>

      <div class="Chart">
        <h2>Average transactions by category</h2>
        <avg-tx-category
          v-if="loadedavgtxcategory"
          :categories="categories"
          :daytxcategory="daytxcategory"
          :weektxcategory="weektxcategory"
          :monthtxcategory="monthtxcategory"
          :styles="styles"
        />
      </div>

      <div class="Chart">
        <h2>Average user activity by category</h2>
        <avg-user-category
          v-if="loadedavgusercategory"
          :categories="categories"
          :dayusercategory="dayusercategory"
          :weekusercategory="weekusercategory"
          :monthusercategory="monthusercategory"
          :styles="styles"
        />
      </div>

    </div>

  </div>

</template>

<script>
import txByApp from "../components/dated/txByApp"
import dauUsers from "../components/dated/dauUsers"
import avgTxCategory from "../components/dated/avgTxCategory"
import avgUserCategory from "../components/dated/avgUserCategory"

const axios = require("axios")

export default {
  components: {
    "tx-by-app": txByApp,
    "dau-users": dauUsers,
    "avg-tx-category": avgTxCategory,
    "avg-user-category": avgUserCategory

  },

  data: () => ({
    ready: false,

    loadedtoptxapp: false,
    loadeddauusers: false,
    loadedavgusercategory: false,
    loadedavgtxcategory: false,

    apps: [],

    daytxapp: [],
    weektxapp: [],
    monthtxapp: [],

    dauday: [],
    dauweek: [],
    daumonth: [],

    categories: [],

    daytxcategory: [],
    weektxcategory: [],
    monthtxcategory: [],

    dayusercategory: [],
    weekusercategory: [],
    monthusercategory: [],

    styles: {
      height: "500px",
      position: "relative"
    },

    gradient: null

  }),

  async mounted () {
    this.loadedtoptxapp = false
    this.loadeddauusers = false
    this.loadedavgusercategory = false
    this.loadedavgtxcategory = false

    try {
      var rawdata = await axios.get("https://steemapps.com/api/apps")
      rawdata = rawdata.data.apps

      var appsData = rawdata.slice(0, 10) // get only top 10

      this.ready = true

      // prepare tops apps
      this.apps = appsData.map(a => a.name)

      // prepare average daily, wekkly, monthly transactions
      this.daytxapp = appsData.map(a => ((a.tx.last_day + a.tx.before_last_day) / 2).toFixed())
      this.weektxapp = appsData.map(a => ((a.tx.last_week + a.tx.before_last_week) / 2).toFixed())
      this.monthtxapp = appsData.map(a => ((a.tx.last_month + a.tx.before_last_month) / 2).toFixed())

      this.loadedtoptxapp = true

      // prepare top active users
      this.dauday = appsData.map(a => ((a.dau.last_day + a.dau.before_last_day) / 2).toFixed())
      this.dauweek = appsData.map(a => ((a.dau.last_week + a.dau.before_last_week) / 2).toFixed())
      this.daumonth = appsData.map(a => ((a.dau.last_month + a.dau.before_last_month) / 2).toFixed())

      this.loadeddauusers = true

      var names = rawdata.map(a => a.name)
      var categories = rawdata.map(a => a.category)

      // prepare: dayusercategory
      var _daudaycategory = rawdata.map(a => ((a.dau.last_day + a.dau.before_last_day) / 2).toFixed())
      var _dayusercategory = names.map((a, i) => ({ category: categories[i], data: _daudaycategory }))
      _dayusercategory = mergeSumDuplicates(_dayusercategory)
      this.dayusercategory = _dayusercategory.map(a => a.data)

      // prepare: weekusercategory
      var _dauweekcategory = rawdata.map(a => ((a.dau.last_week + a.dau.before_last_week) / 2).toFixed())
      var _weekusercategory = names.map((a, i) => ({ category: categories[i], data: _dauweekcategory }))
      _weekusercategory = mergeSumDuplicates(_weekusercategory)
      this.weekusercategory = _weekusercategory.map(a => a.data)

      // prepare: _monthusercategory
      var _daumonthcategory = rawdata.map(a => ((a.dau.last_month + a.dau.before_last_month) / 2).toFixed())
      var _monthusercategory = names.map((a, i) => ({ category: categories[i], data: _daumonthcategory }))
      _monthusercategory = mergeSumDuplicates(_monthusercategory)
      this.monthusercategory = _monthusercategory.map(a => a.data)

      this.categories = _monthusercategory.map(a => a.category)
      this.loadedavgusercategory = true

      // prepare: daytxcategory
      var _txdaycategory = rawdata.map(a => ((a.tx.last_day + a.tx.before_last_day) / 2).toFixed())
      var _daytxcategory = names.map((a, i) => ({ category: categories[i], data: _txdaycategory }))
      _daytxcategory = mergeSumDuplicates(_daytxcategory)
      this.daytxcategory = _daytxcategory.map(a => a.data)

      // prepare: weektxcategory
      var _txweekcategory = rawdata.map(a => ((a.tx.last_week + a.tx.before_last_week) / 2).toFixed())
      var _weektxcategory = names.map((a, i) => ({ category: categories[i], data: _txweekcategory }))
      _weektxcategory = mergeSumDuplicates(_weektxcategory)
      this.weektxcategory = _weektxcategory.map(a => a.data)

      // prepare: monthtxcategory
      var _txmonthcategory = rawdata.map(a => ((a.tx.last_month + a.tx.before_last_month) / 2).toFixed())
      var _monthtxcategory = names.map((a, i) => ({ category: categories[i], data: _txmonthcategory }))
      _monthtxcategory = mergeSumDuplicates(_monthtxcategory)
      this.monthtxcategory = _monthtxcategory.map(a => a.data)

      this.loadedavgtxcategory = true

      /*
        var data =  Object.assign.apply({}, names.map( (v, i) => ( {[v]: categories[i]} ) ) );
        var data =  Object.assign.apply({}, names.map( (name, i) => ( {'name': name, 'category': categories[i],} ) ) );
        */
    } catch (e) {
      console.error(e)
    }
  },
  destroyed () {
    this.ready = false
  }

}

function mergeSumDuplicates (data) {
  var o = {}

  data.forEach(i => {
    var category = i.category

    i.data = parseInt(i.data)

    if (!o[category]) {
      return (o[category] = i)
    }
    return (o[category].data = o[category].data + i.data)
  })
  // console.log(o)

  var newData = []
  Object.keys(o).forEach(key => {
    newData.push(o[key])
  })

  // console.log(newData)

  return newData
}

</script>

<style>
</style>
