// 金牛棋牌
<template>
    <div class="home2-wrapper">
        <!--HomeMethods為導入配置的共用方法 -->
        <HomeMethods @getChildData='getChildData'></HomeMethods>

        <!-- carousel 幻燈片 (配置)-->
        <swiper class="swiper-container" :options="swiperOption" v-if='settings.swiper.length'>
            <swiper-slide v-for='(item,i) in settings.swiper' :key='i+1'>
                <img :src='imageRoot + `/image-qp/${item.useDefaultImage ? "default2" : sn}/${item.icon}`' alt="">
            </swiper-slide>
        </swiper>

        <!-- 可配置B區 -->
        <div class='section-b'>
            <div class='icon-wrapper' v-for='(item, index) in settings.conf.b' :key="index">
                <div class="icon" :style='{"background-image": `url(/image-qp/${item.useDefaultImage ? "default2" : sn}/${item.icon})`}'></div>
                <div class="text">{{item.name}}</div>
            </div>
        </div>
        <!-- <div class='section-b'>
            <div class='icon-wrapper' v-for='(item, index) in settings.conf.b' :key="index">
                <div class="icon" :style='getSectionImg("b" ,index + 1 ,"png" ,settings.isReady)'></div>
                <div class="text">{{item.title}}</div>
            </div>
        </div> -->

        <!-- 下載量 -->
        <div class="capacity">
            <div class="num">{{random() + "人安装"}}</div>
        </div>
        <!-- 好玩到爆肝那塊 -->
        <div class="info">
            <img :src="logo">
            <div class="text-area" v-if='settings.conf.e.length'>
                <p :style='{color: settings.conf.e[0].color}'>{{settings.conf.e[0].text}}</p>
                <h2 :style='{color: settings.conf.e[1].color}'>{{settings.conf.e[1].text}}</h2>
                <p :style='{color: settings.conf.e[2].color}'>{{settings.conf.e[2].text}}</p>
            </div>
        </div>

        <!-- APP 下載鈕 -->
        <div class="app-install" @click="download" v-show='!disable'>
            <img :src="imageRoot + downloadBtn" alt="">
        </div>

        <div class="btn-wrap" v-if="snConfig.iosLink.coexist">
            <div class="btn guide" @click="downloadSuper">下载苹果超级签</div>
        </div>

        <div class="btn-wrap" v-if="isIOS && settings.tutorialText" @click="$router.push({name: 'iosGuide'})" v-show='!disable'>
            <div class="btn guide">{{ settings.tutorialText }}</div>
        </div>

        <div class="btn-wrap" v-if="isIOS && isQPNew && !snConfig.disabledH5" @click="playH5" v-show='!disable'>
            <div class="btn h5">进入网页版游戏</div>
        </div>

        <!-- carousel 幻燈片2 -->
        <swiper class="swiper-container" :options="swiperOption2" v-if='settings.swiper2.length'>
            <swiper-slide v-for='(item ,i) in settings.swiper2' :key='i+1'>
                <img :src=' imageRoot + `/image-qp/${item.useDefaultImage ? "default2" : sn}/${item.icon}`' alt="">
            </swiper-slide>
        </swiper>

        <!-- 精彩遊戲 應有盡有 那條 -->
        <div class="ribbon">
            <div class="img"></div>
        </div>

        <!-- 可配置C區 -->
        <div class='section-c' :style='{marginBottom: showAgentCode ? "8rem" : null}'>
            <div class="icon" v-for='(item, index) in settings.conf.c'
                :key='index + 1'
                :style='{"background-image": `url(/image-qp/${item.useDefaultImage ? "default2" : sn}/${item.icon})`}'></div
                >
        </div>

        <!-- footer -->
        <div class="footer" :class="{'with-code': showAgentCode}">
            <div class="icon" :class="{'with-code': showAgentCode}">
                <img :src="logo">
            </div>
            <div class="text-area" v-if='settings.conf.foot.length > 0'>
                <div class="top">
                    <div class="left">
                        <span class="title">{{appTitle}}</span>
                        <span class="desc" :style='{color: settings.conf.foot[0].color}'>{{settings.conf.foot[0].text}}</span>
                    </div>
                    <div class="download link" @click="download">立即下载</div>
                </div>
                <div class="bottom">
                    <p class='invitation-code' v-show='showAgentCode'>邀请码: <span class='red'>{{agentCode}}</span></p>
                    <div class="copy" @click="doCopy" v-show='showAgentCode' >复制</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters, mapMutations } from 'vuex'
import common from '$COM'
import HomeMethods from '@/components/homeMethods'
export default {
    components: {
        swiper,
        swiperSlide,
        HomeMethods
    },
    data (){
        return {
            templateName: 'home2', //給homeMethod判斷
            sn: common.Util.getSN(),
            imageRoot: common.Constant.cdnPath,
            logo: common.Util.getLogoPath(),
            appTitle: common.Util.getHostInfo('name'),
            isIOS: common.Util.isIOS(),
            downloadBtn: '',
            swiperOption: {},
            swiperOption2: {},
            settings: {
                conf: { //客製的文字 、結構固定
                    b: [],
                    c: [],
                    e: [],
                    foot: []
                },
                swiper: [],
                swiper2: [],
                tutorialText: ''
                // imgConf: [], //換圖的座標(ex: A1 B2 ..)
                // isReady: false,
            },
            disable: true
            // agentCode: '1234567'
        }
    },
    computed:{
        // ...mapGetters(['isQPNew', 'snConfig']),
        ...mapGetters(['agentCode', 'isQPNew', 'snConfig']),
        showAgentCode: function() {
            return common.Util.isNotBlank(this.agentCode) && !this.snConfig.hideAgentCode;
        }
    },
    watch:{
        // 'settings.swiper'(val){

        // }
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
        getImgOfDownloadBtn (){
            if(common.Util.isIOS()){
                this.downloadBtn = '/image-qp/default2/appleDown.gif'
            }
            else{
                this.downloadBtn = '/image-qp/default2/don.gif'
            }
        },
        random() {
            return Math.floor(Math.random() * 300000 + 100000);
        },
        getChildData (val){
            this.settings = val
            if(this.settings.swiper.length > 1) {
                this.swiperOption = {
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    }
                }
            }
            if(this.settings.swiper2.length > 1) {
                this.swiperOption2 = {
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    }
                }
            }
        },
        // getSectionImg(imgName, index , fileName = 'png' , isReady) {
        //     if(!isReady) return
        //     // 有客製圖片
        //     if(this.settings.imgConf.includes(imgName + index) ){
        //         return {"background-image": `url(/image-qp/${this.sn}/${imgName}${index}.${fileName})`}
        //     }
        //     else {
        //         return {"background-image": `url(/image-qp/default2/${imgName}${index}.${fileName})`}
        //     }
        // },
    },
    created(){
        this.getImgOfDownloadBtn()
        common.Util.ready().then(() => {
            if(common.Util.autoDownload()) this.download();
            this.disable = false
        })
    },
    mounted(){
    },
}
</script>

<style lang='scss'>

@mixin bg_center($size: cover, $position:center center){
    background-size: $size;
    background-repeat: no-repeat;
    background-position: $position;
}

@mixin size($w ,$h){
    width: $w;
    height: $h;
}

@mixin flex($jc ,$ai ,$direction){
    display: flex;
    @if $jc{
        justify-content: $jc;
    }
    @if $ai{
        align-items: $ai;
    }
    @if $direction{
        flex-direction: $direction;
    }
}

@mixin pos_absolute($top ,$right ,$bottom ,$left){
    position: absolute;
    @if $top{
        top: $top
    }
    @if $right{
        right: $right
    }
    @if $bottom{
        bottom: $bottom
    }
    @if $left{
        left: $left
    }
}
.home2-wrapper{
    background-image: url(/image-qp/default2/bg.png);
    @include size(100% ,auto);
    min-height: 100vh;
    max-width: 720px;
    @include bg_center(cover, top left);
    .swiper-container{
        @include size(90% ,9rem);
        margin-top: 1rem;
        img{
            @include size(100% ,100%)
        }
    }
    .section-b{
        @include size(100% ,auto);
        @include flex(space-around ,center ,null);
        margin-top: 1rem;
        flex-wrap: wrap;
        .icon-wrapper{
            @include flex(center ,center ,column);
            color: #fff;
            .icon{
                @include size(5rem ,5rem);
                @include bg_center(cover)
            }
            .text{
                color: #F7D088;
                text-shadow: 0 0 0.3rem #fff;
            }
        }
    }

    .capacity{
        @include size(100% ,2rem);
        position: relative;
        margin-top: 1.5rem;
        .num{
            @include size(8rem ,100%);
            line-height: 2rem;
            @include pos_absolute(0, 0.5rem, null, null);
            color: #fff;
            background: #395DED;
            border-radius: 1rem;
        }
    }

    .info{
        @include size(100% ,auto);
        @include flex(center ,center ,null);
        img{
            @include size(6rem, 6rem);
            margin-right: 1rem;
            margin: .5rem;
        }
        .text-area{
            color: #fff;
            text-shadow: 0px 0px 10px #fff, 0px 0px 2px #fff;
            text-align: left;
        }
    }

    .app-install{
        margin-top: 1rem;
        img{
            @include size(80% ,5rem)
        }
    }

    .btn-wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        .btn {
            border-radius: 5px;
            width: 80%;
            background: linear-gradient(90deg, #FCDCB3, #CBB277);
            padding: 1rem 0;
            color: #392818;
            font-size: 1.3rem;
            font-weight: 600;
        }
    }

    .ribbon{
        margin-top: 1rem;
        .img{
            @include size(90% ,1.2rem)
            background-image: url(/image-qp/default2/ribbon.png);
            background-size: contain;
            background-repeat: no-repeat;
            margin-left: 5%;
        }
    }

    .section-c{
        @include size(100% ,auto);
        display: flex;
        flex-wrap: wrap;
        padding: 1rem 1rem 1.5rem 2rem;
        box-sizing: border-box;
        margin-bottom: 7rem;
        .icon{
            @include size(7rem ,7rem);
            @include bg_center(cover);
            margin-right: 1rem;
            @media screen and(min-width: 700px){
                @include size(6rem ,6rem);
            }
            &:nth-child(3n){
                margin-right: 0;
            }
        }
    }

    .footer {
        position: fixed;
        // left: 0;
        bottom: 0;
        z-index: 9;
        background: linear-gradient(180deg, #303030, #000);
        padding: .5rem 0 0 0;
        width: 100%;
        max-width: 720px;
        display: flex;
        box-sizing: content-box;
        max-height: 5rem;
        &.with-code {
            max-height: unset;
        }
        .icon {
            flex: 0.8;
            &.with-code {
                flex: 1.2;
            }
            padding: 0 0.5rem;
            img {
                max-width: 90%;
                height: auto;
            }
        }
        .text-area {
            flex: 3;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #eee;
            .title {
                font-weight: 600;
                font-size: 1.4rem;
                margin: 0 0 0.5rem 0;
            }
            .desc {
                font-size: 1rem;
                white-space: nowrap;
            }
            .invitation-code{
                font-size: 1.4rem;
                @media screen and (min-width: 720px){
                    font-size: 1rem;
                }
            }
            .red{
                color: #C81A27;
                border-radius: 5px;
                border: 1px solid #545454;
                padding: .2rem .5rem;
            }
            .top{
                display: flex;
                width: 100%;
                position: relative;
                .left{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
                .download{
                    @include size(7.5rem, 2.5rem);
                    line-height: 2.5rem;
                }
            }
            .bottom{
                width: 100%;
                display: flex;
                align-items: center;
                position: relative;
            }
            .copy ,.download{
                @include size(6rem, 2rem);
                background: #fff;
                border-radius: 2rem;
                background: linear-gradient(90deg ,#FCDCB3 ,#CBB277);
                color: #392818;
                font-weight: bold;
                font-size: 1.5rem;
                line-height: 2rem;
                @include pos_absolute(50%, .5rem, null, null);
                transform: translateY(-50%);
            }
        }
        // .btn-wrapper {
        //     flex: 2;
        //     display: flex;
        //     align-items: center;
        //     flex-direction: column;
        //     justify-content: space-evenly;
        //     .download {
        //         @include size(7.5rem, 2rem);
        //         margin-right: 0.5rem;
        //         // IE 跑版
        //         margin-left: -1.5rem;
        //         // background-image: url(/image-qp/default2/download.png);
        //         background: linear-gradient(90deg ,#FCDCB3 ,#CBB277);
        //         border-radius: 2rem;
        //         color: #392818;
        //         font-weight: bold;
        //         font-size: 1.5rem;
        //         line-height: 2rem;
        //         @include bg_center(contain);
        //     }
        //     .copy{
        //         @include size(6rem, 2rem);
        //         // margin-top: 0.5rem;
        //         background: #fff;
        //         border-radius: 2rem;
        //         background: linear-gradient(90deg ,#FCDCB3 ,#CBB277);
        //         color: #392818;
        //         font-weight: bold;
        //         font-size: 1.5rem;
        //         line-height: 2rem;
        //     }
        // }
    }
}
</style>
