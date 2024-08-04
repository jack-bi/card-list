<template lang="html">
    <div
      v-if="(type != 'mask' || ( type == 'mask' && items.show)) && getShow(items)" 
      :style="items.style" 
      :class="[ items.class&&(items.class.indexOf('block-top')==-1||items.class.indexOf('block-bottom')==-1) ? `block-main ${items.class}` : items.class,
              { 'block-mask-box': type == 'mask' }
      ]">
      <!-- <div v-if="type == 'mask'" 
        :class="['block-mask', items.mask.class]"
        :style="items.mask.style"></div> -->
      <x-block 
        v-if="items.top" 
        :items="items.top" 
        :class="['block-top', items.top.class]" 
        :path="path"
        :type="'top'"
        :appTitle="appTitle"
        @mouseover="doHover"
        @mouseleave="doHover"
        @click="doClick"></x-block>
      <div
        v-if="type==null||type=='mask'"
        :style="getClass('items.items.style')" 
        :class="[ 'block-items', getClass('items.items.class') ]">        
        <img v-if="!!getClass('items.items.bg.src')" 
        :style="getClass('items.items.bg.style')" 
        :class="getClass('items.items.bg.class')"
        :src="getFun('getImgPath', items.items.bg.src)" />
        <div 
          :class="[ { 'block-items-bg': !!getClass('items.items.bg.src') }, getClass('items.items.bg.box.class') ]"
          :style="getClass('items.items.bg.box.style')">
          <div 
            v-if="getShow(item)"
            v-for="(item, key) in items.list"
            class="block-box" 
            :key="`item-${key}`" 
            :style="item.style">
            <div v-if="item.html"
              v-html="item.html"></div>
            <img v-if="item.src" 
              :src="getFun('getImgPath', item.src)"
              :class="item.class" 
              @mouseover="$emit('mouseover', item)"
              @mouseleave="$emit('mouseleave', item)"
              @click="$emit('click', item.click)" />
            <!-- v-html="item.text"  -->
            <div v-if="item.text" 
              :class="item.class"
              @mouseover="$emit('mouseover', item)"
              @mouseleave="$emit('mouseleave', item)"
              @click="$emit('click', item.click)">
              {{doText(item.text)}}
              </div>
          </div>
        </div>
      </div>
      <div
        v-else
        v-for="(item, key) in items.list"
          class="block-box" 
          :key="`item-${key}`" 
          :style="item.style"
          @click="$emit('click', item.click)">
          <img v-if="item.src" 
            :src="getFun('getImgPath', item.src)"
            :class="item.class" 
            @mouseover="$emit('mouseover', item)"
            @mouseleave="$emit('mouseleave', item)"
            @click="$emit('click', item.click)" />
          <!-- v-html="item.text"  -->
          <div v-if="item.text" 
            :class="item.class"
            @mouseover="$emit('mouseover', item)"
            @mouseleave="$emit('mouseleave', item)"
            @click="$emit('click', item.click)">
            {{doText(item.text)}}</div>
        </div>
      <x-block 
        v-if="items.bottom" 
        :items="items.bottom" 
        :class="['block-bottom', items.bottom.class]" 
        :path="path"
        :type="'bottom'"
        :appTitle="appTitle"
        @mouseover="doHover"
        @mouseleave="doHover"
        @click="doClick"></x-block>
    </div>
</template>

<script>
const xBlock = () => import(/* webpackChunkName: "components/block" */'@/components/block')
import common from '$COM'
export default {
  props: ['items', 'path', 'type', 'appTitle'],
  components: {
    xBlock,
  },
  data() {
    return {
      isIOS: common.Util.isIOS(),
      isAndroid: !common.Util.isIOS() && common.Util.isMobile(),
    }
  },
  computed:{
  },
  methods:{
    doClick(e){
      this.$emit('click', e);
    },
    doHover(item) {
      this.$emit(event.type, item);
    },
    doText(v){
      return v.replace(/%title%/g, this.appTitle);
    },
    getFun(f, v = null, t = this){
      if(t.$parent[f]){
        return t.$parent[f](v);
      }else{
        return this.getFun(f, v, this.$parent);
      }
    },
    getClass(c){
      let t = (s, i = this) => {
        let o = s.shift(0);
        if(o==undefined){
          return i;
        }else if(i[o]){
          return t(s, i[o]);
        }else{
          return null;
        }
      };
      return t(c.split('.'))
    },
    getShow(o){
      return (!o.isIOS || (o.isIOS && this.isIOS)) && (!o.isAndroid || (o.isAndroid && this.isAndroid));
    }
  },
  mounted(){
  },
  updated(){
  }
}
</script>

<style lang="scss">
@import '~@/style/landingPage';
.block-row{
  &-2, &-3{    
    // .block-main{
      // @include flex(center, center, null);
      // @include bg_center();
    // }
    .block{
      // &-top, &-bottom , 
      &-top.float, &-bottom.float{
        transform: translateY(-1rem);
         .float{
          transform: translateY(-1rem);
        }
      }
      &-box{
        display: inline-block;
      }
    }
  }
  &-2{
    .block-items{
      .block-box{
        width: 44%;
        margin: 1% 3%;
      }
    }
  }
  &-3{
    .block-items{
       .block-box{
        width: 25%;
        margin: 1%;
      }
    }
  }
}
.block-items-bg{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  .block-box{
    > img{
      // position: absolute;
    }
  }
}
@for $i from 1 through 3 {
  .block-m-tb-#{$i}{
    .block-items{
      > .block-box{
        margin-top: #{$i*1%};
        margin-bottom: #{$i*1%};
      }
    }
  }
}
.block-mask-box{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  right: -1px;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, .5);
  &::-webkit-scrollbar{
    width: 1px;
  }
}
//手機
// @media all and (max-width: 480px) {
//   .block-mask-box{
//     right: 0;
//   }
// }
// 自訂樣式
.bee{
  .block-box{
    position: absolute;
    $y: 19, 2, 19, 53, 37, 53, 72;
    $x: 6, 37, 67;
    @for $i from 1 through length($y) {
      &:nth-of-type(#{$i}){
        $xx: $i % 3;
        @if $i % 3 == 0 {
          $xx: 3;
        }
        @if $i == length($y) {
          $xx: 2;
        }
        top: nth($y, $i) * 1%;
        left: nth($x, $xx) * 1%;
      }
    }
  }
}
</style>