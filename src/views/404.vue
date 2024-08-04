<template>
  <div id="noPage" class="noPage">
        <div class="not-found">
            <div class="img-404"></div>
            <div class="title">SORRY</div>
            <div>您要找的页面不存在。</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    created(){
    },
    methods: {
    },
    mounted(){
        $('body').addClass("overflow")
    },
    destroyed(){
        $('body').removeClass("overflow")
    }
}
</script>
<style>
body.overflow{
    overflow:hidden;
}
</style>
<style scoped lang="scss">
.noPage{
    font-size: 1.2em;
    text-align: center;
    line-height: 4em;
    color: #666;
    position: fixed;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    // background-color: #eee;
    overflow: hidden;
    z-index: 9999;
}
.not-found{
    max-width: 800px;
    margin: auto;
    padding: 60px 0;
}
.img-404{
    margin: auto;
    width: 43vw;
    height: 62vw;
    /* float: left; */
    background-image: url(/image-qp/common/404.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
}
.title{
    font-size: 3em;
    margin-top: 2em;
}
</style>
