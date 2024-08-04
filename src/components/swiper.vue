<template lang="html">
  <div
    :class="[ swiperOption.class, `swiper-row-${swiperOption.slidesPerView ? swiperOption.slidesPerView : 'common'}` ]"
    :style="items.style">
    <x-block v-if="items.top"
      :items="items.top"
      :class="['block-top', items.top.class]"
      :style="items.top.style"
      :path="path"
      :type="'top'"
      @mouseover="doHover"
      @mouseleave="doHover"
      @click="doClick"></x-block>
    <!-- 分页器 -->
    <div v-if="items.option.pagination&&items.option.pagination.list.indexOf('top')!=-1"
      class="swiper-pagination"
      slot="pagination"
      :style="items.option.pagination&&items.option.pagination.top&&items.option.pagination.top.style"
      :class="[ 'swiper-pagination-top', 'swiper-pagination-top-'+ id ]"></div>
    <swiper v-if="init"
      class="swiper-container"
      ref="mySwiper"
      :options="swiperOption"
      :style="swiperOption.style"
      :id="`swiper-${id}`">
        <swiper-slide v-for="(img, key) in items.list"
          class="swiper-slide"
          :class="swiperOption.list&&swiperOption.list.class"
          :style="swiperOption.list&&swiperOption.list.style"
          :key="'swiper-' + key" >
          <img
            :src="getFun('getImgPath', img)"
            @click="$emit('click', items.click)" />
        </swiper-slide>
    </swiper>
    <!-- 分页器 -->
    <div v-if="items.option.pagination&&items.option.pagination.list.indexOf('bottom')!=-1"
      class="swiper-pagination"
      slot="pagination"
      :style="items.option.pagination&&items.option.pagination.bottom&&items.option.pagination.bottom.style"
      :class="[ 'swiper-pagination-bottom', 'swiper-pagination-bottom-'+ id ]"></div>
    <!--前进后退按钮-->
    <div v-if="items.option.navigation" class="swiper-button-prev" :class="[ 'swiper-button-prev-'+ id ]" slot="button-prev" :style="navigationPrev"></div>
    <div v-if="items.option.navigation" class="swiper-button-next" :class="[ 'swiper-button-next-'+ id ]" slot="button-next" :style="navigationNext"></div>
    <!--滚动条-->
    <div class="swiper-scrollbar" slot="scrollbar"></div>
    <!-- <div @click="this.doInit">init</div> -->
    <x-block
      v-if="items.bottom"
      :items="items.bottom"
      :class="['block-bottom', items.bottom.class]"
      :path="path"
      :type="'bottom'"
      @mouseover="doHover"
      @mouseleave="doHover"
      @click="doClick"></x-block>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
const xBlock = () => import(/* webpackChunkName: "components/block" */'@/components/block')
import common from '$COM'
export default {
  components: {
    swiper,
    swiperSlide,
    xBlock
  },
  props: ['items', 'path'],
  data() {
    return {
      id: this.items.id,
      imageRoot: `${common.Constant.cdnPath}/image-qp/landingPage/`,
      init: false,
      swiperOption:{
        // grabCursor: false, //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        // setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会
        // autoHeight: true,   //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
        // scrollbar: '.swiper-scrollbar',//显示滚动条
        // mousewheelControl: true, //设置为true时，能使用鼠标滚轮控制slide滑动
        // observeParents: false, //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
        loop: true,
        roundLengths: true,
        observer: true,
        observeParents: true,
        // autoplay: {//可选选项，自动滑动
        //   delay: 2500,//自动循环时间
        //   disableOnInteraction: false//用户操作后是否禁止自动循环
        // },
        autoplay: false,
        // 分页器
        pagination: {
          el: `${this.items.option.pagination && (`.swiper-pagination-` + this.items.option.pagination.list.join(`-${this.items.id}, .swiper-pagination-`) + `-${this.items.id}`)}`,
          type: 'bullets', //分页器形状 'progressbar'
          clickable :true, //点击分页器的指示点分页器会控制Swiper切换
        },
        // 前进后退按钮
        navigation: {
          nextEl: `.swiper-button-next-${this.items.id}`,
          prevEl: `.swiper-button-prev-${this.items.id}`,
        },
        // on: {
        //   init() {
        //     // console.log('init')
        //   },
        // }
      },
    }
  },
  computed:{
    // swiper() {
    //   return this.$refs.mySwiper.swiper
    // }
    navigationPrev(){
      let style = this.items && this.items.option && this.items.option.navigation && this.items.option.navigation.prev || {};
      Object.keys(style).map(o=>{
        if(o === 'backgroundImage' || o == 'background-image'){
          style[o] = this.getImg(style[o]);
        }
      })
      return style;
    },
    navigationNext(){
      let style = this.items && this.items.option && this.items.option.navigation && this.items.option.navigation.next || {};
      Object.keys(style).map(o=>{
        if(o === 'backgroundImage' || o == 'background-image'){
          style[o] = this.getImg(style[o]);
        }
      })
      return style;
    }
  },
  methods:{
    doInit(){
      const option = this.items.option;
      this.$nextTick(()=>{
        for (let key in option) {
          if(key == 'navigation') continue;
          if( typeof option[key] == 'object' ) {
            if(!this.swiperOption[key]){
              this.swiperOption[key] = option[key];
            }else{
              if(Array.isArray(option[key])){
                option[key].map((o, i)=>{
                  if(option[key][i]) this.swiperOption[key][i] = option[key][i];
                })
              }else{
                Object.keys(option[key]).map((o, i)=>{
                  if(option[key][o]) this.swiperOption[key][o] = option[key][o];
                })
              }
            }
          }else{
            if(key == 'pagination') continue;
            this.swiperOption[key] = option[key];
          }
        }
        if(this.items.list.length <= 1) this.swiperOption.autoplay = false;
        this.init = true;
      })
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
    getImg(value){
      return value.indexOf('http') == -1 ? value.replace(/\/image-qp/g, `${common.Constant.cdnPath}/image-qp`) : value;
    }
  },
  created(){
    this.doInit();
  },
  mounted(){
    setTimeout(() => {
      this.$refs.mySwiper.swiper.update();
    }, 500);
  },
  updated(){
  }
}
</script>

<style lang="scss">
@import '~@/style/landingPage';
.landingPage-swiper{
  > div{
    &:first-child{
      overflow: hidden;
    }
  //   @include bg_center();
  }
  .swiper-container{
    // width: 90%;
    // padding: 1.75rem 0;
    // display: flex;
    // justify-content: center;
    @include bg_center();
  }
  .swiper-wrapper{
    width: 100%;
    img{
      width: 100%;
      max-width: inherit;
    }
  }
  .swiper-slide{
    transition: all .2s ease;
  }
  // arrow prev, next
  .swiper-button-prev, .swiper-button-next{
    width: 1rem;
    height: 1rem;
    margin-top: 0;
    background-size: contain;
    outline: none;
    z-index: 1;
  }
  .swiper-arrow-2{
    .swiper-button-prev, .swiper-button-next{
      height: 2rem;
    }
  }
  // pagination
  .swiper-pagination{
    width: 100%;
    line-height: 20px;
    z-index: 1;
    span[class^='pagination-']{
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 100%;
      margin: 0 2%;
      cursor: pointer;
    }
    span[class^='pagination-active-']{
      opacity: 1;
    }
  }
  // 自定共用 pagination color
  $list: (white, black, blue, goldenrod);
  @each $item in $list {
    .pagination-#{$item}{
      background: #{$item};
    }
    .pagination-active-#{$item}{
      background: #{$item};
    }
  }
  .swiper-pagination-progressbar{
    margin: 1% 0;
    .swiper-pagination-progressbar-fill{
      min-height: 5px;
    }
  }
  .swiper-pagination-bullet{
    margin: 0 2%;
  }
}
.swiper-coverflow{
  overflow: hidden;
  // padding: 2rem 0;
  .swiper-container{
    // width: 75%;
    overflow: initial;
  }
  .swiper-slide{
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(1.25);
    img{
      // display: none;
      opacity: 0;
      // transform: scale(0);
      transition: opacity .1s ease;
    }
  }
  // .swiper-slide-duplicate-next+.swiper-slide,
  // .swiper-slide-next+.swiper-slide{
  //   img{
  //     // opacity: 0;
  //     // transform: scale(0);
  //   }
  // }
  // .swiper-slide-duplicate-prev,
  // .swiper-slide-duplicate-next,
  // .swiper-slide-duplicate-active,
  .swiper-slide-prev,
  .swiper-slide-next,
  .swiper-slide-active{
    img{
      // display: flex;
      opacity: 1;
      // transform: scale(1.5);
    }
  }
  .swiper-slide-prev,
  .swiper-slide-next{
    z-index: 15;
    filter: brightness(0.75);
  }
  .swiper-slide-prev{
    // transform: scale(2) translateX(20%);
    transform: scale(1) translateX(20%);
  }
  .swiper-slide-next{
    // transform: scale(2) translateX(-20%);
    transform: scale(1) translateX(-20%);
  }
  .swiper-slide-active{
    z-index: 20;
    // transform: scale(2.5);
    transform: scale(1.5);
  }
}
.swiper-coverflow-rotate{
  overflow: hidden;
  .swiper-container{
    overflow: initial;
  }
  .swiper-slide{
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(.25);
    transform-style: preserve-3d;
    img{
      opacity: 0;
      transition: opacity .1s ease;
    }
  }
  .swiper-slide-prev,
  .swiper-slide-next,
  .swiper-slide-active{
    img{
      opacity: 1;
    }
  }
  .swiper-slide-prev,
  .swiper-slide-next{
    z-index: 15;
    filter: brightness(0.75);
  }
  .swiper-slide-prev{
    transform: scale(.5) translateX(120%);
  }
  .swiper-slide-next{
    transform: scale(.5) translateX(-120%);
  }
  .swiper-slide-active{
    z-index: 20;
    transform: scale(0.75);
  }
}
.swiper-scale{
  .swiper-container{
    padding: 1.75rem 0;
  }
  .swiper-slide{
    // transform: scale(0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease 0.2s;
    filter: brightness(.5);
    // img{
    //   width: 170%;
    // }
  }
  .swiper-slide-prev,
  .swiper-slide-next{
    position: relative;
    z-index: 15;
    transform: scale(1.45);
    filter: brightness(.75);
  }
  .swiper-slide-next+.swiper-slide{
    z-index: 10;
  }
  .swiper-slide-active{
    position: relative;
    z-index: 20;
    transform: scale(1.95);
    filter: brightness(1);
  }
  &.swiper-row-3{
    .swiper-container{
      width: 80%;
      padding: 1.95rem 0;
      // img{
      //   width: 160%;
      // }
    }
    .swiper-slide{
      opacity: 0;
    }
    .swiper-slide-prev{
      transform: scale(1.5) translateX(25%);
    }
    .swiper-slide-next{
      transform: scale(1.5) translateX(-25%);
    }
    .swiper-slide-active{
      transform: scale(2.05);
    }
    .swiper-slide-prev, .swiper-slide-next, .swiper-slide-active{
      opacity: 1;
    }
  }
}
.swiper-row{
  &-common{
    .swiper-container-fade{
      .swiper-slide{
        img{
          opacity: 0;
        }
      }
      .swiper-slide-active{
        img{
          opacity: 1;
        }
      }
    }
  }
}
</style>