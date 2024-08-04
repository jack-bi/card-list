<template>
    <article v-if="setting" class="landingPage"
        :style="style"
        :class="lpclass">
        <!-- <select v-model="selected" :style="{left: 0, position: 'absolute', zIndex: 1}">
          <option v-for="item in Swiper.length" :key="`setting-${item}`">{{ item }}</option>
        </select> -->
        <!--HomeMethods為導入配置的共用方法 -->
        <HomeMethods @getChildData='getChildData'></HomeMethods>
        <section v-for="(item, index) in setting.ui"
            :key="index"
            :ref="item.type"
            :class="['landingPage-' + item.type, item.class]"
            :data-id="index">
            <!-- block -->
            <x-block v-if="item.type == 'block'"
                :items="item"
                :path="imageRoot"
                :appTitle="appTitle"
                @mouseover="doHover"
                @mouseleave="doHover"
                @click="doClick"></x-block>
            <!-- swiper -->
            <x-swiper v-if="item.type == 'swiper' && item.init"
                :items="item"
                :path="imageRoot"
                :class="item.class"
                @click="doClick"></x-swiper>
            <!-- siteLink -->
            <x-site-link
                v-if="item.type.toLowerCase() == 'sitelink'"
                :items="item"
                :path="imageRoot"
                :ref="`sitelink-${index}`"
                @mouseover="doHover"
                @mouseleave="doHover"
                @click="doClick"></x-site-link>
            <!-- footer -->
            <x-footer
                v-if="item.type == 'footer'"
                :items="item"
                :path="imageRoot"
                :logo="logo"
                :showAgentCode="showAgentCode"
                :agentCode="agentCode"
                :appTitle="appTitle"
                @mouseover="doHover"
                @mouseleave="doHover"
                @click="doClick"></x-footer>
            <!-- mask -->
            <x-block v-if="item.type == 'mask' && item.show"
                :items="item"
                :path="imageRoot"
                :appTitle="appTitle"
                type="mask"
                @mouseover="doHover"
                @mouseleave="doHover"
                @click="doClick"></x-block>
            <!-- toggleBox -->
            <toggle-box
                v-if="item.type.toLowerCase() == 'togglebox'"
                :items="item"
                :path="imageRoot"
                :ref="`togglebox-${index}`"
                @click="doClick"></toggle-box>
            <!-- countDown -->
            <count-down v-if="item.type.toLowerCase() == 'countdown'"
                :items="item">{{item.show}}</count-down>
            <!-- setting -->
            <div v-if="btn" class="setting-block-box-list"
                :class="{active: currentIndex == index}">
                <div class="setting-block-box-btn swiper"
                    data-id="swiper">
                    <!-- @click="$emit('click', index)" -->
                    {{parseInt(index) + 1}}
                    <div v-if="item.type=='swiper'">
                        <select class="form-control" @change="$emit('change', index)" :style="{top: '1.5rem', left: 0, position: 'absolute', zIndex: 1}">
                            <option >---</option>
                            <option v-for="item in swiper.length" :key="`swiper-${item}`">{{ item }}</option>
                        </select>
                    </div>
                </div>
                <div class="setting-block-box-btn add"
                    data-id="add"
                    @click="$emit('click', index)">
                    <b>+</b>
                </div>
                <div class="setting-block-box-btn del"
                    data-id="del"
                    @click="$emit('click', index)">
                    <b>-</b>
                </div>
                <div class="setting-block-box-btn prev"
                    data-id="prev"
                    @click="$emit('click', index)">
                    <icon-svg slot="label" icon-class="arrowleft" :style="{transform: 'rotate(90deg)'}"></icon-svg>
                </div>
                <div class="setting-block-box-btn next"
                    data-id="next"
                    @click="$emit('click', index)">
                    <icon-svg slot="label" icon-class="arrowleft" :style="{transform: 'rotate(270deg)'}"></icon-svg>
                </div>
            </div>
            <!-- <div class="setting-block-btn" @click="doSwiper(index, Swiper[2])">{{index + 1}}</div> -->
        </section>
    </article>
</template>

<script>
const xBlock = () => import(/* webpackChunkName: "components/block" */'@/components/block')
const xSwiper = () => import(/* webpackChunkName: "components/swiper" */'@/components/swiper')
const xSiteLink = () => import(/* webpackChunkName: "components/siteLink" */'@/components/siteLink')
const xFooter = () => import(/* webpackChunkName: "components/footer" */'@/components/footer')
const iconSvg = () => import(/* webpackChunkName: "components/iconSvg" */'@/components/iconSvg')
const toggleBox = () => import(/* webpackChunkName: "components/toggleBox" */'@/components/toggleBox')
const countDown = () => import(/* webpackChunkName: "components/countDown" */'@/components/countDown')
import HomeMethods from '@/components/homeMethods'
import { mapGetters, mapMutations } from 'vuex'
import common from '$COM'
export default {
    props: ['landingPage', 'home', 'btn', 'currentIndex', 'swiper'],
    components: {
        HomeMethods,
        xBlock,
        xSwiper,
        xSiteLink,
        xFooter,
        iconSvg,
        toggleBox,
        countDown
    },
    data (){
        return {
            templateName: 'home2', //給homeMethod判斷
            sn: common.Util.getSN(),
            imageRoot: `${common.Constant.cdnPath}/image-qp/`,
            logo: common.Util.getLogoPath(),
            appTitle: common.Util.getHostInfo('name'),
            isIOS: common.Util.isIOS(),
        }
    },
    computed:{
        ...mapGetters(['agentCode', 'isQPNew', 'snConfig']),
        showAgentCode: function() {
            return common.Util.isNotBlank(this.agentCode) && !this.snConfig.hideAgentCode;
        },
        setting(){
            if(this[this.$route.name] && this[this.$route.name].logo){
                this.logo = this.getImgPath(this[this.$route.name].logo);
            }
            return this[this.$route.name];
        },
        lpclass(){
            let css = [];
            if(!this.setting.ui) return;
            this.setting.ui.filter((o)=>{
                if(o.type=='footer'){
                    css = o.class ? o.class.split(' ') : [];
                    css.push( `footer-ui-${css.indexOf('top') == -1 && css.indexOf('top-start') == -1 ? 'bottom' : `top${css.indexOf('top-start') == -1?'':'-start'}`}` );
                    if(this.showAgentCode){
                        css.push( `show-agent-code-${css.indexOf('top') == -1 && css.indexOf('top-start') == -1 ? 'bottom' : 'top'}` );
                    }
                }
            });
            return css;
        },
        style(){
            let style = this.setting && this.setting.bg ?this.setting.bg : {};
            Object.keys(style).map(o=>{
                if(!/http:/.test(style[o]) && /backgroundImage|background-image/.test(o)){
                    style[o] = style[o].replace(/\/image-qp/g, `${common.Constant.cdnPath}/image-qp`)
                }
            })
            return style;
        }
    },
    watch:{
        landingPage(){
            return this.changeBg(this.landingPage);
        }
    },
    methods:{
        playH5() {
            common.Util.invokeH5Game();
        },
        doCopy() {
            common.Util.copyHanlder(this, this.agentCode);
        },
        download() {
            common.Util.appDownloadHanlder(this);
        },
        downloadSuper() {
            common.Util.appDownloadHanlder(this, true);
        },
        random() {
            return Math.floor(Math.random() * 300000 + 100000);
        },
        getChildData (val){
            this.settings = val
        },
        getImgPath(src){
            return `${common.Constant.cdnPath}/image-qp/${src.indexOf('/') == -1 ? 'landingPage/' : '' }${src}`;
        },
        doClick(callback){
            // console.log('click callback=>', callback)
            // console.log('click', callback)
            if(callback==undefined) return;
            const fun = callback.split('|');
            if(fun.length > 1){
                switch (fun[0]) {
                    case 'url':
                        window.open(fun[1]);
                        break;
                    case 'mask':
                        let a = this.setting.ui.filter(o=>o.type=='mask')[parseInt(fun[1]) - 1];
                        a.show = !a.show;
                        break;
                    case 'route':
                        this.$router.push(fun[1]);
                        break;
                    default:
                        if(this[fun[0]]){
                            this[fun[0]]();
                            if(fun.length > 2) this.doClick(fun.splice(1).join('|'));
                            return;
                        }
                        break;
                }
                if(fun.length > 2) this.doClick(fun.splice(2).join('|'));
                return;
            }
            if(this[callback]) this[callback]();
        },
        doHover(item) {
            if(item.src && item.hover){
                const path = event.target.src.substr(0, event.target.src.lastIndexOf('/') + 1);
                const fn = item.src.split('/');
                const src = fn[fn.length-1];
                const file = src.split('.').map((o,i)=>{
                    return i == src.split('.').length - 2 ? o + '_h' : o
                }).join('.');
                event.target.setAttribute('src', path + (event.type == 'mouseleave' ? item.src : file));
            }
        },
        doSetLayout(e){
            let app = document.documentElement;
            const device = !common.Util.isMobile() ? 'pc' : common.Util.isIOS() ? 'ios' : 'android';
            app.classList.toggle('landingPage-layout');
            app.classList.toggle(device);
        },
        doSwiper(index, option){
            this.setting.ui[index].option = option;
            this.setting.ui[index].init = false;
            console.log(index, option, this.setting.ui[index])
            setTimeout(()=>{
                this.setting.ui[index].init = true;
            }, 5000);
        },
        changeBg(obj){
            Object.keys(obj).forEach(key => {
                if (typeof obj[key] == 'object') {
                    obj[key] = this.changeBg(obj[key]);
                }else{
                    if(/backgroundImage|background-image/.test(key)){
                        obj[key] = obj[key].replace(/\/image-qp\/landingPage/, `${common.Constant.cdnPath}/image-qp/landingPage`);
                    }
                }
            })
            return obj;
        },
    },
    created(){
        common.Util.ready().then(() => {
            if(common.Util.autoDownload()) this.download();
        })
    },
    mounted(){
        // 使用BG LOGO
        this.logo = `${common.Constant.cdnPath}/image-qp/landingPage/logo.png`;
        this.doSetLayout(0);
    },
    updated(){ },
    destroyed(){
        this.doSetLayout(1);
    }
}
</script>
<style lang='scss'>
@import '~@/style/landingPage';
.landingPage{
    @include size(100% ,auto);
    max-width: $width;
    min-height: 100vh;
    position: relative;
    @include bg_center(contain, top center);
    box-sizing: content-box;
    font-family: \5FAE\8F6F\96C5\9ED1, Arial, Helvetica, sans-serif;
    *{
        box-sizing: content-box;
        -webkit-text-size-adjust: none;
    }
    img{
        max-width: 100%;
        display: block;
        margin: auto;
    }
    // [class^='landingPage-']:not(.landingPage-footer){
    section:not(.landingPage-footer){
        position: relative;
        > div{
            @include bg_center();
            .block-items{
                width: 100%;
                // @include flex(center, center, null);
                position: relative;
                margin: auto;
                justify-content: center;
                align-items: center;
                @include bg_center();
            }
        }
    }
}
@include set_footer();
// 共用 class
.pc, .ios{
    .android{
        display: none;
    }
}
.android{
    .ios{
        display: none;
    }
    .block-top .block-box:nth-child(2) {
        display: none;
    }
}
.btn{
    cursor: pointer;
}
.h-100{
    height: 100%;
}
.no-click{
    pointer-events: none;
}
.flex{
    @include flex(center, center, null);
}
.mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
}
@mixin set_h($i){
    $h: 4vw;
    @for $j from 1 through 5 {
        $tmp: #{$i}-#{($j - 1) * 25};
        $hh: ($j - 1) * 0.25;
        @if $j == 1 {
            $tmp: #{$i};
            $hh: 0;
        }
        .h-#{$tmp}{
            height: #{$h * ($i + $hh)};
            @if $j == 1 {
                max-height: #{$i * 1rem};
            }@else{
                max-height: #{$i + $hh * 1rem};
            }
        }
    }
}
@for $i from 1 through 5 {
    @include set_h($i);
}
// border 漸層
.border-gradient-top-1{
    @include border-gradient(1px 0 0 0, (left, rgb(195, 161, 87) 0%,rgb(255, 255, 255) 100%));
}
// css animation
// 跳動
.animation-heartbeat{
    animation: heartbeat .6s infinite;
}
// 搖動
.animation-tada{
    animation-name: tada;
    animation-iteration-count: infinite;
    animation-duration: 1s;
    animation-fill-mode: both;
}
@-webkit-keyframes heartbeat {
    0% {
        -webkit-transform: scale(1);
    }
    50% {
        -webkit-transform: scale(1.1);
    }
    to {
        -webkit-transform: scale(1);
    }
}
@keyframes heartbeat {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    to {
        transform: scale(1)
    }
}
@-webkit-keyframes tada {
    0% {
        -webkit-transform: scale(1);
    }
    10%,20% {
        -webkit-transform: scale(.9) rotate(-3deg);
    }
    30%,50%,70%,90% {
        -webkit-transform: scale(1.1) rotate(3deg);
    }
    40%,60%,80% {
        -webkit-transform: scale(1.1) rotate(-3deg);
    }
    to {
        -webkit-transform: scale(1) rotate(0);
    }
}
@keyframes tada {
    0% {
        transform: scale(1)
    }
    10%,20% {
        transform: scale(.9) rotate(-3deg)
    }
    30%,50%,70%,90% {
        transform: scale(1.1) rotate(3deg)
    }
    40%,60%,80% {
        transform: scale(1.1) rotate(-3deg)
    }
    to {
        transform: scale(1) rotate(0)
    }
}
.landingPage-layout{
    // body, button, input, select, textarea{
    //     font-size: calc(1rem + 1vw) !important;
    // }
    @media screen and (min-width: 320px) {
        font-size: 14.35px;
    }
    @media screen and (min-width: 360px) {
        font-size: 15.75px;
    }
    @media screen and (min-width: 374px) {
        font-size: 16.5px;
    }
    @media screen and (min-width: 411px) {
        font-size: 17.25px;
    }
    @media screen and (min-width: 600px) {
        font-size: 25.8px;
    }
    @media screen and (min-width: 720px) {
        font-size: 30px;
    }
    @media screen and (max-width: 750px) {
        #app{
            overflow-x: hidden;
        }
    }
}
</style>