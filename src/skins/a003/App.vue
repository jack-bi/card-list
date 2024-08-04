<template>
  <div id="app">
    <router-view />
    <x-wrap></x-wrap>
  </div>
</template>

<script>
const xWrap = () => import(/* webpackChunkName: "components/wrap" */'@/components/wrap')
import common from '$COM'
export default {
  name: 'App',
  components: {
    xWrap
  },
  created() {
    common.Util.initMain(this);
  }
}
</script>
<style lang="scss">
@import '~@/style/base';
</style>