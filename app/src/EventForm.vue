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
                        <div class="col s6 validate">
                            <select id="etype" class="browser-default" v-model="event.etype">
                                <option v-for="k in Object.keys(consts.EventType)" v-if="k != 'DUTY'" :value="consts.EventType[k]">{{ consts.EventTranslateKey[k] }}</option>
                            </select>
                            <label for="etype">Событие</label>
                            <span class="error" v-if="validate_errors.etype">{{ validate_errors.etype }}</span>
                        </div>
                        <div class="col s6 validate">
                            <select id="user" class="browser-default" v-model="event.user">
                                <option v-for="user in users" :value="user.uid">{{ utils.nameView(user) }}</option>
                            </select>
                            <label for="user">Кто</label>
                            <span class="error" v-if="validate_errors.user">{{ validate_errors.user }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6 validate">
                            <date-picker v-model="event.dt_start" :first-day-of-week="1"  lang="ru" type="datetime" format="YYYY-MM-DD HH:mm:ss" :minute-step="15" style="width: 100%;" confirm></date-picker>
                            <label for="dt_start">Начало</label>
                            <span class="error" v-if="validate_errors.dt_start">{{ validate_errors.dt_start }}</span>
                        </div>
                        <div class="col s6 validate" v-if="event.etype && !(event.etype == consts.EventType.ADD_HOLIDAY || event.etype == consts.EventType.HOLIDAY ||  event.etype == consts.EventType.ADD_HOURS)">
                            <date-picker v-model="event.dt_end" :disabled="event.dt_start == undefined" :not-before="event.dt_start" :first-day-of-week="1"  lang="ru" type="datetime" format="YYYY-MM-DD HH:mm:ss" :minute-step="15" style="width: 100%;" confirm></date-picker>
                            <label for="dt_end">Конец</label>
                            <span class="error" v-if="validate_errors.dt_end">{{ validate_errors.dt_end }}</span>
                        </div>
                    </div>
                    <div class="row" v-if="event.etype && (event.etype == consts.EventType.HOURS || event.etype == consts.EventType.ADD_HOURS )">
                        <div class="col s6 validate" >
                            <input id="hours" type="text" v-model="event.hours">
                            <label for="hours">Кол-во часов</label>
                            <span class="error" v-if="validate_errors.hours">{{ validate_errors.hours }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6 validate">
                            <textarea id="comment" name="comment" v-model="event.comment"></textarea>
                            <label for="comment">Комментарий</label>
                            <span class="error" v-if="validate_errors.comment">{{ validate_errors.comment }}</span>
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
    import {Validator} from './validator'
    import ValidationRules from './validation_rules'
    import DatePicker from 'vue2-datepicker'
    export default {
        data: function(){
            return {
                utils: utils,
                consts: Consts,
                event: {
                    etype: Consts.EventType.HOURS,
                },
                validate_errors: {}
            }
        },
        methods: {
            submit: function(event){
                if (this.event.dt_start) this.event.dt_start = moment(this.event.dt_start).format(Consts.datetime_format);
                if (this.event.dt_end) this.event.dt_end = moment(this.event.dt_end).format(Consts.datetime_format);
                //else this.event.dt_end = this.event.dt_start;

                this.validate_errors = Validator.validate(this.event, ValidationRules.events);
                if ( Object.keys(this.validate_errors).length > 0 ) {console.log(this.validate_errors); return false;}
                
                var vm = this;
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
                return this.$root.users;
            }
        },
        created: function(){
        },
        components: {
            DatePicker
        }

}
</script>