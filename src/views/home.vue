<template lang="html">
    <div class="home-wrapper">
        <!--HomeMethods為導入配置的共用方法 -->
        <HomeMethods @getChildData='getChildData'></HomeMethods>
        <!-- A區 -->
        <div class="top-wrapper">
            <div class="top" :style='getImage(settings.conf.a[0])' v-if='settings.conf.a.length'></div>
            <!-- B區 -->
            <div class="item-wrap" v-if='settings.conf.b.length'>
                <ul>
                    <li v-for='(item ,index) in settings.conf.b'>
                        <div class="img" :style='getImage(item)'></div>
                        <div class="title">{{item.name}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mid-wrap">
            <div class="info-star">
                <icon-svg slot="label" icon-class="star1" v-for="n in 5" :key="n" ></icon-svg>
                <span class="desc">(3亿<span class="plus">+</span>玩家)</span>
            </div>
            <div class="btns" v-show='!disable'>
                <button type="button" class="btn link" @click="download">游戏下载</button>
                <button type="button" class="btn link" @click="downloadSuper" v-if="snConfig.iosLink.coexist">下载苹果超级签</button>
                <button type="button" class="btn link" v-if="isIOS && settings.tutorialText" @click="$router.push({name: 'iosGuide'})">
                    {{ settings.tutorialText }}
                </button>
                <button type="button" class="btn link" v-if="isIOS && isQPNew" @click="playH5" >进入网页版游戏</button>
            </div>
        </div>
        <!-- 卡片資訊欄 C、D區-->
        <div class="card-wrapper">
            <ul class="card-ul" v-if='settings.conf.d.length'>
                <li class="card" v-for='(item ,index) in settings.conf.d' :key= 'index' @click="download">
                    <div class="card-left">
                        <div class="img" :style='getImage(item)'></div>
                        <p>{{ item.name }}</p>
                        <div class="btn">下载</div>
                        <div class="title">{{ random() }}万下载</div>
                    </div>
                    <div class="card-right" :style='getImage(settings.conf.c[index])'></div>
                </li>
            </ul>
        </div>

        <div class="greet-text" :class='{mb: showAgentCode}' :style='{ backgroundColor : settings.ribbonConf.bgc }'>
            <div class="row" :style='{ color: settings.ribbonConf.color}'> {{ settings.ribbonConf.text }} </div>
            <div class="row" :style='{ color: settings.ribbonConf.color}'> {{ settings.ribbonConf.text2 }} </div>
        </div>

        <div class="footer" :class="{'with-code': showAgentCode}">
            <div class="icon" :class="{'with-code': showAgentCode}">
                <img :src="logo">
            </div>
            <div class="text-area" v-if='settings.conf.foot.length'>
                <div class="top">
                    <div class="left">
                        <span class="title">{{appTitle}}</span>
                        <span class="desc" :style='{color: settings.conf.foot[0].color}'>{{settings.conf.foot[0].text}}</span>
                    </div>
                    <div class="download link" @click="download">立即下载</div>
                </div>
                <div class="bottom">
                    <p class='invitation-code' v-if='showAgentCode'>邀请码: <span class='red'>{{agentCode}}</span></p>
                    <div class="download copy" @click="doCopy" v-if='showAgentCode' >复制</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import _random from 'lodash/random'
import common from '$COM'
import HomeMethods from '@/components/homeMethods'
export default {
    components:{
        HomeMethods
    },
    data() {
        return  {
            templateName: 'home', //給homeMethod判斷
            sn: common.Util.getSN(),
            logo: common.Util.getLogoPath(),
            appTitle: common.Util.getHostInfo('name'),
            isIOS: common.Util.isIOS(),
            settings: {
                conf: {
                    a: [],
                    b: [],
                    c: [],
                    d: [],
                    foot: []
                },
                ribbonConf: {},
                tutorialText: ''
            },
            disable: true
        }
    },
    computed: {
        ...mapGetters(['agentCode', 'isQPNew', 'snConfig']),
        showAgentCode: function() {
            return common.Util.isNotBlank(this.agentCode) && !this.snConfig.hideAgentCode;
        }
    },
    methods: {
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
            return _random(300,999);
        },
        getChildData (val){
            this.settings = val
        },
        getImage (item){
            return {"background-image": `url(/image-qp/${item.useDefaultImage ? "default" : this.sn}/${item.icon})`}
        }
    },
    created() {
        common.Util.ready().then(() => {
            if(common.Util.autoDownload()) this.download();
            this.disable = false
        })
    },
    mounted (){

    }
}
</script>

<style lang="scss" scoped>
@mixin bg-img($position: top left,$size: 100%){
    background-repeat: no-repeat;
    background-position: $position;
    background-size: $size;
}
$color-grey: #545454;

.home-wrapper {
    width: 100%;
    max-width: 720px;
    .top-wrapper {
        background-image: linear-gradient(#2A4AA4, #3860B5, #4A7FC3, #CDE2F3, #fff);
        .top {
            @include bg-img(top center, contain);
            height: 40vh;
        }
    }
    .item-wrap {
        ul {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            li {
                width: 24%;
                padding: 5px;
                box-sizing: border-box;
                .img{
                    width: 5.5em;
                    height: 5.5em;
                    @include bg-img(left);
                    margin: 0 auto;
                }
                .title {
                    color: #424A55;
                    font-weight: 600;
                }
            }
        }
    }

    .mid-wrap {
        padding: 0 1rem;
        margin-top: 1rem;
        .info-star {
            text-align: left;
            display: flex;
            align-items: center;
            i {
                color: #FEBE0B;
                width: 2rem;
                height: 2rem;
            }
            .desc {
                padding-left: 1rem;
                font-size: 1.5rem;
                font-weight: 600;
                .plus {
                    position: relative;
                    top: -.5rem;
                }
            }
        }

        .btns {
            margin-top: 1rem;
            padding: 0 .5rem;
            .btn {
                background: linear-gradient(#00D3F0, #0375EF);
                color: #eee;
                font-size: 1.5rem;
                padding: 0.5rem;
                font-weight: bold;
                border: none;
                border-radius: 3.75rem;
                width: 100%;
                margin: .5rem 0;
            }
        }
    }
    .card-wrapper{
        width: 100%;
        height: auto;
        .card-ul{
            width: 100%;
            height: auto;

            .card{
                width: 90%;
                height: auto;
                display: flex;
                background-color: #E5E5E5;
                margin: 1rem auto;
                padding: 0.8rem 0.5rem 1rem 0;
                border-radius: 0.5rem;
                .card-right{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 4;
                    min-width: 200px;
                    @include bg-img(left,cover);
                    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
                        /* IE10+ CSS */
                        max-width: 75%;
                    }
                }
                .card-left{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 0 0.3rem 0 0.5rem;

                    .img{
                        width: 4.5rem;
                        height: 4.5rem;
                        @include bg-img(left);
                    }

                    p{
                        margin: 5px 0;
                        font-size: 0.9rem;
                        white-space: nowrap;
                    }
                    .btn{
                        width: 100%;
                        font-size:1rem;
                        padding: 0.5rem 0;
                        margin: 0.2rem 0;
                        min-width: 3.75em;
                        background: #409EFF;
                        color: #eee;
                        border-radius: 5px;
                    }
                    .title{
                        font-size: 0.8rem;
                        margin: 0.5rem 0 0 0;
                        white-space: nowrap;
                    }
                }
            }
        }
    }

    .greet-text {
        width: 100%;
        padding: .5rem 0;
        margin-bottom: 6rem;
        .row {
            font-size: 1.1rem;
            line-height: 1.5rem;
            font-weight: 600;
        }
        &.mb{
            margin-bottom: 8rem;
        }
    }

    .footer {
        position: fixed;
        // left: 0;
        bottom: 0;
        z-index: 9;
        background-color: rgba(255, 255, 255, 0.77);
        padding: .5rem 0;
        width: 100%;
        max-width: 720px;
        display: flex;
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
            .title {
                font-weight: 600;
                font-size: 1.4rem;
                margin: 0 0 0.5rem 0;
            }
            .desc {
                font-size: 1rem;
                white-space: nowrap;
                color: $color-grey;
            }
            .invitation-code{
                font-size: 1.4rem;
                color: $color-grey;
            }
            .red{
                color: #C81A27;
                border-radius: 5px;
                border: 1px solid $color-grey;
                padding: .2rem .5rem;
            }
            .top{
                display: flex;
                position: relative;
                width: 100%;
                .left{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
            }
            .bottom{
                width: 100%;
                display: flex;
                position: relative;
                .copy{
                    padding: 0.8rem 1.5rem;
                }
            }
            .download {
                color: #fff;
                background-color: #409eff;
                border-radius: 4px;
                padding: 1rem 1.5rem;
                white-space: nowrap;
                position: absolute;
                top: 50%;
                right: 0.5rem;
                transform: translateY(-50%);
            }
        }
    }
}
.link {
    cursor: pointer;
}
</style>
