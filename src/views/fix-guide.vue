<!--遊戲修復-->
<template lang="html">
    <div class="main-fix" v-if="isSafari && showFixGuile">
        <div class="title">
            <span class="text">如何修复游戏无法启动</span>
            <span @click='close'>
                <icon-svg slot="label" icon-class="close-circle"></icon-svg>
            </span>
        </div>
        <div class="img"></div>
    </div>
</template>

<script>
import common from '$COM'
import { mapGetters, mapMutations } from 'vuex'
import _startsWith from 'lodash/startsWith'
import _endsWith from 'lodash/endsWith'
export default {
    data() {
        return {
            isSafari: common.Util.isSafari(),
            fixTitle: '游戏修复',
        }
    },
    computed: {
        ...mapGetters(['showFixGuile']),
    },
    watch: {
        showFixGuile(v) {
            if(v) {
                document.title = this.fixTitle;
                if($('link[rel=apple-touch-icon]').get(0)) return; //icon 加一次就好
                let sn = common.Util.getSN();
                let iconPath = common.Constant.uploadHost + `/qpcdn/app-install/images/icon-fix/${sn}x10.png`;
                $('head').append(`<link rel='apple-touch-icon' href='${iconPath}'/>`)
            } else {
                document.title = common.Util.getWebTitle();
            }
        }
    },
    methods: {
        ...mapMutations({
            setShowFixGuide : 'SET_SHOW_FIX_GUIDE',
        }),
        close() {
            this.setShowFixGuide(false);
        },
        showThis() {
            let fix = common.Util.queryString('fix');
            if(fix) fix = fix.replace(/\D/ig, '');
            if(fix == 1) {
                this.setShowFixGuide(true);
                let url = location.href;
                let fixSignal = url.match(/\?fix=1(\&)*|\&fix=1/g)[0]||'',
                    replaceStr = _endsWith(fixSignal, '&') ? '?' : '';
                url = url.replace(fixSignal, replaceStr); //fix會觸發顯示 修復說明
                history.pushState({}, '', url);

            }
        },
        loadConfig() {
            let sn = common.Util.getSN();
            import(/* webpackChunkName: "[request]" */ `../customer/${sn}.js`).then(res=>{
                if(res.fixModeTitle) this.fixTitle = res.fixModeTitle;
                this.showThis();
            }).catch( err => {
                this.showThis();
            })
        }
    },
    created() {
        this.loadConfig();
    }
}
</script>

<style lang="scss" scoped>
.main-fix {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 99999px;
    background-color: rgba(0, 0, 0, .7);
    .title {
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        padding-top: .5rem;
        .text {
            font-size: 1.5rem;
            color: #fff;
            font-weight: bolder;
        }
        i {
            color: #008CD6;
            position: relative;
            top: .5rem;
            left: 1rem;
            width: 2rem;
            height: 2rem;
        }
    }
    .img {
        background-image: url(/image-qp/common/fix.png);
        width: 100%;
        height: 76vh;
        background-size: contain;
        background-repeat: no-repeat;
        background-position-x: 50%;
    }
}
</style>
