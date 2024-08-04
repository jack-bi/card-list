<!-- 統計代碼 (沒有UI，只有邏輯實現)-->
<template lang="html">
</template>

<script>
import util from '@/js/util.js'
import _forEach from 'lodash/forEach'
export default {
    data() {
        return {}
    },
    methods: {
        init() {
            let id = util.getSN();
            import ( /* webpackChunkName: "[request]" */ `../customer/${id}.js`).then(mod => {
                let analysisCode = mod.analysisCode;
                if(!analysisCode) return;
                _forEach(analysisCode.list, vo => {
                    if(vo.host !== document.domain && vo.host !== '*') return;
                    if(vo.problemOfDocumentWrite) this.createIframe(vo,id)
                    else this.appendJS(vo);
                })
            }).catch(e => {})
        },
        appendJS(vo) {
            let js = document.createElement("script");
            let h = document.getElementsByTagName("html")[0];
            js.type = 'text/javascript';
            js.async = true;
            js.src = location.protocol + decodeURIComponent(vo.url);
            js.charset = vo.charset || 'utf-8';
            h.appendChild(js);
        },
        createIframe(vo,id){
            let body = document.getElementsByTagName("body")[0];
            let iframe = document.createElement("iframe");
            iframe.id = id;
            iframe.style.display = 'none'
            body.appendChild(iframe)
            let win = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument;
            win.open()
            win.document.write(`<html><body></body><script src="${location.protocol}${decodeURIComponent(vo.url)}"><\/script></html>`);
            win.close()
        }
    },
    created() {
        this.init();
    }
}
</script>
