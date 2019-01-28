<template>
    <div class="menu-button-container" v-cloak>
        <a class="btn-floating" :class='dataButtonClass' @click.stop="show=!show">
            <i class="material-icons">add</i>
        </a>
        <transition name="menu-list">
            <div v-show="show"  class="menu-button-list" ref="popup">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        data: function(){
            return {
                show: false
            }
        },
        props: ['data-button-class'],
        methods: {
          documentClick(e) {
            var el = this.$refs.popup;
            if ( el != e.target &&  !el.contains(e.target)) this.show=false
          }
        },
        created() {
          document.addEventListener('click', this.documentClick)
        },
        destroyed() {
          document.removeEventListener('click', this.documentClick)
        }
    }
</script>
<style>
    .menu-button-container a {
      float: right;
    }
    .menu-button-list {
      margin-top: 0.5rem;
      margin-right: 10px;
      padding: 0px;
      float: left;
    }
    .menu-button-list span {
      padding: 0px 5px;
      float: left;
      display: block;
    }
    .menu-list-enter-active,
    .menu-list-leave-active {
      transition: all .2s;
    }

    .menu-list-enter,
    .menu-list-leave-to {
      transform: scaleX(0.2) translateX(120%);
      opacity: 0;
    }
</style>