<template lang="html">
    <div id="wrapper">
        <x-hint></x-hint>
        <x-analysis></x-analysis>
        <x-fix-guide></x-fix-guide>
        <toast></toast>
        <cs></cs>
        <safari-hint></safari-hint>
    </div>
</template>

<script>
const xHint = () => import(/* webpackChunkName: "components/hint" */'@/components/hint')
const xAnalysis = () => import(/* webpackChunkName: "components/analysis" */'@/components/analysis')
const xFixGuide = () => import(/* webpackChunkName: "components/fix-guide" */'@/views/fix-guide')
const toast = () => import(/* webpackChunkName: "components/toast" */'@/components/toast')
const cs = () => import(/* webpackChunkName: "components/cs" */'@/components/cs')
const safariHint = () => import(/* webpackChunkName: "components/safariHint" */'@/components/safariHint')
export default {
    components: {
        xHint,
        xAnalysis,
        xFixGuide,
        toast,
        cs,
        safariHint,
    },
}
</script>

<style lang="css" scoped>
</style>
