<template lang='html'>
    <!-- skins共用方法寫在這，沒有UI -->
</template>

<script>
import util from '@/js/util.js'
import { mapGetters} from 'vuex'
export default {
    data() {
        return{
            sn: '',
            // 以下for 66棋牌版型
            settings: {
                ribbonConf: { //黑色那塊的配置
                    text: '好玩到爆肝的游戏！',
                    text2: '还不赶快加入!',
                    bgc: '#424A55',
                    color: '#D3D042'
                },
                conf: {
                    a: [
                        { icon: "a1.png" ,useDefaultImage: true},
                    ],
                    b: [
                        { name: '真人牛牛' ,icon: "b1.png" ,useDefaultImage: true},
                        { name: '炸金花' ,icon: "b2.png" ,useDefaultImage: true},
                        { name: '捕鱼大师' ,icon: "b3.png" ,useDefaultImage: true},
                        { name: '斗地主' ,icon: "b4.png" ,useDefaultImage: true},
                    ],
                    c: [
                        { icon: "c1.png" ,useDefaultImage: true},
                        { icon: "c2.png" ,useDefaultImage: true},
                        { icon: "c3.png" ,useDefaultImage: true},
                        { icon: "c4.png" ,useDefaultImage: true},
                    ],
                    d: [
                        { name: '真人牛牛' ,icon: "d1.png" ,useDefaultImage: true},
                        { name: '炸金花' ,icon: "d2.png" ,useDefaultImage: true},
                        { name: '捕鱼大师' ,icon: "d3.png" ,useDefaultImage: true},
                        { name: '斗地主' ,icon: "d4.png" ,useDefaultImage: true},
                    ],
                    foot:[
                        {text: '0秒下载，顶级手感' ,color: "#000"},
                    ]
                },
                tutorialText: '查看APP安装教程'
            },
            // 以下for 金牛棋牌版型
            settings2: {
                conf: { //客製的文字 、結構固定
                    b: [
                        { name: '炸金花' ,icon: "b1.png" ,useDefaultImage: true},
                        { name: '百人牛牛' ,icon: "b2.png" ,useDefaultImage: true},
                        { name: '百家乐' ,icon: "b3.png" ,useDefaultImage: true},
                        { name: '斗地主' ,icon: "b4.png" ,useDefaultImage: true},
                    ],
                    c: [
                        {icon: 'c1.png' ,useDefaultImage: true},
                        {icon: 'c2.png' ,useDefaultImage: true},
                        {icon: 'c3.png' ,useDefaultImage: true},
                        {icon: 'c4.png' ,useDefaultImage: true},
                        {icon: 'c5.png' ,useDefaultImage: true},
                        {icon: 'c6.png' ,useDefaultImage: true},
                    ],
                    e: [
                        {text: '下载手机应用' ,color: "#fff"},
                        {text: '好玩到爆肝的游戏！' ,color: "#fff"},
                        {text: '点击下载 随时随地都能玩' ,color: "#fff"},
                    ],
                    foot:[
                        {text: '0秒下载，顶级手感' ,color: "#fff"},
                    ]
                },
                swiper: [ //imageRoot + "/image-qp/default2/banner1.png
                    {icon: 'banner2.png' ,useDefaultImage: true},
                    {icon: 'banner3.png' ,useDefaultImage: true}
                ],
                swiper2: [
                    {icon: 'banner1.png' ,useDefaultImage: true}
                ],
                tutorialText: '查看APP安装教程'
                // imgConf: [], //換圖的座標(ex: A1 B2 ..)
                // isReady: '',
            },
        }
    },
    computed:{
        ...mapGetters(['snConfig']),
        isHome2: function() {
            return this.$parent.templateName == 'home2';
        }
    },
    methods: {
        getSNConfig() {
            //[request]指定 chunkName = 變數${id}
            import(/* webpackChunkName: "[request]" */ `../customer/${this.sn}.js`).then( res => {
                // 金牛板型
                if(this.isHome2){
                    // ios安裝教程按鈕文字
                    if(this.snConfig && this.snConfig.superSignatureUrl) this.settings.tutorialText = '查看超级签名教程'
                    // 檢查img有無客製
                    // if(res.imgConf) this.settings2.imgConf = res.imgConf
                    // 配置swiper
                    if(res.swiper){
                        this.settings2.swiper = res.swiper
                    }
                    if(res.swiper2){
                        this.settings2.swiper2 = res.swiper2
                    }
                    // 將文字配置組成新的資料結構
                    if(res.conf){
                        for(let key in res.conf){
                            this.reorganizeDataStructure2(res.conf[key] ,key ,this.isHome2)
                        }
                    }
                    // isReady 是處理異步問題
                    // this.settings2.isReady = true
                    this.$emit("getChildData",this.settings2) //有異步的問題，所以用$emit 而不能用$ref
                }
                // 默認版型是 66 棋牌的版型
                else{
                    // ios安裝教程按鈕文字
                    if(this.snConfig && this.snConfig.superSignatureUrl) this.settings.tutorialText = '查看超级签名教程'
                    // 檢查img有無客製
                    // if (res.imgConf) this.settings.imgConf = res.imgConf
                    // 將文字配置組成新的資料結構
                    if(res.conf){
                        for(let key in res.conf){
                            this.reorganizeDataStructure2(res.conf[key] ,key)
                        }
                    }
                    if (res.ribbonConf){
                        Object.assign(this.settings.ribbonConf ,res.ribbonConf)
                    }
                    // isReady 是處理異步問題
                    // this.settings.isReady = true
                    this.$emit("getChildData",this.settings) //有異步的問題，所以用$emit 而不能用$ref
                }
            }).catch( err => {
                // console.log(err)
                // console.log(this.snConfig.superSignatureUrl)
                if(this.snConfig && this.snConfig.superSignatureUrl) this.settings.tutorialText = '查看超级签名教程'
                // this.settings.isReady = true
                // this.settings2.isReady = true
                if(this.isHome2 ) this.$emit("getChildData" ,this.settings2)
                else this.$emit("getChildData" ,this.settings)
            })
        },
        reorganizeDataStructure2(data, block ,isHome2) {
            let setting = isHome2 ? this.settings2 : this.settings
            // 改變config檔的資料結構
            for(let key in data){
                let ref = setting.conf[block][key - 1]
                if(data[key]){
                    let arr = Object.keys(data[key])
                    // 不一定有配置name icon ， 但預設一定要有此屬性
                    if(!arr.includes("name")) arr.push("name")
                    if(!arr.includes("icon")) arr.push("icon")
                    arr.forEach(prop => {
                        if(!setting.conf[block][key - 1]) setting.conf[block][key - 1] = {} //解決Cannot set property 'XXX' of undefined
                        setting.conf[block][key - 1][prop] = data[key][prop] ? data[key][prop] : (ref? ref[prop] : undefined)

                        // 一般來說useDefaultImage不會配，這段邏輯就會變成 useDefaultImage: true ，變成永遠是預設圖，下面處理這個問題
                    })
                    // useDefaultImage 的問題，有配置圖用配置圖 並且檢查useDefaultImage，沒配置圖用default
                    if(setting.conf[block][key - 1].icon) setting.conf[block][key - 1].useDefaultImage = data[key].useDefaultImage ? data[key].useDefaultImage : false
                    else setting.conf[block][key - 1].useDefaultImage = true

                    // setting.conf[block][key - 1] = {
                    //     name: data[key].name || (ref? ref.name : undefined),
                    //     icon: data[key].icon || (ref? ref.icon : undefined),
                    //     useDefaultImage: data[key].icon ? data[key].useDefaultImage : true //沒配icon，植接用default
                    // }
                }
                else setting.conf[block][key - 1] = undefined
            }
            setting.conf[block] = setting.conf[block].filter(Boolean)
        },
    },
    created() {
        this.sn = util.getSN();
        util.ready().then(()=> {
            this.getSNConfig()
        })   
    }
}
</script>
