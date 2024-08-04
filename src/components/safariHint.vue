<template lang="html">
    <div id="hint-wrapper" v-if="showThis">
        <div class="box">
            <div class="text">
                {{hintText[0]}}
            </div>
            <div class="copy-btn copy" @click="doCopy"></div>
            <div class="text">
                {{hintText[1]}}
            </div>
            <div class="hint-img" v-if='isIOS'></div>
            <div class="close" @click="doClose">
                <icon-svg slot="label" icon-class="close-circle"></icon-svg>
            </div>
        </div>
    </div>
</template>

<script>
import Clipboard from 'clipboard'
import common from '$COM'
import _get from 'lodash/get'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            showThis: null,
            isIos : common.Util.isIOS(),
            hintText:　['' , '']
        }
    },
    computed: {
        ...mapGetters(['snConfig']),
    },
    watch: {
        showThis(v) {
            v ? $('body').addClass('mask') : $('body').removeClass('mask');
        },
    },
    methods: {
        doClose() {
            this.showThis = false;
        },
        doCopy() {
            this.doClose();
            let clipboard = new Clipboard('.copy', {
                text: trigger => location.href
            });
            clipboard.on('success', function(e) {
                common.Util.showToast('复制成功')
                e.clearSelection();
            });
        },
        init() {
            let uaParser = new UAParser();
            let browserName = _get(uaParser.getBrowser(), 'name', '');
            if(this.isIos){
                let isSupport
                if(this.snConfig.superSignatureUrl) isSupport = /safari/i.test(browserName) // 超級簽只能用safari
                else isSupport = /chrome|safari/i.test(browserName); //蘋果 只支持safari 和 chrome
                this.showThis = !isSupport;
            }
            else{
                let tempStr = uaParser.getUA()
                let isVIVO = /vivobrowser/i.test(tempStr)
                this.showThis = browserName.match(/QQ|vivo/i) || isVIVO
            }
        },
        getHintText (){
            return this.isIos ? ['1. 浏览器无法直接下载，请复制以下网址在苹果浏览器safari中打开。' , '2.打开safari浏览器，黏贴并前往后即可下载。'] 
                : ['1.此浏览器无法直接下载，请复制以下网址在其他浏览器中打开。' , '2.请使用其他浏览器，黏贴并前往后即可下载。']
        }
    },
    created() {
        common.Util.ready().then(() => {
            this.hintText = this.getHintText()
            this.init();
        })
    }
}
</script>

<style lang="scss" scoped>
#hint-wrapper {
    font-family: Microsoft YaHei,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Arial,sans-serif;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0, .7);
    z-index: 10;
    .box{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 3rem;
        .text{
            color: #fff;
            width: 90%;
            min-height: 2rem;
            font-size: 1.3rem;
            text-align: left;
            padding: 1rem 0;
            letter-spacing: .1rem
        }
        .copy-btn{
            width: 50%;
            height: 3.5rem;
            background-image: url(/image-qp/common/btn3.png);
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
            margin: 1.5rem 0;
        }
        .hint-img{
            width: 90%;
            height: 8rem;
            background-image: url(/image-qp/common/ic1.png);
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
            margin: 1.5rem 0;
        }
    }
    .close {
        cursor: pointer;
        margin-top: 4rem;
        i {
            width: 2.5rem;
            height: 2.5rem;
            color: #fff;
        }
    }
}
</style>
