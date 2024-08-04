<template lang="html">
    <div class="hint" v-if="showHint">
        <div class="wrap">
            <div class="close" @click="doClose">
                <icon-svg slot="label" icon-class="close-circle"></icon-svg>
            </div>
            <div class="title">请使用手机访问</div>
            <div class="qrcode">
                <qrcode :value="webUrl"></qrcode>
            </div>
        </div>
        <div class="text-wrap">
            <div class="text" v-if="!!hintForPC" v-html="hintForPC">
            </div>
        </div>
    </div>
</template>

<script>
import { Qrcode } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
import common from '$COM'
import _get from 'lodash/get'
export default {
    data() {
        return {
            webUrl: common.Util.wxProxyHandler(location.href),
        }
    },
    computed: {
        ...mapGetters(['showHint', 'snConfig']),
        hintForPC() {
            return _get(this.snConfig, 'pcBehavior.hint');
        }
    },
    components: {
        Qrcode
    },
    watch: {
        showHint(v) {
            v ? $('body').addClass('mask') : $('body').removeClass('mask');
        }
    },
    methods: {
        ...mapMutations({
			setShowHint: 'SET_SHOW_HINT'
		}),
        doClose() {
            this.setShowHint(false);
        }
    },
    created() {
        if(!common.Util.isMobile()) {
            this.setShowHint(true);
        }
    }
}
</script>

<style lang="scss" scoped>
.hint {
    font-family: Microsoft YaHei,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Arial,sans-serif;
    width: 100%;
    height: 99999px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0, .7);
    z-index: 10;
    .wrap {
        background-color: #000;
        color: #fff;
        position: fixed;
        top: 10%;
        left: calc(50% - 130px);
        width: 260px;
        height: 260px;
        border-radius: 30px;
        .close {
            position: absolute;
            right: -10px;
            top: -10px;
            cursor: pointer;
            i {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
        .title {
            font-size: 20px;
            padding: 15px;
        }
        .qrcode {
            border: 10px solid;
            width: 160px;
            height: 160px;
            margin: 0 auto;
        }
    }

    .text-wrap {
        display: flex;
        width: 100%;
        justify-content: center;
        position: fixed;
        top: calc(10% + 280px);
        .text {
            background-color: rgba(0,0,0,.8);
            padding: 20px;
            border-radius: 7px;
            font-size: 20px;
            color: #fff;
            line-height: 30px;
            max-width: 80%;
        }
    }
}
</style>
