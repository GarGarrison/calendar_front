<template>
    <div>
        <div @click="toggle" style="cursor: pointer;">
            <slot name="header"></slot>
        </div>
        <div class="acc_body" ref="acc_body">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<script>
    import TweenMax from "gsap";
    export default {
        props: ["index"],
        data: function(){
            return {
                isOpen: false
            }
        },
        methods: {
            toggle: function(){
                this.isOpen = !this.isOpen;
            },
            show() {
                this.$parent.activeItem = this.index
                var el = this.$refs.acc_body;
                TweenMax.to(el, 0.3, { height: el.scrollHeight, opacity: 1  });
            },
            hide() {
                var el = this.$refs.acc_body;
                TweenMax.to(el, 0.3, { height: 0, opacity: 0 });
                if (this.$parent.activeItem == this.index) this.$parent.activeItem = null;
            }
        },
        watch: {
            isOpen: function(new_val){
                if (new_val) this.show();
                else this.hide();
            }
        }
    }
</script>
<style scoped>
    .acc_body {
        height: 0px;
        overflow: hidden;
    }
</style>