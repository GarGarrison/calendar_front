<template>
    <div class="data-container pointer">
        <i class="material-icons" @click.stop="show=!show">feedback</i>
        <span class="counter">16</span>
        <transition name="data-list">
            <div class="data-list" v-show="show" ref="popup">
                <div class="collection">
                    <li v-if="data.length == 0" class="collection-item">Нет задач</li>
                    <router-link to="/" v-for="d, index in data" class="collection-item" :key="index">{{ d }}</router-link>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        data: function(){
            return {
                show:false,
                data: [1,2,23,4]
            }
        },
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
<style scoped>
    .data-container {
        position: relative;
    }
    .data-container i {
        font-size: 2rem;
    }
    .data-container .counter {
        position: absolute;
        top: 10px;
        right: -10px;
        background-color: #f44336;
        color: white;
        border-radius: 5px;
        font-size: 0.7rem;
        padding: 0px 5px;
        line-height: initial;
    }

    .data-list {
        width: 200px;
        right: 0;
        top: 45px;
        position: absolute;
        z-index: 200;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);
        border-radius: 2px;
    }
    .data-list .collection {
        margin-bottom: 0px;
    }
    .data-list-enter-active,
    .data-list-leave-active {
      transition: all .2s;
    }

    .data-list-enter,
    .data-list-leave-to {
      transform: translateY(-30%);
      opacity: 0;
    }
</style>