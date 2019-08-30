<template>

  <div class="container">

    <div class="header">
      <h1>About</h1>
    </div>

    <div class="box">

      <p>{{ text }}</p>

    </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      text: "Steem Metrics shows usage and activity information about the Steem Blockchain"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
