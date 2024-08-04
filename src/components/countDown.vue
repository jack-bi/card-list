<template lang="html">
	<div class="wrap-table">
		<div class="countDown">
			<div v-if="items.fl" class="fl" :style="items.fl.style">
				<p v-html="items.fl.text" :style="items.fl.styleTitle"></p>        <!-- 每周一派发倒计时 -->
				<p class="y-left" :style="items.fl.styleTime">00<span>天</span>00:00:00</p>
			</div>
			<div v-if="items.fr" class="fr" :style="items.fl.style">
				<p v-html="items.fr.text" :style="items.fr.styleTitle"></p>        <!-- 每月1号派发倒计时 -->
				<p class="z-left" :style="items.fr.styleTime">00<span>天</span>00:00:00</p>
			</div>
		</div>
	</div>
</template>

<script>
  // const xBlock = () => import( /* webpackChunkName: "components/block" */ '@/components/block')
  import common from '$COM'
  import moment from 'moment'
  // import $ from 'jquery'
  export default {
    props: ['items', 'path', 'type', 'appTitle'],
    // components: {
    //   xBlock
    // },
    data() {
      return {
        uploadHost: common.Util.getUploadHost() + '/image-qp/landingPage/',
        timer: null,
        day: 1, //1-7 (每周:周一~周日)
        dayH: 0, //每周:時
        dayM: 0, //每周:分
        date: 1, //1-31 (每月:1号~31号)
        dateH: 0, //每月:時
        dateM: 0 //每月:分
      }
    },

    computed: {},
    methods: {
      countDownTimer() {
        let info = [];
        const list = ['fl', 'fr'];
        Object.keys(this.items).map((o, i)=>{
            if(list.indexOf(o) !== -1){
                info.push(Object.assign({}, { type : o }, this.items[o], true));
            }
        })
        // return info;
        info.map((o, i)=>{
          if(info[i].type == "fl") {
            if(info[i].day) this.day = info[i].day
            if(info[i].dayH) this.dayH = info[i].dayH
            if(info[i].dayM) this.dayM = info[i].dayM
          }
          if(info[i].type == "fr") {
            if(info[i].date) this.date = info[i].date
            if(info[i].dateH) this.dateH = info[i].dateH
            if(info[i].dateM) this.dateM = info[i].dateM
          }
        });
        //倒计时
        var now = moment().utcOffset(8);
        var nextTuesday = moment().utcOffset(8).day(this.day).hour(this.dayH).minute(this.dayM).second(0);
        if (now > nextTuesday) {
          nextTuesday = nextTuesday.add(1, 'weeks');
        }
        var nextMonth = moment().utcOffset(8).date(this.date).hour(this.dateH).minute(this.dateM).second(0);
        if (now > nextMonth) {
          nextMonth = nextMonth.add(1, 'months');
        }
        this.timer = setInterval(function () {
          now = moment().utcOffset(8);

          if (now >= nextTuesday) {
            nextTuesday = nextTuesday.add(1, 'weeks');
          }
          var d1 = moment.duration(nextTuesday.diff(now));
          var day1 = d1.days() < 10 ? '0' + d1.days() : d1.days();
          var h1 = d1.hours() < 10 ? '0' + d1.hours() : d1.hours();
          var m1 = d1.minutes() < 10 ? '0' + d1.minutes() : d1.minutes();
          var s1 = d1.seconds() < 10 ? '0' + d1.seconds() : d1.seconds();
          $('.y-left').html(`${day1}<span>天</span>${h1}:${m1}:${s1}`)

          if (now >= nextMonth) {
            nextMonth = nextMonth.add(1, 'months');
          }
          var d2 = moment.duration(nextMonth.diff(now));
          var day2 = d2.days() < 10 ? '0' + d2.days() : d2.days();
          var h2 = d2.hours() < 10 ? '0' + d2.hours() : d2.hours();
          var m2 = d2.minutes() < 10 ? '0' + d2.minutes() : d2.minutes();
          var s2 = d2.seconds() < 10 ? '0' + d2.seconds() : d2.seconds();
          $('.z-left').html(`${day2}<span>天</span>${h2}:${m2}:${s2}`)
        }, 1000);
      }
    },
    mounted() {
      let meta = document.querySelector('[name="viewport"]');
      meta.content = "width=720";
      this.countDownTimer();
    },
    destroyed() {
      //還原
      clearTimeout(this.timer);
    },
    updated() {}
  }

</script>

<style lang="scss">
  @import '~@/style/landingPage';
	.wrap-table {
		margin: 0 auto;
		position: relative;
	}
	.countDown {
		width: 707px;
		margin: 1rem auto;
		padding-bottom: 4rem;
		.fl { float: left };
		.fr { float: right };
		div {
			width: 348px;
			height: 98px;
			background: url(/image-qp/lp05/cdBtn_bg.png);
			text-align: center;
			padding: 0.5rem 0;
			p:first-child {
				font-weight: bold;
				font-size: 0.8rem;
				line-height: 1rem;
				color: white;
				margin-top: 0.4rem;
				margin-bottom: 0;
			}
			p:last-child {
				// font-family: 'PingFang-SC-Regular';
				font-size: 1.3rem;
				font-weight: bold;
				color: #fff054;
				margin: 0;
        // span {
        //   // vertical-align: middle;
        //   // font-size: 1rem;
        // }
			}
		}
	}

</style>
