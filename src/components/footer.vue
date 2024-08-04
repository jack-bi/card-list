<template lang="html">
    <!-- :class="items.class" -->
    <div 
        :style="items.style">
        <div v-if="items.logo" 
            :class="[ 'footer-logo', items.logo.class ]">
            <img 
                :src="logo"
                :style="items.logo.style" />
        </div>
        <!-- <div v-if="items.title || items.desc || items.btn || items.star" class="footer-area"> -->
        <div :class="[ items.area ? ['footer-area',items.area.class] : 'footer-area' ]">
            <div class="footer-info">
                <div v-if="info" class="footer-info-text">
                    <p v-for="(item, index) in info"
                        :class="[ `footer-info-text-${item.type}`, item.class ]"
                        :style="item.style"
                        :key="`footer-info-${index}`"
                    >
                        <img v-if="item.type==='star'" :src="getFun('getImgPath', item.src)" />
                        <span v-else v-html="item.text||appTitle"></span>
                    </p>
                </div>
                <!-- <div v-if="items.title || items.desc || items.star" class="footer-info-text">
                    <p v-if="items.title" 
                        :class="[ 'footer-info-text-title', items.title.class ]"
                        :style="items.title.style"
                        v-html="items.title.text||appTitle"></p>
                    <p v-if="items.star" 
                        :class="[ 'footer-info-text-star', items.star.class ]"
                        :style="items.star.style">
                        <img :src="getFun('getImgPath', items.star.src)" />
                    </p>
                    <p v-if="items.desc" 
                        :class="[ 'footer-info-text-desc', items.desc.class ]"
                        :style="items.desc.style"
                        v-html="items.desc.text"></p>
                </div> -->
                <div v-if="items.btn" 
                    :class="[ 'footer-info-btn', items.btn.class ]"
                    :style="items.btn.style">
                    <div v-for="(item, i) in items.btn.list" 
                        :class="[ item.src ? 'footer-btn-img' : 'footer-btn-download' ]" 
                        :key="`footer-${i}`"
                        @click="$emit('click', item.click)">
                        <!-- :style=" item.style " -->
                        <img v-if="item.src" 
                            :src="getFun('getImgPath', item.src)"
                            :class="item.class"
                            :style="item.style" 
                            @mouseover="$emit('mouseover', item)"
                            @mouseleave="$emit('mouseleave', item)"/>
                        <span v-else                            
                            :class="item.class"
                            :style="item.style"
                        >{{item.text}}</span>
                    </div>
                </div>
            </div>
            <div v-if="showAgentCode" class="footer-agent">
                <div :class="[ 'footer-agent-code', items.agent && items.agent.code && items.agent.code.class ]"
                    :style="items.agent && items.agent.code && items.agent.code.style"
                >
                    {{(items.agent && items.agent.code&&items.agent.code.title)||'邀请码:'}} 
                    <span :style="items.agent && items.agent.code && items.agent.code.text && items.agent.code.text.style">{{agentCode}}</span>
                </div>
                <div :class="[ 'footer-agent-copy', items.agent && items.agent.copy && items.agent.copy.class ]">
                    <span :style="items.agent && items.agent.copy && items.agent.copy.style" @click="$emit('click', 'doCopy')"
                    >{{(items.agent && items.agent.copy&&items.agent.copy.text)||'复制'}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// const xBlock = () => import(/* webpackChunkName: "components/block" */'@/components/block')
import common from '$COM'
export default {
    props: ['items', 'path', 'logo', 'showAgentCode', 'agentCode', 'appTitle', 'star'],
    //   components: {
    //     xBlock,
    //   },
    data() {
        return {
        }
    },
    computed:{
        info(){
            let info = [];
            const list = ['title', 'desc', 'star'];
            Object.keys(this.items).map((o, i)=>{
                if(list.indexOf(o) !== -1){
                    info.push(Object.assign({}, { type : o }, this.items[o], true))
                }
            })
            return info;
        }
    },
    methods:{ 
        getFun(f, v = null, t = this){
            if(t.$parent[f]){
            return t.$parent[f](v);
            }else{
            return this.getFun(f, v, this.$parent);
            }
        },
    },
    mounted(){
    },
    updated(){
    }
}
</script>

<style lang="scss">
$height: 4.5rem;
$agent-height: 6rem;
.footer-ui{
    &-top{
        padding-top: $height;
    }
    &-bottom{
        padding-bottom: $height;
    }
}
.show-agent-code{
    &-top{
        padding-top: $agent-height
    }
    &-bottom{
        padding-bottom: $agent-height
    }
    &-top, &-bottom{
        .landingPage-footer{
            .footer-logo{
                flex: .8;
            }
        }
    }
}
.logo-ie{
    max-width: 15%;
}
.area-ie{
    width: 60%;
    height: 120px;
}
</style>