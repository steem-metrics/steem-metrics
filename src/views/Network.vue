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
        <h2>Chain Config</h2>

        <a-table
          :data-source="chainConfig"
          :pagination="false"
          :class="tableClass"
          :row-class-name="getrowclass"
          size="middle">

          <a-table-column
            key="config"
            title="Config"
            data-index="config"
            width="150"
          >
            <span slot-scope="config">
              <a-tag color="blue" >{{ config }}</a-tag>
            </span>
          </a-table-column>

          <a-table-column
            key="setting"
            title="Setting"
            data-index="setting"
            width="150"
          />

        </a-table>

      </div>

      <div class="Chart">
        <h2>Dynamic Global Properties</h2>

        <a-table
          :data-source="dynamicGlobalProperties"
          :pagination="false"
          :class="tableClass"
          :row-class-name="getrowclass"
          size="middle">

          <a-table-column
            key="config"
            title="Config"
            data-index="config"
            width="150"
          >
            <span slot-scope="config">
              <a-tag color="blue" >{{ config }}</a-tag>
            </span>
          </a-table-column>

          <a-table-column
            key="setting"
            title="Setting"
            data-index="setting"
            width="150"
          />

        </a-table>

      </div>

      <div class="Chart">
        <h2>Chain properties</h2>

        <a-table
          :data-source="chainProperties"
          :pagination="false"
          :class="tableClass"
          :row-class-name="getrowclass"
          size="middle">

          <a-table-column
            key="config"
            title="Config"
            data-index="config"
            width="150"
          >
            <span slot-scope="config">
              <a-tag color="blue" >{{ config }}</a-tag>
            </span>
          </a-table-column>

          <a-table-column
            key="setting"
            title="Setting"
            data-index="setting"
            width="150"
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

    chainConfig: [],
    dynamicGlobalProperties: [],
    chainProperties: [],

    styles: {
      height: "500px",
      position: "relative"
    },

    tableClass: ""

  }),

  async mounted () {
    this.ready = false

    try {
      var self = this

      var getConfig = new Promise((resolve, reject) => {
        steem.api.getConfig(function (err, config) {
          // console.log(err, config)

          if (err) return reject(err)

          let configKeys = Object.keys(config)
          let configValues = Object.values(config)

          for (let i in configKeys) {
            let configData = {
              key: i,
              config: configKeys[i],
              setting: (typeof configValues[i] === "number") ? configValues[i].toLocaleString() : configValues[i]
            }

            self.chainConfig.push(configData)
          }

          resolve()
        })
      }).catch(err => {
        console.error(err)
      })

      var getDynamicGlobalProperties = new Promise((resolve, reject) => {
        steem.api.getDynamicGlobalProperties(function (err, config) {
          // console.log(err, config)

          if (err) return reject(err)

          let dynamicGlobalPropertiesKeys = Object.keys(config)
          let dynamicGlobalPropertiesValues = Object.values(config)

          for (let i in dynamicGlobalPropertiesKeys) {
            let dynamicGlobalPropertiesData = {
              key: i,
              config: dynamicGlobalPropertiesKeys[i],
              setting: (typeof dynamicGlobalPropertiesValues[i] === "number") ? dynamicGlobalPropertiesValues[i].toLocaleString() : dynamicGlobalPropertiesValues[i]
            }

            self.dynamicGlobalProperties.push(dynamicGlobalPropertiesData)
          }

          resolve()
        })
      }).catch(err => {
        console.error(err)
      })

      var getChainProperties = new Promise((resolve, reject) => {
        steem.api.getChainProperties(function (err, config) {
          // console.log(err, config)

          if (err) return reject(err)

          let chainPropertiesKeys = Object.keys(config)
          let chainPropertiesValues = Object.values(config)

          for (let i in chainPropertiesKeys) {
            let chainPropertiesData = {
              key: i,
              config: chainPropertiesKeys[i],
              setting: (typeof chainPropertiesValues[i] === "number") ? chainPropertiesValues[i].toLocaleString() : chainPropertiesValues[i]
            }

            self.chainProperties.push(chainPropertiesData)
          }

          resolve()
        })
      }).catch(err => {
        console.error(err)
      })

      await Promise.all([getConfig, getDynamicGlobalProperties, getChainProperties])

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
    }
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
