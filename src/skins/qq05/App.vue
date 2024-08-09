<template>
	<div id="app" :class="[{ 'setting-ui': showUI }, { 'setting-block': showBlock }]" :style="style">
		<router-view :landingPage="landingPage" :home="home" :btn="showBlock" :currentIndex="currentIndex"
			:swiper="Swiper" @click="doSetUI" @change="doSelected" ref="page" />
		<x-wrap></x-wrap>
		<div class="setting-btn">
			<div class="setting-btn-ui" @click="showUI = !showUI">{{ !showUI ? '版型' : '關閉' }}</div>
			<div class="setting-btn-ui hide" @click="showUI = false; showBlock = !showBlock;">調整</div>
		</div>
		<section v-show="showUI" class="setting-ui-box">
			<div class="setting-ui-box-items">
				<div v-for="item in uiNum" :key="`ui-${item}`">
					<span>{{ item }}</span>
					<img :src="`./ui/${item}.jpg`" @click="doDblclick(item)" />
				</div>
			</div>
		</section>
		<section v-show="showBlock" class="setting-block-box">
			<div>{{ current }}</div>
		</section>
	</div>
</template>

<script>
const xWrap = () => import(/* webpackChunkName: "components/wrap" */'@/components/wrap')
import common from '$COM'
import cloneDeep from 'lodash/cloneDeep'
import axios from 'axios'
export default {
	name: 'App',
	components: {
		xWrap
	},
	data() {
		return {
			selected: 0,
			showUI: false,
			showBlock: false,
			uiNum: 6,
			current: null,
			currentIndex: 0,
			delay: 700,
			clicks: 0,
			timer: null,
			home: {
				ui: [
					{
						type: 'mask',
						show: false,
						class: 'flex',
						style: {
							backgroundColor: 'rgba(255, 0, 0, .5)'
						},
						list: [
							{
								src: 'lp05/hb.png'
							},
							{
								text: 'MASK 點我關閉',
								class: 'btn',
								click: 'download|mask|1',
								style: {
									width: '60%',
									fontSize: '1rem',
									lineHeight: '2rem',
									margin: 'auto 20%',
									position: 'absolute',
									top: '5%',
									color: '#fff',
									border: '1px solid #fff'
								}
							},
							{
								text: 'GO 落地頁 pc or Android or IOS',
								class: 'btn',
								click: 'route|lp',
								style: {
									width: '80%',
									fontSize: '1rem',
									lineHeight: '2rem',
									margin: 'auto 10%',
									position: 'absolute',
									top: '30%',
									color: '#fff',
									background: 'black',
									border: '1px solid #fff'
								}
							},
							{
								text: 'GO 落地頁 is Android',
								class: 'btn',
								isAndroid: true,
								click: 'route|lp',
								style: {
									width: '60%',
									fontSize: '1rem',
									lineHeight: '2rem',
									margin: 'auto 20%',
									position: 'absolute',
									top: '11%',
									color: '#fff',
									border: '1px solid #fff'
								}
							},
							{
								text: 'GO 落地頁 is IOS',
								class: 'btn',
								isIOS: true,
								click: 'route|lp',
								style: {
									width: '60%',
									fontSize: '1rem',
									lineHeight: '2rem',
									margin: 'auto 20%',
									position: 'absolute',
									top: '17%',
									color: '#fff',
									border: '1px solid #fff'
								}
							}
						]
					},
					{
						"type": "block",
						"click": "top",
						"list": [{
							"src": "u_2_bg_1.jpg"
						}, {
							"src": "l_2.png",
							"style": {
								"width": "50%",
								"top": "4.5rem",
								"left": "0",
								"position": "absolute"
							}
						}, {
							"src": "b_2_1.gif",
							text: 'GO 落地頁',
							"class": "btn animation-heartbeat",
							"click": "mask|1|route|lp",
							"style": {
								"width": "90%",
								"top": "0",
								"right": "0",
								"margin": "0 auto",
								"position": "relative"
							}
						},
						{
							html: '<div><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p></div>'
						}
						]
					}
				]
			},
			landingPage: {
				"app": {
					"backgroundColor": "#09268a"
				},
				"bg": {
					"backgroundImage": "url(/image-qp/landingPage/u_1_bg_2.jpg)",
					"backgroundPosition": "center bottom",
					"backgroundColor": "#09268a"
				},
				"ui//": [
					{
						type: 'mask',
						show: true,
						list: [
							{
								src: 'lp05/hb.png'
							},
							{
								src: 'b_1.png',
								click: 'mask|1',
								style: {
									width: '100%',
									position: 'absolute',
									top: '10%',
								}
							}
						]
					},
					{
						type: 'mask',
						show: true,
						class: 'flex',
						items: {
							bg: {
								src: 'u_9_bg_5.png'
							}
						},
						list: [
							{
								src: 'b_1.png',
								click: 'mask|2',
								style: {
									width: '100%',
									position: 'absolute',
									top: '50%',
								}
							}
						]
					},
					{
						"type": "block",
						"list": [{
							"src": "u_1_bg_1.jpg"
						}, {
							"src": "l_1.png",
							"style": {
								"width": "60%",
								"top": "1rem",
								"right": "0.5rem",
								"position": "absolute"
							}
						}, {
							"src": "b_1.png",
							"hover": "true",
							"click": "mask|1",
							"class": "btn animation-heartbeat",
							"style": {
								"width": "36%",
								"top": "0",
								"right": "1.5rem",
								"marginTop": "53%",
								"position": "absolute"
							}
						}]
					},
					{
						"type": "sitelink",
						"class": "site-link-style-0",
						"items": {
							"timerMax": 10,
							"list": [{
								"text": "站点一",
								"link": "https://bg567.com",
								"btn": {
									"text": "点击进入"
								}
							}, {
								"text": "站点二",
								"link": "https://bg567.com",
								"btn": {
									"text": "点击进入"
								}
							}, {
								"text": "站点三",
								"link": "https://bg567.com",
								"btn": {
									"text": "点击进入"
								}
							}]
						}
					},
					{
						"type": "swiper",
						"init": true,
						"id": 376311,
						"top": {
							"list": [{
								"src": "u_1_1.png",
								"class": "h-1",
								"style": {
									"padding": "1rem 0",
									"//width": "60%"
								}
							}]
						},
						"list": ["i_1_1.png", "i_1_2.png", "i_1_3.png", "i_1_4.png", "i_1_5.png"],
						"option": {
							"list": {
								"style": {
									"width": "35%"
								}
							},
							"autoplay": false,
							watchSlidesProgress: true,
							slidesPerView: 'auto',
							centeredSlides: true,
							loopedSlides: 5,
							on: {
								progress: function (progress) {
									for (var i = 0; i < this.slides.length; i++) {
										var slide = this.slides.eq(i);
										var slideProgress = this.slides[i].progress;
										var modify = 1;
										if (Math.abs(this.loopedSlides == 3 ? slideProgress : Math.round(slideProgress)) > 1) {
											modify = (Math.abs(slideProgress) - .35) * 0.4 + .6;
											// * r + z
											// modify = (Math.abs(slideProgress) - .7) * 0.4 + .6;
										}
										var translate = slideProgress * modify * 45 + '%';
										// var translate = slideProgress * modify * 100 + 'px';
										var scale = 1 - Math.abs(slideProgress) / 7;
										// var scale = 1 - Math.abs(slideProgress) / 9;
										var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
										slide.transform('translateX(' + translate + ') scale(' + scale + ')');
										slide.css('zIndex', zIndex);
										slide.css('opacity', 1);
										if (Math.abs(slideProgress) > this.loopedSlides - (this.loopedSlides == 3 ? 1.5 : 2)) {
											slide.css('opacity', 0);
										}
									}
								},
								setTransition: function (transition) {
									for (var i = 0; i < this.slides.length; i++) {
										var slide = this.slides.eq(i)
										slide.transition(transition);
									}
								}
							},
							"navigation": {
								"next": {
									"backgroundImage": "url(/image-qp/landingPage/a_1_r.png)"
								},
								"prev": {
									"backgroundImage": "url(/image-qp/landingPage/a_1_l.png)"
								}
							}
						}
					},
					{
						"type": "swiper",
						"init": true,
						"id": 379302,
						"top": {
							"list": [{
								"src": "u_1_2.png",
								"class": "h-1",
								"style": {
									"padding": "1rem 0",
									"//width": "60%"
								}
							}]
						},
						"list": ["i_2_1.jpg", "i_2_2.jpg", "i_2_3.jpg"],
						"option": {
							style: {
							},
							list: {
								style: {
								}
							},
							effect: 'coverflow',
							slidesPerView: 2,
							centeredSlides: true,
							// initialSlide: 1,
							autoplay: false,
							coverflowEffect: {
								rotate: 25, //slide做3d旋转时Y轴的旋转角度。默认50。
								stretch: -30,//-50, //每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
								depth: 100,//450, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
								modifier: 1,//1, //depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
								slideShadows: true //开启slide阴影。默认 true。
							},
							"navigation": {
								"next": {
									"backgroundImage": "url(/image-qp/landingPage/a_1_r.png)"
								},
								"prev": {
									"backgroundImage": "url(/image-qp/landingPage/a_1_l.png)"
								}
							}
						}
					},
					{
						"type": "block",
						"style": {
							"marginTop": "2rem",
							"padding": "1rem 0",
							"background": "#1d208b",
							"color": "#74e5e9",
							"letterSpacing": ".5rem",
							"fontStyle": "italic",
							"fontSize": "1.125rem"
						},
						"list": [{
							"text": "棋牌游戏 尽在金牛"
						}]
					}
				]
			},
			// Swiper option
			Swiper: [
				{
					style: {
						width: '80%'
					},
					effect: 'fade',
					// autoplay: false,
					// 分页器
					pagination: {
						list: ['botttom'],
						type: 'progressbar', //分页器形状 'bullets'
					},
					// 前进后退按钮
					navigation: true,
				},
				{
					effect: 'coverflow',
					slidesPerView: 2,
					centeredSlides: true,
					initialSlide: 1,
					coverflowEffect: {
						rotate: 0,
						stretch: 10,
						depth: 160,
						modifier: 2,
						slideShadows: true
					}
				},
				{
					list: {
						style: {
							width: '70%'
						}
					},
					watchSlidesProgress: true,
					slidesPerView: 'auto',
					centeredSlides: true,
					loopedSlides: 3,
					roundLengths: true,
					// autoplay: false,
					on: {
						progress: function (progress) {
							for (var i = 0; i < this.slides.length; i++) {
								var slide = this.slides.eq(i);
								var slideProgress = this.slides[i].progress;
								var modify = 1;
								if (this.loopedSlides == 3 ? slideProgress : Math.abs(slideProgress) > 1) {
									modify = (Math.abs(slideProgress) - .35) * .25 + .9;
								}
								var translate = slideProgress * modify * 75 + '%';
								var scale = 1 - Math.abs(slideProgress) / 7;
								var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
								slide.transform('translateX(' + translate + ') scale(' + scale + ')');
								slide.css('zIndex', zIndex);
								slide.css('opacity', 1);
								if (Math.abs(slideProgress) > this.loopedSlides - (this.loopedSlides == 3 ? 1.5 : 2)) {
									slide.css('opacity', 0);
								}
							}
						},
						setTransition: function (transition) {
							for (var i = 0; i < this.slides.length; i++) {
								var slide = this.slides.eq(i)
								slide.transition(transition);
							}
						},
					}
				},
				{
					effect: 'coverflow',
					slidesPerView: 2,
					centeredSlides: true,
					initialSlide: 1,
					coverflowEffect: {
						rotate: 40, //slide做3d旋转时Y轴的旋转角度。默认50。
						stretch: -50,//-30, //每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
						depth: 450,//100, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
						modifier: 1,//1, //depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
						slideShadows: true //开启slide阴影。默认 true。
					}
				},
				{
					"list": {
						"style": {
							"width": "75%",
						}
					},
					"effect": "coverflow",
					"centeredSlides": true,
					"slidesPerView": "auto",
					"coverflowEffect": {
						"rotate": 0,
						"stretch": 80,
						"depth": 150,
						"modifier": 1,
						"slideShadows": false
					},
				},
				{
					slidesPerView: '5',
					speed: 500,
					centeredSlides: true,
				},
				{
					style: {},
					"class": "swiper-scale",
					"slidesPerView": "5",
					"speed": 500,
					// "autoplay": false,
					"centeredSlides": true,
					// 分页器
					// pagination: {
					//     list: ['botttom'], // ['top', 'bottom' ]
					//     type: 'progressbar', //分页器形状 'bullets'
					//     renderBullet: function (index, className) {// 自訂
					//          return '<span class="' + className + '">' + index + '</span>';
					//     },
					// },
					"navigation": {
						"next": {
							"backgroundImage": "url(/image-qp/landingPage/a_1_r.png)"
						},
						"prev": {
							"backgroundImage": "url(/image-qp/landingPage/a_1_l.png)"
						}
					}
				},
				{
					// SS05
					watchSlidesProgress: true,
					slidesPerView: 'auto',
					centeredSlides: true,
					loopedSlides: 5,
					list: {
						style: {
							width: '35%'
						}
					},
					on: {
						progress: function (progress) {
							for (var i = 0; i < this.slides.length; i++) {
								var slide = this.slides.eq(i);
								var slideProgress = this.slides[i].progress;
								var modify = 1;
								if (Math.abs(this.loopedSlides == 3 ? slideProgress : Math.round(slideProgress)) > 1) {
									modify = (Math.abs(slideProgress) - .35) * 0.4 + .6;
									// modify = (Math.abs(slideProgress) - .7) * 0.4 + .6;
								}
								var translate = slideProgress * modify * 45 + '%';
								// var translate = slideProgress * modify * 100 + 'px';
								var scale = 1 - Math.abs(slideProgress) / 7;
								// var scale = 1 - Math.abs(slideProgress) / 9;
								var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
								slide.transform('translateX(' + translate + ') scale(' + scale + ')');
								slide.css('zIndex', zIndex);
								slide.css('opacity', 1);
								if (Math.abs(slideProgress) > this.loopedSlides - (this.loopedSlides == 3 ? 1.5 : 2)) {
									slide.css('opacity', 0);
								}
							}
						},
						setTransition: function (transition) {
							for (var i = 0; i < this.slides.length; i++) {
								var slide = this.slides.eq(i)
								slide.transition(transition);
							}
						}
					}
				},
			],
			Footer: [
				{
					style: {
						backgroundImage: 'linear-gradient(180deg,#303030,#000)',
						color: '#fff'
					},
					logo: {},
					title: {},
					desc: {
						text: '0秒下载，顶级手感',
					},
					star: {},
					btn: {
						list: [
							{
								text: '立即下载',
								style: {
									backgroundImage: 'linear-gradient(90deg,#fcdcb3,#cbb277)',
									color: '#392818',
									borderRadius: '2rem',
								}
							},
						]
					},
					agent: {
						code: {
							text: {
								style: {
									color: 'red'
								}
							}
						},
						copy: {
							style: {
								backgroundImage: 'linear-gradient(90deg,#fcdcb3,#cbb277)',
								color: '#392818',
								borderRadius: '2rem',
							}
						}
					}
				},
				{
					style: {
						backgroundColor: 'rgba(0, 0, 0, .5)',
						color: '#fff'
					},
					logo: true,
					title: true,
					desc: {
						text: '-- 1秒下载，顶级手感 --',
					},
					btn: {
						list: [
							{
								src: '',
								text: 'download'
							},
						]
					}
				},
				{
					style: {
						backgroundColor: 'rgba(0, 0, 0, .5)',
					},
					btn: {
						list: [
							{
								src: '/image-qp/landingPage/ios.png',
							},
							{
								src: '/image-qp/landingPage/andriod.png',
							}
						]
					}
				},
				{
					style: {
						backgroundImage: 'url(/image-qp/landingPage/footer.gif)',
						height: '4rem',
					},
				},
				{
					class: 'logo-1-area-3',
					logo: {
						class: 'logo-float-top'
					},
				}
			]
		}
	},
	methods: {
		doDblclick(item) {
			this.clicks++
			if (this.clicks === 1) {
				const self = this;
				this.timer = setTimeout(function () {
					self.clicks = 0;
				}, this.delay);
			} else {
				clearTimeout(this.timer);
				this.clicks = 0;
				this.doGetUI(item);
			}
		},
		async doGetUI(index) {
			let vm = this;
			this.landingPage = {};
			await axios.get(`./ui/${index}.json`)
				.then( response => {
					const res = response.data;//vm.changeBg(response.data);
					document.body.style.filter = 'blur(10px) brightness(0.25)';
					document.body.style.backgroundColor = '#000';
					setTimeout(() => {
						vm.landingPage = res;//response.data;
						vm.showUI = false;//!vm.showUI;
						document.body.style.filter = '';
						document.body.classList.remove('mask');
					}, 500);
				})
				.catch( error => {
					console.log('err.res', error.response);
					common.Util.showToast('尚未製作!')
				})
				.finally(function () {
				});
		},
		changeBg(obj) {
			Object.keys(obj).forEach(key => {
				if (typeof obj[key] == 'object') {
					obj[key] = this.changeBg(obj[key]);
				} else {
					if (/backgroundImage|background-image/.test(key)) {
						obj[key] = obj[key].replace(/\/image-qp\/landingPage/, `${common.Constant.cdnPath}/image-qp/landingPage`);
					}
				}
			})
			return obj;
		},
		doDrop() {
			const slider = document.querySelector(".setting-ui-box");
			if (!slider) return;
			let isDown = false;
			let startX;
			let scrollLeft;
			slider.addEventListener("mousedown", e => {
				isDown = true;
				slider.classList.add("active");
				startX = e.pageX - slider.offsetLeft;
				scrollLeft = slider.scrollLeft;
			});
			slider.addEventListener("mouseleave", () => {
				isDown = false;
				slider.classList.remove("active");
			});
			slider.addEventListener("mouseup", () => {
				isDown = false;
				slider.classList.remove("active");
			});
			slider.addEventListener("mousemove", e => {
				if (!isDown) return;
				e.preventDefault();
				const x = e.pageX - slider.offsetLeft;
				const walk = x - startX;
				slider.scrollLeft = scrollLeft - walk;
			});
		},
		doSwiper(index, option) {
			this.landingPage.ui[index].option = option;
			this.landingPage.ui[index].init = false;
			setTimeout(() => {
				this.landingPage.ui[index].init = true;
			}, 500);
		},
		doSetUI(index) {
			let tmp = cloneDeep(this.landingPage.ui);
			let current = tmp[index];
			const type = event.target.dataset.id;
			const prev = parseInt(index) - 1;
			const next = parseInt(index) + 1;
			// console.log(index, prev, next, event.target.dataset.id)//event.target,
			// this.$nextTick(()=>{
			switch (type) {
				case 'swiper':
					if (index == tmp.length - 1) return;
					[tmp[index], tmp[next]] = [tmp[next], tmp[index]];
					break;
				case 'next':
					if (index == tmp.length - 1) return;
					[tmp[index], tmp[next]] = [tmp[next], tmp[index]];
					break;
				case 'prev':
					if (index == 0) return;
					[tmp[prev], tmp[index]] = [tmp[index], tmp[prev]];
					break;
				case 'add':
					tmp.splice(index, 0, current);
					break;
				case 'del':
					tmp.splice(index, 1);
					break;
				default:
			}
			this.landingPage.ui = tmp;
			this.currentIndex = index;
		},
		doSelected(index) {
			if (event.target.selectedIndex == 0) return;
			console.log(index, event.target.selectedIndex - 1)
			this.doSwiper(index, this.Swiper[event.target.selectedIndex - 1]);
		}
	},
	computed: {
		style() {
			return this[this.$route.name] && this[this.$route.name].app ? this[this.$route.name].app : {};
		}
	},
	created() {
		common.Util.initMain(this, true); // true 表示 是金牛
	},
	mounted() {
		this.doGetUI(1);
		this.doDrop();
	}
}
</script>

<style lang="scss">
@import '~@/style/base';
@import '~@/style/landingPage';

// @include set_footer(0);
// @include set_sitelink(0);

// 打包sitelink所有樣式
$sitelink: 4;

@for $i from 1 through $sitelink {
	@include set_sitelink($i - 1);
}

@include set_togglebox(0);
@include set_togglebox(1);

// for setting app
body {
	transition: all .5s;
}

.hide {
	display: none !important;
}

.setting {
	&-btn {
		cursor: pointer;
		position: fixed;
		top: 1%;
		left: 1%;
		z-index: 20;
		@include flex(center, center, column);

		&-ui {
			width: 3rem;
			height: 3rem;
			border-radius: 10rem;
			background: rgba(109, 109, 109, 0.8);
			color: #eee;
			border: .125rem solid rgba(0, 0, 0, .1);
			font-size: 1rem;
			transform: scale(.8);
			@include flex(center, center, null);
		}
	}

	&-ui-box {
		width: 100%;
		position: fixed;
		overflow-y: hidden;
		overflow-x: auto;
		background: rgba(255, 255, 255, 0.75);
		-webkit-overflow-scrolling: touch;
		z-index: 19;
		top: 0;
		left: 0;

		&-items {
			height: 98vh;
			padding: 1vh 5%;
			cursor: grab;
			flex-flow: row;
			@include flex(flex-start, flex-start, null);

			>div {
				margin: 2%;
				position: relative;

				// @include flex(null, center, null);
				>span {
					width: 2rem;
					display: block;
					text-align: right;
					position: absolute;
					top: 0;
					left: -2.4rem;
					color: #000;
					font-size: .6rem;
				}

				&:hover {
					&:before {
						width: 100%;
						content: '點2下切換';
						position: absolute;
						padding: .5rem 0;
						font-size: .5rem;
						color: #fff;
						box-shadow: inset #000 0 0 20px 16px;
						cursor: pointer;
						pointer-events: none;
						top: 50%;
						margin-top: -1rem;
					}
				}

				&:last-child {
					&:after {
						content: '.';
						color: rgba(0, 0, 0, 0);
						position: absolute;
						right: -3rem;
					}
				}
			}

			img {
				max-width: 40vw;
				max-height: 95vh;
				box-shadow: rgba(0, 0, 0, 0.65) 0px 5px 15px;
				cursor: pointer;
			}
		}
	}

	&-block-box {

		>div {
			position: fixed;
		}

		&-list {
			z-index: 8;
			font-size: .5rem;
			color: #fff;
			@include flex(center, center, null);
			@include pos_absolute(1%, 1%, null, null);
		}

		&-btn {
			@include size(.7rem, .7rem);
			@include flex(center, center, null);
			background: rgba(100, 100, 100, .25);
			border: .1rem solid rgba(0, 0, 0, .25);
			border-radius: 10rem;
			padding: .125rem;
			margin: 0 .125rem;
			cursor: pointer;

			>i {
				pointer-events: none;
			}

			&.active {
				background: rgba(165, 42, 42, .8);
			}

			&.add,
			&.del {
				b {
					transform: scale(1.85) translateY(-.035rem);
					pointer-events: none;
				}
			}
		}
	}

	&-block {
		.landingPage {
			>section {

				.setting-block-box-btn {
					display: flex;
				}

				&:after {
					width: 100%;
					height: 100%;
					content: '';
					box-shadow: inset red 0 0 4px 0;
					position: absolute;
					display: flex;
					top: 0;
					pointer-events: none;
				}
			}
		}
	}
}

#app {
	#wrapper {
		.hint {
			display: none;
		}
	}

	&.setting-ui {
		#wrapper {
			.cs-wrapper {
				display: none;
			}
		}
	}
}
</style>
