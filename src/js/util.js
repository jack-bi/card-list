import constant from './constant'
import store from '../store'
import API from './apiService'
import axios from 'axios'
import * as types from '../store/mutation-types.js'
import _assignIn from 'lodash/assignIn'
import _get from 'lodash/get'
import Clipboard from 'clipboard'
import lscache from 'lscache'

//该字段值生成规则：时间戳（去掉前两位）+ 三位随机整数 + uuid （如果登录）
function getIdentity() {
    let t = new Date().getTime().toString().slice(2);
    let r = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    let u = '' //store.getters.uid;
    return t + '' + r + '' + u;
}

function getHostInfo(key) {
    return window.hostInfo[key];
}

function getSN() {
    return getHostInfo('sn');
}

function getSkin() {
    return getHostInfo('skin');
}

function getWebTitle() {
    return getHostInfo('websiteTitle');
}

function getLogoPath() {
    let sn = getSN(),
        host = window.IS_MM ? (location.protocol + '//' + window.PRD_CDN) : constant.uploadHost;
    return `${host}/qpcdn/app-install/images/icon/${sn}x10.png`;
}

function getUploadHost() {
    return constant.uploadHost + (constant.currentEvn == 'local' ? '' : `/qpcdn/qp-m`);
}

function setAgentCode(resolve = () => {}) {
    let c = queryString('c'); //這是推廣鏈結帶上的推廣碼，優先權最高
    if(c) c = c.replace(/\D/g, '');
    if(isNotBlank(c)) {
        store.commit(types.SET_AGENT_CODE, c);
        resolve(true)
    } else {
        getAgentCodeWrapper(resolve)
        // API.getAgentCode().then( res => {
        //     if(res.result.agentCode) store.commit(types.SET_AGENT_CODE, res.result.agentCode);
        //     resolve(true)
        // })
    }
}

//t-1 緩存
function getAgentCodeWrapper(resolve = () => {}) {
    let lastAGCode = lscache.get('last_agcode');
    if(isBlank(lastAGCode)) {
        API.getAgentCode().then( res => {
            lscache.set('last_agcode', res.result.agentCode ? res.result.agentCode : 'blank');
            if(res.result.agentCode) store.commit(types.SET_AGENT_CODE, res.result.agentCode);
            resolve(true);
        })
    } else {
        if(lastAGCode != 'blank') store.commit(types.SET_AGENT_CODE, lastAGCode);
        API.getAgentCode().then( res => {
            lscache.set('last_agcode', res.result.agentCode ? res.result.agentCode : 'blank');
        })
        resolve(true)
    }
}

function isIOS() {
    return !!navigator.userAgent.match(/iPhone|iPod|iPad/g);
}

function isAndroid() {
    return !isIOS();
}

function isSafari() {
    let uaParser = new UAParser();
    return !! _get(uaParser.getBrowser(), 'name', '').match(/safari/i);
    // return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|OppoBrowser/i.test(navigator.userAgent);
}

function isBlank(str = '') {
    if(str === null || str === undefined) return true;
    return /^\s*$/.test((str + ''));
}

function isNotBlank(str) {
	return !isBlank(str);
}

//取得url參數
function queryString(key) {
    let location = document.location.search;
    if(!location) location = window.top.location.search; //找parent
	return (location.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || [ '', null ])[1];
}

let _readyPromise;

function initMain(_vue, isQPNew) {
    let fisrtPageFlag = getHostInfo('firstPageFlag');
    if(fisrtPageFlag == 2) _vue.$router.push({path: 'rg'});
    if(fisrtPageFlag == 9) _vue.$router.replace({path: 'lp'});
    // if(fisrtPageFlag == 9) { TODO
    //     let sn = getSN();
    //     document.location = `/${sn}.html`;
    // }
    // setAgentCode();
    // race(window.APP_INS_DOMAINS, domainFast => {
    //     store.commit(types.SET_CDN_FAST, domainFast);
    // })
    let movieKey = queryString('mtoken');
    if(movieKey) store.commit(types.SET_MOVIE_KEY, movieKey.replace(/\//g, ''));
    store.commit(types.SET_IS_QP_NEW, !!isQPNew); //金牛 or 66
    _readyPromise = new Promise(resolve => {
        initAsync(resolve);
    });
}

//sn.settings.get 緩存
function getSNSettingWrap() {
    let result = lscache.get('sn_setting');
    if(isBlank(result)) {
        let p = API.getDupSettings();
            p.then(res => { lscache.set('sn_setting', res) });
        return p;
    } else {
        API.getDupSettings().then(res => { lscache.set('sn_setting', res)});
        return Promise.resolve(result);
    }
}

//初始化動作，異步處理
function initAsync(resolveAll) {
    let sn = getSN(),
        p0 = import(/* webpackChunkName: "[request]" */ `../customer/${sn}.js`).catch( err => {}), //讀取聽配置
        p1 = getSNSettingWrap(), //sn setting
        p2 =  new Promise(resolve => { //ping app下載域名
            race(window.APP_FILE_DOMAINS, domainFast => {
                store.commit(types.SET_CDN_APP_FAST, domainFast);
                resolve(true);
            });
        }),

        p3 =  new Promise(resolve => { //ping cdn域名
            race(window.APP_INS_DOMAINS, domainFast => {
                store.commit(types.SET_CDN_FAST, domainFast);
                resolve(true);
            });
        }),

        p4 =  new Promise(resolve => { //取得推廣碼
            setAgentCode(resolve);
        });

    Promise.all([p0, p1, p2, p3, p4]).then(arr => {
        let mod = arr[0];
        if(mod) store.commit(types.SET_SN_CONFIG, mod);
        let res = arr[1];
        if(res.result) store.commit(types.SET_SN_CONFIG, res.result);
        //超級簽地址，有些廳後台尚未配置，暫時還是以前端js寫死
        // let url = _get(mod, 'iosLink.url')||'';
        // if(url) store.commit(types.SET_SN_CONFIG, {superSignatureUrl: url});
        resolveAll(true);
    }).catch(err => {
        console.error(err);
    });
}

function ready() {
    return _readyPromise;
}

function getPrivateIp(onNewIP) {
    try{
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        if(!myPeerConnection || isIOS()) { //ios 取不到內部ip
            onNewIP(-1); //表示抓不到內部ip
            return;
        }
        var pc = new myPeerConnection({ iceServers: []}),
            noop = function() {},
            localIPs = {},
            ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
            key;
        function iterateIP(ip) {
            if (!localIPs[ip]) onNewIP(ip);
            localIPs[ip] = true;
        }
        //create a bogus data channel
        pc.createDataChannel("");
        // create offer and set local description
        pc.createOffer(function(sdp) {
            sdp.sdp.split('\n').forEach(function(line) {
                if (line.indexOf('candidate') < 0) return;
                line.match(ipRegex).forEach(iterateIP);
            });

            pc.setLocalDescription(sdp, noop, noop);
        }, noop);
        //listen for candidate events
        pc.onicecandidate = function(ice) {
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
    } catch(e) {
        onNewIP(-1);
    }
}

function race(domains, cb) {
    var hit = false;
    for (var i = 0; i < domains.length; i++) {
        (function(){
            var domain = domains[i];
            var url = location.protocol + '//' + domain  + '/ping.gif?ts=' + Date.now()
            axios({
                url: url,
                timeout: 4000
            }).then(function(res) {
                if(hit) return;
                if(res.status == 200) {
                    hit = true;
                    cb(domain)
                }
            });
        })()
    }
}

function createIOSLink(domain) {
    let plistApiDomains = window.PLIST_API_DOMAINS, //plist檔案從api返回
        sn = getSN();
    if(plistApiDomains) {
        let plistDomain = plistApiDomains[0];
        return `itms-services://?action=download-manifest&amp;url=https://${plistDomain}/plist/${domain}/${sn}`;
    }
    return 'itms-services://?action=download-manifest&amp;url=https://' + domain + '/qpcdn/app-install/plist/' +  domain + '/' + getSN() + 'x10_full.plist';
}

function createAndroidLink(domain) {
    return 'https://' + domain + '/qpcdn/app-resource/android/' + getSN() + 'x10_full.apk';
}

function createLink(domain) {
    return isIOS() ? createIOSLink(domain) : createAndroidLink(domain);
}

function wxProxyHandler(url) {
    return constant.wxProxy + '?url=' + encodeURIComponent(url);
}

// param 如果是 string ， 其他屬性用默認配置
// param 也可以傳入{} ， 可指定其他屬（https://doc.vux.li/zh-CN/components/toast.html）
function showToast(param) {
	let conf = {
		show:true,
		time: 1500,
		position: 'middle',
		onShow: () => {},
		onHide: () => {},
	};
	if(typeof param == 'string') {
		conf.text = param;
	} else {
		_assignIn(conf, param);
	}
	store.commit(types.SET_TOAST,conf);
}

function invokeH5Game() {
    let url = getCurrentDomainPath() + '/qph5.html';
    if(store.getters.agentCode) url += '?c=' + store.getters.agentCode;
    window.open(url);
}

//取得當前 protocol + domain + port
function getCurrentDomainPath() {
	let port = location.port;
    if (port) port = ':' + port;
    return location.protocol + '//' + document.domain + port;
}

//isSuper boolean : 是否為超級簽
function appDownloadHanlder(_vue, isSuper) {
    API.setData();
    let snConfig = store.getters.snConfig;
    if(isIOS() && snConfig.superSignatureUrl ) {
        if(snConfig.iosLink.target == '_self') location.href = snConfig.superSignatureUrl;
        else window.open(snConfig.superSignatureUrl);
        return;
    }
    location.href = createLink(store.getters.cdnAppFast);
    if(isSafari()) setTimeout(() => store.commit(types.SET_SHOW_FIX_GUIDE, true), 3000);
}

function copyHanlder(_vue, text, cssSel = '.copy') {
    let clipboard = new Clipboard(cssSel, {
        text: trigger => text
    });
    clipboard.on('success', function(e) {
        showToast('复制成功')
        e.clearSelection();
    });
}

function isSuperSign() {
    let iosLinkUrl = _get(store.getters.snConfig, 'superSignatureUrl');
    return isIOS() && isNotBlank(iosLinkUrl);
}

//是否自動下載
function autoDownload() {
    let isAutoInstallApp = _get(store.getters.snConfig, 'autoInstallApp') == 1;
    return isAutoInstallApp && !isSuperSign() && !notValidBrowser();
}

// 不支援VIVO QQ 瀏覽器
function notValidBrowser (){
    let uaParser = new UAParser();
    let browserName = _get(uaParser.getBrowser(), 'name', '');
    let isVIVO = /vivobrowser/i.test(uaParser.getUA())
    return browserName.match(/QQ|vivo/i) || isVIVO
}

export default {
    getIdentity,
    getHostInfo,
    getSkin,
    getSN,
    getWebTitle,
    getLogoPath,
    isIOS,
    isAndroid,
    isSafari,
    isMobile,
    setAgentCode,
    initMain,
    getPrivateIp,
    race,
    createLink,
    isNotBlank,
    isBlank,
    queryString,
    wxProxyHandler,
    showToast,
    getUploadHost,
    invokeH5Game,
    getCurrentDomainPath,
    ready,
    appDownloadHanlder,
    copyHanlder,
    isSuperSign,
    autoDownload
}
