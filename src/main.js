// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias

import Vue from "vue"
import { Menu, Button, Divider, Spin, Table, Alert, Tag, Icon, Dropdown } from "ant-design-vue"

import App from "./App"
import router from "./router"
import store from "./store"

import "./index.css"

import "ant-design-vue/lib/menu/style/index.css"
import "ant-design-vue/lib/button/style/index.css"
import "ant-design-vue/lib/divider/style/index.css"
import "ant-design-vue/lib/spin/style/index.css"
import "ant-design-vue/lib/table/style/index.css"
import "ant-design-vue/lib/alert/style/index.css"
import "ant-design-vue/lib/tag/style/index.css"
import "ant-design-vue/lib/icon/style/index.css"
import "ant-design-vue/lib/dropdown/style/index.css"

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(el => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement("meta")

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute("data-vue-router-controlled", "")

    return tag
  })
  // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag))

  next()
})

Vue.use(Menu)
Vue.use(Button)
Vue.use(Divider)
Vue.use(Spin)
Vue.use(Table)
Vue.use(Alert)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Dropdown)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  /*
  mounted () {
    document.dispatchEvent(new Event("render-event"))
  },
  */
  render: h => h(App)
}).$mount("#app")

window.onerror = function (errorMsg, url, lineNumber) {
  let knownError = "Uncaught TypeError: Cannot set property 'font' of null"
  if (errorMsg.indexOf(knownError) > -1) return true
  console.error(errorMsg, url, lineNumber)
}
