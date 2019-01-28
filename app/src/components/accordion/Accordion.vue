<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        data: function(){
            return {
                activeItem: null
            }
        },
        watch: {
            activeItem: function(new_i, old){
                console.log(new_i, old)
                if (new_i == null) return false;
                if (old != null ) this.$children[old].toggle(new_i);
            }
        }
    }
</script>
