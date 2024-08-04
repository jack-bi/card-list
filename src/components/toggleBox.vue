<template lang="html">
	<div class="wrap-table">
		<div class="toggle-table">
			<x-block v-if="items.top" :items="items.top" :class="['table-top', items.top.class]" :path="path" :type="'top'"
			:appTitle="appTitle"></x-block>
		<div :class="['table-center', { doToogle: !doToggle }]">
			<div v-if="items.items.bg && items.items.bg.src" class="table-content" :class="items.items.bg.class" :style="items.items.bg.style">
				<div class="table-content-wrap">
					<table>
            <thead>
              <th>等级</th>
              <th>投注额</th>
              <th>周工资</th>
              <th>月俸禄</th>
            </thead>
            <tbody>
              <tr v-for="num in 1">
                <td>VIP{{1}}</td>
                <td>-</td>
                <td>-</td>
                <td>3</td>
              </tr>
              <tr v-for="(num,index) in nums" :key="num.index">
                <td>VIP{{num+1}}</td>
                <td>{{pay*num*(num-0.5)*10}}万+</td>
                <td>{{pay*num*num*wage/10}}</td>
                <td>{{pay*num*wage*salary*(salary-pay)/2000}}</td>
              </tr>
            </tbody>
					</table>
				</div>
				<div :class="['table-content-unfold']" @click="doToggle=!doToggle">
					<p>{{doToggle?'点击展开所有特权' : '点击收起'}}</p>
					<img v-show="doToggle" :src="`${uploadHost}u_11_5.png`">
				</div>
			</div>
		</div>
		<x-block v-if="items.bottom" :items="items.bottom" :class="['table-bottom', items.bottom.class]" :path="path"
			:type="'bottom'" :appTitle="appTitle" @click="doClick"></x-block>
		</div>
	</div>
</template>

<script>
  const xBlock = () => import( /* webpackChunkName: "components/block" */ '@/components/block')
  import common from '$COM'
  import moment from 'moment'
  // import $ from 'jquery'
  export default {
    props: ['items', 'path', 'type', 'appTitle'],
    components: {
      xBlock
    },
    data() {
      return {
        uploadHost: common.Util.getUploadHost() + '/image-qp/landingPage/',
        doToggle: true,
        num: 1,
        nums: 15,
        pay: 2,
        wage: 10,
        salary: 50,
      }
    },
    computed: {},
    methods: {
      doClick(e) {
        this.$emit('click', e);
      },
      doHover(item) {
        this.$emit(event.type, item);
      },
      getClass(c) {
        let t = (s, i = this) => {
          let o = s.shift(0);
          if (o == undefined) {
            return i;
          } else if (i[o]) {
            return t(s, i[o]);
          } else {
            return null;
          }
        };
        return t(c.split('.'))
      },
    mounted() {
      let meta = document.querySelector('[name="viewport"]');
      meta.content = "width=750, user-scalable=no, target-densitydpi=device-dpi";
    },
    destroyed() {
    },
    updated() {}
  }
}
</script>

<style lang="scss">
</style>
