import ajaxService from './ajaxService'
import util from './util'
import './static/ua-parser'
import store from '../store'
export default {
  getNews: () => { //公告消息（跑馬燈） -->這個叫做廳主公告
    let params = {
      sn: util.getSN(),
      pageIndex: 1,
      pageSize: 10
    }
    return ajaxService.post('sn.notice.new.layer.query', params);
  },
  getAgentCode: () => {
    let params = {
      domain: window.DOMAIN_HARDCARD||document.domain //DOMAIN_HARDCARD 因為測試環境同一個域名，所以先寫死
    }
    return ajaxService.post('agent.code', params);
  },
  checkAgentCode: (num)=> {
    let params = {
      sn: util.getSN(),
      recommendCode: num
    }
    return ajaxService.post('user.reg.recommend.check', params);
  },
  getRegSetting: () => { //公告消息（跑馬燈） -->這個叫做廳主公告
    let params = {
      sn: util.getSN()
    }
    return ajaxService.post('sn.user.reg.setting', params);
  },
  getDupSettings: ()=> {
    let params ={
    sn: util.getSN()
  }
    return ajaxService.post('sn.settings.get', params)
  },
  getMobileAuthCode: (mobile)=> {
    let params ={
      sn: util.getSN(),
      mobile: mobile
    }
    return ajaxService.post('sn.auth.sms.send', params)
  },
  checkNameDup: (username)=> {
    let params ={
      sn: util.getSN(),
      name: username
    }
    return ajaxService.post('user.name.check.duplicate', params)
  },
  //檢查手機重複
  checkPhoneDup: (phone)=> {
    let params ={
      sn: util.getSN(),
      mobile: phone
    }
    return ajaxService.post('user.mobile.check.duplicate', params)
  },
  checkLoginIdDup: (id) => {
    let params ={
      sn: util.getSN(),
      loginId: id
    }
    return ajaxService.post('auth.loginId.exists', params)
  },
  //註冊
  register: (params) => {
    return ajaxService.post('auth.mobile.reg.login', params)
  },
  //帶有手機驗證碼的註冊
  smsCheckRegister: (params) => {
    return ajaxService.post('auth.smscheck.reg.login', params)
  },
  getLogo: () => {
    let params ={
        sn: util.getSN(),
        tempId: util.getSkin(),
        ismobile: 2
    }
    return ajaxService.post('sn.website.logo.image.url', params)
  },
  // setPromotionCode: (code, privateIp) => { 棄用
  //     let params = {
  //         promotionCode: code,
  //         sn: util.getSN()
  //     }
  //     let uaParser = new UAParser();
  //     let osVersion = uaParser.getOS().version;
  //     let model = uaParser.getDevice().model;
  //     if(privateIp && privateIp != -1) params.privateIp = privateIp;
  //     if(osVersion) params.version = osVersion;
  //     if(model) params.model = model.toLowerCase();
  //     return ajaxService.post('sn.user.promotionCode.set', params)
  // },
  setData: () => {
    let promotionCode = store.getters.agentCode,
        movieKey = store.getters.movieKey;
    if(util.isBlank(promotionCode) && util.isBlank(movieKey)) return Promise.resolve({result: 1}); //兩個都是空直，就不做
    let params = {
        sn: util.getSN()
    }
    let uaParser = new UAParser();
    let osVersion = uaParser.getOS().version;
    let model = uaParser.getDevice().model;
    let privateIp = store.getters.privateIp;
    if(privateIp && privateIp != -1) params.privateIp = privateIp;
    if(osVersion) params.version = osVersion;
    if(model) params.model = model.toLowerCase();
    if(util.isNotBlank(promotionCode)) params.promotionCode = promotionCode;
    if(util.isNotBlank(movieKey)) params.movieKey = movieKey;
    return ajaxService.post('sn.user.promotionCode.set', params)
  }
}
