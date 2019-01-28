<template>
    <div class="row">
        <div class="col s12 l6">
            <h2 slot="header">
                <a @click="$router.go(-1)" class="back-link" title="Назад"><i class="material-icons">keyboard_return</i></a>
                Новое событие
            </h2>
            <form @submit.prevent="submit">
                <div class="row view-row">
                    <div class="row">
                        <div class="col s6">
                            <select id="etype" class="browser-default" v-model="event.etype">
                                <option v-for="k in Object.keys(consts.EventType)" :value="consts.EventType[k]">{{ consts.EventTranslateKey[k] }}</option>
                            </select>
                            <label for="etype">Событие</label>
                        </div>
                        <div class="col s6">
                            <select id="user" class="browser-default" v-model="event.user">
                                <option v-for="user in users" :value="user.uid">{{ utils.nameView(user) }}</option>
                            </select>
                            <label for="user">Кто</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6">
                            <date-picker v-model="event.dt_start" :first-day-of-week="1"  lang="ru" type="datetime" format="YYYY-MM-DD HH:mm:ss" :minute-step="15" style="width: 100%;" confirm></date-picker>
                            <label for="dt_start">С</label>
                        </div>
                        <div class="col s6" v-if="event.etype && !(event.etype == consts.EventType.ADD_HOLIDAY || event.etype == consts.EventType.HOLIDAY ||  event.etype == consts.EventType.ADD_HOURS)">
                            <date-picker v-model="event.dt_end" :not-before="event.dt_start" :first-day-of-week="1"  lang="ru" type="datetime" format="YYYY-MM-DD HH:mm:ss" :minute-step="15" style="width: 100%;" confirm></date-picker>
                            <label for="dt_end">По</label>
                        </div>
                    </div>
                    <div class="row" v-if="event.etype && (event.etype == consts.EventType.HOURS || event.etype == consts.EventType.ADD_HOURS )">
                        <div class="col s6" >
                            <input id="hours" type="text" v-model="event.hours">
                            <label for="hours">Кол-во часов</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6">
                            <textarea id="comment" name="comment" v-model="event.comment"></textarea>
                            <label for="comment">Комментарий</label>
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
                event: {
                    etype: Consts.EventType.HOURS,
                }
            }
        },
        methods: {
            submit: function(){
                var vm = this;
                this.event.dt_start = moment(this.event.dt_start).format(Consts.datetime_format);
                if (this.event.dt_end) this.event.dt_end = moment(this.event.dt_end).format(Consts.datetime_format);
                else this.event.dt_end = this.event.dt_start;
                axios.post("/create_event", this.event)
                    .then(function(){
                        vm.$root.new_events_counter += 1;
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
            DatePicker
        }

}
</script>