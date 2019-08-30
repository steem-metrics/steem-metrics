<template>
  <div class="container navbar">
    <div class="justified">
      <a href="/">
        <img
          :src="'/img/steem-metrics-banner.png'"
          alt="logo"
          style="width: 100px;"
          class="desktop">
        <img
          :src="'/img/steem-metrics-logo.png'"
          alt="logo"
          style="width: 100px;"
          class="mobile">
      </a>

      <div>
        <a-menu
          mode="horizontal"
        >
          <a-menu-item >
            <router-link to="/">Live</router-link>
          </a-menu-item>

          <a-menu-item >
            <router-link to="/dated">Dated</router-link>
          </a-menu-item>

          <a-menu-item >
            <router-link to="/market">Market</router-link>
          </a-menu-item>

          <a-menu-item >
            <router-link to="/network">Network</router-link>
          </a-menu-item>

          <a-menu-item >
            <router-link to="/witnesses">Witnesses</router-link>
          </a-menu-item>

          <a-menu-item >
            <router-link to="/reward">Reward</router-link>
          </a-menu-item>
        </a-menu>

      </div>

    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.navbar {
  margin: 2rem auto 4rem;
  text-decoration: none;
}
.navbar * {
  text-decoration: none;
}

</style>
