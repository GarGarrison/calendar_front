<template>
    <div class="row">
        <div class="col s12 l6">
            <h2>Запросы</h2>
            <div class="row">
                <div class="col s12">
                    <h6 v-if="events.length == 0">Запросов нет</h6>
                    <accordion>
                            <acc-item v-for="event, index in events" :index="index" :key="index">
                                <template slot="header">
                                    <div class="row table-row">
                                        <div class="col s3">{{ event.dt_start }}</div>
                                        <div class="col s2">{{ consts.EventTranslateKey[ consts.EventTypeFromCode[event.etype] ] }}</div>
                                        <div class="col s3">{{ utils.nameView($root.userById[event.user]) }}</div>
                                        <div class="col s2">
                                            <span v-if="event.hours">
                                                {{ event.hours }}ч
                                            </span>
                                        </div>
                                        <div class="col s2" style="text-align: right;">
                                            <button @click.stop="setStatus(event.id, consts.EventStatus.ACCEPT, index)" class="btn red">Да</button>
                                            <a class="pointer" @click.stop="setStatus(event.id, consts.EventStatus.CANCEL, index)" style="margin-left: 15px;">Нет</a>
                                        </div>
                                    </div>
                                </template>
                                <template slot="body">
                                        <table style="margin-bottom: 20px;">
                                            <tr>
                                                <td><b>Тип:</b></td>
                                                <td>{{ consts.EventTranslateKey[ consts.EventTypeFromCode[event.etype] ] }}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Начало:</b></td>
                                                <td>{{ event.dt_start }}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Конец:</b></td>
                                                <td>{{ event.dt_end }}</td>
                                            </tr>
                                            <tr v-if="event.hours">
                                                <td><b>Часы:</b></td>
                                                <td>{{ event.hours }}</td>
                                            </tr>
                                            <tr v-if="event.comment">
                                                <td><b>Комментарий:</b></td>
                                                <td>{{ event.comment }}</td>
                                            </tr>
                                        </table>
                                </template>
                            </acc-item>
                    </accordion>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import moment from 'moment'
    import Accordion from './components/accordion/Accordion'
    import AccItem from './components/accordion/AccItem'
    import {utils, Consts} from './utils'
    
    export default {
        data: function(){
            return {
                utils: utils,
                consts: Consts,
                events: [],
                text_status: {}

            }
        },
        methods: {
            getClass: function(status){
                var cl = "info"
                if (status == Consts.EventStatus.CANCEL) cl = "hight";
                if (status == Consts.EventStatus.ACCEPT) cl = "low";
                return cl;
            },
            setStatus: function(eid, status,index){
                var vm = this;
                axios.post("/set_event_status", {"eid": eid, "status": status})
                    .then(function(){
                        //utils.goBack(vm);
                        vm.events.splice(index,1);
                        vm.$root.new_events_counter -= 1;
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
            var vm = this;
            vm.text_status[Consts.EventStatus.CANCEL] = "Отклонено";
            vm.text_status[Consts.EventStatus.ACCEPT] = "Согласовано";
            vm.text_status[Consts.EventStatus.NEW] = "Новое";
            axios.get("/get_new_events")
                    .then(function(response){
                        vm.events = response.data.events;
                    })
                    .catch(utils.catchProcess)
        },
        components: {
            Accordion,
            AccItem
        }

}
</script>
<style>
</style>