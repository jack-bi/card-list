<template>
    <div class="cs-wrapper" @click='contactCS'></div>
</template>

<script>
import common from '$COM'
export default {
    data(){
        return {
            cs_url: ''
        }
    },
    methods:{
        contactCS(){
            window.open(this.cs_url)
        }
    },
    created(){
        this.cs_url = common.Util.getHostInfo('onlineCustomerServiceUrl')
    }
}
</script>

<style>
.cs-wrapper{
    width: 3.5rem;
    height: 5rem;
    background-image: url(/image-qp/common/cs.png);
    background-repeat: no-repeat;
    background-size: contain;
    position: fixed;
    right: 0;
    bottom: 18%;
    z-index: 100;
}
</style>
