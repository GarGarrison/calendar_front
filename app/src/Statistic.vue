<template>
    <div class="row">
        <div class="col s12 l8">
            <h2>Статистика</h2>
            <div class="row">
                <table>
                    <tr>
                        <td class="range_header"></td>
                        <td class="range_header" v-for="col in cols">{{ col }}</td>
                    </tr>
                    <tr v-for="user in users">
                        <td>{{ utils.nameView(user) }}</td>
                        <td v-for="col in cols"></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import moment from 'moment'

    import {utils, Consts} from './utils'
    
    export default {
        data: function(){
            return {
                utils: utils,
                consts: Consts,
                cols: ["Деж-ства/месяц", "Деж-ства/год", "Отпуск", "Часы", "Больничные"]

            }
        },
        methods: {
            submit: function(){
                var vm = this;
                this.absence.dt_start = moment(this.absence.dt_start).format(Consts.datetime_format);
                this.absence.dt_end = moment(this.absence.dt_end).format(Consts.datetime_format);
                axios.post("/create_absence", this.absence)
                    .then(function(){
                        //for(var k in vm.task) vm.task[k] = "";
                        utils.goBack(vm);
                    })
                    .catch(utils.catchProcess)
            }
        },
        computed: {
            users: function() {
                return this.$root.users
            }
        },
        created: function(){

        },
        components: {
            // Datepicker
        }

}
</script>