<template>
    <div class="row">
        <div class="col s12 l6">
            <h3 slot="header">
                <a @click="$router.go(-1)" class="back-link" title="Назад"><i class="material-icons">keyboard_return</i></a>
                Новый запрос
            </h3>
            <form @submit.prevent="submit">
                <div class="row view-row">
                    <div class="row">
                        <div class="col s6">
                            <select id="reason" class="browser-default" v-model="request.rtype">
                                <option v-for="k in Object.keys(consts.RequestType)" :value="consts.RequestType[k]">{{ consts.RequestTranslateKey[k] }}</option>
                            </select>
                            <label for="reason">Тип запроса</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6">
                            <date-picker v-model="request.dt_start" :not-before="utils.today()" :first-day-of-week="1"  lang="ru" type="datetime" format="YYYY-MM-DD HH:mm:ss" :minute-step="15" style="width: 100%;" confirm></date-picker>
                            <label for="dt_start">С</label>
                        </div>
                        <div class="col s6" v-if="request.rtype > consts.RequestType.ADD_HOURS">
                            <date-picker v-model="request.dt_end" :first-day-of-week="1"  lang="ru" type="datetime" format="YYYY-MM-DD HH:mm:ss" :minute-step="15" style="width: 100%;" confirm></date-picker>
                            <label for="dt_end">По</label>
                        </div>
                    </div>
                    <div class="row" v-if="request.rtype && request.rtype != consts.RequestType.TAKE_HOLIDAY">
                        <div class="col s6">
                            <input id="hours" type="text" name="title" v-model="request.hours">
                            <label for="hours">Кол-во часов</label>
                        </div>
                    </div>
                </div>
                <div class="row view-row">
                    <div class="col s6">
                        <button type="submit" class="btn red">Сохранить</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import moment from 'moment'

    import {utils, Consts} from './utils'
    
    import DatePicker from 'vue2-datepicker'
    export default {
        data: function(){
            return {
                utils: utils,
                consts: Consts,
                request: {}
            }
        },
        methods: {
            submit: function(){
                var vm = this;
                this.request.dt_start = moment(this.request.dt_start).format(Consts.datetime_format);
                if (this.request.dt_end) this.request.dt_end = moment(this.request.dt_end).format(Consts.datetime_format);
                axios.post("/create_request", this.request)
                    .then(function(){
                        vm.$router.push('/calendar');
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
            DatePicker
        }

}
</script>