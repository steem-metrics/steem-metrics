<template>
  <div class="container">
    <div class="footer">

      <a-divider orientation="right">Steem Metrics</a-divider>

      <div class="justified">
        <div>

          A
          <a
            href="https://steemstudios.com"
            target="_blank">Steem Studios</a> production
        </div>
        <div>
          <router-link to="/about">About</router-link>

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
  color: black !important;
}
.footer * {
  color: black !important;
  text-decoration: none;
}
</style>
