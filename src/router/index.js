
import Vue from "vue"
import Router from "vue-router"

import Live from "../views/Live"
import Dated from "../views/Dated"
import Market from "../views/Market"
import Network from "../views/Network"
import Witnesses from "../views/Witness"
import Reward from "../views/Reward"

import About from "../views/About"
import Terms from "../views/Terms"
import Privacy from "../views/Privacy"

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "*",
      name: "Live",
      component: Live,
      meta: {
        title: "Graphic insights into the Steem Blockchain - Steem Metrics",
        metaTags: [
          {
            name: "description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          },
          {
            property: "og:description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          }
        ]
      }
    },
    {
      path: "/dated",
      name: "Dated",
      component: Dated,
      meta: {
        title: "Steem dApps usage insights - Steem Metrics",
        metaTags: [
          {
            name: "description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          },
          {
            property: "og:description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          }
        ]
      }
    },
    {
      path: "/market",
      name: "Market",
      component: Market,
      meta: {
        title: "Steem Blockchain market - Steem Metrics",
        metaTags: [
          {
            name: "description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          },
          {
            property: "og:description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          }
        ]
      }
    },
    {
      path: "/network",
      name: "Network",
      component: Network,
      meta: {
        title: "Steem Blockchain network - Steem Metrics",
        metaTags: [
          {
            name: "description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          },
          {
            property: "og:description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          }
        ]
      }
    },
    {
      path: "/witnesses",
      name: "Witnesses",
      component: Witnesses,
      meta: {
        title: "Steem Blockchain witnesses - Steem Metrics",
        metaTags: [
          {
            name: "description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          },
          {
            property: "og:description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          }
        ]
      }
    },
    {
      path: "/reward",
      name: "Reward",
      component: Reward,
      meta: {
        title: "Steem Blockchain trends - Steem Metrics",
        metaTags: [
          {
            name: "description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          },
          {
            property: "og:description",
            content: "Steem Metrics offers advanced graphic insights of the usage metrics of the Steem blockchain, apps, libraries, witness, network, market and more. Discover the top voted for witnesses, trending categories and market orders."
          }
        ]
      }
    },
    {
      path: "/about",
      name: "About",
      component: About,
      meta: {
        title: "About Steem Metrics",
        metaTags: [
          {
            name: "description",
            content: "Steem Metrics is an open source project of the Steem Institute. Learn more about us."
          },
          {
            property: "og:description",
            content: "Steem Metrics is an open source project of the Steem Institute. Learn more about us."
          }
        ]
      }
    },
    {
      path: "/terms",
      name: "Terms",
      component: Terms,
      meta: {
        title: "Terms of Service - Steem Metrics",
        metaTags: [
          {
            name: "description",
            content: "Steem Metrics Terms of Service."
          },
          {
            property: "og:description",
            content: "Steem Metrics Terms of Service."
          }
        ]
      }
    },
    {
      path: "/privacy",
      name: "Privacy",
      component: Privacy,
      meta: {
        title: "Privacy Policy - Steem Metrics",
        metaTags: [
          {
            name: "description",
            content: "Steem Metrics Privacy Policy."
          },
          {
            property: "og:description",
            content: "Steem Metrics Privacy Policy."
          }
        ]
      }
    }
  ]
})

