//常數定義
import _find from 'lodash/find'
const currentEvn = (() => {
    // return 'prod'; //TODO
    let domian = document.domain||'';
    let localFilter = ['10.37', 'localhost', '127.0.0.1', '10.31'];
    let uatFilter = ['bgbet3', 'bg1207'];
    let isLocal = _find(localFilter, function(v) {
      return domian.indexOf(v) != -1;
    });
    if(isLocal) return 'local';
    let isUAT = _find(uatFilter, function(v) {
      return domian.indexOf(v) != -1;
    });
    if(isUAT) return 'uat';
    return 'prod';
})()

// const uploadHost = currentEvn == 'prod' ? global.UPLOAD_HOST : 'http://sn.bgbet1.com/websrc';
const uploadHost = global.UPLOAD_HOST || '';
const cdnPath = global.CDN_PATH || '';
const apiHost = global.API_HOST || '';
const appHost = global.APP_HOST || 'cdn66-amz.shmlzm.com'; //APP下載服務器地址
const wxProxy = global.WX_PROXY + '/wx/app/proxy-qrcode.html';

var conf = {
    apiHost,
    wxProxy,
    uploadHost,
    currentEvn,
    appHost,
    cdnPath
}
export default conf
