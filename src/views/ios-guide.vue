<template lang="html">
    <div class="main-guide" v-if='!snConfig.superSignatureUrl'>
        <div class="header">
            <div class="icon-wrap" @click="$router.go(-1)">
                <icon-svg slot="label" icon-class="arrowleft"></icon-svg>
            </div>
            <div class="text">请在游戏安装完成后进行信任</div>
            <div class="btn">
                <a v-show="isSafari" :href="'https://' + cdnFast + '/qpcdn/set.mobileprovision'"><span>去信任</span></a>
            </div>
        </div>
        <div class="content">
            <div class="title">详细安装教程</div>
            <div class="desc">1、安装完成后，点击「<span>{{appName}}</span>」，会出现下图所示的提示。（注：企业版App需要用户手动信任）</div>
            <div class="img-step">
                <!-- <img src="/image-qp/common/ios-step1.png"> -->
                <canvas id='guide1'></canvas>
            </div>
            <div class="desc">2、在手机找到「设置」—「通用」—「设备管理」—「<span>{{certificate}}</span>」- 点击「信任」- 返回桌面点击<span>{{appName}}</span>APP就可以开始使用了。</div>
            <div class="img-step">
                <!-- <img src="/image-qp/common/ios-step2.png"> -->
                <canvas id='guide2'></canvas>
            </div>
        </div>
    </div>

    <div class='super-guide' v-else>
        <div class="header">
            <div class="icon-wrap" @click="$router.go(-1)">
                <icon-svg slot="label" icon-class="arrowleft"></icon-svg>
            </div>
            <div class="text">超级签名教程</div>
        </div>
        <div class="content">
            <div class="title">详细安装教程</div>
            <div class="desc">1、第一步 点击安装</div>
            <div class="img-step w-50">
                <img :src="imageRoot + '/image-qp/common/super-guide-1.png'">
            </div>
            <div class="desc">2、第二步 允许设定描述档</div>
            <div class="img-step">
                <img :src="imageRoot + '/image-qp/common/super-guide-2.png'">
            </div>
            <div class="desc">3、第三步 安装描述档</div>
            <div class="img-step">
                <img :src="imageRoot + '/image-qp/common/super-guide-3.png'">
            </div>
            <div class="desc">4、第四步 点击安装</div>
            <div class="img-step">
                <img :src="imageRoot + '/image-qp/common/super-guide-4.png'">
                <img :src="imageRoot + '/image-qp/common/super-guide-5.png'">
            </div>
            <div class="desc">5、第五步 允许iTunes打开</div>
            <div class="img-step">
                <img :src="imageRoot + '/image-qp/common/super-guide-6.png'">
            </div>
            <div class="desc">6、第六步 点击安装</div>
            <div class="img-step">
                <img :src="imageRoot + '/image-qp/common/super-guide-7.png'">
            </div>
            <div class="desc">7、第七步 返回桌面，等待安装完成即可</div>
        </div>
    </div>
</template>

<script>
import common from '$COM'
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            certificate: '',
            appName: common.Util.getHostInfo('name'),
            isSafari: common.Util.isSafari(),
            imageRoot: common.Constant.cdnPath,
        }
    },
    computed: {
        ...mapGetters(['cdnFast', 'snConfig']),
    },
    methods: {
        setCertificate() {
            this.$nextTick(function() {
                this.setCanvas('guide1',750 ,600 , common.Constant.cdnPath + "/image-qp/common/ios-step1.png",[{x:147 ,y:270, fz: '25px Verdana', maxLength: 36}])
                this.setCanvas('guide2',720 ,864 , common.Constant.cdnPath + "/image-qp/common/ios-step2.png",[
                    {x: 420 , y: 420, maxLength: 28},
                    {x: 20 , y: 687 ,fz: '12px Verdana', color: '#909093' },
                    {x: 175 , y: 745 ,fz: '24px Verdana', color: '#1F89FD', textAlign: 'center', prefix: '信任' , maxLength: 18},
                    {x: 20 , y: 815 ,fz: '12px Verdana', color: '#909093', suffix: ' 的应用' },
                    {x: 425 , y: 718 ,fz: '20px Verdana', maxLength: 20},
                ])
            })
        },
        truncate(str, max) {
            if(common.Util.isBlank(str)) return str;
            if(str.length <= max) return str;
            return str.substring(0, max) + '...';
        },
        setCanvas(element, imageWidth, imageHeight, src, fontConfig=[]) {
            var canvas = document.getElementById(element)
            var context = canvas.getContext('2d')
            var image = new Image();
            var self = this;
            let certificate = this.snConfig.iosCertificate;
            image.onload = function() {
                canvas.width = imageWidth
                canvas.height = imageHeight
                context.drawImage(image, 0, 0, canvas.width ,canvas.height);
                fontConfig.forEach( obj => {
                    context.font = (obj.fz ? obj.fz : "16px Verdana")
                    context.textAlign = (obj.textAlign ? obj.textAlign : 'left')
                    context.fillStyle = (obj.color ? obj.color : '#000')
                    obj.prefix = (obj.prefix ? obj.prefix : '')
                    obj.suffix = (obj.suffix ? obj.suffix : '')
                    var value = obj.maxLength ? self.truncate(certificate, obj.maxLength) : certificate;
                    context.fillText( obj.prefix + value + obj.suffix, obj.x, obj.y);
                })
            }
            image.src = src;
        },
    },
    created() {
        common.Util.ready().then(() => {
            this.setCertificate();
        })
    }
}
</script>

<style lang="scss" scoped>
.main-guide ,.super-guide{
    width: 100%;
    max-width: 720px;
    font-family: arial,"Microsoft YaHei",Helvetica,sans-serif;
    .header {
        width: 100%;
        height: 3rem;
        background-color: #5F5F5F;
        display: flex;
        position: fixed;
        top: 0;
        z-index: 9;
        .icon-wrap {
            display: flex;
            flex: 1;
            height: inherit;
            align-items: center;
            padding-left: .5rem;
            i {
                color: #fff;
            }
        }
        .text {
            flex: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 1.1rem;
        }
        .btn {
            flex: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                font-size: 1rem;
                color: #fff;
                background-color: #8BC34A;
                padding: .5rem 1rem;
                border-radius: 5px;
            }
        }
    }
    .content {
        padding: 1rem;
        margin-top: 3rem;
        .title {
            font-size: 1.5rem;
            text-align: left;
            font-weight: 600;
            padding-bottom: 1rem;
        }
        .desc {
            text-align: left;
            line-height: 1.5rem;
        }
        .img-step {
            padding: 1rem;
            canvas {
                max-width: 100%;
                height: auto;
            }
        }
    }
}
.super-guide{
    .header{
        .icon-wrap{
            position: fixed;
            top: 0;
            left: 0;
        }
        .text{
            width: 100%;
        }
    }
    .img-step{
        box-shadow: 0 0 5px rgba(0,0,0,0.2);
        margin: 1rem auto;
    }
    img{
        width: 90%;
        height: auto;
    }
    .w-50{
        width: 50%;
        margin: 0 auto;
    }
    padding-bottom: 2rem;
}
</style>
