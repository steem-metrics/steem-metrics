<template>
  <div id="app">
    <div>
      <nav-bar/>
    </div>

    <div style="margin: 4rem 0rem">
      <router-view/>
    </div>

    <div>
      <site-footer/>
    </div>
  </div>
</template>

<script>
import Navbar from "./partials/Navbar"
import Footer from "./partials/Footer"

export default {
  name: "App",
  components: {
    "site-footer": Footer,
    "nav-bar": Navbar
  }
}
</script>

<style>
</style>
