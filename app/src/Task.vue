<template>
    <task-form :curTask="task" :submit="'edit'"></task-form>
</template>
<script>
    import TaskForm from './TaskForm'
    import axios from 'axios'
    import utils from './utils'
    export default {
        data: function(){
            return {
              task: {}
            }
        },
        created: function(){
            var vm = this;
            axios.get("/get_task/" + this.$route.params.tid)
                    .then(function(response){
                        vm.task = response.data.task;

                    })
                    .catch(utils.catchProcess)
        },
        components: {
            TaskForm
        }
}
</script>