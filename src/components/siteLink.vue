<template lang="html">
  <div class="sitelink-main" 
    :style="items.style">
    <x-block v-if="items.top"
      :items="items.top"
      :class="['block-top', items.top.class]" 
      :type="'top'"
      @mouseover="doHover"
      @mouseleave="doHover"
      @click="doClick"></x-block>
    <div v-if="items.items" class="sitelink-box"
     >
      <div v-if="items.items.bg && items.items.bg.src" 
        class="sitelink-bg"
        :class="items.items.bg.class"
        :style="items.items.bg.style">
        <img :src="getFun('getImgPath', items.items.bg.src)" />
      </div>
      <div class="sitelink-items"
      :class="items.items.class"
      :style="items.items.bg&&items.items.bg.src ? Object.assign({}, {
          position: 'absolute',
          top: 0
        }, items.items.style, true) : items.items.style">
        <div v-for="list in items.items.list"
          class="site-link"
          :class="list.class"
          :style="list.style">
          <div class="site-link-text" v-html="list.text"></div>
          <div class="site-link-url site-link-url-box">
            <span v-if="items.items.timerMax" class="site-link-url-timer">{{Math.floor(Math.random() * items.items.timerMax + 3)}}ms</span>
            <span class="site-link-url-text">{{list.link}}</span>
          </div>
          <div class="site-link-btn btn" @click="doLink(list.link)" :style="setBtnStyle(list.btn)">
            <img v-if="list.btn.src" :src="getFun('getImgPath', list.btn.src)" />
            <span v-else>{{list.btn.text}}</span>
          </div>
        </div>
      </div>
    </div>
    <x-block v-if="items.bottom"
      :items="items.bottom"
      :class="['block-bottom', items.bottom.class]" 
      :type="'bottom'"     
      @mouseover="doHover"
      @mouseleave="doHover"
      @click="doClick"></x-block>
  </div>
</template>

<script>
const xBlock = () => import(/* webpackChunkName: "components/block" */'@/components/block')
import common from '$COM'
export default {
  props: ['items'],
  components: {
    xBlock
  },
  data() {
    return {
    }
  },
  computed:{
  },
  methods:{
    setBtnStyle(val){
      let style = Object.assign({}, val.style);
      if(val.bg){
        style.backgroundImage = `url(/image-qp/landingPage/btn/${val.bg})`;
      }
      return style;
    },
    doLink(link){
      return window.open(link)
    },       
    doClick(e){
      this.$emit('click', e);
    },
    doHover(item) {
      this.$emit(event.type, item);
    },
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
@import '~@/style/landingPage';
$letter-spacing: .125rem;
.landingPage-sitelink{
  line-height: 1.85rem;
  font-size: .65rem;
  // padding-bottom: 1rem;
  @include bg_center();
  .sitelink-main{
    padding-bottom: 1rem;
    @include bg_center();
  }
}
.sitelink-box{
  position: relative;
}
.sitelink-bg{
  margin: auto;
}
.site-link{
  margin: 0 auto .85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &-text{
    width: 20%;
    min-width: 3.5rem;
    letter-spacing: $letter-spacing;
    text-indent: $letter-spacing;
  }
  &-url{
    width: 50%;
    text-align: left;
    overflow: hidden;
    position: relative;
    &-text{
      padding: 0 0 0 .5rem;
    }
    &-timer{
      line-height: normal;
      transform: scale(0.75) translate(-.45rem, -.15rem);
      padding: 0 .25rem;
      position: absolute;
    }
  }
  &-btn{
    width: 25%;
    min-width: 4.5rem;
    letter-spacing: $letter-spacing;
    text-indent: $letter-spacing;
  }
}
</style>