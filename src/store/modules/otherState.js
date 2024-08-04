import * as types from '../mutation-types.js'

const state = {
    alert: {
        title: '',
        content: '',
        buttonText: '',
        show: false,
        callback: () => {},
        clickClose: () => {}
    },
    toast: {
        text: '',
        show: false,
        time: 3000,
        position: 'top',
        width: '20rem',
        type: 'text',
        onShow: () => {},
        onHide: () => {},
    },
    isPW: false, //是否為陪玩帳號
    agentCode: '', //推廣碼
    showFixGuile: false,
    cdnFast: '',
    cdnAppFast: '', //大文件 ipa 和 apk
    showHint: false,
    movieKey: '', //影城key
    isQPNew: false, //區分是 66 還是 金牛 模版
    snConfig: { //用來存放所有客製配置
        iosLink: {
            url: null,  //超級簽地址(棄用) 下面的superSignatureUrl取代之
            coexist: false, //超級簽 企業簽共存
            target: '_blank' //_blank：另開(默認),  _self:當前頁面轉址
        },
        disabledH5: false,
        hideAgentCode: false,
        autoInstallApp: null, // from sn setting
        iosCertificate: null, // from sn setting
        superSignatureUrl: '', //超級簽
        pcBehavior: {
            hint: null,
        },
    },
    privateIp: null, //內部ip
}

const getters = {
    toast : state => state.toast,
    isPW : state => state.isPW,
    alert : state => state.alert,
    agentCode : state => state.agentCode,
    showFixGuile : state => state.showFixGuile,
    cdnFast : state => state.cdnFast,
    cdnAppFast : state => state.cdnAppFast,
    showHint : state => state.showHint,
    movieKey : state => state.movieKey,
    isQPNew : state => state.isQPNew,
    snConfig : state => state.snConfig,
    privateIp : state => state.privateIp,
}

const actions = {

}

const mutations = {
    [types.SET_TOAST](state, value) {
        for (var key in state.toast) {
            if(value.hasOwnProperty(key)) state.toast[key] = value[key]
        }
    },
    [types.SET_IS_PW](state, value) {
        state.isPW = value;
    },
    [types.SET_ALERT](state, value) {
        for (var key in state.alert) {
            if(value.hasOwnProperty(key)) state.alert[key] = value[key]
        }
    },
    [types.SET_AGENT_CODE](state, value) {
        state.agentCode = value;
    },
    [types.SET_SHOW_FIX_GUIDE](state, value) {
        state.showFixGuile = value;
    },
    [types.SET_CDN_FAST](state, value) {
        state.cdnFast = value;
    },
    [types.SET_CDN_APP_FAST](state, value) {
        state.cdnAppFast = value;
    },
    [types.SET_SHOW_HINT](state, value) {
        state.showHint = value;
    },
    [types.SET_MOVIE_KEY](state, value) {
        state.movieKey = value;
    },
    [types.SET_IS_QP_NEW](state, value) {
        state.isQPNew = value;
    },
    [types.SET_SN_CONFIG](state, value) {
        for (var key in state.snConfig) {
            if(value.hasOwnProperty(key)) state.snConfig[key] = value[key]
        }
    },
    [types.SET_PRIVATE_IP](state, value) {
        state.privateIp = value;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
