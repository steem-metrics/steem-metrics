<template>
  <div class="container">
    <div class="footer">

      <a-divider orientation="right">Steem Metrics</a-divider>

      <div class="justified">
        <div>
          A <a
            href="https://steeminc.com"
            target="_blank">Steem Inc</a> company |
            Dated data by <a
              href="https://steemapps.com"
              target="_blank">Steem Apps API</a>
        </div>
        <div>
          <router-link to="/about">About</router-link>

          <a-divider type="vertical" />

          <a
            href="https://steemstudios.com"
            target="_blank">Solutions</a>

          <a-divider type="vertical" />

          <a
            href="https://steeminc.com/contact"
            target="_blank">Contact</a>

          <a-divider type="vertical" />

          <router-link to="/terms">Terms</router-link>

          <a-divider type="vertical" />

          <router-link to="/privacy">Privacy</router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.credits {
    text-align: right;
    margin-top: 2rem;
}
.footer {
    font-size: 70%;
    margin: 3rem 0rem;
    color: black;
}
</style>
